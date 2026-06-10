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
import { Loader2, Server } from "lucide-react";
import { resourceFormSchema, type ResourceFormValues } from "../schemas/resourceForm.schema";
import { categoryOptions, floorOptions, statusOptions } from "../services/resourceForm.options";
import type { Resource } from "../services/resource.types";
import { useEffect, useState } from "react";
import { ROLES, hasPermission } from "@/lib/auth";

interface ResourceFormProps {
  initialData: Resource | null;
  onSubmit: (data: ResourceFormValues) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ResourceForm({ initialData, onSubmit, onDelete, onCancel, isSubmitting }: ResourceFormProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isEditing = Boolean(initialData);

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
        unescId: String(initialData.unesc_id),
        description: initialData.description || "",
        category: "Rack", // Mock fixo para agora
        floor: "first-floor", // Mock fixo para agora
        status: initialData.status === "disponivel" ? "available" : "unavailable",
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

  const handleProcessDelete = async () => {
    if (!initialData || !onDelete) return;
    
    const confirmed = window.confirm(`Tem certeza que deseja excluir o recurso "${initialData.name}"? Esta ação não pode ser desfeita.`);
    
    if (confirmed) {
      setIsDeleting(true);
      try {
        await onDelete(initialData.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const canDelete = isEditing && hasPermission([ROLES.ADMIN]);
  const isActionDisabled = isSubmitting || isDeleting;

  const inputClasses = "h-12 rounded-xl px-4 text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] transition-all";
  const labelClasses = "text-[15px] font-semibold text-slate-700 mb-2";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col lg:flex-row p-8 gap-8">
          {/* Lado Esquerdo: Imagem (Desktop) / Topo (Mobile) */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#E0F2FF] border border-blue-100 flex items-center justify-center p-6 md:aspect-auto md:h-full min-h-70">
              {initialData?.imageUrl ? (
                <img
                  src={initialData.imageUrl}
                  alt={initialData.name || "Preview do recurso"}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  width={400}
                  height={400}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700">
                  <Server className="h-20 w-20 text-[#0085FF]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Recurso Institucional
                  </span>
                </div>
              )}
              
              {/* Overlay decorativo institucional sutil */}
              <div className="absolute inset-0 bg-linear-to-tr from-blue-500/5 via-transparent to-white/50 pointer-events-none" />
            </div>
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
                        disabled={isActionDisabled}
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
                        disabled={isActionDisabled}
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
                      className="min-h-35 rounded-2xl p-4 leading-relaxed text-base bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#0056A4]/20 focus:border-[#0056A4] resize-none transition-all" 
                      {...field} 
                      disabled={isActionDisabled}
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
                      disabled={isActionDisabled}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue className="text-slate-900" placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 overflow-y-auto">
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
                      disabled={isActionDisabled}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue className="text-slate-900" placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 overflow-y-auto">
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
                      disabled={isActionDisabled}
                    >
                      <FormControl>
                        <SelectTrigger className={inputClasses}>
                          <SelectValue className="text-slate-900" placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 overflow-y-auto">
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
        <div className="flex items-center justify-between px-8 py-6 border-t">
          <div>
            {canDelete && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleProcessDelete}
                disabled={isActionDisabled}
                className="h-11 px-6 rounded-xl text-red-500 font-medium hover:bg-red-50 hover:text-red-600 transition-all"
              >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Excluir Recurso
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onCancel}
              disabled={isActionDisabled}
              className="h-11 px-6 rounded-xl text-slate-600 font-medium hover:bg-slate-100"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isActionDisabled}
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
        </div>
      </form>
    </Form>
  );
}
