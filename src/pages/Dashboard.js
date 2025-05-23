import Calendar from "../components/Calendar";
import ProfileSelector from "../components/ProfileSelector";

export default function Dashboard() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Essensplaner</h1>
            <ProfileSelector />
            <Calendar />
        </div>
    );
}
