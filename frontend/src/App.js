import "@/App.css";
import PlannerPage from "@/planner/PlannerPage";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <PlannerPage />
      <Toaster position="top-center" richColors />
    </>
  );
}
