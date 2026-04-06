// Card linking to a filmagem's checklist, showing name, client, and phase progress

import { Link } from 'react-router-dom'

const FASE_LABELS = {
  pre_light: 'PL',
  gravacao: 'GR',
  pos_producao: 'PP',
}

export default function FilmagemCard({ filmagem }) {
  const fases = filmagem.fases_completas || {}

  return (
    <Link
      to={`/filmagens/${filmagem.id}/checklist`}
      className="block bg-gray-900 border border-gray-800 rounded-xl p-4 mb-3
                 hover:border-blue-600 active:border-blue-700 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-semibold text-base truncate">
            {filmagem.nome_projeto}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">{filmagem.cliente}</p>
        </div>
        <div className="flex gap-1.5 ml-3 flex-shrink-0">
          {Object.entries(FASE_LABELS).map(([fase, label]) => (
            <span
              key={fase}
              className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                fases[fase]
                  ? 'bg-green-800 text-green-300'
                  : 'bg-gray-800 text-gray-500'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
