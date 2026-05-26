import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordComponentProps {
    id: string;
    name: string;
    placehoder: string;
    value: string;
    onChange: (value: string) => void
};

export default function PasswordInput({ id, name, placehoder, value, onChange }: PasswordComponentProps) {
    const [ showPassword, setShowPassword ] = useState(true);

    return (
        <div className="relative">
            <Input 
                id={id}
                name={name}
                placeholder={placehoder}
                value={value}
                onChange={e => onChange(e.target.value)}
                type={showPassword ? 'password' : 'text'} 
                className="p-5 rounded-lg bg-gray-100 border-0 text-black"
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
                {showPassword ? (
                    <Eye size={20} />
                ) : (
                    <EyeOff size={20} />
                )}
            </button>
        </div>
    );
}