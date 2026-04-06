// Tab bar for switching between Pre-Light, Gravação, Pós-Produção phases

const FASES = [
  { key: 'pre_light', label: 'Pre-Light' },
  { key: 'gravacao', label: 'Gravação' },
  { key: 'pos_producao', label: 'Pós-Produção' },
]

export default function PhaseTabs({ activePhase, onSelectPhase, progressByPhase }) {
  return (
    <div className="flex border-b border-gray-800 bg-gray-950">
      {FASES.map(({ key, label }) => {
        const prog = progressByPhase[key] || { done: 0, total: 0 }
        const isActive = activePhase === key
        return (
          <button
            key={key}
            onClick={() => onSelectPhase(key)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors min-h-[44px]
              ${isActive
                ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-950/20'
                : 'text-gray-500 hover:text-gray-300'
              }`}
          >
            <div>{label}</div>
            <div className={`text-xs mt-0.5 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
              {prog.done}/{prog.total}
            </div>
          </button>
        )
      })}
    </div>
  )
}
