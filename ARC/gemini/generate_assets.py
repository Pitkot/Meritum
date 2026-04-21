#!/usr/bin/env python3
"""
Generator ilustracji premium dla strony fundacji (katalog: gemini/assets/illustracje)
zgodny ze specyfikacją: gemini/specyfikacja_SD.md

Wymagania:
- lokalny SD WebUI API dostępny pod: http://192.168.1.10:7891
- Python 3 + requests

Uruchomienie:
    python3 gemini/generate_assets.py
"""

from __future__ import annotations

import base64
import json
import time
from pathlib import Path
from typing import Any, Dict, List

import requests


BASE_URL = "http://192.168.1.10:7891"
TXT2IMG_URL = f"{BASE_URL}/sdapi/v1/txt2img"
PING_URL = f"{BASE_URL}/internal/ping"

OUTPUT_DIR = Path("gemini/assets/illustracje")
MANIFEST_PATH = OUTPUT_DIR / "manifest.json"

DEFAULT_NEGATIVE_PROMPT = (
    "text, logo, watermark, blurry, low quality, artifacts, "
    "deformed face, distorted hands, extra fingers, jpeg artifacts, "
    "overexposed, underexposed"
)

BASE_STYLE_PROMPT = (
    "premium editorial photography, realistic, high detail, "
    "natural cinematic light, clean composition, depth of field"
)

# Nazewnictwo i proporcje zgodnie z dokumentem:
# - hero / projekty / aktualności / CTA: 16:10
# - wybrane elementy mini: 3:2
ASSETS: List[Dict[str, Any]] = [
    {
        "file": "01_hero_glowny.png",
        "width": 1280,
        "height": 800,
        "prompt": "community education workshop, diverse families and mentors in modern learning space, hopeful atmosphere",
    },
    {
        "file": "02_hero_miniatura_1.png",
        "width": 768,
        "height": 512,
        "prompt": "mentor speaking with teenage participants during interactive class, social impact nonprofit scene",
    },
    {
        "file": "03_hero_miniatura_2.png",
        "width": 768,
        "height": 512,
        "prompt": "family counseling session in bright modern office, trust and empathy, educational foundation",
    },
    {
        "file": "04_hero_miniatura_3.png",
        "width": 768,
        "height": 512,
        "prompt": "youth innovation workshop, teamwork around digital tablet and notes, dynamic social program",
    },
    {
        "file": "05_o_fundacji.png",
        "width": 1280,
        "height": 800,
        "prompt": "foundation team in strategic planning session, nonprofit experts discussing impact map",
    },
    {
        "file": "06_filar_wsparcie.png",
        "width": 1280,
        "height": 800,
        "prompt": "social worker supporting family in community center, compassionate realistic documentary mood",
    },
    {
        "file": "07_filar_edukacja.png",
        "width": 1280,
        "height": 800,
        "prompt": "educational mentoring session for children and teenagers, premium editorial nonprofit scene",
    },
    {
        "file": "08_filar_badania.png",
        "width": 1280,
        "height": 800,
        "prompt": "research team analyzing social data dashboard, educational policy lab, modern interior",
    },
    {
        "file": "09_filar_innowacje.png",
        "width": 1280,
        "height": 800,
        "prompt": "social innovation lab workshop, diverse team prototyping community services",
    },
    {
        "file": "10_projekt_akademia.png",
        "width": 1280,
        "height": 800,
        "prompt": "flagship family academy program, coaching and communication training session",
    },
    {
        "file": "11_projekt_centrum.png",
        "width": 1280,
        "height": 800,
        "prompt": "community support center reception with counselor and families, welcoming atmosphere",
    },
    {
        "file": "12_projekt_laboratorium.png",
        "width": 1280,
        "height": 800,
        "prompt": "local innovation laboratory workshop, collaborative design thinking with educators",
    },
    {
        "file": "13_wsparcie_darowizny.png",
        "width": 1280,
        "height": 800,
        "prompt": "donor meeting with nonprofit team, transparent impact presentation, premium visual",
    },
    {
        "file": "14_aktualnosc_raport.png",
        "width": 1280,
        "height": 800,
        "prompt": "public presentation of social impact report, audience and projected charts, professional scene",
    },
    {
        "file": "15_kontakt_cta.png",
        "width": 1280,
        "height": 800,
        "prompt": "partnership meeting handshake between nonprofit foundation and business representative",
    },
]


