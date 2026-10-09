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
    const saved = localStorage.getItem('planner_thanks_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [hasThanked, setHasThanked] = useState(() => {
    return localStorage.getItem('planner_has_thanked') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('planner_thanks_count', thanksCount);
  }, [thanksCount]);

  useEffect(() => {
    localStorage.setItem('planner_has_thanked', hasThanked);
  }, [hasThanked]);

  const handleThanksClick = () => {
    if (hasThanked) return;
    setThanksCount(prev => prev + 1);
    setHasThanked(true);
    toast.success("Ačiū už palaikymą! ❤️");
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
          href="https://5op.lt"
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
                                className="inline-flex items-center gap-1 text-
