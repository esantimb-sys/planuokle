export default function ReklamaPage() {
  return (
    <div className="min-h-screen bg-[#FAFBF9] p-8 text-slate-800">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Čia galėtų būti Jūsų produktas</h1>
        <p className="text-slate-600 leading-relaxed">
          Šioje vietoje galite reklamuoti savo maisto papildus, prekę ar paslaugą.
        </p>
        <p className="text-slate-600">
          Dėl partnerystės ir reklamos kreipkitės el. paštu: <a href="mailto:info@5op.lt" className="text-teal-600 font-semibold underline">info@5op.lt</a>
        </p>
      </div>
    </div>
  );
}
