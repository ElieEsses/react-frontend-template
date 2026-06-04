import { useState } from "react";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";

interface SampleData {
    id: number;
    email: string;
    is_active: boolean;
}

export function UsersPage() {
    const { data: users, loading, error } = useFetch<SampleData[]>("/users");
    const [email, setEmail] = useState("");

    async function addUser() {
        await api<SampleData>("/users", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
        setEmail("");
        window.location.reload();
    }

    if (loading) return <p className="text-neutral-500">Loading…</p>;
    if (error) return <p className="text-red-600">Failed: {error.message}</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Users</h1>
            <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
                {users?.map((u) => (
                    <li key={u.id} className="flex justify-between px-4 py-3">
                        <span>{u.email}</span>
                        <span
                            className={
                                u.is_active ? "text-green-600" : "text-neutral-400"
                            }
                        >
                            {u.is_active ? "active" : "inactive"}
                        </span>
                    </li>
                ))}
                {users?.length === 0 && (
                    <li className="px-4 py-3 text-neutral-500">No users yet.</li>
                )}
            </ul>
            <div className="flex gap-2">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 rounded-md border border-neutral-300 px-3 py-2"
                />
                <button
                    onClick={addUser}
                    disabled={!email.trim()}
                    className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
