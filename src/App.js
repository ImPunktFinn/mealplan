import { useState } from "react";
import { UserProvider, useUser } from "./context/UserContext";
import Tabs from "./components/Tabs";
import LoginPopup from "./components/Auth/AuthModal"; // Login-Popup-Komponente (erstelle ich gleich)

function AppContent() {
    const { user, signOut } = useUser();
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            {/* Login-Bereich oben rechts */}
            <div className="flex justify-end mb-4">
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold">Hallo, {user.email}</span>
                        <button
                            onClick={signOut}
                            className="btn btn-outline btn-sm"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowLogin(true)}
                        className="btn btn-primary btn-sm"
                    >
                        Login / Register
                    </button>
                )}
            </div>

            {/* Tabs (Kalender & Profil) */}
            <Tabs />

            {/* Login-Popup */}
            {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
        </div>
    );
}

export default function App() {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
}
