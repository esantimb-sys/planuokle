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
// block must match a BLOCK_OPTIONS value. Optional tags: synergy (teal) and caution (amber).
export const CUSTOM_DB = [
  { name: "Selenas", dose: "100–200 mcg", block: "pietus", synergy: "Su Vit. E ir jodu", caution: "Neviršyti 400 mcg/d." },
  { name: "Berberinas", dose: "500 mg (2–3 k./d.)", block: "pietus", synergy: "Su alfa lipoine r.", caution: "Sąveika su vaistais nuo cukraus" },
  { name: "Spirulina", dose: "3–5 g", block: "rytas", synergy: "Su Vit. C (geležis)" },
  { name: "Chlorella", dose: "2–3 g", block: "rytas", synergy: "Su spirulina" },
  { name: "Lion's Mane (Ožkabarzdis)", dose: "500–1000 mg", block: "rytas", synergy: "Su Bakopa, Omega-3" },
  { name: "NMN (Nikotinamido mononukleotidas)", dose: "250–500 mg", block: "rytas", synergy: "Su resveratroliu" },
  { name: "Q10 (Ubikinolis)", dose: "100–200 mg", block: "rytas", synergy: "Su Omega-3", caution: "Riebaluose tirpus – su maistu" },
  { name: "L-Glutaminas", dose: "5 g", block: "po-treniruotes", synergy: "Su baltymais (atsistatymas)" },
  { name: "Omega-3 (EPA/DHA)", dose: "1–2 g", block: "pietus", synergy: "Su Vit. E, D3", caution: "Su maistu" },
  { name: "Vitaminas A (Retinolis)", dose: "700–900 mcg", block: "rytas", synergy: "Su D3, cinku", caution: "Nėštumo metu ribojama" },
  { name: "Vitaminas E", dose: "15 mg", block: "rytas", synergy: "Su selenu, Vit. C", caution: "Su maistu (riebalai)" },
  { name: "Vitaminas K2 (MK-7)", dose: "100–200 mcg", block: "rytas", synergy: "Su D3 ir kalciu", caution: "Sąveika su antikoaguliantais" },
  { name: "Vitaminas D3", dose: "2000–4000 UI", block: "rytas", synergy: "Su K2 ir magniu", caution: "Riebaluose tirpus – su maistu" },
  { name: "Vitaminas D3 + K2", dose: "2000 UI / 100 mcg", block: "rytas", synergy: "Su magniu", caution: "Su maistu (riebalai)" },
  { name: "Vitaminas C", dose: "500–1000 mg", block: "rytas", synergy: "Didina geležies įsisavinimą", caution: "Didelės dozės dirgina skrandį" },
  { name: "Vitaminas B1 (Tiaminas)", dose: "1,1–1,2 mg", block: "rytas", synergy: "Su B komplekso vitaminais" },
  { name: "Vitaminas B2 (Riboflavinas)", dose: "1,3 mg", block: "rytas", synergy: "Su B kompleksu" },
  { name: "Vitaminas B5 (Pantoteno r.)", dose: "5 mg", block: "rytas", synergy: "Su B kompleksu" },
  { name: "Vitaminas B6 (P-5-P)", dose: "1,3–2 mg", block: "rytas", synergy: "Su magniu", caution: "Neviršyti ilgą laiką" },
  { name: "Vitaminas B12 (Metilkobalaminas)", dose: "500 mcg", block: "rytas", synergy: "Su folatu (B9)" },
  { name: "Folio rūgštis (B9 / Metilfolatas)", dose: "400 mcg", block: "rytas", synergy: "Su B12" },
  { name: "Biotinas (B7)", dose: "30 mcg", block: "rytas", synergy: "Su B kompleksu", caution: "Gali iškraipyti kraujo tyrimus" },
  { name: "Niacinas (B3)", dose: "16 mg", block: "rytas", caution: "Galimas niacino paraudimas (flush)" },
  { name: "Jodas", dose: "150 mcg", block: "rytas", synergy: "Su selenu", caution: "Skydliaukės ligos – atsargiai" },
  { name: "Chromas (Pikolinatas)", dose: "200 mcg", block: "pietus", synergy: "Su berberinu (gliukozė)" },
  { name: "Varis", dose: "1–2 mg", block: "pietus", synergy: "Balansas su cinku", caution: "Konkuruoja su cinku" },
  { name: "Manganas", dose: "2 mg", block: "pietus", caution: "Neviršyti – kaupiasi" },
  { name: "Molibdenas", dose: "45 mcg", block: "pietus" },
  { name: "Boras", dose: "3 mg", block: "rytas", synergy: "Su D3, kalciu, magniu" },
  { name: "Kalis", dose: "1000 mg", block: "pietus", synergy: "Su magniu ir natriu", caution: "Inkstų ligos – atsargiai" },
  { name: "Magnis (Bisglicinatas)", dose: "300–400 mg", block: "pries-miega", synergy: "Su B6, D3", caution: "Atskirti nuo geležies/cinko" },
  { name: "Magnis (Citratas)", dose: "300–400 mg", block: "pries-miega", synergy: "Su D3", caution: "Gali laisvinti vidurius" },
  { name: "Cinkas (Pikolinatas)", dose: "15 mg", block: "vakaras", synergy: "Su variu (ilgalaikiai)", caution: "Konkuruoja su geležimi" },
  { name: "Geležis (Bisglicinatas)", dose: "18 mg", block: "rytas", synergy: "Su Vit. C", caution: "Atskirti nuo kalcio, cinko, magnio" },
  { name: "Kalcis", dose: "1000 mg", block: "vakaras", synergy: "Su D3 ir K2", caution: "Nevartoti su geležimi" },
  { name: "Fosfatidilserinas", dose: "100–300 mg", block: "vakaras", synergy: "Mažina kortizolį" },
  { name: "Kvercetinas", dose: "500 mg", block: "pietus", synergy: "Su Vit. C, bromelainu" },
  { name: "Resveratrolis", dose: "150–500 mg", block: "rytas", synergy: "Su NMN; su riebalais" },
  { name: "Kurkuminas", dose: "500–1000 mg", block: "pietus", synergy: "Su piperinu (biodostupnumas)", caution: "Su maistu" },
  { name: "Rodžiolė (Rhodiola)", dose: "200–400 mg", block: "rytas", synergy: "Su ashwagandha (adaptogenai)" },
  { name: "Ašvaganda (Ashwagandha KSM-66)", dose: "300–600 mg", block: "pries-miega", synergy: "Su magniu", caution: "Skydliaukės/nėštumo – atsargiai" },
  { name: "Ginkmedis (Ginkgo biloba)", dose: "120–240 mg", block: "rytas", caution: "Sąveika su antikoaguliantais" },
  { name: "Bakopa (Bacopa monnieri)", dose: "300 mg", block: "rytas", synergy: "Su Lion's Mane", caution: "Su maistu" },
  { name: "Maca", dose: "1500–3000 mg", block: "rytas" },
  { name: "5-HTP", dose: "100–300 mg", block: "pries-miega", synergy: "Su B6", caution: "Nederinti su SSRI antidepresantais" },
  { name: "GABA", dose: "500–750 mg", block: "pries-miega", synergy: "Su L-theanine, magniu" },
  { name: "Glicinas", dose: "3 g", block: "pries-miega", synergy: "Su magniu (miegas)" },
  { name: "L-Tirozinas", dose: "500–2000 mg", block: "rytas", synergy: "Su B6", caution: "Nederinti su SSRI/MAOI" },
  { name: "L-Karnitinas", dose: "1–2 g", block: "pries-treniruote", synergy: "Su angliavandeniais" },
  { name: "Acetil-L-karnitinas (ALCAR)", dose: "500–1500 mg", block: "rytas", synergy: "Su ALA" },
  { name: "HMB", dose: "3 g", block: "po-treniruotes", synergy: "Su baltymais" },
  { name: "BCAA", dose: "5–10 g", block: "pries-treniruote", synergy: "Su EAA / baltymais" },
  { name: "EAA (Nepakeičiamos aminorūgštys)", dose: "10 g", block: "po-treniruotes", synergy: "Su angliavandeniais" },
  { name: "Betainas (TMG)", dose: "2,5 g", block: "pries-treniruote", synergy: "Su kreatinu" },
  { name: "Agmatino sulfatas", dose: "500–1000 mg", block: "pries-treniruote", synergy: "Su citrulinu (pumpas)" },
  { name: "Alfa-GPC (Kolinas)", dose: "300–600 mg", block: "pries-treniruote", synergy: "Su kofeinu (fokusas)" },
  { name: "Inozitolis", dose: "2–4 g", block: "pries-miega", synergy: "Su folatu" },
  { name: "Melatoninas", dose: "0,5–3 mg", block: "pries-miega", synergy: "Su magniu, glicinu", caution: "Pradėti nuo mažos dozės" },
  { name: "Melisa (Lemon balm)", dose: "300–600 mg", block: "pries-miega", synergy: "Su L-theanine" },
  { name: "Valerijonas", dose: "300–600 mg", block: "pries-miega", caution: "Gali sukelti mieguistumą" },
  { name: "Kolagenas", dose: "10–15 g", block: "rytas", synergy: "Su Vit. C (sintezė)" },
  { name: "Hialurono rūgštis", dose: "120 mg", block: "rytas", synergy: "Su kolagenu" },
  { name: "Beta-gliukanai", dose: "250 mg", block: "rytas", synergy: "Su Vit. D (imunitetas)" },
  { name: "Probiotikai", dose: "1 porcija", block: "rytas", synergy: "Su prebiotikais (skaidulos)" },
  { name: "Prebiotikai (Inulinas)", dose: "5 g", block: "rytas", synergy: "Su probiotikais" },
  { name: "Psyllium (skaidulos)", dose: "5 g", block: "pietus", caution: "Gerti daug vandens; atskirti nuo vaistų" },
  { name: "MCT aliejus", dose: "1–2 šaukštai", block: "rytas", synergy: "Su kofeinu (energija)" },
  { name: "Astaksantinas", dose: "4–12 mg", block: "pietus", synergy: "Su Omega-3", caution: "Su maistu (riebalai)" },
  { name: "Liuteinas + Zeaksantinas", dose: "10 mg / 2 mg", block: "pietus", caution: "Su maistu (riebalai)" },
  { name: "Fisetinas", dose: "100–500 mg", block: "rytas", synergy: "Su kvercetinu" },
  { name: "Alfa lipoinė rūgštis (ALA)", dose: "300–600 mg", block: "pietus", synergy: "Su ALCAR", caution: "Tuščiu skrandžiu" },
  { name: "Saulėgrąžų lecitinas", dose: "1200 mg", block: "rytas", synergy: "Su Omega-3" },
  { name: "Kreatino monohidratas", dose: "3–5 g", block: "po-treniruotes", synergy: "Su angliavandeniais, betainu", caution: "Kasdien – saturacija" },
  { name: "Kreatinas HCL", dose: "2–3 g", block: "po-treniruotes", caution: "Kasdien – nuoseklumas" },
  { name: "Taurinas", dose: "1–2 g", block: "pries-treniruote", synergy: "Su kofeinu, magniu" },
  { name: "Beta-Alaninas", dose: "3–5 g", block: "pries-treniruote", synergy: "Su kreatinu", caution: "Galimas dilgčiojimas" },
  { name: "Kofeinas", dose: "100–200 mg", block: "pries-treniruote", synergy: "Su L-theanine", caution: ">6 val. iki miego nevartoti" },
  { name: "L-Theanine", dose: "100–200 mg", block: "rytas", synergy: "Su kofeinu (ramus fokusas)" },
  { name: "L-Citrulinas / Malatas", dose: "6–8 g", block: "pries-treniruote", synergy: "Su agmatinu (pumpas)", caution: "Tuščiu skrandžiu" },
  { name: "Elektrolitai (Na/K/Mg)", dose: "Pagal prakaitavimą", block: "pries-treniruote", synergy: "Su vandeniu (hidratacija)" },
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

// Evidence-based categorization (4 tiers) per standard supplement.
export const TIER_MAP = {
  "magnis-glicinatas": 1, "magnis-malatas": 3, "gelezis": 1, "d3k2": 1, "cinkas": 2,
  "b-kompleksas": 2, "omega3": 1, "vitc": 2, "kalcis": 2, "probiotikai": 3,
  "silimarinas": 3, "msm": 4, "q10": 3, "melatoninas": 2, "multivitaminai": 4,
  "kreatinas": 1, "baltymas": 1, "citrulinas": 2, "kofeinas": 2, "elektrolitai": 2,
  "beta-alaninas": 2, "taurinas": 3, "ltheanine": 2, "ashwagandha": 3,
};

export const TIERS = {
  0: { label: "Neklasifikuota", emoji: "⚪", desc: "Jūsų pridėtas papildas – įrodymų lygis neįvertintas. Rekomenduojame pasidomėti tyrimais." },
  1: { label: "Svarbiausi", emoji: "🟢", desc: "Tvirtas mokslinis pagrindas ir nauda daugeliui žmonių. Puikus atspirties taškas." },
  2: { label: "Moksliškai pagrįsti", emoji: "🟡", desc: "Gerai ištirti ir veiksmingi siekiant konkretaus tikslo (sportas, miegas, imunitetas)." },
  3: { label: "Eksperimentiniai", emoji: "🟠", desc: "Perspektyvūs, bet įrodymai dar riboti ar nevienareikšmiai (ilgaamžiškumas, adaptogenai)." },
  4: { label: "Mažai veiksmingi / pervertinti", emoji: "🔴", desc: "Silpni įrodymai arba dažnai pervertinti – sveikiems žmonėms nauda abejotina." },
};

// Evidence tier for custom (free-typed) supplements, keyed by lowercased name.
const CUSTOM_TIER = {
  "vitaminas d3": 1, "vitaminas d3 + k2": 1, "omega-3 (epa/dha)": 1,
  "magnis (bisglicinatas)": 1, "magnis (citratas)": 1, "geležis (bisglicinatas)": 1,
  "kreatino monohidratas": 1, "vitaminas b12 (metilkobalaminas)": 1, "folio rūgštis (b9 / metilfolatas)": 1,
  "cinkas (pikolinatas)": 2, "vitaminas c": 2, "kalcis": 2, "melatoninas": 2,
  "l-citrulinas / malatas": 2, "kofeinas": 2, "beta-alaninas": 2, "l-theanine": 2,
  "elektrolitai (na/k/mg)": 2, "vitaminas k2 (mk-7)": 2, "jodas": 2, "selenas": 2,
  "kreatinas hcl": 2, "betainas (tmg)": 2, "vitaminas a (retinolis)": 2, "vitaminas e": 2,
  "vitaminas b6 (p-5-p)": 2, "bcaa": 2, "eaa (nepakeičiamos aminorūgštys)": 2, "l-glutaminas": 2,
  "hmb": 2, "kalis": 2,
  "nmn (nikotinamido mononukleotidas)": 3, "resveratrolis": 3, "q10 (ubikinolis)": 3,
  "ašvaganda (ashwagandha ksm-66)": 3, "rodžiolė (rhodiola)": 3, "bakopa (bacopa monnieri)": 3,
  "lion's mane (ožkabarzdis)": 3, "kurkuminas": 3, "berberinas": 3, "alfa lipoinė rūgštis (ala)": 3,
  "acetil-l-karnitinas (alcar)": 3, "l-karnitinas": 3, "taurinas": 3, "spirulina": 3, "chlorella": 3,
  "kolagenas": 3, "probiotikai": 3, "prebiotikai (inulinas)": 3, "fosfatidilserinas": 3, "gaba": 3,
  "5-htp": 3, "glicinas": 3, "l-tirozinas": 3, "inozitolis": 3, "astaksantinas": 3,
  "liuteinas + zeaksantinas": 3, "fisetinas": 3, "beta-gliukanai": 3, "kvercetinas": 3,
  "alfa-gpc (kolinas)": 3, "agmatino sulfatas": 3, "melisa (lemon balm)": 3, "valerijonas": 3,
  "maca": 3, "boras": 3, "ginkmedis (ginkgo biloba)": 3, "hialurono rūgštis": 3, "mct aliejus": 3,
  "chromas (pikolinatas)": 3, "varis": 3, "manganas": 3, "molibdenas": 3, "psyllium (skaidulos)": 3,
  "vitaminas b1 (tiaminas)": 4, "vitaminas b2 (riboflavinas)": 4, "vitaminas b5 (pantoteno r.)": 4,
  "biotinas (b7)": 4, "niacinas (b3)": 4, "saulėgrąžų lecitinas": 4,
};

export function tierForName(name) {
  return CUSTOM_TIER[name.trim().toLowerCase()] ?? 0;
}
