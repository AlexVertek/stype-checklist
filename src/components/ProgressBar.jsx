// Progress bar for a checklist phase showing done/total count

export default function ProgressBar({ done, total }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="px-4 py-2">
      <div className="bg-gray-800 rounded-full h-2 mb-1">
        <div
          data-testid="progress-fill"
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-gray-400 text-xs">
        {done} de {total} concluídos
      </p>
    </div>
  )
}
