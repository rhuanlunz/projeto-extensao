import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import ForgotPassword from "@/Auth/ForgotPassword/ForgotPassword.tsx"
import ResetPassword from "@/Auth/ResetPassword/ResetPassword.tsx"
import Login from "@/Auth/Login/login.tsx"
import Register from "./Auth/Register/register"
import { Resources } from "@/Resources/Resources"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>

          <Route path="/autenticacao">
            <Route path="login" element={<Login />} />
            <Route path="cadastro" element={<Register />} />
            <Route path="esqueci-minha-senha" element={<ForgotPassword />} />
            <Route path="redefinir-senha" element={<ResetPassword />} />
          </Route>
        
          <Route path="/" element={<Resources />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
)
