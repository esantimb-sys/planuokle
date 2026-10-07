// Supplement planner data (lt)

export const TIME_BLOCKS = [
  { id: "rytas", label: "Rytas", time: "07:00–09:00", desc: "Po pabudimo / su pusryčiais", icon: "Sunrise" },
  { id: "pietus", label: "Per pietus", time: "12:00–14:00", desc: "Su pietumis", icon: "Sun" },
  { id: "pries-treniruote", label: "Prieš treniruotę", time: "30–45 min prieš", desc: "Tuščiu skrandžiu / lengvas užkandis", icon: "Dumbbell" },
  { id: "po-treniruotes", label: "Po treniruotės", time: "0–60 min po", desc: "Atsistatymo langas", icon: "Activity" },
  { id: "vakaras", label: "Vakaras", time: "18:00–20:00", desc: "Su vakariene", icon: "Moon" },
  { id: "pries-miega", label: "Prieš miegą", time: "30–60 min prieš", desc: "Nusiraminimui ir miegui", icon: "BedDouble" },
];

export const BLOCK_OPTIONS = [
  { value: "rytas", label: "Rytas" },
  { value: "pietus", label: "Pietūs" },
  { value: "pries-treniruote", label: "Prieš treniruotę" },
  { value: "po-treniruotes", label: "Po treniruotės" },
  { value: "vakaras", label: "Vakaras" },
  { value: "pries-miega", label: "Prieš miegą" },
];

