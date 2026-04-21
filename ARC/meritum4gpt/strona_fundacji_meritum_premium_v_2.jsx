import React, { useMemo, useState } from 'react';

export default function FoundationMeritumPremiumPage() {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const stats = [
    { value: '2021', label: 'rok rejestracji' },
    { value: 'Zielona Góra', label: 'siedziba fundacji' },
    { value: '3', label: 'publicznie widoczne obszary aktywności' },
  ];

  const pillars = [
    {
      title: 'Edukacja i rozwój',
      description:
        'Inicjatywy edukacyjne, działania rozwojowe i wsparcie kompetencji dla różnych grup wiekowych.',
      imagePlaceholder:
        'OBRAZEK DO TEJ SEKCJI: szerokokadrowe, bardzo wysokiej jakości zdjęcie przedstawiające nowoczesne warsztaty edukacyjne prowadzone w jasnej sali szkoleniowej. W kadrze 8–12 osób w różnym wieku, w tym młodzi dorośli i osoby 40+, siedzą przy stołach z laptopami, notatnikami i materiałami edukacyjnymi. Prowadzący stoi przy dużym ekranie z delikatnie widoczną prezentacją, ale bez czytelnych logotypów i bez tekstu możliwego do odczytania. Styl dokumentalny premium, naturalne światło dzienne wpadające z lewej strony, estetyka nowoczesnej organizacji pozarządowej, kolory stonowane: biel, beż, szarość, ciemna zieleń, subtelny akcent złamanej mięty. Kompozycja z miejscem oddechu, profesjonalna, wiarygodna, bez stockowego przesytu, lekko filmowy charakter, ostrość na uczestnikach i atmosferze współpracy.'
    },
    {
      title: 'Badania i diagnoza potrzeb',
      description:
        'Mapowanie potrzeb społecznych i praca projektowa oparta na analizie lokalnych wyzwań.',
      imagePlaceholder:
        'OBRAZEK DO TEJ SEKCJI: elegancka, editorialowa fotografia stołu roboczego zespołu badawczego fundacji. Na stole rozłożone anonimowe wydruki wykresów, map, karteczek z insightami, tablet z neutralnym interfejsem analitycznym, notatniki, długopisy i laptop. Wokół stołu widoczne 3–4 osoby analizujące materiały, pokazane częściowo: dłonie, sylwetki, fragmenty twarzy, bez dominującego portretu. Kadr z góry pod lekkim kątem, światło miękkie i profesjonalne, klimat strategicznego spotkania think-tanku społecznego. Kolorystyka premium: złamana biel, grafit, oliwka, subtelny granat. Zdjęcie ma sugerować rzetelność, analizę danych i pracę nad rozwiązaniami społecznymi, bez medycznych lub korporacyjnych skojarzeń.'
    },
    {
      title: 'Aktywność społeczna i wolontariat',
      description:
        'Budowanie zaangażowania społecznego poprzez projekty wolontariackie i współpracę z otoczeniem.',
      imagePlaceholder:
        'OBRAZEK DO TEJ SEKCJI: ciepła, autentyczna fotografia grupy wolontariuszy podczas działania w przestrzeni miejskiej lub społecznej. 6–10 osób, różny wiek, naturalna różnorodność, ubrania codzienne schludne, bez krzykliwych logotypów. Część grupy rozmawia z mieszkańcami lub wspólnie organizuje materiały na stoliku informacyjnym. W tle nowoczesna, zadbana przestrzeń lokalna: biblioteka, dom kultury, miejski dziedziniec albo przestrzeń kampusowa. Światło popołudniowe, dużo autentycznych emocji, uśmiechy, gesty współpracy, klimat odpowiedzialności społecznej. Styl reportażowy premium, wysoka wiarygodność, bez przesadnej inscenizacji.'
    },
  ];

  const highlights = [
    'Fundacja zarejestrowana w KRS jako aktywna organizacja pozarządowa.',
    'Publicznie widoczne działania związane z edukacją, diagnozą potrzeb społecznych i wolontariatem.',
    'Profil komunikacji wskazuje na wsparcie dzieci, młodzieży, dorosłych i seniorów.',
  ];

  const timeline = [
    {
      year: '2021',
      title: 'Rejestracja fundacji',
      description:
        'Rozpoczęcie działalności jako Instytut Badawczo-Edukacyjny Meritum w Zielonej Górze.',
    },
    {
      year: '2024/2025',
      title: 'Mapowanie potrzeb społecznych',
      description:
        'Organizacja pojawia się publicznie przy projekcie dotyczącym mapowania potrzeb społecznych w województwie lubuskim.',
    },
    {
      year: '2026',
      title: 'Wolontariat akademicki',
      description:
        'Widoczna publicznie oferta realizacji zadania „Wolontariat akademicki”.',
    },
  ];

  const contact = [
    ['Nazwa', 'Instytut Badawczo-Edukacyjny Meritum'],
    ['Forma prawna', 'Fundacja'],
    ['NIP', '9292059570'],
    ['KRS', '0000888222'],
    ['REGON', '388382819'],
    ['Adres', 'ul. Sowia 9, 65-507 Zielona Góra'],
  ];

  const heroImageDescription =
    'GŁÓWNY OBRAZEK HERO: panoramiczna fotografia premium do strony fundacji badawczo-edukacyjnej. Scena ma przedstawiać nowoczesne, inspirujące spotkanie społeczne lub edukacyjne w eleganckim, jasnym wnętrzu z dużymi oknami. W centrum kilka osób prowadzi rozmowę przy dużym stole, na którym leżą notatniki, laptop, dokumenty i filiżanki kawy. W tle subtelnie widoczne elementy przestrzeni organizacji: regały z książkami, rośliny, szkło, miękkie światło. Ludzie mają wyglądać naturalnie i profesjonalnie, jak zespół fundacji pracujący nad realnym projektem społecznym. Styl: luksusowy, nowoczesny, zaufany, minimalistyczny, bez przesadnej pozowanej estetyki. Kadrowanie szerokie, dużo przestrzeni po jednej stronie na tekst nagłówka, kolory stonowane: ciepła biel, jasny beż, szałwiowa zieleń, grafit, delikatne złote refleksy światła. Obraz powinien budzić poczucie kompetencji, sprawczości i społecznego wpływu.';

  const themeClasses = useMemo(() => {
    if (isDark) {
      return {
        page: 'bg-slate-950 text-white',
        glow1: 'bg-emerald-500/20',
        glow2: 'bg-cyan-500/15',
        glow3: 'bg-violet-500/10',
        shell: 'border-white/10 bg-white/5',
        card: 'border-white/10 bg-white/5',
        cardStrong: 'border-white/10 bg-slate-900/70',
        secondary: 'text-white/70',
        muted: 'text-white/45',
        soft: 'text-white/60',
        accent: 'text-emerald-300',
        accentBg: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200',
        solidBtn: 'bg-white text-slate-950',
        ghostBtn: 'border-white/15 text-white hover:bg-white/5',
        tile: 'border-white/8 bg-white/[0.03]',
        sectionAlt: 'bg-slate-900/60 border-white/10',
        contactWrap: 'from-emerald-300/15 via-white/5 to-cyan-300/10 border-white/10',
        innerContact: 'border-white/10 bg-slate-950/50',
        navItem: 'border-white/10 text-white/75 hover:border-emerald-300/40 hover:bg-white/5 hover:text-white',
        switcher: 'border-white/15 bg-white/5 text-white hover:bg-white/10',
      };
    }

    return {
      page: 'bg-slate-50 text-slate-900',
      glow1: 'bg-emerald-300/40',
      glow2: 'bg-cyan-300/30',
      glow3: 'bg-violet-300/20',
      shell: 'border-slate-200 bg-white/80',
      card: 'border-slate-200 bg-white/85',
      cardStrong: 'border-slate-200 bg-white',
      secondary: 'text-slate-600',
      muted: 'text-slate-500',
      soft: 'text-slate-600',
      accent: 'text-emerald-700',
      accentBg: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      solidBtn: 'bg-slate-900 text-white',
      ghostBtn: 'border-slate-300 text-slate-900 hover:bg-slate-100',
      tile: 'border-slate-200 bg-slate-50',
      sectionAlt: 'bg-white border-slate-200',
      contactWrap: 'from-emerald-100 via-white to-cyan-100 border-slate-200',
      innerContact: 'border-slate-200 bg-white/90',
      navItem: 'border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-slate-100 hover:text-slate-900',
      switcher: 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100',
    };
  }, [isDark]);

  return (
    <div className={`min-h-screen ${themeClasses.page} transition-colors duration-300 selection:bg-emerald-300/30`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 left-[-10%] h-80 w-80 rounded-full ${themeClasses.glow1} blur-3xl`} />
        <div className={`absolute top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full ${themeClasses.glow2} blur-3xl`} />
        <div className={`absolute bottom-0 left-1/3 h-72 w-72 rounded-full ${themeClasses.glow3} blur-3xl`} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <header className={`rounded-full border ${themeClasses.shell} px-4 py-3 backdrop-blur-xl`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className={`text-xs uppercase tracking-[0.35em] ${themeClasses.accent}`}>Fundacja</div>
              <div className="text-lg font-semibold">Instytut Badawczo-Edukacyjny Meritum</div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {['O nas', 'Obszary działań', 'Aktualności', 'Kontakt'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`rounded-full border px-4 py-2 transition ${themeClasses.navItem}`}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`rounded-full border px-4 py-2 font-medium transition ${themeClasses.switcher}`}
              >
                {isDark ? 'Tryb jasny' : 'Tryb ciemny'}
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-8 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <div className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] ${themeClasses.accentBg}`}>
              Premium NGO Website
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              Badania, edukacja i działania społeczne w nowoczesnej odsłonie.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${themeClasses.secondary} md:text-lg`}>
              Strona prezentująca publicznie dostępne informacje o fundacji oraz jej profilu działań: edukacyjnym,
              badawczym i społecznym. Układ został zaprojektowany tak, aby budować zaufanie, czytelnie komunikować
              misję i podkreślać profesjonalny charakter organizacji.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#kontakt" className={`rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] ${themeClasses.solidBtn}`}>
                Skontaktuj się
              </a>
              <a href="#o-nas" className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${themeClasses.ghostBtn}`}>
                Poznaj fundację
              </a>
            </div>
          </div>

          <div className={`rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl ${themeClasses.card}`}>
            <div className={`rounded-[1.5rem] border p-6 ${themeClasses.cardStrong}`}>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className={`text-sm ${themeClasses.muted}`}>Główny placeholder</div>
                  <div className="text-xl font-semibold">Opis obrazu hero</div>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs ${themeClasses.accentBg}`}>Premium visual</div>
              </div>

              <div className={`rounded-[1.25rem] border p-4 ${themeClasses.tile}`}>
                <div className={`text-xs uppercase tracking-[0.25em] ${themeClasses.accent}`}>Placeholder głównego zdjęcia</div>
                <p className={`mt-3 text-sm leading-7 ${themeClasses.secondary}`}>{heroImageDescription}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${themeClasses.card}`}>
              <div className="text-3xl font-semibold md:text-4xl">{item.value}</div>
              <div className={`mt-2 text-sm ${themeClasses.soft}`}>{item.label}</div>
            </div>
          ))}
        </section>

        <section id="o-nas" className="grid gap-8 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className={`text-sm uppercase tracking-[0.3em] ${themeClasses.accent}`}>O nas</div>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Fundacja z profilem badawczo-edukacyjnym i społecznym.</h2>
          </div>
          <div className={`space-y-6 text-base leading-8 ${themeClasses.secondary}`}>
            <p>
              Instytut Badawczo-Edukacyjny Meritum to fundacja z siedzibą w Zielonej Górze. Publicznie dostępne wzmianki
              wskazują na zaangażowanie organizacji w działania edukacyjne, społeczne oraz inicjatywy oparte na diagnozie
              potrzeb lokalnych społeczności.
            </p>
            <p>
              Wizerunek strony został pomyślany tak, by łączyć wiarygodność instytucji, nowoczesną komunikację oraz
              estetykę premium — przydatną zarówno w prezentacji partnerom, grantodawcom, jak i odbiorcom działań
              fundacji.
            </p>
          </div>
        </section>

        <section id="obszary-działań" className="py-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className={`text-sm uppercase tracking-[0.3em] ${themeClasses.accent}`}>Obszary działań</div>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Jaką wartość komunikuje ta strona</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className={`group rounded-[1.75rem] border p-6 transition hover:-translate-y-1 ${themeClasses.card}`}>
                <div className={`mb-5 rounded-[1.25rem] border p-4 ${themeClasses.tile}`}>
                  <div className={`text-xs uppercase tracking-[0.25em] ${themeClasses.accent}`}>Placeholder obrazka sekcji</div>
                  <p className={`mt-3 text-sm leading-7 ${themeClasses.secondary}`}>{pillar.imagePlaceholder}</p>
                </div>
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className={`mt-4 leading-7 ${themeClasses.secondary}`}>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`rounded-[2rem] border p-8 backdrop-blur-xl ${themeClasses.card}`}>
            <div className={`text-sm uppercase tracking-[0.3em] ${themeClasses.accent}`}>Dlaczego warto zaufać</div>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Przejrzystość, misja i nowoczesna prezentacja</h2>
            <div className="mt-8 grid gap-4">
              {highlights.map((item) => (
                <div key={item} className={`rounded-2xl border p-5 ${themeClasses.tile}`}>
                  <div className={themeClasses.secondary}>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] border p-8 ${themeClasses.sectionAlt}`}>
            <div className={`text-sm uppercase tracking-[0.3em] ${themeClasses.accent}`}>Dane rejestrowe</div>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Zweryfikowane informacje podstawowe</h2>
            <div className="mt-8 grid gap-3">
              {contact.map(([label, value]) => (
                <div key={label} className={`flex items-start justify-between gap-4 rounded-2xl border p-4 ${themeClasses.tile}`}>
                  <div className={`text-sm ${themeClasses.muted}`}>{label}</div>
                  <div className="max-w-[60%] text-right text-sm font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="aktualności" className="py-6">
          <div className="mb-8">
            <div className={`text-sm uppercase tracking-[0.3em] ${themeClasses.accent}`}>Kamienie milowe</div>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Widoczne publicznie etapy aktywności</h2>
          </div>

          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.title} className={`grid gap-4 rounded-[1.75rem] border p-6 md:grid-cols-[140px_1fr] ${themeClasses.card}`}>
                <div className="text-2xl font-semibold text-emerald-500">{item.year}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className={`mt-2 leading-7 ${themeClasses.secondary}`}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="kontakt" className="py-20">
          <div className={`rounded-[2.25rem] border bg-gradient-to-br p-8 md:p-10 ${themeClasses.contactWrap}`}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className={`text-sm uppercase tracking-[0.3em] ${themeClasses.accent}`}>Kontakt</div>
                <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Zadbajmy o profesjonalną obecność fundacji online</h2>
                <p className={`mt-5 max-w-2xl leading-8 ${themeClasses.secondary}`}>
                  Poniżej znajduje się sekcja kontaktowa oparta na publicznie dostępnych danych rejestrowych. Można ją
                  rozbudować o formularz, mapę, adres e-mail, numer telefonu i profile społecznościowe po ich potwierdzeniu.
                </p>
              </div>

              <div className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${themeClasses.innerContact}`}>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className={themeClasses.muted}>Fundacja</div>
                    <div className="mt-1 font-medium">Instytut Badawczo-Edukacyjny Meritum</div>
                  </div>
                  <div>
                    <div className={themeClasses.muted}>Adres</div>
                    <div className="mt-1 font-medium">ul. Sowia 9, 65-507 Zielona Góra</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`rounded-2xl border p-4 ${themeClasses.tile}`}>
                      <div className={themeClasses.muted}>NIP</div>
                      <div className="mt-1 font-medium">9292059570</div>
                    </div>
                    <div className={`rounded-2xl border p-4 ${themeClasses.tile}`}>
                      <div className={themeClasses.muted}>KRS</div>
                      <div className="mt-1 font-medium">0000888222</div>
                    </div>
                    <div className={`rounded-2xl border p-4 ${themeClasses.tile}`}>
                      <div className={themeClasses.muted}>REGON</div>
                      <div className="mt-1 font-medium">388382819</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
