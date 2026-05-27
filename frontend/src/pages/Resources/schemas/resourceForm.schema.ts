import { z } from "zod";

export const resourceFormSchema = z.object({
  name: z.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(60, "O nome deve ter no máximo 60 caracteres"),
  unescId: z.string()
    .min(1, "O ID é obrigatório")
    .max(30, "O ID deve ter no máximo 30 caracteres"),
  description: z.string()
    .max(300, "A descrição deve ter no máximo 300 caracteres")
    .optional()
    .or(z.literal("")),
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