// stomach: "food" | "empty" | "any"
export const SUPPLEMENTS = [
  // ---- Kategorija 1 ----
  { id: "magnis-glicinatas", cat: 1, name: "Magnis Bisglicinatas / Tauratas", block: "pries-miega", stomach: "any", irritant: false, childBlocked: false,
    doses: { vyras: "350–400 mg", moteris: "300–320 mg", vaikas: "80–120 mg" },
    note: "Glicino ir taurato formos gerai įsisavinamos, ramina nervų sistemą (GABA), gerina miego kokybę ir raumenų atsipalaidavimą." },
  { id: "magnis-malatas", cat: 1, name: "Magnis Malatas", block: "rytas", stomach: "any", irritant: false, childBlocked: false,
    doses: { vyras: "300–400 mg", moteris: "300 mg", vaikas: "80–120 mg" },
    note: "Malatas dalyvauja energijos (Krebso) cikle – tinka dienos tonusui ir raumenų funkcijai." },
  { id: "gelezis", cat: 1, name: "Geležis (Bisglicinatas)", block: "rytas", stomach: "empty", irritant: true, childBlocked: false,
    doses: { vyras: "Tik esant deficitui (konsultuokitės)", moteris: "18 mg", vaikas: "7–10 mg (atsargiai)" },
    note: "Geriausiai įsisavinama su vitaminu C tuščiu skrandžiu. Konkuruoja su kalciu ir cinku – atskirkite dozes." },
  { id: "d3k2", cat: 1, name: "Vitaminas D3 + K2", block: "rytas", stomach: "food", irritant: false, childBlocked: false,
    doses: { vyras: "2000–4000 UI", moteris: "2000–4000 UI", vaikas: "600–1000 UI" },
    note: "Riebaluose tirpus – vartoti su maistu, turinčiu riebalų. K2 nukreipia kalcį į kaulus, ne į arterijas." },
  { id: "cinkas", cat: 1, name: "Cinkas (Pikolinatas / Bisglicinatas)", block: "vakaras", stomach: "food", irritant: true, childBlocked: false,
    doses: { vyras: "15 mg", moteris: "8–10 mg", vaikas: "5 mg" },
    note: "Tuščiu skrandžiu gali sukelti pykinimą. Ilgalaikiam vartojimui derinkite su variu." },
  { id: "b-kompleksas", cat: 1, name: "B grupės vitaminai (Metilinti)", block: "rytas", stomach: "food", irritant: false, childBlocked: false,
    doses: { vyras: "1 porcija", moteris: "1 porcija", vaikas: "Pagal amžių" },
    note: "Metilintos formos (B12, folatas) geriau įsisavinamos. Gali energizuoti – vartoti ryte." },
  { id: "omega3", cat: 1, name: "Žuvų taukai (Omega-3: EPA / DHA)", block: "pietus", stomach: "food", irritant: false, childBlocked: false,
    doses: { vyras: "1–2 g EPA/DHA", moteris: "1 g EPA/DHA", vaikas: "250–500 mg" },
    note: "Priešuždegiminis poveikis, širdies ir smegenų sveikata. Vartoti su maistu geresniam įsisavinimui." },
  { id: "vitc", cat: 1, name: "Vitaminas C", block: "rytas", stomach: "any", irritant: true, childBlocked: false,
    doses: { vyras: "500–1000 mg", moteris: "500–1000 mg", vaikas: "100–250 mg" },
    note: "Antioksidantas, gerina geležies įsisavinimą. Didelės dozės tuščiu skrandžiu gali dirginti." },
  { id: "kalcis", cat: 1, name: "Kalcis", block: "vakaras", stomach: "food", irritant: false, childBlocked: false,
    doses: { vyras: "500–1000 mg", moteris: "1000 mg", vaikas: "500–700 mg" },
    note: "Nevartoti kartu su geležimi. Dalinkite dozę per dieną – didesnės dozės prasčiau įsisavinamos." },
  { id: "probiotikai", cat: 1, name: "Probiotikai", block: "rytas", stomach: "empty", irritant: false, childBlocked: false,
    doses: { vyras: "1 porcija", moteris: "1 porcija", vaikas: "Vaikiški štamai" },
    note: "Žarnyno mikrobiotai. Dažnai geriausia ryte tuščiu skrandžiu arba prieš miegą." },
  { id: "silimarinas", cat: 1, name: "Silimarinas", block: "pietus", stomach: "food", irritant: false, childBlocked: true,
    doses: { vyras: "140–300 mg", moteris: "140–300 mg", vaikas: null },
    note: "Pieninės usnies ekstraktas kepenų palaikymui. Vartoti su maistu." },
  { id: "msm", cat: 1, name: "MSM milteliai", block: "rytas", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "1–3 g", moteris: "1–3 g", vaikas: null },
    note: "Organinės sieros šaltinis sąnariams ir jungiamajam audiniui." },
  { id: "q10", cat: 1, name: "Q10 (Ubikinolis)", block: "rytas", stomach: "food", irritant: false, childBlocked: true,
    doses: { vyras: "100–200 mg", moteris: "100–200 mg", vaikas: null },
    note: "Ubikinolis – aktyvi forma. Riebaluose tirpus, vartoti su maistu. Energija ląstelėms." },
  { id: "melatoninas", cat: 1, name: "Melatoninas", block: "pries-miega", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "0,5–3 mg", moteris: "0,5–3 mg", vaikas: null },
    note: "Reguliuoja cirkadinį ritmą. Pradėti nuo mažiausios dozės 30–60 min prieš miegą." },
  { id: "multivitaminai", cat: 1, name: "Multivitaminai", block: "rytas", stomach: "food", irritant: false, childBlocked: false,
    doses: { vyras: "1 porcija", moteris: "1 porcija", vaikas: "Vaikiški" },
    note: "Bazinis mikroelementų palaikymas. Vartoti su maistu geresniam įsisavinimui." },

  // ---- Kategorija 2 ----
  { id: "kreatinas", cat: 2, name: "Kreatino monohidratas", block: "po-treniruotes", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "3–5 g", moteris: "3–5 g", vaikas: null },
    note: "Svarbiausias nuoseklumas (kasdien), ne laikas. Raumenų prisotinimas pasiekiamas per 2–4 savaites." },
  { id: "baltymas", cat: 2, name: "Išrūgų / Augalinis baltymų izoliatas", block: "po-treniruotes", stomach: "any", irritant: false, childBlocked: false,
    doses: { vyras: "20–30 g", moteris: "20–25 g", vaikas: "Pagal poreikį" },
    note: "Stimuliuoja raumenų baltymų sintezę. Anaboliniam atsakui pakanka ~0,3 g/kg porcijos." },
  { id: "citrulinas", cat: 2, name: "L-Citrulinas / Citrulino malatas", block: "pries-treniruote", stomach: "empty", irritant: false, childBlocked: true,
    doses: { vyras: "6–8 g", moteris: "6–8 g", vaikas: null },
    note: "Didina azoto oksidą ir kraujotaką, mažina nuovargį. Vartoti ~40–60 min prieš treniruotę." },
  { id: "kofeinas", cat: 2, name: "Kofeinas / Pre-Workout", block: "pries-treniruote", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "100–200 mg", moteris: "100–200 mg", vaikas: null },
    note: "Pusėjimo trukmė 5–7 val. Nevartoti likus <6 val. iki miego. Vaikams nerekomenduojama." },
  { id: "elektrolitai", cat: 2, name: "Elektrolitai (Na, K, Mg)", block: "pries-treniruote", stomach: "any", irritant: false, childBlocked: false,
    doses: { vyras: "Pagal prakaitavimą", moteris: "Pagal prakaitavimą", vaikas: "Maža dozė" },
    note: "Natris, kalis, magnis – hidratacijai ir raumenų funkcijai treniruotės metu." },
  { id: "beta-alaninas", cat: 2, name: "Beta-Alaninas", block: "pries-treniruote", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "3–5 g", moteris: "3–5 g", vaikas: null },
    note: "Buferiuoja raumenų rūgštingumą, didina ištvermę. Galimas nekenksmingas dilgčiojimas (parestezija)." },
  { id: "taurinas", cat: 2, name: "Taurinas", block: "pries-treniruote", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "1–2 g", moteris: "1–2 g", vaikas: null },
    note: "Palaiko ištvermę, ląstelių hidrataciją ir antioksidacinę apsaugą." },
  { id: "ltheanine", cat: 2, name: "L-Theanine", block: "rytas", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "100–200 mg", moteris: "100–200 mg", vaikas: null },
    note: "Sinergija su kofeinu – ramus budrumas be nervingumo. Vakare padeda atsipalaiduoti." },
  { id: "ashwagandha", cat: 2, name: "Ashwagandha", block: "pries-miega", stomach: "any", irritant: false, childBlocked: true,
    doses: { vyras: "300–600 mg", moteris: "300–600 mg", vaikas: null },
    note: "KSM-66 / Sensoril ekstraktas. Mažina kortizolį ir stresą. Vaikams nerekomenduojama." },
];

