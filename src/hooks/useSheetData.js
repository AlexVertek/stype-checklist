// Hook to load all checklist templates and client list from Google Sheets

import { useState, useEffect } from 'react'
import { loadChecklistFase, loadClientes } from '../sheets'

export function useSheetData() {
  const [data, setData] = useState({
    pre_light: [],
    gravacao: [],
    pos_producao: [],
    clientes: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const [pre_light, gravacao, pos_producao, clientes] = await Promise.all([
          loadChecklistFase('pre_light'),
          loadChecklistFase('gravacao'),
          loadChecklistFase('pos_producao'),
          loadClientes(),
        ])
        setData({ pre_light, gravacao, pos_producao, clientes })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { data, loading, error }
}
