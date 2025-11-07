// src/hooks/useMembers.ts
import { useState, useEffect, useCallback } from "react";
import { mockMembers } from '../mocks/members';
import type { Member } from "../types/members";
import { useMemberStore } from "../store/memberStore";

export const useMembers = () => {
    const { members: storeMembers, addMember, setMembers } = useMemberStore();
    const [filtered, setFiltered] = useState<Member[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carga inicial desde mock o API
    useEffect(() => {
        const loadMembers = async () => {
            try {
                // Simula fetch (futuro: await fetch("/api/members"))
                setTimeout(() => {
                    const initial = storeMembers.length > 0 ? storeMembers : mockMembers;
                    setMembers(initial); // Persiste en Zustand
                    setLoading(false);
                }, 1000);
            } catch (err) {
                setError("Error al cargar miembros");
                setLoading(false);
            }
        };
        loadMembers();
    }, [setMembers, storeMembers]);

    // Filtrado dinámico
    useEffect(() => {
        let result = storeMembers;
        if (search) {
            result = result.filter(m =>
                m.name.toLowerCase().includes(search.toLowerCase()) ||
                m.email?.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filter !== "all") {
            result = result.filter(m => m.status === filter);
        }
        setFiltered(result);
    }, [search, filter, storeMembers]);

    // CREAR MIEMBRO (integrado aquí)
    const createMember = useCallback((data: Omit<Member, 'id'>): string => {
        const id = Date.now().toString();
        const newMember: Member = {
            ...data,
            id,
            status: 'active',
            lastTalk: null,
            attendance: []
        };
        addMember(newMember);
        return id;
    }, [addMember]);

    return {
        members: filtered,
        loading,
        error,
        search,
        setSearch,
        filter,
        setFilter,
        createMember // ¡NUEVA FUNCIÓN!
    };
};