export function AuthCard({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen items-center justify-center -mt-10">
            <div className="w-full max-w-sm space-y-6 rounded-xl bg-white p-8 shadow-md">
                {children}
            </div>
        </div>
    );
}