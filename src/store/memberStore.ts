// src/store/memberStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Member } from '../types/members';

interface MemberState {
    members: Member[];
    addMember: (member: Member) => void;
    updateMember: (id: string, updates: Partial<Member>) => void;
    setMembers: (members: Member[]) => void;
}

export const useMemberStore = create<MemberState>()(
    persist(
        (set) => ({
            members: [],
            addMember: (member) =>
                set((state) => ({ members: [...state.members, member] })),
            updateMember: (id, updates) =>
                set((state) => ({
                    members: state.members.map((m) =>
                        m.id === id ? { ...m, ...updates } : m
                    ),
                })),
            setMembers: (members) => set({ members }),
        }),
        {
            name: 'ward-members',
        }
    )
);