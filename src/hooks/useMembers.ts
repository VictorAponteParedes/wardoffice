// src/hooks/useMembers.ts
import { useState, useEffect } from "react";
import { mockMembers } from '../mocks/members'
import type { Member } from "../types/members";

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [filtered, setFiltered] = useState<Member[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simula fetch (cámbialo por API: await fetch("/api/members"))
        setTimeout(() => {
            setMembers(mockMembers);
            setFiltered(mockMembers);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let result = members;
        if (search) {
            result = result.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));
        }
        if (filter !== "all") {
            result = result.filter(m => m.status === filter);
        }
        setFiltered(result);
    }, [search, filter, members]);

    return { members: filtered, loading, error, search, setSearch, filter, setFilter };
};