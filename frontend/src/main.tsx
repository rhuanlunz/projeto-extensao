import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter, Routes, Route } from "react-router"
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword.tsx"
import ResetPassword from "./Auth/ResetPassword/ResetPassword.tsx"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/autenticacao">
            <Route path="login" element={<App />} />
            <Route path="cadastro" element={<App />} />
            <Route path="esqueci-minha-senha" element={<ForgotPassword />} />
            <Route path="redefinir-senha" element={<ResetPassword />} />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
