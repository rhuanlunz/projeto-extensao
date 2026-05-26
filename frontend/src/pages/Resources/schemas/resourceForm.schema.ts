import { z } from "zod";

export const resourceFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  unescId: z.string().min(1, "O ID é obrigatório"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.enum(["Rack", "Switch", "Server", "Other"], {
    errorMap: () => ({ message: "Selecione uma categoria válida" }),
  }),
  floor: z.enum(["first-floor", "second-floor", "third-floor"], {
    errorMap: () => ({ message: "Selecione um andar válido" }),
  }),
  status: z.enum(["available", "unavailable"], {
    errorMap: () => ({ message: "Selecione um status válido" }),
  }),
});

export type ResourceFormValues = z.infer<typeof resourceFormSchema>;
