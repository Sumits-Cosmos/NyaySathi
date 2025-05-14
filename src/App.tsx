
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Templates from "./pages/Templates";
import Lawyers from "./pages/Lawyers";
import NotFound from "./pages/NotFound";
import Assistan from "./pages/Assistant";
import Assistant from "./pages/Assistant";
import LawyerDashboard from "./pages/LawyerDashboard";

// Adding console logs to help debug the Shield component issue
console.log("App.tsx loaded");

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="legal-assistant" element={<Assistant/>}/>
          <Route path="lawyer-dashboard" element={<LawyerDashboard/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
