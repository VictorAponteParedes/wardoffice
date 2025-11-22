import { useState, useEffect } from "react";
import type { TopicType } from "../types/topics";

export function useTopics() {
    const [topics, setTopics] = useState<TopicType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setTopics([
                {
                    id: "1",
                    title: "La Fe",
                    description: "Discurso sobre la importancia de la fe en tiempos difíciles.",
                    tags: ["Fe", "Esperanza"],
                    lastUsed: "2025-10-01"
                },
                {
                    id: "2",
                    title: "El Arrepentimiento",
                    description: "El proceso de arrepentimiento y el perdón.",
                    tags: ["Arrepentimiento", "Expiación"],
                    lastUsed: "2025-09-15"
                },
                {
                    id: "3",
                    title: "La Caridad",
                    description: "El amor puro de Cristo.",
                    tags: ["Caridad", "Amor"],
                    lastUsed: "2025-11-10"
                }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const getTopic = (id: string) => {
        return topics.find(t => t.id === id);
    };

    return { topics, loading, error, getTopic };
}
