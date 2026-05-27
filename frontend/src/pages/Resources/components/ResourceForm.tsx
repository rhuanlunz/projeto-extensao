import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { resourceFormSchema, type ResourceFormValues } from "../schemas/resourceForm.schema";
import { categoryOptions, floorOptions, statusOptions } from "../services/resourceForm.options";
import { ResourceFormImage } from "./ResourceFormImage";
import type { Resource } from "../services/resource.types";
import { useEffect } from "react";

interface ResourceFormProps {
  initialData: Resource | null;
  onSubmit: (data: ResourceFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ResourceForm({ initialData, onSubmit, onCancel, isSubmitting }: ResourceFormProps) {
  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      name: "",
      unescId: "",
      description: "",
      category: "Rack",
      floor: "first-floor",
      status: "available",
    },
  });

  // Blindagem do Reset do RHF: Hidratação segura para modo edição
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        unescId: initialData.id,
        description: initialData.description || "",
        category: "Rack", // Mock fixo para agora
        floor: mapNumberToFloor(initialData.floor),
        status: initialData.status,
      });
    } else {
      form.reset({
        name: "",
        unescId: "",
        description: "",
        category: "Rack",
        floor: "first-floor",
        status: "available",
      });
    }
  }, [initialData, form]);

  const inputClasses = "h-12 rounded-xl px-4 text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all";
  const labelClasses = "text-[15px] font-semibold text-slate-700 mb-2";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col lg:flex-row p-8 gap-8">
          {/* Lado Esquerdo: Imagem (Desktop) / Topo (Mobile) */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <ResourceFormImage imageUrl={initialData?.imageUrl} name={initialData?.name} />
          </div>

          {/* Lado Direito: Campos do Formulário */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Nome do Recurso</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Rack R-01" 
                        {...field} 
                        className={inputClasses}
                        disabled={isSubmitting}
                        maxLength={60}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unescId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>ID / Patrimônio</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 123456" 
                        {...field} 
                        className={inputClasses}
                        disabled={isSubmitting}
                        maxLength={30}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClasses}>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Adicione uma descrição do recurso (Opcional)" 
                      className="min-h-[140px] rounded-2xl p-4 leading-relaxed text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] resize-none transition-all" 
                      {...field} 
                      disabled={isSubmitting}
                      maxLength={300}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue className="text-slate-900" placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[240px] overflow-y-auto">
                        {categoryOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value} className="text-slate-900">{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Andar</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue className="text-slate-900" placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[240px] overflow-y-auto">
                        {floorOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value} className="text-slate-900">{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClasses}>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue className="text-slate-900" placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[240px] overflow-y-auto">
                        {statusOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value} className="text-slate-900">{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Rodapé: Ações */}
        <div className="flex items-center justify-end gap-4 px-8 py-6 border-t">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-11 px-6 rounded-xl text-slate-600 font-medium hover:bg-slate-100"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="h-11 px-8 rounded-xl bg-[#0085FF] hover:bg-[#0074E0] text-white font-semibold transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Recurso"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Auxiliar para mapear número para string do form
const mapNumberToFloor = (floor: number): ResourceFormValues["floor"] => {
  switch (floor) {
    case 1: return "first-floor";
    case 2: return "second-floor";
    case 3: return "third-floor";
    default: return "first-floor";
  }
};
