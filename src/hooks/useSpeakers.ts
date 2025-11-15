// src/hooks/useSpeakers.ts
import { useState, useEffect } from "react";
import type { SpeakerType } from "../types/speech";

export function useSpeakers() {
    const [speakers, setSpeakers] = useState<SpeakerType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setSpeakers([
                {
                    id: "1",
                    name: "Hermano González",
                    topic: "La fe en los últimos días",
                    date: "2025-11-23",
                    calling: "Obispo"
                },
                {
                    id: "2",
                    name: "Hermana Martínez",
                    topic: "El amor cristiano",
                    date: "2025-11-30",
                    calling: "Maestra de Escuela Dominical"
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    return { speakers, loading, error };
}