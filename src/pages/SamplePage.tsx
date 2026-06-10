import { useState } from "react";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";

interface SampleData {
    id: number;
    title: string;
}

export function SamplePage() {
    const { data: data, loading, error } = useFetch<SampleData[]>("/data");
    const [title, setTitle] = useState("");

    async function addData() {
        await api<SampleData>("/data", {
            method: "POST",
            body: JSON.stringify({ title }),
        });
        setTitle("");
        window.location.reload();
    }

    if (loading) return <p className="text-neutral-500">Loading…</p>;
    if (error) return <p className="text-red-600">Failed: {error.message}</p>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Sample Data</h1>
            <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
                {data?.map((item) => (
                    <li key={item.id} className="flex justify-between px-4 py-3">
                        <span>{item.title}</span>
                    </li>
                ))}
                {data?.length === 0 && (
                    <li className="px-4 py-3 text-neutral-500">No sample data yet.</li>
                )}
            </ul>
            <div className="flex gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="flex-1 rounded-md border border-neutral-300 px-3 py-2"
                />
                <button
                    onClick={addData}
                    disabled={!title.trim()}
                    className="rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
