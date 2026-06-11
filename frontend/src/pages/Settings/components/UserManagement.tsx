import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers, updateUserRole, type User } from "../services/settings.service";
import { toast } from "sonner";
import { Users, ShieldCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  { id: 1, name: "admin", label: "Administrador" },
  { id: 2, name: "teacher", label: "Professor" },
  { id: 3, name: "student", label: "Aluno" },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      toast.error("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, roleId: string) => {
    try {
      await updateUserRole(userId, parseInt(roleId));
      toast.success("Role do usuário atualizada!");
      fetchUsers();
    } catch {
      toast.error("Erro ao atualizar role do usuário.");
    }
  };

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Gerenciamento de Usuários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 text-slate-500">
              <tr>
                <th className="pb-3 pl-2 font-medium">Nome</th>
                <th className="pb-3 font-medium">E-mail</th>
                <th className="pb-3 font-medium">Cargo (Role)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pl-2 font-medium text-slate-700">{user.name}</td>
                  <td className="py-4 text-slate-500">{user.email}</td>
                  <td className="py-4">
                    <Select
                      defaultValue={user.role.id.toString()}
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-[180px] h-11 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all">
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            <div className="flex items-center gap-2">
                              {role.name === 'admin' && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                              {role.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
