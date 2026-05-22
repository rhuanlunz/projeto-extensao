import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword.tsx"
import ResetPassword from "./Auth/ResetPassword/ResetPassword.tsx"
import { Resources } from "@/Resources/Resources"
import Login from "./Auth/Login/login"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>

          <Route path="/autenticacao">
            <Route path="login" element={<Login />} />
            {* <Route path="cadastro" element={<App />} /> *}
            <Route path="esqueci-minha-senha" element={<ForgotPassword />} />
            <Route path="redefinir-senha" element={<ResetPassword />} />
          </Route>
        
          <Route path="/" element={<Resources />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
)
