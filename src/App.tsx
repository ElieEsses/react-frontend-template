import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { SamplePage } from "@/pages/SamplePage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    return (
        <nav className="flex items-center gap-6 border-b border-neutral-200 bg-white px-6 py-4">
            {user && (
                <>
                    <Link to="/" className="font-medium hover:underline">
                        Home
                    </Link>
                    <Link to="/sample" className="font-medium hover:underline">
                        Sample
                    </Link>
                </>
            )}
            <div className="ml-auto flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm text-neutral-500">{user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium hover:underline"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="text-sm font-medium hover:underline">
                        Sign in
                    </Link>
                )}
            </div>
        </nav>
    );
}

export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-neutral-50 text-neutral-900">
                    <NavBar />
                    <main className="mx-auto max-w-2xl px-6 py-10">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/sample" element={<SamplePage />} />
                            </Route>
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}
