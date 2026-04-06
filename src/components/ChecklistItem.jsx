// Single checklist item with three display states: pending, current, done

export default function ChecklistItem({ item, status, onMark, feitoPor }) {
  const isDone = status === 'done'
  const isCurrent = status === 'current'

  return (
    <div className={`
      border-l-4 rounded-r-lg p-3 mb-2 transition-colors
      ${isDone
        ? 'border-green-500 bg-green-950/40'
        : isCurrent
          ? 'border-blue-500 bg-blue-950/40'
          : 'border-gray-700 bg-gray-900/40'
      }
    `}>
      <div className="flex items-start gap-2">
        <span className={`mt-0.5 text-lg leading-none flex-shrink-0 ${
          isDone ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-600'
        }`}>
          {isDone ? '✓' : isCurrent ? '◉' : '○'}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${
            isDone
              ? 'text-green-400 line-through'
              : isCurrent
                ? 'text-white font-medium'
                : 'text-gray-400'
          }`}>
            {item.acao}
          </p>
          {item.observacao && (
            <p className="text-xs text-yellow-600 mt-1">{item.observacao}</p>
          )}
          {isDone && feitoPor && (
            <p className="text-xs text-green-700 mt-1">✓ {feitoPor}</p>
          )}
        </div>
      </div>

      {isCurrent && (
        <button
          onClick={() => onMark(item)}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                     text-white font-bold py-3 rounded-lg text-sm
                     transition-colors min-h-[44px]"
        >
          MARCAR COMO FEITO
        </button>
      )}
    </div>
  )
}
