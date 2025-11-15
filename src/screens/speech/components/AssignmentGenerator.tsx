// src/speech/components/AssignmentGenerator.tsx
// Subcomponente para la lógica de generación aleatoria
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useMembers } from "../../../hooks/useMembers";
import { TOPICS } from "../../../mocks/topics";



export default function AssignmentGenerator({ onGenerate }: { onGenerate: (assignment: any) => void }) {
    const { members } = useMembers();
    const [isGenerating, setIsGenerating] = useState(false);

    const generateAssignment = () => {
        if (members.length === 0) return;

        setIsGenerating(true);
        setTimeout(() => {
            const randomMember = members[Math.floor(Math.random() * members.length)];
            const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

            onGenerate({ member: randomMember, topic: randomTopic });
            setIsGenerating(false);
        }, 800);
    };

    return (
        <button
            onClick={generateAssignment}
            disabled={isGenerating || members.length === 0}
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary dark:bg-primary rounded-full font-medium shadow-lg hover:bg-primary dark:hover:bg-primary transition disabled:opacity-50 text-white"
        >
            <RotateCcw className="w-5 h-5 text-white" />
            {isGenerating ? "Generando asignación..." : "Generar Asignación Inspirada"}
        </button>
    );
}