export const CATEGORIES = {
  1: "Kasdieniai vitaminai, mineralai ir sveikata",
  2: "Sportas, energija ir atsistatymas",
};

export const PARTNERS = [
  { id: "omega", name: "5op.lt Premium Omega-3", tag: "EPA/DHA 1000 mg", blurb: "Aukšto grynumo žuvų taukai triglicerido formoje." },
  { id: "magnis", name: "Magnio Bisglicinatas", tag: "Geras įsisavinimas", blurb: "Švelni skrandžiui forma kokybiškam miegui." },
  { id: "d3", name: "Vitaminas D3 + K2", tag: "2000 UI / 100 µg", blurb: "Kaulams, imunitetui ir raumenų funkcijai." },
];

export const SOURCES = [
  { title: "Kreatino monohidratas – ISSN pozicija (sauga ir efektyvumas)", authors: "Kreider RB et al., JISSN 2017", doi: "10.1186/s12970-017-0173-z", url: "https://doi.org/10.1186/s12970-017-0173-z" },
  { title: "Baltymų papildai ir raumenų jėga: meta-analizė", authors: "Morton RW et al., Br J Sports Med 2018", doi: "10.1136/bjsports-2017-097608", url: "https://doi.org/10.1136/bjsports-2017-097608" },
  { title: "L-Citrulinas ir fizinis pajėgumas: sisteminė apžvalga", authors: "Gonzalez AM, Trexler ET, J Strength Cond Res 2020", doi: "10.1519/JSC.0000000000003426", url: "https://doi.org/10.1519/JSC.0000000000003426" },
  { title: "Magnis ir fizinis pajėgumas", authors: "Zhang Y et al., Nutrients 2017", doi: "10.3390/nu9090946", url: "https://doi.org/10.3390/nu9090946" },
  { title: "Vitaminas D ir kvėpavimo takų infekcijų prevencija: meta-analizė", authors: "Martineau AR et al., BMJ 2017", doi: "10.1136/bmj.i6583", url: "https://doi.org/10.1136/bmj.i6583" },
  { title: "Beta-Alaninas – ISSN pozicija", authors: "Trexler ET et al., JISSN 2015", doi: "10.1186/s12970-015-0090-y", url: "https://doi.org/10.1186/s12970-015-0090-y" },
  { title: "Ashwagandha, stresas ir nerimas: sisteminė apžvalga", authors: "Lopresti AL et al., Medicine 2019", doi: "10.1097/MD.0000000000017186", url: "https://doi.org/10.1097/MD.0000000000017186" },
];

