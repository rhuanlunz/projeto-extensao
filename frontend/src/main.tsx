import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword.tsx"
import ResetPassword from "./Auth/ResetPassword/ResetPassword.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/autenticacao">
          {/* <Route path="login" element={} />
          <Route path="cadastro" element={} /> */}
          <Route path="esqueci-minha-senha" element={<ForgotPassword />} />
          <Route path="redefinir-senha" element={<ResetPassword />} />
        </Route>
      
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
