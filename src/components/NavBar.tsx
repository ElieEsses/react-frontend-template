import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    if (!user) {
        return null;
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