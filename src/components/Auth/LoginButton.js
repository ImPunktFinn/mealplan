import { useState } from "react";
import AuthModal from "./AuthModal";
import { useUser } from "../../context/UserContext";

export default function LoginButton() {
    const { user, signOut } = useUser();
    const [open, setOpen] = useState(false);

    if (user) {
        return (
            <button
                onClick={() => signOut()}
                className="btn btn-sm btn-outline ml-auto"
                title="Logout"
            >
                Logout
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="btn btn-sm btn-primary ml-auto"
            >
                Login
            </button>
            {open && <AuthModal onClose={() => setOpen(false)} />}
        </>
    );
}
