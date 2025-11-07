import { useFormContext } from "react-hook-form";
import { Camera } from "lucide-react";
import { useState } from "react";

interface Props {
    name: string;
    label: string;
    control: any;
}

export const ImageInput = ({ name, label }: Props) => {
    const { setValue, watch } = useFormContext();
    const [preview, setPreview] = useState<string | null>(null);
    const file = watch(name);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(name, file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-blue-400">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <Camera className="text-blue-500" size={32} />
                        </div>
                    )}
                </div>
                <label className="mt-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    <Camera size={16} /> Subir Foto
                    <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </label>
            </div>
        </div>
    );
};