export function doseFor(supp, profile) {
  return supp.doses[profile] ?? null;
}

export function stomachText(supp, sensitive) {
  if (sensitive && supp.irritant) return "Būtinai PO maisto";
  if (supp.stomach === "food") return "Su maistu";
  if (supp.stomach === "empty") return "Tuščiu skrandžiu";
  return "Bet kuriuo metu";
}

export function getWarnings(selectedIds, profile) {
  const w = [];
  const has = (id) => selectedIds.includes(id);
  const hasMag = has("magnis-glicinatas") || has("magnis-malatas");

  if (has("gelezis") && has("kalcis"))
    w.push({ level: "high", title: "Geležis + Kalcis", text: "Kalcis stipriai slopina geležies įsisavinimą. Vartokite jas skirtingu paros metu (pvz., geležį ryte, kalcį vakare)." });
  if (has("gelezis") && hasMag)
    w.push({ level: "med", title: "Geležis + Magnis", text: "Mineralai konkuruoja dėl tų pačių pernešėjų. Atskirkite jų vartojimą bent 2 valandomis." });
  if (has("gelezis") && has("cinkas"))
    w.push({ level: "med", title: "Geležis + Cinkas", text: "Didelės geležies dozės mažina cinko įsisavinimą. Vartokite skirtingu metu." });
  if (has("cinkas"))
    w.push({ level: "low", title: "Cinkas ilgalaikiam vartojimui", text: "Ilgai vartojant cinką gali sumažėti vario atsargos – apsvarstykite vario papildymą." });
  if (has("kofeinas"))
    w.push({ level: "high", title: "Kofeino laikas", text: "Pusėjimo trukmė 5–7 val. Nevartokite likus mažiau nei 6 val. iki miego, kad nesutrikdytumėte miego fazių." });
  if (has("kreatinas"))
    w.push({ level: "low", title: "Kreatino nuoseklumas", text: "Svarbiausia – vartoti kasdien. Raumenų prisotinimas (saturacija) pasiekiamas per 2–4 savaites, tikslus laikas antraeilis." });

  if (profile === "vaikas") {
    const blocked = SUPPLEMENTS.filter((s) => s.childBlocked && has(s.id)).map((s) => s.name);
    if (blocked.length)
      w.push({ level: "high", title: "Saugumo įspėjimas vaikams", text: `Šie papildai NEREKOMENDUOJAMI vaikams ir nebus įtraukti į grafiką: ${blocked.join(", ")}. Būtina gydytojo konsultacija.` });
  }
  return w;
}

