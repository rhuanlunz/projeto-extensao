import { Navigate } from "react-router";
import { ReactNode } from "react";
import { isValidToken, isTokenExpired } from "@/lib/auth";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const token = localStorage.getItem("access_token");

  // Hardening: Validação de existência, estrutura e expiração
  if (!token || !isValidToken(token) || isTokenExpired(token)) {
    // Limpeza de segurança em caso de token inválido ou expirado
    if (token) {
      localStorage.removeItem("access_token");
    }
    return <Navigate to="/autenticacao/login" replace />;
  }

  return <>{children}</>;
}
