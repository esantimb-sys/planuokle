import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Sunrise, Sun, Dumbbell, Activity, Moon, BedDouble, FlaskConical, ShieldAlert,
  Download, Link2, Plus, Trash2, ExternalLink, Mars, Venus, Baby, Leaf, Clock,
  CircleCheck, Beaker, AlertTriangle, ShoppingBag, Mail, ChevronDown,
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
  SUPPLEMENTS, TIME_BLOCKS, CATEGORIES, PARTNERS, SOURCES, BLOCK_OPTIONS,
  doseFor, stomachText, getWarnings,
} from "@/planner/data";

const ICONS = { Sunrise, Sun, Dumbbell, Activity, Moon, BedDouble };

const HERO_IMG =
  "https://images.unsplash.com/photo-1707129785947-ddc627a8bab9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

const DISCLAIMER =
  "SVARBU / TEISINĖ INFORMACIJA: Ši svetainė ir joje pateikiama informacija yra tik rekomendacinio bei šviečiamojo pobūdžio. Planuoklio pateikiami duomenys, dozės ir laikai negali būti traktuojami kaip medicininė diagnozė, gydymo skyrimas ar sveikatos priežiūros specialisto konsultacija. Prieš pradedant vartoti bet kokius maisto papildus ar keičiant jų dozes, būtina pasitarti su gydytoju arba gydytoju dietologu. Svetainės administracija neprisiima atsakomybės už sprendimus, priimtus remiantis šio įrankio informacija.";

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
    selected: Array.isArray(s?.selected) ? s.selected : ["d3k2", "omega3", "magnis-glicinatas"],
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
  const captureRef = useRef(null);

  const buildShareUrl = () => {
    const code = encodeState({ profile, sensitive, selected, custom });
    return `${window.location.origin}${window.location.pathname}?p=${code}`;
  };

  // Sync to URL
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
    setCustom((prev) => [...prev, { id: `c-${Date.now()}`, name: cName.trim(), dose: cDose.trim(), block: cBlock }]);
    setCName("");
    setCDose("");
    toast.success("Papildas pridėtas į grafiką");
  };

  const warnings = useMemo(() => getWarnings(selected, profile), [selected, profile]);

  // Build schedule: block -> items
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
      map[c.block].push({ key: c.id, name: c.name, dose: c.dose || "—", note: "Jūsų pridėtas papildas.", stomach: "Pagal etiketę", isCustom: true });
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

  const exportAs = async (type) => {
    if (!captureRef.current) return;
    const t = toast.loading("Ruošiamas grafikas...");
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(captureRef.current, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      if (type === "png") {
        const link = document.createElement("a");
        link.download = "5op-planuoklis.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } else {
        const { default: jsPDF } = await import("jspdf");
        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageW = 210;
        const pageH = 297;
        const imgH = (canvas.height * pageW) / canvas.width;
        let heightLeft = imgH;
        let position = 0;
        pdf.addImage(img, "PNG", 0, position, pageW, imgH);
        heightLeft -= pageH;
        while (heightLeft > 0) {
          position -= pageH;
          pdf.addPage();
          pdf.addImage(img, "PNG", 0, position, pageW, imgH);
          heightLeft -= pageH;
        }
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
      {/* Header */}
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
            <span className="block text-[11px] text-slate-500 -mt-0.5">Papildų vartojimo Planuoklis</span>
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-amber-50/30 to-teal-50/60 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <FlaskConical className="h-3.5 w-3.5" /> Moksliškai pagrįsta
            </span>
            <h1 className="mt-5 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Vitaminų ir papildų <span className="text-teal-600">vartojimo laiko</span> planuoklis
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
        {/* Legal disclaimer top */}
        <div
          data-testid="legal-disclaimer-top-banner"
          className="bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-900 text-sm flex gap-3 items-start leading-relaxed"
        >
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <p>{DISCLAIMER}</p>
        </div>

        <div id="planuoklis" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile */}
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

            {/* Supplements */}
            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
              <h2 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 text-sm font-bold">2</span>
                Pasirinkite papildus
              </h2>

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
                        </span>
                      </label>
                    );
                  })}
                </div>
              ))}

              {/* Custom supplement */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">Pridėkite savo papildą</h3>
                <Input data-testid="custom-supplement-text-input" placeholder="Papildo pavadinimas" value={cName} onChange={(e) => setCName(e.target.value)} />
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
                    {custom.map((c) => (
                      <li key={c.id} className="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
                        <span className="truncate"><b>{c.name}</b> {c.dose && `· ${c.dose}`}</span>
                        <button data-testid={`custom-remove-${c.id}`} onClick={() => setCustom((p) => p.filter((x) => x.id !== c.id))} className="text-rose-500 hover:text-rose-700 shrink-0 ml-2">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Partner sidebar */}
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
                  <a href="https://5op.lt" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 shrink-0">
                    Įsigyti <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
              <p className="text-[11px] text-slate-400 px-1">Reklaminė vieta partneriams — susisiekite: partneryste@5op.lt</p>
            </section>
          </div>

          {/* RIGHT: schedule */}
          <div className="lg:col-span-7 space-y-6">
            {/* Export bar */}
            <div className="flex flex-wrap gap-3 items-center justify-between bg-slate-100/80 p-4 rounded-xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-teal-600" /> Jūsų asmeninis grafikas
              </p>
              <div className="flex gap-2">
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

            {/* Interaction warnings */}
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

            {/* Schedule capture area */}
            <div ref={captureRef} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="font-heading text-xl font-extrabold text-slate-900">Dienos grafikas</p>
                  <p className="text-sm text-slate-500">Profilis: <b className="text-teal-700">{profileLabel}</b>{sensitive && " · Jautrus virškinimas"}</p>
                </div>
                <span className="text-xs font-bold text-slate-400">5op.lt</span>
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
                        <div key={item.key} className="px-4 py-3.5">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                            <span className="shrink-0 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">{item.dose}</span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full font-medium">
                              <Clock className="h-3 w-3" /> {item.stomach}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-slate-500 leading-relaxed">{item.note}</p>
                          {!item.isCustom && (
                            <a href="https://5op.lt" target="_blank" rel="noopener noreferrer" data-testid={`partner-buy-external-link-${item.key}`}
                              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900">
                              <ShoppingBag className="h-3.5 w-3.5" /> Rekomenduojamas pasirinkimas / Kur įsigyti
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">Tik informaciniais tikslais. Pasitarkite su gydytoju. 5op.lt</p>
            </div>
          </div>
        </div>

        {/* Scientific sources */}
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

      {/* Footer */}
      <footer data-testid="main-footer" className="bg-slate-900 text-slate-300 mt-10 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white"><Leaf className="h-5 w-5" /></span>
                <span className="font-heading font-extrabold text-white text-lg">5op.lt</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Vitaminų ir papildų vartojimo planuoklis. Moksliškai pagrįstas laikas ir dozės.</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-3">Partnerystė</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Norite reklamuoti savo prekės ženklo papildus šiame planuoklyje?</p>
              <a data-testid="partnership-contact-email-link" href="mailto:partneryste@5op.lt" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300">
                <Mail className="h-4 w-4" /> partneryste@5op.lt
              </a>
            </div>
            <div className="flex flex-col items-start md:items-end justify-start">
              <h4 className="font-heading font-bold text-white mb-3">Apsipirkite</h4>
              <a
                data-testid="footer-eshop-bright-cta-btn"
                href="https://5op.lt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 text-slate-900 font-bold px-6 py-3 hover:bg-teal-400 active:scale-95 transition-all shadow-lg shadow-teal-500/20"
              >
                <ShoppingBag className="h-5 w-5" /> Apsilankyti el. parduotuvėje 5op.lt
              </a>
            </div>
          </div>
          <div data-testid="legal-disclaimer-footer" className="border-t border-slate-800 pt-6 text-xs text-slate-500 leading-relaxed">
            {DISCLAIMER}
          </div>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} 5op.lt · Visos teisės saugomos.</p>
        </div>
      </footer>
    </div>
  );
}
