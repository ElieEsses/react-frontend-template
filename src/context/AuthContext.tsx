import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api<User>("/auth/me")
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    async function login(email: string, password: string) {
        await api("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const me = await api<User>("/auth/me");
        setUser(me);
    }

    async function signup(name: string, email: string, password: string) {
        await api<User>("/auth/signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        });
        const me = await api<User>("/auth/me");
        setUser(me);
    }

    async function logout() {
        await api("/auth/logout", { method: "POST" });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
