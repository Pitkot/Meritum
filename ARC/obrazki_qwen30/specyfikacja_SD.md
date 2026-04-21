# Specyfikacja deweloperska
## Lokalny Stable Diffusion (AUTOMATIC1111 / SD WebUI API)

Wersja dokumentu: 1.0  
Data: 2026-04-19  
Środowisko docelowe: lokalny serwer API pod `http://192.168.1.10:7891`

---

## 1) Cel dokumentu

Ten dokument opisuje, jak technicznie i metodycznie generować obrazy przez lokalne Stable Diffusion API:
- sposób komunikacji z API,
- dostępne endpointy i parametry,
- rekomendowane ustawienia jakościowe,
- metodykę promptowania dla produkcyjnych assetów (np. do strony WWW).

Dokument jest przygotowany pod workflow deweloperski (automatyzacja, powtarzalność, wersjonowanie).

---

## 2) Architektura komunikacji

### 2.1 Protokół
- **HTTP/1.1**
- **JSON request/response**
- Typowe nagłówki:
  - `Content-Type: application/json`
  - `Accept: application/json`

### 2.2 Bazowy URL
- `http://192.168.1.10:7891`

### 2.3 Najważniejsze endpointy produkcyjne

#### Generowanie
- `POST /sdapi/v1/txt2img` — generowanie z promptu tekstowego
- `POST /sdapi/v1/img2img` — generowanie na bazie obrazu wejściowego

#### Post-processing / metadane
- `POST /sdapi/v1/png-info` — odczyt metadanych z PNG
- `POST /sdapi/v1/extra-single-image` — upscale/fix jednej grafiki
- `POST /sdapi/v1/extra-batch-images` — batch post-processing

#### Monitoring i kontrola
- `GET /sdapi/v1/progress` — status postępu aktualnej generacji
- `POST /sdapi/v1/interrupt` — przerwanie aktualnej generacji
- `POST /sdapi/v1/skip` — pominięcie aktualnego kroku/zadania

#### Konfiguracja i zasoby
- `GET /sdapi/v1/options` / `POST /sdapi/v1/options`
- `GET /sdapi/v1/samplers`
- `GET /sdapi/v1/schedulers`
- `GET /sdapi/v1/sd-models`
- `GET /sdapi/v1/sd-vae`
- `GET /sdapi/v1/upscalers`
- `GET /sdapi/v1/cmd-flags`

#### Diagnostyka
- `GET /sdapi/v1/memory`
- `GET /internal/ping`

---

## 3) Kontrakt API — request/response

### 3.1 `POST /sdapi/v1/txt2img`

#### Minimalny request
```json
{
  "prompt": "professional editorial photo, nonprofit workshop, premium style",
  "steps": 20,
  "width": 768,
  "height": 512
}
```

#### Produkcyjny request (rekomendowany)
```json
{
  "prompt": "community education workshop, premium editorial photography, natural cinematic light, realistic, high detail",
  "negative_prompt": "text, logo, watermark, blurry, low quality, artifacts",
  "sampler_name": "Euler",
  "steps": 20,
  "cfg_scale": 6.5,
  "width": 768,
  "height": 512,
  "seed": -1,
  "batch_size": 1,
  "n_iter": 1,
  "restore_faces": false,
  "tiling": false
}
```

#### Typowy response
```json
{
  "images": ["<base64_png>"],
  "parameters": {"...": "..."},
  "info": "{...json-string...}"
}
```

> `images` zawiera base64 (często bez prefixu `data:image/png;base64,`).

---

### 3.2 `POST /sdapi/v1/img2img`

Kluczowe różnice względem `txt2img`:
- wymagane `init_images` (base64),
- ważny parametr `denoising_strength` (zwykle `0.25–0.75`),
- możliwe maskowanie/inpainting (`mask`, `inpaint_full_res`, itd.).

Przykład:
```json
{
  "prompt": "same scene, cleaner composition, premium editorial",
  "negative_prompt": "blurry, artifacts",
  "init_images": ["<base64_png>"],
  "denoising_strength": 0.45,
  "steps": 22,
  "cfg_scale": 6,
  "sampler_name": "Euler",
  "width": 768,
  "height": 512
}
```

---

### 3.3 `GET /sdapi/v1/progress`

Przykładowy response:
```json
{
  "progress": 0.41,
  "eta_relative": 12.3,
  "state": {"job_count": 1, "job_no": 0, "sampling_step": 8, "sampling_steps": 20},
  "current_image": "<base64_png_optional>",
  "textinfo": "..."
}
```

---

## 4) Parametry i ustawienia (najważniejsze)

### 4.1 Parametry jakości i stylu

- `prompt` *(string)* — opis, co ma być wygenerowane.
- `negative_prompt` *(string)* — czego unikać.
- `steps` *(int)* — liczba kroków samplingu.
  - 12–18: szybki preview
  - 20–30: produkcja www
- `cfg_scale` *(float)* — siła trzymania promptu.
  - 5.5–7.5: najczęściej najlepszy zakres dla realistycznych scen
- `sampler_name` *(string)* — np. `Euler`, `DPM++`.

### 4.2 Parametry kompozycji

