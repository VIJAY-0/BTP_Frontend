export default function CategoryTag({ category }) {
  const color =
    category === 'High Contamination' ? 'bg-red-500' :
    category === 'Medium Contamination' ? 'bg-yellow-400' :
    'bg-green-500';

  return (
    <div className={`inline-block px-4 py-2 text-white rounded-full ${color} mb-4`}>
      {category}
    </div>
  );
}