// Short scientific reference per standard supplement (meta-analysis / study)
export const REFS = {
  "magnis-glicinatas": "https://pubmed.ncbi.nlm.nih.gov/?term=magnesium+supplementation+sleep+meta-analysis",
  "magnis-malatas": "https://pubmed.ncbi.nlm.nih.gov/?term=magnesium+malate+supplementation",
  "gelezis": "https://pubmed.ncbi.nlm.nih.gov/?term=iron+supplementation+meta-analysis",
  "d3k2": "https://doi.org/10.1136/bmj.i6583",
  "cinkas": "https://pubmed.ncbi.nlm.nih.gov/?term=zinc+supplementation+meta-analysis",
  "b-kompleksas": "https://pubmed.ncbi.nlm.nih.gov/?term=b+vitamins+supplementation+meta-analysis",
  "omega3": "https://pubmed.ncbi.nlm.nih.gov/?term=omega-3+EPA+DHA+meta-analysis",
  "vitc": "https://pubmed.ncbi.nlm.nih.gov/?term=vitamin+C+supplementation+meta-analysis",
  "kalcis": "https://pubmed.ncbi.nlm.nih.gov/?term=calcium+supplementation+bone+meta-analysis",
  "probiotikai": "https://pubmed.ncbi.nlm.nih.gov/?term=probiotics+meta-analysis",
  "silimarinas": "https://pubmed.ncbi.nlm.nih.gov/?term=silymarin+liver+meta-analysis",
  "msm": "https://pubmed.ncbi.nlm.nih.gov/?term=methylsulfonylmethane+MSM+meta-analysis",
  "q10": "https://pubmed.ncbi.nlm.nih.gov/?term=coenzyme+Q10+ubiquinol+meta-analysis",
  "melatoninas": "https://pubmed.ncbi.nlm.nih.gov/?term=melatonin+sleep+meta-analysis",
  "multivitaminai": "https://pubmed.ncbi.nlm.nih.gov/?term=multivitamin+supplementation+meta-analysis",
  "kreatinas": "https://doi.org/10.1186/s12970-017-0173-z",
  "baltymas": "https://doi.org/10.1136/bjsports-2017-097608",
  "citrulinas": "https://doi.org/10.1519/JSC.0000000000003426",
  "kofeinas": "https://pubmed.ncbi.nlm.nih.gov/?term=caffeine+exercise+performance+meta-analysis",
  "elektrolitai": "https://pubmed.ncbi.nlm.nih.gov/?term=electrolytes+hydration+exercise",
  "beta-alaninas": "https://doi.org/10.1186/s12970-015-0090-y",
  "taurinas": "https://pubmed.ncbi.nlm.nih.gov/?term=taurine+exercise+performance+meta-analysis",
  "ltheanine": "https://pubmed.ncbi.nlm.nih.gov/?term=l-theanine+caffeine+cognition",
  "ashwagandha": "https://doi.org/10.1097/MD.0000000000017186",
};

