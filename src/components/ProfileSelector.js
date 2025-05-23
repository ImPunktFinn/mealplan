import { useUser } from "../context/UserContext";

export default function ProfileSelector() {
    const { data, setActiveProfile } = useUser();
    return (
        <div className="mb-4">
            <label className="mr-2">Profil:</label>
            <select
                className="border p-1 rounded"
                value={data.activeProfile}
                onChange={(e) => setActiveProfile(e.target.value)}
            >
                {Object.keys(data.profiles).map((profile) => (
                    <option key={profile} value={profile}>
                        {profile}
                    </option>
                ))}
            </select>
        </div>
    );
}
