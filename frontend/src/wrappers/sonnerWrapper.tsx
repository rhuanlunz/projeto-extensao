import { AlertCircle, CircleCheck } from "lucide-react";
import { toast } from "sonner";

export function showErrorMessage(description: string) {
    toast.error(description, {
        position: "top-center",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        style: {
            border: "1px solid hsl(var(--destructive))",
            background: "#ffefef"
        }
    });
}

export function showSuccessMessage(description: string) {
    toast.success(description, {
        position: "top-center",
        icon: <CircleCheck className="h-5 w-5 text-green-500" />,
        style: {
            border: "1px solid hsl(var(--destructive))",
            background: "#efffef"
        }
    })
}