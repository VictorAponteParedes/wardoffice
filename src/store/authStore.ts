// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'bishop' | 'clerk';
    ward: string;
};

type AuthState = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    setUser: (user: User | null) => void;
};

// Simulamos API real (cámbialo por tu backend después)
const fakeApiLogin = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "bishop@ward.org" && password === "jesus123") {
                resolve({
                    id: "1",
                    email: "bishop@ward.org",
                    name: "Bishop Johnson",
                    role: "bishop",
                    ward: "Provo 5th Ward",
                });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1200);
    });
};

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                try {
                    const user = await fakeApiLogin(email, password);
                    const fakeToken = "jwt-sud-" + Date.now();

                    set({
                        user,
                        token: fakeToken,
                        isAuthenticated: true,
                    });
                    return true;
                } catch {
                    set({ user: null, token: null, isAuthenticated: false });
                    return false;
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: "sud-backoffice-auth", // guarda en localStorage
        }
    )
);