#!/usr/bin/env python3
"""
Generowanie ilustracji premium dla strony fundacji przez lokalne API Stable Diffusion.
Zgodne z meritum3/specyfikacja_SD.md.
"""

from __future__ import annotations

import base64
import json
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path


BASE_URL = "http://192.168.1.10:7891"
OUTPUT_DIR = Path("meritum3/assets/illustracje")
MANIFEST_PATH = OUTPUT_DIR / "manifest.json"

NEGATIVE_PROMPT = (
    "text, logo, watermark, blurry, low quality, artifacts, "
    "deformed face, distorted hands, extra fingers, bad anatomy"
)

COMMON_PARAMS = {
    "sampler_name": "Euler",
    "steps": 22,
    "cfg_scale": 6.5,
    "batch_size": 1,
    "n_iter": 1,
    "restore_faces": False,
    "tiling": False,
    "seed": -1,
}

BASE_STYLE = (
    "nonprofit foundation in Poland, premium editorial photography, "
    "natural cinematic light, modern clean composition, realistic, high detail"
)

ASSETS = [
    {
        "file": "01_hero_glowny.png",
        "section": "hero",
        "width": 1536,
        "height": 960,
        "prompt": (
            "community support meeting, diverse people, mentor helping family, "
            "warm hopeful atmosphere, modern interior, medium wide shot, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "02_o_fundacji.png",
        "section": "o-fundacji",
        "width": 1200,
        "height": 800,
        "prompt": (
            "foundation team collaborating at a round table, social workers and educators, "
            "documents and laptop, trust and professionalism, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "03_misja_wizja.png",
        "section": "misja-wizja",
        "width": 1200,
        "height": 800,
        "prompt": (
            "young people and mentors during educational workshop, growth mindset, "
            "future opportunities concept, bright natural light, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "04_obszar_wsparcie.png",
        "section": "obszar-wsparcie",
        "width": 1200,
        "height": 800,
        "prompt": (
            "social assistance consultation, empathetic counselor supporting family, "
            "calm office, authentic emotions, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "05_obszar_edukacja.png",
        "section": "obszar-edukacja",
        "width": 1200,
        "height": 800,
        "prompt": (
            "training classroom, adults learning digital skills, educator presenting, "
            "engaged participants, dynamic but clean scene, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "06_obszar_wyrownywanie.png",
        "section": "obszar-wyrownywanie",
        "width": 1200,
        "height": 800,
        "prompt": (
            "equal opportunities in education, children and teenagers studying with tutor, "
            "inclusive environment, supportive mood, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "07_obszar_badania.png",
        "section": "obszar-badania",
        "width": 1200,
        "height": 800,
        "prompt": (
            "research team analyzing social data, charts on screen, collaborative discussion, "
            "evidence based approach, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "08_darowizny.png",
        "section": "darowizny",
        "width": 1200,
        "height": 800,
        "prompt": (
            "hands passing donation box in charity event, community solidarity, "
            "close up cinematic frame, hope and kindness, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "09_wolontariat.png",
        "section": "wolontariat",
        "width": 1200,
        "height": 800,
        "prompt": (
            "volunteers preparing materials for social program, teamwork and engagement, "
            "modern nonprofit office, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "10_partnerstwo_b2b.png",
        "section": "partnerstwo-b2b",
        "width": 1200,
        "height": 800,
        "prompt": (
            "business and foundation representatives handshake during CSR partnership meeting, "
            "professional atmosphere, realistic scene, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "11_transparentnosc.png",
        "section": "transparentnosc",
        "width": 1000,
        "height": 1000,
        "prompt": (
            "transparent governance concept, documents, financial report folder, "
            "glass desk, trustworthy professional visual, "
            f"{BASE_STYLE}"
        ),
    },
    {
        "file": "12_kontakt_cta.png",
        "section": "kontakt-cta",
        "width": 1536,
        "height": 960,
        "prompt": (
            "friendly foundation consultant speaking with beneficiary, welcoming office reception, "
            "warm premium tone, call to action atmosphere, "
            f"{BASE_STYLE}"
        ),
    },
]


def post_json(url: str, payload: dict, timeout: int = 600) -> dict:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def generate_asset(asset: dict) -> dict:
    payload = {
        "prompt": asset["prompt"],
        "negative_prompt": NEGATIVE_PROMPT,
        "width": asset["width"],
        "height": asset["height"],
        **COMMON_PARAMS,
    }

    retries = 3
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            data = post_json(f"{BASE_URL}/sdapi/v1/txt2img", payload, timeout=900)
            images = data.get("images") or []
            if not images:
                raise RuntimeError("Brak obrazów w odpowiedzi API")

            img_b64 = images[0]
            if img_b64.startswith("data:") and "," in img_b64:
                img_b64 = img_b64.split(",", 1)[1]

            image_bytes = base64.b64decode(img_b64)
            target = OUTPUT_DIR / asset["file"]
            target.write_bytes(image_bytes)

            info_raw = data.get("info", "{}")
            info = {}
            if isinstance(info_raw, str):
                try:
                    info = json.loads(info_raw)
                except json.JSONDecodeError:
                    info = {"raw_info": info_raw}
            elif isinstance(info_raw, dict):
                info = info_raw

            return {
                "file": asset["file"],
                "section": asset["section"],
                "prompt": asset["prompt"],
                "negative_prompt": NEGATIVE_PROMPT,
                "width": asset["width"],
                "height": asset["height"],
                "sampler_name": COMMON_PARAMS["sampler_name"],
                "steps": COMMON_PARAMS["steps"],
                "cfg_scale": COMMON_PARAMS["cfg_scale"],
                "seed": info.get("seed"),
                "created_at": datetime.now().isoformat(timespec="seconds"),
            }

        except (urllib.error.URLError, TimeoutError, RuntimeError, ValueError) as err:
            last_error = err
            if attempt < retries:
                time.sleep(2)
            else:
                raise RuntimeError(f"Generacja '{asset['file']}' nieudana: {err}") from err

    raise RuntimeError(f"Generacja nieudana: {last_error}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    manifest = {
        "project": "Fundacja Instytut Badawczo-Edukacyjny Meritum",
        "nip": "9292059570",
        "api_base_url": BASE_URL,
        "generation_profile": {
            "sampler_name": COMMON_PARAMS["sampler_name"],
            "steps": COMMON_PARAMS["steps"],
            "cfg_scale": COMMON_PARAMS["cfg_scale"],
            "negative_prompt": NEGATIVE_PROMPT,
        },
        "assets": [],
    }

    for i, asset in enumerate(ASSETS, start=1):
        print(f"[{i}/{len(ASSETS)}] Generuję {asset['file']}...")
        meta = generate_asset(asset)
        manifest["assets"].append(meta)

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nZakończono. Manifest zapisany: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
