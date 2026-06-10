import { useState, useEffect, useMemo } from "react";
import { getUserRole, ROLES, isValidToken, isTokenExpired } from "@/lib/auth";

export function useAuth() {
  const [role, setRole] = useState<number | null>(getUserRole());

  useEffect(() => {
    // Sincroniza a role caso o token mude no localStorage (ex: login/logout em outra aba)
    const handleStorageChange = () => {
      setRole(getUserRole());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isAdmin = useMemo(() => role === ROLES.ADMIN, [role]);
  const isTeacher = useMemo(() => role === ROLES.TEACHER, [role]);
  const isStudent = useMemo(() => role === ROLES.STUDENT, [role]);

  const isAuthenticated = useMemo(() => {
    const token = localStorage.getItem("access_token");
    return !!token && isValidToken(token) && !isTokenExpired(token);
  }, [role]);

  return {
    role,
    isAdmin,
    isTeacher,
    isStudent,
    isAuthenticated,
  };
}
