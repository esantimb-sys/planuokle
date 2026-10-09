import "@/App.css";
import PlannerPage from "@/planner/PlannerPage";
import ReklamaPage from "./ReklamaPage";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const isReklama = params.get("page") === "reklama";

  return (
    <>
      {isReklama ? <ReklamaPage /> : <PlannerPage />}
      <Toaster position="top-center" richColors />
    </>
  );
}
