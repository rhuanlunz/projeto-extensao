import { z } from "zod";

export const resourceFormSchema = z.object({
  name: z.string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(60, "O nome deve ter no máximo 60 caracteres"),
  unescId: z.string()
    .min(1, "O ID é obrigatório")
    .max(50, "O ID deve ter no máximo 50 caracteres"),
  description: z.string()
    .max(300, "A descrição deve ter no máximo 300 caracteres")
    .optional()
    .or(z.literal("")),
  category_id: z.coerce.number({ required_error: "Selecione uma categoria válida" }),
  level_id: z.coerce.number({ required_error: "Selecione um andar válido" }),
  status: z.enum(["disponivel", "indisponivel"], {
    errorMap: () => ({ message: "Selecione um status válido" }),
  }),
});

export type ResourceFormValues = z.infer<typeof resourceFormSchema>;
