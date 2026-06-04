import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { UsersPage } from "@/pages/UsersPage";

export function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-neutral-50 text-neutral-900">
                <nav className="flex gap-6 border-b border-neutral-200 bg-white px-6 py-4">
                    <Link to="/" className="font-medium hover:underline">
                        Home
                    </Link>
                    <Link to="/users" className="font-medium hover:underline">
                        Users
                    </Link>
                </nav>
                <main className="mx-auto max-w-2xl px-6 py-10">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/users" element={<UsersPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
