import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Sunrise, Sun, Dumbbell, Activity, Moon, BedDouble, FlaskConical, ShieldAlert,
  Download, Link2, Plus, Trash2, ExternalLink, Mars, Venus, Baby, Leaf, Clock,
  CircleCheck, Beaker, AlertTriangle, ShoppingBag, Mail, ChevronDown, Eraser, BookOpen, Search, Sparkles, X, Heart, Check,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SUPPLEMENTS, TIME_BLOCKS, CATEGORIES, PARTNERS, SOURCES, BLOCK_OPTIONS, REFS, TIER_MAP, TIERS, searchCustomDb, findCustomExact, tierForName, pubmedUrl, noteForName,
  doseFor, stomachText, getWarnings,
} from "@/planner/data";
import dejavuRegularUrl from "@/planner/fonts/DejaVuSans.ttf?url";
import dejavuBoldUrl from "@/planner/fonts/DejaVuSans-Bold.ttf?url";

const TIER_STYLES = {
  0: "text-slate-600 bg-slate-100 border-slate-300",
  1: "text-emerald-700 bg-emerald-50 border-emerald-200",
  2: "text-yellow-700 bg-yellow-50 border-yellow-200",
  3: "text-orange-700 bg-orange-50 border-orange-200",
  4: "text-rose-700 bg-rose-50 border-rose-200",
};
const TIER_DOT = { 0: "bg-slate-400", 1: "bg-emerald-500", 2: "bg-yellow-500", 3: "bg-orange-500", 4: "bg-rose-500" };

let _pdfFontsPromise = null;
async function _ttfToBase64(url) {
  const buf = await (await fetch(url)).arrayBuffer();
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  return btoa(bin);
}
function loadPdfFonts() {
  if (!_pdfFontsPromise) {
    _pdfFontsPromise = Promise.all([_ttfToBase64(dejavuRegularUrl), _ttfToBase64(dejavuBoldUrl)]).then(([reg, bold]) => ({ reg, bold }));
  }
  return _pdfFontsPromise;
}

const ICONS = { Sunrise, Sun, Dumbbell, Activity, Moon, BedDouble };

const HERO_IMG =
  "https://images.unsplash.com/photo-1707129785947-ddc627a8bab9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

const DISCLAIMER =
  "SVARBU / TEISINĖ INFORMACIJA: Ši svetainė ir joje pateikiama informacija yra tik rekomendacinio bei šviečiamojo pobūdžio. Planuoklės pateikiami duomenys, dozės ir laikai negali būti traktuojami kaip medicininė diagnozė, gydymo skyrimas ar sveikatos priežiūros specialisto konsultacija. Prieš pradedant vartoti bet kokius maisto papildus ar keičiant jų dozes, būtina pasitarti su gydytoju arba gydytoju dietologu. Svetainės administracija neprisiima atsakomybės už sprendimus, priimtus remiantis šio įrankio informacija.";

function encodeState(state) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  } catch {
    return "";
  }
}
function decodeState(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  } catch {
    return null;
  }
}

const PROFILES = [
  { id: "vyras", label: "Vyras", icon: Mars },
  { id: "moteris", label: "Moteris", icon: Venus },
  { id: "vaikas", label: "Vaikas (nuo 6 m.)", icon: Baby },
];

function readInitial() {
  const p = new URLSearchParams(window.location.search).get("p");
  const s = p ? decodeState(p) : null;
  return {
    profile: s?.profile ?? "vyras",
    sensitive: typeof s?.sensitive === "boolean" ? s.sensitive : false,
    selected: Array.isArray(s?.selected) ? s.selected : [],
    custom: Array.isArray(s?.custom) ? s.custom : [],
  };
}

