import { useState } from "react";
import { useUser } from "../context/UserContext";
import RecipeCard from "./RecipeCard";
import {format, parseISO} from "date-fns";

export default function Calendar() {
    const { data } = useUser();
    const profile = data.profiles[data.activeProfile];
    const [weekOffset, setWeekOffset] = useState(0);

    // Berechne Tage der Woche basierend auf weekOffset
    const days = getDaysOfWeek(weekOffset);

    function getDaysOfWeek(offset) {
        // Starttag der Woche (Montag)
        const start = new Date();
        start.setDate(start.getDate() + offset * 7);

        // optional: Montag als Wochenstart
        const day = start.getDay();
        const diff = (day === 0 ? -6 : 1) - day; // Montag = 1, Sonntag = 0
        start.setDate(start.getDate() + diff);

        // Erstelle Array von 7 Tagen
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            return d.toISOString().split("T")[0];
        });
    }

    return (
        <div>
            {/* Navigation */}
            <div className="flex justify-between items-center mb-4">
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setWeekOffset((w) => w - 1)}
                >
                    ← Vorherige Woche
                </button>
                <h2 className="text-lg font-semibold">
                    Woche vom {days[0]} bis {days[6]}
                </h2>
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setWeekOffset((w) => w + 1)}
                >
                    Nächste Woche →
                </button>
            </div>

            {/* Wochenübersicht */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {days.map((day) => (
                    <DayCard key={day} date={day} recipe={profile.calendar[day]?.recipe}/>
                ))}
            </div>
        </div>
    );
}

function DayCard({date, recipe}) {
    const {setRecipeForDay, data} = useUser();
    const [input, setInput] = useState("");
    const [editing, setEditing] = useState(false);
    const formattedDate = format(parseISO(date), "EEE dd.MM.")

    const handleSave = () => {
        if (!input.trim()) return;
        setRecipeForDay(data.activeProfile, date, input);
        setInput("");
        setEditing(false);
    };

    return (
        <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-2">
                <h2 className="card-title text-lg">{formattedDate}</h2>

                {recipe && !editing && (
                    <>
                        <RecipeCard recipe={recipe} />
                        <button
                            onClick={() => setEditing(true)}
                            className="btn btn-sm btn-outline mt-2"
                        >
                            Rezept ändern
                        </button>
                    </>
                )}

                {!recipe && !editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="btn btn-sm bg-white text-black hover:bg-gray-200 hover:text-black"
                    >
                        Rezept hinzufügen
                    </button>
                )}

                {editing && (
                    <div className="flex flex-col gap-2 mt-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Rezeptname..."
                            className="input input-bordered input-sm w-full"
                        />
                        <div className="flex gap-2">
                            <button onClick={handleSave} className="btn btn-sm bg-white text-black hover:bg-gray-200 hover:text-black">
                                Speichern
                            </button>
                            <button
                                onClick={() => setEditing(false)}
                                className="btn btn-outline btn-sm"
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
