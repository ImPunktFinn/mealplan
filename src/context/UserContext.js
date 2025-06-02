import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const defaultData = {
    activeProfile: "Anna",
    profiles: {
        Anna: {
            dislikes: ["Pilze"],
            intolerances: ["Laktose"],
            calendar: {
                "2025-05-23": { recipe: "Veganes Curry" },
                "2025-05-24": { recipe: "Pasta mit Tomatensauce" },
            },
        },
        Tom: {
            dislikes: [],
            intolerances: ["Gluten"],
            calendar: {},
        },
    },
};

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Async Funktion innerhalb useEffect
        const fetchSession = async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching session:", error);
            } else {
                setUser(session?.user ?? null);
            }
        };

        fetchSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    // Auth-Funktionen
    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data.user;
    };

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    // Profile-Funktionen
    const setActiveProfile = (name) => {
        setData((prev) => ({ ...prev, activeProfile: name }));
    };

    const setRecipeForDay = (profileName, day, recipe) => {
        setData((prev) => {
            const updated = { ...prev };
            if (!updated.profiles[profileName].calendar) {
                updated.profiles[profileName].calendar = {};
            }
            updated.profiles[profileName].calendar[day] = { recipe };
            return updated;
        });
    };

    return (
        <UserContext.Provider
            value={{
                data,
                setActiveProfile,
                setRecipeForDay,
                user,
                signUp,
                signIn,
                signOut,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