def check_api_online(timeout: int = 20) -> None:
    response = requests.get(PING_URL, timeout=timeout)
    response.raise_for_status()


def parse_info_blob(info_blob: str) -> Dict[str, Any]:
    if not info_blob:
        return {}
    try:
        return json.loads(info_blob)
    except json.JSONDecodeError:
        return {"raw": info_blob}


def decode_image(image_b64: str) -> bytes:
    clean = image_b64.split(",", 1)[1] if image_b64.startswith("data:") and "," in image_b64 else image_b64
    return base64.b64decode(clean)


def build_payload(asset: Dict[str, Any]) -> Dict[str, Any]:
    prompt = f"{asset['prompt']}, {BASE_STYLE_PROMPT}"
    return {
        "prompt": prompt,
        "negative_prompt": DEFAULT_NEGATIVE_PROMPT,
        "sampler_name": "Euler",
        "steps": 22,
        "cfg_scale": 6.5,
        "width": asset["width"],
        "height": asset["height"],
        "seed": -1,
        "batch_size": 1,
        "n_iter": 1,
        "restore_faces": False,
        "tiling": False,
    }


def request_image(payload: Dict[str, Any], retries: int = 3) -> Dict[str, Any]:
    last_exc: Exception | None = None

    for attempt in range(1, retries + 1):
        try:
            response = requests.post(TXT2IMG_URL, json=payload, timeout=900)
            response.raise_for_status()
            data = response.json()
            images = data.get("images") or []
            if not images:
                raise ValueError("API zwróciło pustą listę 'images'.")
            return data
        except Exception as exc:  # pylint: disable=broad-except
            last_exc = exc
            if attempt < retries:
                wait_seconds = 2 * attempt
                print(f"⚠️ Próba {attempt}/{retries} nieudana: {exc}. Ponawiam za {wait_seconds}s...")
                time.sleep(wait_seconds)
            else:
                break

    raise RuntimeError(f"Nie udało się wygenerować obrazu po {retries} próbach.") from last_exc


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("🔎 Sprawdzam dostępność API...")
    check_api_online()
    print("✅ API jest dostępne.")

    manifest: Dict[str, Any] = {
        "generated_at": int(time.time()),
        "base_url": BASE_URL,
        "profile": {
            "sampler_name": "Euler",
            "steps": 22,
            "cfg_scale": 6.5,
            "negative_prompt": DEFAULT_NEGATIVE_PROMPT,
            "base_style_prompt": BASE_STYLE_PROMPT,
        },
        "assets": [],
    }

    for idx, asset in enumerate(ASSETS, start=1):
        payload = build_payload(asset)
        filename = asset["file"]
        output_path = OUTPUT_DIR / filename

        print(f"🎨 [{idx}/{len(ASSETS)}] Generuję: {filename}")
        data = request_image(payload)

        image_bytes = decode_image(data["images"][0])
        output_path.write_bytes(image_bytes)

        info = parse_info_blob(data.get("info", ""))
        seed_value = payload["seed"]
        if isinstance(info, dict):
            if isinstance(info.get("seed"), int):
                seed_value = info.get("seed")
            elif isinstance(info.get("all_seeds"), list) and info["all_seeds"]:
                seed_value = info["all_seeds"][0]

        manifest["assets"].append(
            {
                "file": filename,
                "width": asset["width"],
                "height": asset["height"],
                "prompt": payload["prompt"],
                "negative_prompt": payload["negative_prompt"],
                "seed": seed_value,
                "steps": payload["steps"],
                "cfg_scale": payload["cfg_scale"],
                "sampler_name": payload["sampler_name"],
            }
        )
        print(f"✅ Zapisano: {output_path}")

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n📦 Gotowe. Zapisano manifest: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
