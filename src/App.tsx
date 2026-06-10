import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { SamplePage } from "@/pages/SamplePage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { NavBar } from "@/components/NavBar";


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
