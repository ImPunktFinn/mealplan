import { useState } from "react";
import { useUser } from "../context/UserContext";
import Calendar from "./Calendar";
import {CalendarDaysIcon, UserIcon} from "@heroicons/react/16/solid";

export default function Tabs() {
    const [data, setData] = useState({
        activeProfile: "default",
        profiles: {
            default: {
                intolerances: [],
                dislikes: []
            }
        }
    });
    const [activeTab, setActiveTab] = useState("calendar");

    const profile = data.profiles[data.activeProfile];

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            profiles: {
                ...prev.profiles,
                [data.activeProfile]: {
                    ...prev.profiles[data.activeProfile],
                    [field]: value.split(",").map((s) => s.trim()),
                },
            },
        }));
    };

    return (
        <div className="p-4">
            <div className="tabs tabs-boxed mb-6">
                <button
                    className={`tab flex items-center gap-2 ${activeTab === "calendar" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("calendar")}
                >
                    <CalendarDaysIcon className="h-5 w-5"/>
                    Kalender
                </button>
                <button
                    className={`tab flex items-center gap-2 ${activeTab === "profile" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                >
                    <UserIcon className="h-5 w-5"/>
                    Mein Profil
                </button>
            </div>

            {activeTab === "calendar" && <Calendar/>}
            {activeTab === "profile" && (
                <div className="space-y-6 max-w-md">
                    <div>
                        <label className="block font-semibold mb-1">Unverträglichkeiten (Komma getrennt)</label>
                        <input
                            type="text"
                            value={profile.intolerances?.join(", ") || ""}
                            onChange={(e) => handleChange("intolerances", e.target.value)}
                            placeholder="z.B. Gluten, Laktose"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Dislikes (Komma getrennt)</label>
                        <input
                            type="text"
                            value={profile.dislikes?.join(", ") || ""}
                            onChange={(e) => handleChange("dislikes", e.target.value)}
                            placeholder="z.B. Spinat, Tomaten"
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
