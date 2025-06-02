import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function AuthModal({ onClose }) {
    const { signIn, signUp } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isRegister) {
                await signUp(email, password);
            } else {
                await signIn(email, password);
            }
            onClose();
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">
                    {isRegister ? "Registrieren" : "Login"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Bitte warten..." : isRegister ? "Registrieren" : "Login"}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <button
                        className="link link-primary"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? "Bereits registriert? Login" : "Neues Konto? Registrieren"}
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost"
                    aria-label="Close modal"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
