import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCategory, updateCategory } from "../services/resourceForm.service";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(1, "O nome da categoria é obrigatório").max(255),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  initialData?: { id: number; name: string } | null;
}

export function CategoryFormModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: CategoryFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(initialData);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    values: {
      name: initialData?.name || "",
    },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing && initialData) {
        await updateCategory(initialData.id, values.name);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await createCategory(values.name);
        toast.success("Categoria criada com sucesso!");
      }
      form.reset();
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error(isEditing ? "Erro ao atualizar categoria." : "Erro ao criar categoria.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "h-12 rounded-xl px-4 text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all";
  const labelClasses = "text-[15px] font-semibold text-slate-700 mb-2";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm z-50" />
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none rounded-2xl z-50">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-slate-800">
              {isEditing ? "Editar Categoria" : "Nova Categoria"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Nome da Categoria</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Equipamentos de Rede" 
                        className={inputClasses}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="h-12 rounded-xl bg-primary hover:bg-primary/90 px-8">
                  {isSubmitting ? (isEditing ? "Salvando..." : "Criando...") : (isEditing ? "Salvar Alterações" : "Criar Categoria")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
