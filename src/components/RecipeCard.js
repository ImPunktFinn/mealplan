export default function RecipeCard({ recipe }) {
    if (!recipe) return <div className="text-gray-400">Kein Rezept geplant</div>;
    return <div className="mt-1">{recipe}</div>;
}