- `width`, `height` *(int)* — rozdzielczość wyjściowa.
- `batch_size` *(int)* — ile obrazów naraz.
- `n_iter` *(int)* — ile iteracji batcha.

### 4.3 Powtarzalność

- `seed` *(int)*:
  - `-1`: losowy,
  - stała wartość: reprodukowalny wynik.
- `subseed`, `subseed_strength` — warianty wokół bazowego seeda.

### 4.4 Parametry `img2img`

- `init_images` *(array[base64])* — obraz wejściowy.
- `denoising_strength` *(0..1)*
  - 0.2–0.35: delikatny retusz,
  - 0.4–0.6: kontrolowana zmiana,
  - >0.7: mocna transformacja.

### 4.5 Konfiguracja globalna

- `GET/POST /sdapi/v1/options` — odczyt/zmiana ustawień runtime (model, VAE itd.).

---

## 5) Rekomendowane profile generowania

### Profil A — szybki podgląd
- `steps: 12`
- `cfg_scale: 6`
- `sampler_name: Euler`

### Profil B — produkcja web premium (domyślny)
- `steps: 20–24`
- `cfg_scale: 6–7`
- `sampler_name: Euler`
- `negative_prompt` z blokadą artefaktów i napisów

### Profil C — retusz/utrzymanie stylu przez img2img
- `denoising_strength: 0.35–0.55`

---

## 6) Metodyka promptowania

### 6.1 Struktura promptu

Kolejność zalecana:
1. Temat/scena,
2. Kontekst,
3. Styl,
4. Światło i klimat,
5. Kompozycja,
6. Jakość techniczna.

Przykład:
```text
community education workshop, diverse participants, modern interior,
premium editorial photography, natural cinematic light,
medium shot, clean composition, realistic, high detail
```

### 6.2 Negative prompt (bazowy)

```text
text, logo, watermark, blurry, low quality, artifacts, deformed face, distorted hands
```

### 6.3 Iteracyjna metoda pracy

1. V1 prompt i 4–6 wariantów.
2. Selekcja najlepszego kierunku.
3. Korekta promptu.
4. Stabilizacja `seed`.
5. Finalna produkcja i ewentualny img2img.

### 6.4 Spójność serii obrazów

- stały base style prompt,
- podobny zakres `steps/cfg/sampler`,
- spójne proporcje i kadrowanie,
- jednolita paleta i klimat.

---

## 7) Przykłady komunikacji

### 7.1 cURL — txt2img
```bash
curl -s -X POST "http://192.168.1.10:7891/sdapi/v1/txt2img" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "community workshop, premium editorial, realistic",
    "negative_prompt": "text, logo, watermark, blurry",
    "steps": 20,
    "cfg_scale": 6.5,
    "sampler_name": "Euler",
    "width": 768,
    "height": 512,
    "seed": -1
  }'
```

### 7.2 Python (requests) — txt2img + zapis PNG
```python
import base64, requests
from pathlib import Path

url = "http://192.168.1.10:7891/sdapi/v1/txt2img"
payload = {
    "prompt": "community workshop, premium editorial, realistic",
    "negative_prompt": "text, logo, watermark, blurry",
    "steps": 20,
    "cfg_scale": 6.5,
    "sampler_name": "Euler",
    "width": 768,
    "height": 512,
    "seed": -1
}

r = requests.post(url, json=payload, timeout=600)
r.raise_for_status()
data = r.json()

img_b64 = data["images"][0]
if img_b64.startswith("data:") and "," in img_b64:
    img_b64 = img_b64.split(",", 1)[1]

Path("output.png").write_bytes(base64.b64decode(img_b64))
```

---

## 8) Obsługa błędów i niezawodność

Rekomendacje:
- timeouty 300–900 s dla generacji,
- retry 2–3 razy dla błędów sieci,
- walidacja response (`images` niepuste),
- logowanie seeda i parametrów.

Typowe problemy:
- 4xx: błędny payload,
- 5xx: przeciążenie/awaria backendu,
- timeout: zbyt ciężkie ustawienia lub ograniczenia sprzętowe,
- artefakty: korekta promptu/negative promptu/steps/cfg/modelu.

---

## 9) Standard produkcyjny dla assetów WWW

### 9.1 Nazewnictwo
- numer + sekcja + temat, np. `01_hero_glowny.png`.

### 9.2 Proporcje
- hero/projekty/aktualności/CTA: `16:10` lub `3:2`,
- dashboardy: `4:3`,
- dokumenty i ikony: `1:1`.

### 9.3 Checklista jakości
- brak tekstu/watermarków,
- brak deformacji twarzy/rąk,
- spójny styl i kolorystyka,
- poprawny kontrast pod overlay,
- zgodność kadru z docelowym kontenerem (`object-cover`).

---

## 10) Podsumowanie

1. Utrzymuj stały base style prompt dla całej serii.  
2. Pracuj iteracyjnie: preview → selekcja → final.  
3. Dla web premium: `steps 20–24`, `cfg 6–7`, `Euler`, sensowny `negative_prompt`.  
4. Loguj `seed` i parametry dla reprodukowalności.  
5. Traktuj API jako pipeline: generacja → kontrola jakości → zapis → mapowanie do frontendu.
