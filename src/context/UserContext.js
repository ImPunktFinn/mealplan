import { createContext, useContext, useState } from "react";

const defaultData = {
    activeProfile: "Anna",
    profiles: {
        Anna: {
            dislikes: ["Pilze"],
            intolerances: ["Laktose"],
            calendar: {
                "2025-05-23": { recipe: "Veganes Curry" },
                "2025-05-24": { recipe: "Pasta mit Tomatensauce" }
            }
        },
        Tom: {
            dislikes: [],
            intolerances: ["Gluten"],
            calendar: {}
        }
    }
};

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);

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
        <UserContext.Provider value={{ data, setActiveProfile, setRecipeForDay }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
