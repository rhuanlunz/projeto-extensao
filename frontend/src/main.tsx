import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Resources } from "@/Resources/Resources"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resources />} />
          <Route path="/autenticacao">
            <Route path="login" element={<Resources />} />
            <Route path="cadastro" element={<Resources />} />
          </Route>
          <Route path="*" element={<Resources />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
)
