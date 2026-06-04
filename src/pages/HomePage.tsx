export function HomePage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Vite + React + FastAPI</h1>
            <p className="text-neutral-600">
                Lean starter. One folder, flat files. Add structure when you
                actually need it.
            </p>
            <p className="text-sm text-neutral-500">
                <code>api.ts</code> talks to FastAPI, <code>useFetch.ts</code> is a
                tiny data hook, and each screen is one file like{" "}
                <code>UsersPage.tsx</code>.
            </p>
        </div>
    );
}
