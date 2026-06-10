import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/AuthCard";

function parseError(err: unknown): string {
    if (!(err instanceof Error)) return "Something went wrong";
    const match = err.message.match(/^API \d+: (.+)$/);
    if (match) {
        try {
            return JSON.parse(match[1]).detail ?? match[1];
        } catch {
            return match[1];
        }
    }
    return err.message;
}

export function SignupPage() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: { preventDefault(): void }) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signup(name, email, password);
            navigate("/");
        } catch (err) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard>
            <h1 className="text-2xl font-semibold">Create account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-md border border-neutral-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-md border border-neutral-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-md border border-neutral-300 px-3 py-2"
                    />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "Creating account…" : "Create account"}
                </button>
            </form>
            <p className="text-sm text-neutral-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium underline">
                    Sign in
                </Link>
            </p>
        </AuthCard>
    );
}
