import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { BrowserRouter, Routes, Route } from "react-router"

import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword.tsx"
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword.tsx"
import Login from "@/pages/Auth/Login/Login.tsx"
import Register from "./pages/Auth/Register/Register.tsx"

import { AuthGuard } from "@/shared/Auth/AuthGuard.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <AuthGuard>
              <Resources />
            </AuthGuard>
          }
        />

        <Route
          path="/autenticacao/login"
          element={<Login />}
        />

        <Route
          path="/autenticacao/cadastro"
          element={<Register />}
        />

        <Route
          path="/autenticacao/esqueci-minha-senha"
          element={<ForgotPassword />}
        />

        <Route
          path="/autenticacao/redefinir-senha"
          element={<ResetPassword />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>
)