// Comprehensive local supplement DB for the custom "add your supplement" autocomplete.
// block must match a BLOCK_OPTIONS value.
export const CUSTOM_DB = [
  { name: "Selenas", dose: "100–200 mcg", block: "pietus" },
  { name: "Berberinas", dose: "500 mg (2–3 k./d.)", block: "pietus" },
  { name: "Spirulina", dose: "3–5 g", block: "rytas" },
  { name: "Lion's Mane (Ožkabarzdis)", dose: "500–1000 mg", block: "rytas" },
  { name: "NMN (Nikotinamido mononukleotidas)", dose: "250–500 mg", block: "rytas" },
  { name: "Q10 (Ubikinolis)", dose: "100–200 mg", block: "rytas" },
  { name: "L-Glutaminas", dose: "5 g", block: "po-treniruotes" },
  { name: "Omega-3 (EPA/DHA)", dose: "1–2 g", block: "pietus" },
  { name: "Vitaminas A", dose: "700–900 mcg", block: "rytas" },
  { name: "Vitaminas E", dose: "15 mg", block: "rytas" },
  { name: "Vitaminas K2", dose: "100–200 mcg", block: "rytas" },
  { name: "Vitaminas D3", dose: "2000–4000 UI", block: "rytas" },
  { name: "Vitaminas C", dose: "500–1000 mg", block: "rytas" },
  { name: "Vitaminas B12 (Metilkobalaminas)", dose: "500 mcg", block: "rytas" },
  { name: "Vitaminas B6", dose: "1,3–2 mg", block: "rytas" },
  { name: "Folio rūgštis (B9)", dose: "400 mcg", block: "rytas" },
  { name: "Biotinas (B7)", dose: "30 mcg", block: "rytas" },
  { name: "Niacinas (B3)", dose: "16 mg", block: "rytas" },
  { name: "Jodas", dose: "150 mcg", block: "rytas" },
  { name: "Chromas", dose: "200 mcg", block: "pietus" },
  { name: "Varis", dose: "1–2 mg", block: "pietus" },
  { name: "Manganas", dose: "2 mg", block: "pietus" },
  { name: "Kalis", dose: "1000 mg", block: "pietus" },
  { name: "Magnis", dose: "300–400 mg", block: "pries-miega" },
  { name: "Cinkas", dose: "15 mg", block: "vakaras" },
  { name: "Geležis", dose: "18 mg", block: "rytas" },
  { name: "Kalcis", dose: "1000 mg", block: "vakaras" },
  { name: "Kvercetinas", dose: "500 mg", block: "pietus" },
  { name: "Resveratrolis", dose: "150–500 mg", block: "rytas" },
  { name: "Kurkuminas", dose: "500–1000 mg", block: "pietus" },
  { name: "Rodžiolė (Rhodiola)", dose: "200–400 mg", block: "rytas" },
  { name: "Ginkmedis (Ginkgo biloba)", dose: "120–240 mg", block: "rytas" },
  { name: "5-HTP", dose: "100–300 mg", block: "pries-miega" },
  { name: "GABA", dose: "500–750 mg", block: "pries-miega" },
  { name: "Glicinas", dose: "3 g", block: "pries-miega" },
  { name: "L-Tirozinas", dose: "500–2000 mg", block: "rytas" },
  { name: "L-Karnitinas", dose: "1–2 g", block: "pries-treniruote" },
  { name: "HMB", dose: "3 g", block: "po-treniruotes" },
  { name: "BCAA", dose: "5–10 g", block: "pries-treniruote" },
  { name: "EAA (Nepakeičiamos aminorūgštys)", dose: "10 g", block: "po-treniruotes" },
  { name: "Inozitolis", dose: "2–4 g", block: "pries-miega" },
  { name: "Melatoninas", dose: "0,5–3 mg", block: "pries-miega" },
  { name: "Ashwagandha", dose: "300–600 mg", block: "pries-miega" },
  { name: "Kolagenas", dose: "10–15 g", block: "rytas" },
  { name: "Hialurono rūgštis", dose: "120 mg", block: "rytas" },
  { name: "Beta-gliukanai", dose: "250 mg", block: "rytas" },
  { name: "Probiotikai", dose: "1 porcija", block: "rytas" },
  { name: "Psyllium (skaidulos)", dose: "5 g", block: "pietus" },
  { name: "Kreatino monohidratas", dose: "3–5 g", block: "po-treniruotes" },
  { name: "Taurinas", dose: "1–2 g", block: "pries-treniruote" },
  { name: "Beta-Alaninas", dose: "3–5 g", block: "pries-treniruote" },
  { name: "Kofeinas", dose: "100–200 mg", block: "pries-treniruote" },
  { name: "L-Theanine", dose: "100–200 mg", block: "rytas" },
  { name: "L-Citrulinas", dose: "6–8 g", block: "pries-treniruote" },
  { name: "Ashwagandha KSM-66", dose: "300–600 mg", block: "pries-miega" },
  { name: "Kreatinas HCL", dose: "2–3 g", block: "po-treniruotes" },
  { name: "Melisa (Lemon balm)", dose: "300–600 mg", block: "pries-miega" },
  { name: "Valerijonas", dose: "300–600 mg", block: "pries-miega" },
  { name: "Saulėgrąžų lecitinas", dose: "1200 mg", block: "rytas" },
  { name: "Alfa lipoinė rūgštis (ALA)", dose: "300–600 mg", block: "pietus" },
];

export function searchCustomDb(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CUSTOM_DB.filter((x) => x.name.toLowerCase().includes(q)).slice(0, 6);
}

export function findCustomExact(query) {
  const q = query.trim().toLowerCase();
  return CUSTOM_DB.find((x) => x.name.toLowerCase() === q) || null;
}
