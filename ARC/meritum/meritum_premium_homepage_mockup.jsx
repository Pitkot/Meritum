export default function MeritumPremiumHomepageMockup() {
  const stats = [
    { value: '25+', label: 'projektów społeczno-edukacyjnych' },
    { value: '10 000+', label: 'odbiorców działań i wydarzeń' },
    { value: '40+', label: 'partnerów samorządowych i eksperckich' },
  ];

  const initiatives = [
    {
      title: 'Edukacja i rozwój kompetencji',
      text: 'Programy szkoleniowe, warsztaty, mentoring oraz inicjatywy wspierające rozwój społeczny, zawodowy i obywatelski.',
    },
    {
      title: 'Integracja społeczna i wsparcie',
      text: 'Działania dla seniorów, osób z niepełnosprawnościami, rodzin, cudzoziemców i osób zagrożonych wykluczeniem.',
    },
    {
      title: 'Zdrowie, innowacje i partnerstwa',
      text: 'Projekty z obszaru promocji zdrowia, współpracy międzysektorowej oraz inicjatyw rozwojowych o wysokiej wartości społecznej.',
    },
  ];

  const projects = [
    {
      category: 'Projekt flagowy',
      title: 'Akademia Kompetencji Lokalnych',
      text: 'Kompleksowy program szkoleń, doradztwa i aktywizacji dla mieszkańców regionu, realizowany z partnerami publicznymi i społecznymi.',
    },
    {
      category: 'Program społeczny',
      title: 'Centrum Wsparcia i Integracji',
      text: 'Cykl działań integracyjnych, animacyjnych i konsultacyjnych dla grup wymagających dedykowanego wsparcia.',
    },
    {
      category: 'Inicjatywa edukacyjna',
      title: 'Laboratorium Innowacji Społecznych',
      text: 'Przestrzeń testowania nowych rozwiązań edukacyjnych i społecznych z udziałem ekspertów, praktyków i partnerów lokalnych.',
    },
  ];

  const news = [
    {
      date: 'Kwiecień 2026',
      title: 'Start nowego programu szkoleniowego dla społeczności lokalnych',
    },
    {
      date: 'Marzec 2026',
      title: 'Nabór partnerów do wspólnych projektów edukacyjnych i społecznych',
    },
    {
      date: 'Luty 2026',
      title: 'Publikacja raportu z działań i efektów społecznych fundacji',
    },
  ];

  const documents = [
    'Statut fundacji',
    'Sprawozdania i dokumenty formalne',
    'Polityka prywatności i RODO',
    'Zasady współpracy z partnerami i darczyńcami',
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <header className="sticky top-0 z-20 mb-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-white/60">Instytut Badawczo-Edukacyjny MERITUM</div>
              <div className="mt-1 text-xl font-semibold">Makieta strony premium</div>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-white/80">
              <a className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/10" href="#misja">O fundacji</a>
              <a className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/10" href="#projekty">Projekty</a>
              <a className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/10" href="#aktualnosci">Aktualności</a>
              <a className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/10" href="#dokumenty">Transparentność</a>
              <a className="rounded-full bg-white px-4 py-2 font-medium text-neutral-900" href="#kontakt">Współpraca</a>
            </nav>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl lg:p-12">
            <div className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
              Fundacja • Edukacja • Rozwój • Wpływ społeczny
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight lg:text-6xl">
              Strona, która buduje zaufanie, prestiż i realne zaangażowanie wokół misji fundacji.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 lg:text-lg">
              Premium wizerunek dla nowoczesnej organizacji społeczno-edukacyjnej: elegancka narracja, czytelna transparentność, silna ekspozycja projektów i profesjonalne narzędzia do współpracy z partnerami, grantodawcami i darczyńcami.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 font-medium text-neutral-900 shadow-lg shadow-white/10">Poznaj nasze projekty</button>
              <button className="rounded-full border border-white/15 px-6 py-3 font-medium text-white">Zostań partnerem</button>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-2xl font-semibold">{item.value}</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-neutral-900 p-5 shadow-2xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-neutral-800 to-neutral-900 p-5">
              <div className="mb-4 aspect-[4/3] rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-5">
                <div className="flex h-full flex-col justify-between rounded-[1rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Hero visual</span>
                    <span>premium editorial</span>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold leading-tight">Fotografia lub kolaż działań fundacji</div>
                    <div className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                      Rekomendowany obraz: autentyczne zdjęcia uczestników projektów, edukacji, spotkań eksperckich i wydarzeń terenowych, obrobione w spójnym stylu premium.
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-2xl border border-white/10 bg-white/5" />
                    <div className="h-16 rounded-2xl border border-white/10 bg-white/5" />
                    <div className="h-16 rounded-2xl border border-white/10 bg-white/5" />
                  </div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">Zaufanie</div>
                  <div className="mt-2 text-lg font-medium">Transparentność i dokumenty</div>
                  <div className="mt-2 text-sm text-white/65">Wyraźnie widoczne podstawy prawne, sprawozdania i dane rejestrowe.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">Współpraca</div>
                  <div className="mt-2 text-lg font-medium">Partnerstwa i granty</div>
                  <div className="mt-2 text-sm text-white/65">Sekcje projektowe przygotowane pod instytucje i partnerów strategicznych.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="misja" className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.28em] text-white/50">O fundacji</div>
            <h2 className="mt-4 text-3xl font-semibold">Silna misja opowiedziana językiem jakości i wiarygodności.</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Sekcja powinna łączyć narrację społeczną z profesjonalnym wizerunkiem organizacji. Treść pokazuje sens działania, kompetencje zespołu oraz skalę wpływu. Układ premium opiera się na klarownych blokach treści, zdjęciach o wysokiej jakości i wyważonej typografii.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {initiatives.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-neutral-900 p-6">
                <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />
                <h3 className="mt-5 text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projekty" className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-white/50">Projekty i programy</div>
              <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">Eksponowanie projektów w stylu instytucjonalnym i premium.</h2>
            </div>
            <button className="w-fit rounded-full border border-white/15 px-5 py-3 text-sm font-medium">Zobacz wszystkie projekty</button>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {projects.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900">
                <div className="aspect-[16/10] bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))]" />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">{item.category}</div>
                  <h3 className="mt-3 text-2xl font-medium leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
                  <div className="mt-5 text-sm font-medium text-white">Czytaj więcej →</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-neutral-900 p-8">
            <div className="text-xs uppercase tracking-[0.28em] text-white/50">Wpływ i liczby</div>
            <h2 className="mt-4 text-3xl font-semibold">Sekcja efektów społecznych i danych, która wzmacnia zaufanie.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                'Liczba uczestników projektów',
                'Zakres partnerstw i współpracy',
                'Najważniejsze rezultaty i wskaźniki',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-4 h-24 rounded-2xl border border-white/10 bg-black/20" />
                  <div className="text-sm leading-6 text-white/70">{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.28em] text-white/50">Darowizny i wsparcie</div>
            <h2 className="mt-4 text-3xl font-semibold">Elegancki moduł wsparcia bez poczucia nachalności.</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Sekcja premium powinna subtelnie, ale skutecznie tłumaczyć, jak można wesprzeć fundację: finansowo, rzeczowo, ekspercko lub partnersko. CTA musi być jasne, a formularz prosty i bezpieczny.
            </p>
            <div className="mt-6 space-y-3">
              {['Wpłać darowiznę', 'Zostań partnerem projektu', 'Skontaktuj się w sprawie współpracy'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-neutral-900 px-5 py-4 text-sm text-white/80">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="aktualnosci" className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.28em] text-white/50">Aktualności</div>
            <h2 className="mt-4 text-3xl font-semibold">Komunikacja bieżących działań i wydarzeń.</h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Aktualności powinny być przedstawione jako starannie zaprojektowane karty redakcyjne. Wizerunek premium wymaga jakościowych zdjęć, spójnych nagłówków i przejrzystej narracji informacyjnej.
            </p>
          </div>
          <div className="grid gap-4">
            {news.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-neutral-900 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-white/45">{item.date}</div>
                <div className="mt-3 text-xl font-medium">{item.title}</div>
                <div className="mt-4 h-px bg-white/10" />
                <div className="mt-4 text-sm text-white/70">Lead aktualności, zdjęcie, krótki opis, CTA do pełnego wpisu.</div>
              </div>
            ))}
          </div>
        </section>

        <section id="dokumenty" className="mt-8 rounded-[2rem] border border-white/10 bg-neutral-900 p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-white/50">Transparentność</div>
              <h2 className="mt-4 text-3xl font-semibold">Dokumenty i wiarygodność wyeksponowane w sposób prestiżowy.</h2>
              <p className="mt-5 text-base leading-8 text-white/72">
                To kluczowy blok dla fundacji. Powinien zawierać dokumenty formalne, dane rejestrowe, informacje o zarządzie, zasadach przetwarzania danych oraz przejrzyste ścieżki pobierania materiałów PDF.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {documents.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-medium">{item}</div>
                      <div className="mt-2 text-sm leading-6 text-white/65">Opis dokumentu, data publikacji, przycisk pobrania.</div>
                    </div>
                    <div className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/70">PDF</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="mt-8 grid gap-6 pb-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 lg:p-10">
            <div className="text-xs uppercase tracking-[0.28em] text-white/50">Kontakt i współpraca</div>
            <h2 className="mt-4 text-3xl font-semibold lg:text-4xl">Finał strony zaprojektowany pod rozmowę i konwersję.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Ostatnia sekcja powinna zbierać wszystkie ścieżki kontaktu: formularz, dane fundacji, adres, e-mail, telefon, social media i zaproszenie do współpracy przy projektach, badaniach oraz działaniach edukacyjnych.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 font-medium text-neutral-900">Napisz do nas</button>
              <button className="rounded-full border border-white/15 px-6 py-3 font-medium text-white">Pobierz prezentację fundacji</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6">
            <div className="grid gap-4">
              {['Imię i nazwisko', 'Adres e-mail', 'Temat wiadomości', 'Treść wiadomości'].map((field, index) => (
                <div
                  key={field}
                  className={`rounded-2xl border border-white/10 bg-white/5 px-5 ${index === 3 ? 'py-8' : 'py-4'} text-sm text-white/45`}
                >
                  {field}
                </div>
              ))}
              <button className="rounded-2xl bg-white px-5 py-4 font-medium text-neutral-900">Wyślij wiadomość</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
