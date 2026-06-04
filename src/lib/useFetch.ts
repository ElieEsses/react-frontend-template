import { useEffect, useState } from "react";
import { api } from "@/lib/api";

// Minimal data-fetching hook. No caching — refetches on mount.
// If you later want caching/dedup/refetch, swap this for TanStack Query.
export function useFetch<T>(path: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let active = true;
        setLoading(true);
        api<T>(path)
            .then((d) => active && setData(d))
            .catch((e) => active && setError(e))
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, [path]);

    return { data, loading, error };
}
