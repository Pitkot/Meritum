#!/usr/bin/env python3
"""
Generator ilustracji premium dla strony Meritum.

Zgodny z meritum4gpt/specyfikacja_SD.md:
- API: lokalne Stable Diffusion WebUI
- Endpoint: POST /sdapi/v1/txt2img
- Profil premium web: steps 20-24, cfg 6-7, sampler Euler
"""

from __future__ import annotations

import base64
import json
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict

import requests


API_BASE = "http://192.168.1.10:7891"
PING_URL = f"{API_BASE}/internal/ping"
TXT2IMG_URL = f"{API_BASE}/sdapi/v1/txt2img"

OUTPUT_DIR = Path(__file__).parent / "assets" / "illustracje"
MANIFEST_PATH = OUTPUT_DIR / "manifest.json"

BASE_STYLE_PROMPT = (
    "nonprofit foundation environment, modern social impact organization, "
    "premium editorial photography, realistic, natural cinematic light, "
    "high detail, authentic emotions, elegant composition, "
    "color palette: warm white, soft beige, light taupe, sage green accents"
)

NEGATIVE_PROMPT = (
    "text, logo, watermark, blurry, low quality, artifacts, "
    "deformed face, distorted hands, oversaturated colors, uncanny expressions"
)


@dataclass(frozen=True)
class AssetSpec:
    filename: str
    title: str
    prompt: str
    width: int
    height: int
    steps: int = 22
    cfg_scale: float = 6.5
    sampler_name: str = "Euler"
    seed: int = -1


ASSETS: list[AssetSpec] = [
    AssetSpec(
        filename="01_hero_glowny.png",
        title="Hero główny",
        width=1536,
        height=960,
        prompt=(
            "panoramic scene of a foundation strategy meeting, bright elegant interior with large windows, "
            "4-6 professionals discussing at a large table with laptop, notebooks, documents and coffee cups, "
            "bookshelves and plants subtly visible in background, natural candid body language, "
            "wide composition with negative space for headline"
        ),
    ),
    AssetSpec(
        filename="02_filar_edukacja_rozwoj.png",
        title="Filar: edukacja i rozwój",
        width=1440,
        height=960,
        prompt=(
            "modern educational workshop in a bright training room, 8-12 participants of mixed ages, "
            "laptops, notebooks and educational materials on desks, facilitator near large screen with unreadable content, "
            "documentary premium style, collaborative atmosphere"
        ),
    ),
    AssetSpec(
        filename="03_filar_badania_diagnoza.png",
        title="Filar: badania i diagnoza potrzeb",
        width=1440,
        height=960,
        prompt=(
            "editorial top-angle photo of research team desk, anonymous charts, maps, sticky notes and tablet with neutral analytics UI, "
            "3-4 people partially visible by hands and silhouettes, strategic think-tank social analysis mood, "
            "soft professional light"
        ),
    ),
    AssetSpec(
        filename="04_filar_wolontariat.png",
        title="Filar: aktywność społeczna i wolontariat",
        width=1440,
        height=960,
        prompt=(
            "authentic volunteer group in urban community setting, 6-10 diverse people in neat casual clothes, "
            "organizing materials on information table and talking with local residents, "
            "modern library or cultural center background, warm afternoon light, reportage premium style"
        ),
    ),
    AssetSpec(
        filename="05_kontakt_cta.png",
        title="Kontakt CTA",
        width=1440,
        height=960,
        prompt=(
            "premium social consultation scene, two foundation representatives meeting local residents, "
            "clean modern community interior, empathetic conversation, trustworthy atmosphere, "
            "cinematic natural light, elegant yet authentic framing"
        ),
    ),
]


def sanitize_base64(image_b64: str) -> str:
    if image_b64.startswith("data:") and "," in image_b64:
        return image_b64.split(",", 1)[1]
    return image_b64


def ensure_api_available() -> None:
    try:
        response = requests.get(PING_URL, timeout=15)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RuntimeError(
            f"Nie udało się połączyć z API Stable Diffusion pod {API_BASE}."
        ) from exc


def request_txt2img(payload: Dict[str, Any], retries: int = 3, timeout: int = 900) -> Dict[str, Any]:
    last_error: Exception | None = None

    for attempt in range(1, retries + 1):
        try:
            response = requests.post(TXT2IMG_URL, json=payload, timeout=timeout)
            response.raise_for_status()
            data = response.json()

            images = data.get("images") or []
            if not images:
                raise RuntimeError("API zwróciło pustą listę obrazów (images).")

            return data
        except (requests.RequestException, ValueError, RuntimeError) as exc:
            last_error = exc
            if attempt == retries:
                break

            wait_seconds = 2 * attempt
            print(
                f"[WARN] Próba {attempt}/{retries} nieudana: {exc}. "
                f"Ponawiam za {wait_seconds}s..."
            )
            time.sleep(wait_seconds)

    raise RuntimeError("Generowanie obrazu nie powiodło się po wszystkich próbach.") from last_error


def extract_seed(response_data: Dict[str, Any]) -> int | None:
    info_raw = response_data.get("info")
    if isinstance(info_raw, str):
        try:
            info_parsed = json.loads(info_raw)
        except json.JSONDecodeError:
            info_parsed = None

        if isinstance(info_parsed, dict) and isinstance(info_parsed.get("seed"), int):
            return info_parsed["seed"]

    params = response_data.get("parameters")
    if isinstance(params, dict) and isinstance(params.get("seed"), int):
        return params["seed"]

    return None


def build_payload(asset: AssetSpec) -> Dict[str, Any]:
    return {
        "prompt": f"{asset.prompt}, {BASE_STYLE_PROMPT}",
        "negative_prompt": NEGATIVE_PROMPT,
        "sampler_name": asset.sampler_name,
        "steps": asset.steps,
        "cfg_scale": asset.cfg_scale,
        "width": asset.width,
        "height": asset.height,
        "seed": asset.seed,
        "batch_size": 1,
        "n_iter": 1,
        "restore_faces": False,
        "tiling": False,
    }


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ensure_api_available()

    manifest: list[Dict[str, Any]] = []
    print(f"[INFO] Start generowania {len(ASSETS)} ilustracji do: {OUTPUT_DIR}")

    for index, asset in enumerate(ASSETS, start=1):
        print(f"\n[INFO] ({index}/{len(ASSETS)}) Generowanie: {asset.filename} — {asset.title}")

        payload = build_payload(asset)
        response_data = request_txt2img(payload)

        image_b64 = sanitize_base64(response_data["images"][0])
        image_bytes = base64.b64decode(image_b64)

        output_path = OUTPUT_DIR / asset.filename
        output_path.write_bytes(image_bytes)

        used_seed = extract_seed(response_data)
        manifest_item = {
            "filename": asset.filename,
            "title": asset.title,
            "path": str(output_path.relative_to(Path(__file__).parent)),
            "seed": used_seed,
            "width": asset.width,
            "height": asset.height,
            "steps": asset.steps,
            "cfg_scale": asset.cfg_scale,
            "sampler_name": asset.sampler_name,
            "negative_prompt": NEGATIVE_PROMPT,
            "prompt": payload["prompt"],
        }
        manifest.append(manifest_item)

        print(f"[OK] Zapisano: {output_path.name} | seed={used_seed}")

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n[DONE] Manifest zapisany: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
