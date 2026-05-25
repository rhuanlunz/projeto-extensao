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

  // Hidratação para modo edição
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
      form.reset();
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden">
        <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto p-6 gap-8">
          {/* Lado Esquerdo: Imagem (Desktop) / Topo (Mobile) */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <ResourceFormImage imageUrl={initialData?.imageUrl} name={initialData?.name} />
          </div>

          {/* Lado Direito: Campos do Formulário */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Nome do Recurso</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Rack R-01" 
                        {...field} 
                        className="text-black bg-zinc-100" 
                        disabled={isSubmitting}
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
                    <FormLabel className="text-zinc-700">ID / Patrimônio</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 123456" 
                        {...field} 
                        className="text-black bg-zinc-100" 
                        disabled={isSubmitting}
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
                  <FormLabel className="text-zinc-700">Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva as especificações do recurso..." 
                      className="resize-none h-24 text-black bg-zinc-100" 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="text-black bg-zinc-100">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                    <FormLabel className="text-zinc-700">Andar</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="text-black bg-zinc-100">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {floorOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                    <FormLabel className="text-zinc-700">Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="text-black bg-zinc-100">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
        <div className="flex items-center justify-end gap-3 p-6 bg-zinc-50 border-t">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="hover:bg-zinc-200 text-zinc-600 font-medium px-8"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#0085FF] hover:bg-[#0074E0] text-white px-10 font-semibold transition-all active:scale-95"
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
const mapNumberToFloor = (floor: number): any => {
  switch (floor) {
    case 1: return "first-floor";
    case 2: return "second-floor";
    case 3: return "third-floor";
    default: return "first-floor";
  }
};
