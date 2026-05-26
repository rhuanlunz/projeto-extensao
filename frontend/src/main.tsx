import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword.tsx"
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword.tsx"
import Login from "@/pages/Auth/Login/Login.tsx"
import Register from "./pages/Auth/Register/Register.tsx"
import { Resources } from "@/pages/Resources/Resources.tsx"
import  NotFound  from "@/pages/NotFound/NotFound.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>

          <Route path="/autenticacao">
            <Route path="login" element={<Login />} />
            <Route path="cadastro" element={<Register />} />
            <Route path="esqueci-minha-senha" element={<ForgotPassword />} />
            <Route path="redefinir-senha" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        
          <Route path="/" element={<Resources />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
)
