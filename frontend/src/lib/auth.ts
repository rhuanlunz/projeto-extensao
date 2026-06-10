/**
 * Decodifica o payload de um token JWT (sem validar a assinatura).
 */
export function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar JWT:", error);
    return null;
  }
}

/**
 * Obtém a role do usuário autenticado a partir do token.
 */
export function getUserRole(): number | null {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const payload = decodeJWT(token);
  return payload?.role_id ?? null;
}

/**
 * Verifica se o usuário autenticado possui permissão baseada em uma lista de roles permitidas.
 */
export function hasPermission(allowedRoles: number[]): boolean {
  const userRole = getUserRole();
  if (userRole === null) return false;
  return allowedRoles.includes(userRole);
}

/**
 * Constantes de Roles do Backend
 */
export const ROLES = {
  ADMIN: 1,
  TEACHER: 2,
  STUDENT: 3,
} as const;