export default function PlannerPage() {
  const init = useRef(readInitial()).current;
  const [profile, setProfile] = useState(init.profile);
  const [sensitive, setSensitive] = useState(init.sensitive);
  const [selected, setSelected] = useState(init.selected);
  const [custom, setCustom] = useState(init.custom);
  const [cName, setCName] = useState("");
  const [cDose, setCDose] = useState("");
  const [cBlock, setCBlock] = useState("rytas");
  const [showSug, setShowSug] = useState(false);
  const captureRef = useRef(null);

  const [thanksCount, setThanksCount] = useState(() => {
    const saved = localStorage.getItem('planner_thanks_count_v5');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [hasThanked, setHasThanked] = useState(() => {
    return localStorage.getItem('planner_has_thanked_v5') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('planner_thanks_count_v5', thanksCount);
  }, [thanksCount]);

  useEffect(() => {
    localStorage.setItem('planner_has_thanked_v5', hasThanked);
  }, [hasThanked]);

  const handleThanksClick = () => {
    if (hasThanked) return;
    setThanksCount(prev => prev + 1);
    setHasThanked(true);
    toast.success("Dėkui už įvertinimą!!👍");
  };

  const buildShareUrl = () => {
    const code = encodeState({ profile, sensitive, selected, custom });
    return `${window.location.origin}${window.location.pathname}?p=${code}`;
  };

  useEffect(() => {
    const code = encodeState({ profile, sensitive, selected, custom });
    window.history.replaceState(null, "", `${window.location.pathname}?p=${code}`);
  }, [profile, sensitive, selected, custom]);

  const toggle = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const addCustom = () => {
    if (!cName.trim()) {
      toast.error("Įveskite papildo pavadinimą");
      return;
    }
    setCustom((prev) => [...prev, { id: `c-${Date.now()}`, name: cName.trim(), dose: cDose.trim(), block: cBlock, tier: tierForName(cName) }]);
    setCName("");
    setCDose("");
    setShowSug(false);
    toast.success("Papildas pridėtas į grafiką");
  };

  const clearAll = () => {
    setSelected([]);
    setCustom([]);
    toast.success("Visos varnelės nuimtos");
  };

  const suggestions = useMemo(() => searchCustomDb(cName), [cName]);

  const handleCustomName = (value) => {
    setCName(value);
    setShowSug(true);
    const exact = findCustomExact(value);
    if (exact) {
      setCDose(exact.dose);
      setCBlock(exact.block);
    }
  };

  const pickSuggestion = (item) => {
    setCName(item.name);
    setCDose(item.dose);
    setCBlock(item.block);
    setShowSug(false);
  };

  const warnings = useMemo(() => getWarnings(selected, profile), [selected, profile]);

  const schedule = useMemo(() => {
    const map = Object.fromEntries(TIME_BLOCKS.map((b) => [b.id, []]));
    for (const id of selected) {
      const s = SUPPLEMENTS.find((x) => x.id === id);
      if (!s) continue;
      const dose = doseFor(s, profile);
      if (profile === "vaikas" && (s.childBlocked || dose === null)) continue;
      map[s.block].push({
        key: s.id, name: s.name, dose, note: s.note,
        stomach: stomachText(s, sensitive),
      });
    }
    for (const c of custom) {
      if (!map[c.block]) continue;
      map[c.block].push({ key: c.id, name: c.name, dose: c.dose || "—", note: noteForName(c.name), stomach: "Pagal etiketę", isCustom: true, tier: c.tier ?? tierForName(c.name) });
    }
    return map;
  }, [selected, custom, profile, sensitive]);

  const activeBlocks = TIME_BLOCKS.filter((b) => schedule[b.id].length > 0);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      toast.success("Nuoroda nukopijuota!");
    } catch {
      toast.error("Nepavyko nukopijuoti nuorodos");
    }
  };

  const removeFromSchedule = (item) => {
    if (item.isCustom) setCustom((p) => p.filter((x) => x.id !== item.key));
    else setSelected((p) => p.filter((id) => id !== item.key));
    toast.success("Papildas pašalintas iš grafiko");
  };

  const exportAs = async (type) => {
    if (!captureRef.current) return;
    const t = toast.loading("Ruošiamas grafikas...");
    try {
      if (type === "png") {
        const { default: html2canvas } = await import("html2canvas-pro");
        const canvas = await html2canvas(captureRef.current, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        const link = document.createElement("a");
        link.download = "5op-planuoklis.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        const { default: jsPDF } = await import("jspdf");
        const fonts = await loadPdfFonts();
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addFileToVFS("DejaVuSans.ttf", fonts.reg);
        pdf.addFont("DejaVuSans.ttf", "Dejavu", "normal");
        pdf.addFileToVFS("DejaVuSans-Bold.ttf", fonts.bold);
        pdf.addFont("DejaVuSans-Bold.ttf", "Dejavu", "bold");
        const M = 15, PW = 210, PH = 297, maxW = PW - 2 * M;
        let y = M + 2;
        const ensure = (h) => { if (y + h > PH - M) { pdf.addPage(); y = M; } };
        pdf.setFont("Dejavu", "bold"); pdf.setFontSize(17); pdf.setTextColor(13, 148, 136);
        pdf.text("5op.lt — Papildų vartojimo planas", M, y); y += 11;
        pdf.setFont("Dejavu", "normal"); pdf.setFontSize(11); pdf.setTextColor(71, 85, 105);
        pdf.text(`Profilis: ${profileLabel}${sensitive ? " · Jautrus virškinimas" : ""}`, M, y); y += 9;
        if (activeBlocks.length === 0) { pdf.text("Nepasirinkta jokių papildų.", M, y); y += 8; }
        for (const b of activeBlocks) {
          ensure(13);
          pdf.setFillColor(236, 253, 245); pdf.rect(M, y - 5, maxW, 8, "F");
          pdf.setFont("Dejavu", "bold"); pdf.setFontSize(12); pdf.setTextColor(15, 23, 42);
          pdf.text(`${b.label}  (${b.time})`, M + 2, y); y += 9;
          for (const it of schedule[b.id]) {
            pdf.setFont("Dejavu", "bold"); pdf.setFontSize(10); pdf.setTextColor(15, 23, 42);
            const head = pdf.splitTextToSize(`• ${it.name} — ${it.dose}  [${it.stomach}]`, maxW - 3);
            ensure(head.length * 5 + 2);
            pdf.text(head, M + 2, y); y += head.length * 5;
            pdf.setFont("Dejavu", "normal"); pdf.setFontSize(9); pdf.setTextColor(100, 116, 139);
            const note = pdf.splitTextToSize(it.note, maxW - 6);
            ensure(note.length * 4.5 + 3);
            pdf.text(note, M + 5, y); y += note.length * 4.5 + 3;
          }
          y += 3;
        }
        ensure(22);
        pdf.setDrawColor(226, 232, 240); pdf.line(M, y, PW - M, y); y += 5;
        pdf.setFont("Dejavu", "normal"); pdf.setFontSize(7.5); pdf.setTextColor(120, 120, 120);
        const disc = pdf.splitTextToSize("Tik informaciniais ir šviečiamaisiais tikslais. Tai nėra medicininė konsultacija — prieš vartojant maisto papildus pasitarkite su gydytoju. Šaltinis: 5op.lt", maxW);
        pdf.text(disc, M, y);
        pdf.save("5op-planuoklis.pdf");
      }
      toast.success("Grafikas atsisiųstas", { id: t });
    } catch (e) {
      toast.error("Nepavyko sugeneruoti failo", { id: t });
    }
  };

  const profileLabel = PROFILES.find((p) => p.id === profile)?.label;

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-slate-800 font-sans">
      <header
        data-testid="header-nav"
        className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between"
      >
        <a data-testid="brand-logo-link" href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/30">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading font-extrabold text-slate-900 text-base">5op.lt</span>
            <span className="block text-[11px] font-semibold text-slate-700 -mt-0.5">Vitaminų ir papildų vartojimo planuoklė</span>
          </span>
        </a>
        <a
          data-testid="header-eshop-cta-button"
          href="https://5op.lt/parduotuve/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 text-white text-sm font-semibold px-4 py-2 hover:bg-slate-700 active:scale-95 transition-all"
        >
          <ShoppingBag className="h-4 w-4" /> El. parduotuvė
        </a>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-amber-50/30 to-teal-50/60 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <FlaskConical className="h-3.5 w-3.5" /> Moksliškai pagrįsta
            </span>
            <h1 className="mt-5 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Vitaminų ir papildų <span className="text-teal-600">vartojimo laiko</span> planuoklė
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Sudarykite asmeninį dienos grafiką pagal savo profilį. Optimalus laikas, dozės ir moksliniai pagrindimai – viename įrankyje.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#planuoklis" className="inline-flex items-center gap-2 rounded-full bg-teal-600 text-white font-semibold px-6 py-3 hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-600/25">
                Pradėti planuoti <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#saltiniai" className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 hover:border-teal-300 transition-all">
                Moksliniai šaltiniai
              </a>
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <img
              src={HERO_IMG}
              alt="Vitaminai ir papildai"
              className="w-full h-72 sm:h-96 object-cover rounded-3xl shadow-xl shadow-emerald-900/10 border border-white/60"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div
          data-testid="legal-disclaimer-top-banner"
          className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-900 text-sm flex gap-3 items-start leading-relaxed"
        >
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <p>{DISCLAIMER}</p>
        </div>

        <div id="planuoklis" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-5">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 text-sm font-bold">1</span>
                Jūsų profilis
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {PROFILES.map((p) => {
                  const Icon = p.icon;
                  const active = profile === p.id;
                  return (
                    <button
                      key={p.id}
                      data-testid={`profile-gender-${p.id}-btn`}
                      onClick={() => setProfile(p.id)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition-all active:scale-95 ${
                        active ? "ring-2 ring-teal-600 border-teal-500 bg-teal-50/50 text-teal-800" : "border-slate-200 text-slate-600 hover:border-teal-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {p.label}
                    </button>
                  );
                })}
              </div>
              <label className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                <span className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900 block">Jautresnis virškinamasis traktas?</span>
                  Dirgikliai (Geležis, Cinkas, Vit. C) bus perkelti po maisto.
                </span>
                <Switch data-testid="profile-sensitivity-switch" checked={sensitive} onCheckedChange={setSensitive} />
              </label>
            </section>

            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 text-sm font-bold">2</span>
                  Pasirinkite papildus
                </h2>
                <button
                  data-testid="clear-all-button"
                  onClick={clearAll}
                  disabled={selected.length === 0 && custom.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1.5 hover:border-rose-300 hover:text-rose-600 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Eraser className="h-3.5 w-3.5" /> Išvalyti visus
                </button>
              </div>

              <div
                data-testid="evidence-tier-legend"
                className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2"
              >
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Įrodymų lygiai (pagal meta-analizes)</p>
                <div className="grid gap-1.5">
                  {[1, 2, 3, 4].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${TIER_DOT[t]}`} />
                      <p className="text-[11px] text-slate-600 leading-snug">
                        <b className="text-slate-800">{TIERS[t].label}:</b> {TIERS[t].desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {[1, 2].map((cat) => (
                <div key={cat} data-testid={cat === 1 ? "supplement-cat-basic-container" : "supplement-cat-biohacking-container"} className="space-y-2.5">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">{CATEGORIES[cat]}</h3>
                  {SUPPLEMENTS.filter((s) => s.cat === cat).map((s) => {
                    const dose = doseFor(s, profile);
                    const blockedForChild = profile === "vaikas" && (s.childBlocked || dose === null);
                    const active = selected.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                          active ? "border-teal-400 bg-teal-50/40" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Checkbox
                          data-testid={`supplement-checkbox-${s.id}`}
                          checked={active}
                          onCheckedChange={() => toggle(s.id)}
                          className="mt-0.5"
                        />
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                          </span>
                          {blockedForChild ? (
                            <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-rose-600">
                              <AlertTriangle className="h-3 w-3" /> Nerekomenduojama vaikams
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                              <Clock className="h-3 w-3" /> {dose} · {profileLabel}
                            </span>
                          )}
                          <span className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span
                              data-testid={`supplement-tier-badge-${s.id}`}
                              title={TIERS[TIER_MAP[s.id]].label}
                              className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${TIER_STYLES[TIER_MAP[s.id]]}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[TIER_MAP[s.id]]}`} /> {TIERS[TIER_MAP[s.id]].label}
                            </span>
                            {active && REFS[s.id] && (
                              <a
                                href={REFS[s.id]}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`supplement-ref-link-${s.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline decoration-teal-300 underline-offset-2"
                              >
                                <BookOpen className="h-3 w-3" /> Mokslinis tyrimas
                              </a>
                            )}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              ))}

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">Pridėkite savo papildą</h3>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <Input
                      data-testid="custom-supplement-text-input"
                      className="pl-9"
                      placeholder="Pradėkite rašyti (pvz., selenas, nmn...)"
                      value={cName}
                      autoComplete="off"
                      onChange={(e) => handleCustomName(e.target.value)}
                      onFocus={() => setShowSug(true)}
                      onBlur={() => setTimeout(() => setShowSug(false), 150)}
                    />
                  </div>
                  {showSug && suggestions.length > 0 && (
                    <ul data-testid="custom-supplement-suggestions" className="absolute z-30 mt-1 w-full max-h-60 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                      {suggestions.map((item) => (
                        <li key={item.name}>
                          <button
                            type="button"
                            data-testid={`custom-suggestion-${item.name}`}
                            onMouseDown={(e) => { e.preventDefault(); pickSuggestion(item); }}
                            className="w-full text-left px-3 py-2.5 hover:bg-teal-50 border-b border-slate-100 last:border-0"
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium text-slate-800">{item.name}</span>
                              <span className="text-[11px] text-teal-700 font-semibold shrink-0">{item.dose}</span>
                            </span>
                            {(item.synergy || item.caution) && (
                              <span className="mt-1 flex flex-wrap gap-1.5">
                                {item.synergy && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-full">
                                    <Sparkles className="h-2.5 w-2.5" /> {item.synergy}
                                  </span>
                                )}
                                {item.caution && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                                    <AlertTriangle className="h-2.5 w-2.5" /> {item.caution}
                                  </span>
                                )}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Dozė (pvz., 500 mg)" value={cDose} onChange={(e) => setCDose(e.target.value)} data-testid="custom-supplement-dose-input" />
                  <Select value={cBlock} onValueChange={setCBlock}>
                    <SelectTrigger data-testid="custom-supplement-time-select"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BLOCK_OPTIONS.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button data-testid="custom-supplement-add-button" onClick={addCustom} className="w-full bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4" /> Pridėti savo papildą
                </Button>
                {custom.length > 0 && (
                  <ul className="space-y-1.5">
                    {custom.map((c) => {
                      const ct = c.tier ?? tierForName(c.name);
                      return (
                      <li key={c.id} className="flex items-center justify-between gap-2 text-sm bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <b className="truncate">{c.name}</b> {c.dose && <span className="text-slate-500 shrink-0">· {c.dose}</span>}
                          </span>
                          <span
                            data-testid={`custom-tier-badge-${c.id}`}
                            title={TIERS[ct].label}
                            className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${TIER_STYLES[ct]}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[ct]}`} /> {TIERS[ct].label}
                          </span>
                          <a
                            href={pubmedUrl(c.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`custom-ref-link-${c.id}`}
                            className="mt-1 ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:text-teal-900 underline decoration-teal-300 underline-offset-2"
                          >
                            <BookOpen className="h-3 w-3" /> Mokslinis tyrimas
                          </a>
                        </span>
                        <button data-testid={`custom-remove-${c.id}`} onClick={() => setCustom((p) => p.filter((x) => x.id !== c.id))} className="text-rose-500 hover:text-rose-700 shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 px-1">Partnerių pasirinkimas</h3>
              {PARTNERS.map((p) => (
                <div
                  key={p.id}
                  data-testid="partner-sidebar-ad-placeholder"
                  className="bg-gradient-to-b from-teal-50/60 to-emerald-50/60 border border-teal-200/60 p-4 rounded-2xl flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="h-14 w-14 rounded-xl bg-white border border-teal-100 flex items-center justify-center shrink-0">
                    <Beaker className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.tag}</p>
                  </div>
                  <a href="/?page=reklama" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 shrink-0">
                    Įsigyti <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
              <p className="text-[11px] text-slate-400 px-1">
  Reklaminė vieta — susisiekite: <a href="mailto:info@5op.lt" className="underline hover:text-slate-200 transition-colors">info@5op.lt</a>
</p>
            </section>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {/* Viskas vienoje gražioje eilutėje */}
            <div className="flex flex-wrap gap-3 items-center justify-between bg-slate-100/80 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2.5 flex-wrap">
                <CircleCheck className="h-4 w-4 text-teal-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">Jūsų asmeninis grafikas</span>
                <button
                  onClick={handleThanksClick}
                  disabled={hasThanked}
                  className={`ml-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all ${
                    hasThanked 
                      ? "bg-emerald-600 text-white border border-emerald-600 cursor-default" 
                      : "bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 active:scale-95"
                  }`}
                >
                  {hasThanked ? <Check className="h-3 w-3" /> : <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />}
                  <span>{hasThanked ? "Padėkota" : "Ačiū"}</span>
                  {hasThanked && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${hasThanked ? "bg-emerald-700 text-white" : "bg-rose-500 text-white"}`}>
                {thanksCount}
              </span>
            )}
                </button>
              </div>

              <div className="flex gap-2 items-center flex-wrap">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button data-testid="export-schedule-download-btn" variant="outline" className="border-slate-300">
                      <Download className="h-4 w-4" /> Atsisiųsti <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem data-testid="export-pdf-item" onClick={() => exportAs("pdf")}>PDF dokumentas</DropdownMenuItem>
                    <DropdownMenuItem data-testid="export-png-item" onClick={() => exportAs("png")}>PNG paveikslėlis</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button data-testid="export-schedule-copy-link-btn" onClick={copyLink} className="bg-teal-600 hover:bg-teal-700">
                  <Link2 className="h-4 w-4" /> Kopijuoti nuorodą
                </Button>
              </div>
            </div>

            {warnings.length > 0 && (
              <section data-testid="scientific-interaction-warnings-block" className="bg-rose-50/70 border border-rose-200/80 p-5 rounded-2xl space-y-3">
                <h3 className="font-heading text-base font-bold text-rose-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Moksliniai įspėjimai ir sąveikos
                </h3>
                {warnings.map((w, i) => (
                  <div key={i} data-testid="interaction-warning-alert-item" className="flex gap-3 items-start text-sm">
                    <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${w.level === "high" ? "bg-rose-600" : w.level === "med" ? "bg-amber-500" : "bg-teal-500"}`} />
                    <p className="text-rose-900"><b>{w.title}:</b> {w.text}</p>
                  </div>
                ))}
              </section>
            )}

            <div ref={captureRef} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">Dienos grafikas</p>
                  <p className="text-sm text-slate-500">Profilis: <b className="text-teal-700">{profileLabel}</b>{sensitive && " · Jautrus virškinimas"}</p>
                </div>
                <span className="text-xs font-bold text-slate-400"></span>
              </div>

              {activeBlocks.length === 0 && (
                <p className="text-sm text-slate-500 py-8 text-center">Pasirinkite papildus kairėje, kad matytumėte savo grafiką.</p>
              )}

              {activeBlocks.map((b) => {
                const Icon = ICONS[b.icon];
                return (
                  <div key={b.id} data-testid={`schedule-timeblock-${b.id}`} className="rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-teal-50 to-emerald-50/40 px-4 py-3 border-b border-slate-100">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-600 border border-teal-100">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-heading font-bold text-slate-900 leading-tight">{b.label}</p>
                        <p className="text-xs text-slate-500">{b.time} · {b.desc}</p>
                      </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {schedule[b.id].map((item) => (
                        <div key={item.key} className="px-4 py-3.5 group/item">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">{item.dose}</span>
                              <button
                                data-testid={`schedule-remove-${item.key}`}
                                onClick={() => removeFromSchedule(item)}
                                title="Pašalinti iš grafiko"
                                aria-label="Pašalinti iš grafiko"
                                className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
                              <Clock className="h-3 w-3" /> {item.stomach}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-slate-500 leading-relaxed">{item.note}</p>
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            {item.isCustom && (
                              <span
                                data-testid={`schedule-tier-badge-${item.key}`}
                                title={TIERS[item.tier].label}
                                className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${TIER_STYLES[item.tier]}`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[item.tier]}`} /> {TIERS[item.tier].label}
                              </span>
                            )}
                            <a
                              href={item.isCustom ? pubmedUrl(item.name) : "/?page=reklama"}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={item.isCustom ? `schedule-ref-link-${item.key}` : `partner-ref-link-${item.key}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 underline decoration-teal-300 underline-offset-2"
                            >
                              <BookOpen className="h-3.5 w-3.5" /> Mokslinis tyrimas
                            </a>
                            <a
                              href="/?page=reklama"
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`partner-buy-external-link-${item.key}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" /> Rekomenduojamas pasirinkimas / Kur įsigyti
                            </a>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">Tik informaciniais tikslais. Pasitarkite su gydytoju. </p>
            </div>
          </div>
        </div>

        <section id="saltiniai" data-testid="scientific-sources-doi-block" className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <FlaskConical className="h-6 w-6 text-teal-600" /> Moksliniai šaltiniai ir meta-analizės
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">Realios sisteminės apžvalgos ir meta-analizės (PubMed / DOI).</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {SOURCES.map((s, i) => (
              <a
                key={i}
                data-testid="pubmed-doi-reference-link"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-slate-200 p-4 hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <p className="text-sm font-semibold text-slate-800 leading-snug">{s.title}</p>
                <p className="text-xs text-slate-500 mt-1.5">{s.authors}</p>
                <p className="text-xs font-mono text-teal-700 mt-1 inline-flex items-center gap-1">DOI: {s.doi} <ExternalLink className="h-3 w-3" /></p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer data-testid="main-footer" className="bg-[#1F1F1F] text-[#CDCDCD] mt-10 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white"><Leaf className="h-5 w-5" /></span>
                <span className="font-heading font-extrabold text-white text-lg">5op.lt</span>
              </div>
              <p className="text-sm text-[#CDCDCD] leading-relaxed">Vitaminų ir papildų vartojimo planuoklė. Moksliškai pagrįstas laikas ir dozės.</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-3">Jūsų reklama</h4>
              <p className="text-sm text-[#CDCDCD] leading-relaxed">Norite reklamuoti savo prekės ženklo papildus šioje planuoklėje?</p>
              <a data-testid="partnership-contact-email-link" href="mailto:info@5op.lt" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300">
                <Mail className="h-4 w-4" /> info@5op.lt
              </a>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-3">Apsipirkite</h4>
              <a
                data-testid="footer-eshop-bright-cta-btn"
                href="https://5op.lt/parduotuve/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 text-slate-900 font-bold px-6 py-3 hover:bg-teal-400 active:scale-95 transition-all shadow-lg shadow-teal-500/20"
              >
                <ShoppingBag className="h-5 w-5" /> Apsilankyti el. parduotuvėje 5op.lt
              </a>
            </div>
          </div>
          <div data-testid="legal-disclaimer-footer" className="border-t border-[#2B2B2B] pt-6 text-xs text-slate-500 leading-relaxed">
            {DISCLAIMER}
          </div>
          <p className="text-xs text-[#CDCDCD]">© {new Date().getFullYear()} 5op.lt All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
