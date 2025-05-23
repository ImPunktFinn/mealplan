import { useState } from "react";
import { useUser } from "../context/UserContext";
import RecipeCard from "./RecipeCard";

export default function Calendar() {
    const { data, setRecipeForDay } = useUser();
    const profile = data.profiles[data.activeProfile];

    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().split("T")[0];
    });

    return (
        <div className="grid grid-cols-2 gap-4">
            {days.map((day) => (
                <DayCard key={day} date={day} recipe={profile.calendar[day]?.recipe} />
            ))}
        </div>
    );
}

function DayCard({ date, recipe }) {
    const { setRecipeForDay, data } = useUser();
    const [input, setInput] = useState("");
    const [editing, setEditing] = useState(false);

    const handleSave = () => {
        setRecipeForDay(data.activeProfile, date, input);
        setInput("");
        setEditing(false);
    };

    return (
        <div className="border rounded p-3">
            <div className="font-semibold">{date}</div>
            {recipe && !editing && (
                <>
                    <RecipeCard recipe={recipe} />
                    <button
                        onClick={() => setEditing(true)}
                        className="text-blue-600 text-sm mt-1"
                    >
                        Ändern
                    </button>
                </>
            )}

            {!recipe && !editing && (
                <button
                    onClick={() => setEditing(true)}
                    className="mt-2 text-sm text-blue-500 underline"
                >
                    Rezept hinzufügen
                </button>
            )}

            {editing && (
                <div className="mt-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Rezeptname..."
                        className="border p-1 w-full rounded"
                    />
                    <button
                        onClick={handleSave}
                        className="mt-1 bg-green-500 text-white px-2 py-1 rounded text-sm"
                    >
                        Speichern
                    </button>
                </div>
            )}
        </div>
    );
}
