export default function StatsTable({ stats }) {
  return (
    <table className="table-auto w-full border border-gray-300 mb-4">
      <tbody>
        {Object.entries(stats).map(([key, val]) => (
          <tr key={key}>
            <td className="border px-4 py-2 font-semibold capitalize">{key}</td>
            <td className="border px-4 py-2">{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
