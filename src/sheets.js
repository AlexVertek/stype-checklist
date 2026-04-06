// Google Sheets CSV fetch, parse, and normalize utilities

const SHEET_ID = import.meta.env.VITE_SHEETS_ID

export const SHEET_GIDS = {
  pre_light: '2114056382',
  gravacao: '1540992141',
  pos_producao: '734522569',
  clientes: '1156136377',
}

/**
 * Parses a CSV string into an array of objects keyed by header row.
 * Handles quoted fields containing commas.
 */
export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return []

  const headers = splitCSVLine(lines[0])
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = splitCSVLine(line)
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = (values[i] || '').trim()
        return obj
      }, {})
    })
}

function splitCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current)
  return result
}

/**
 * Normalizes a raw CSV row from any checklist tab into a consistent shape.
 * @param {Object} raw - Row from parseCSV
 * @param {'pre_light'|'gravacao'|'pos_producao'} fase
 * @returns {{ id, fase, etapa, ordem, acao, observacao, tutorial }}
 * Note: missing/non-numeric ordem defaults to 0 (sorted first)
 */
export function normalizeItem(raw, fase) {
  const idKey = fase === 'pre_light'
    ? 'pre_light_id'
    : fase === 'gravacao'
      ? 'gravacao_lista_id'
      : 'pos_producao_id'

  return {
    id: raw[idKey] || '',
    fase,
    etapa: raw.etapa || '',
    ordem: parseInt(raw.ordem, 10) || 0,
    acao: raw.acao || '',
    observacao: fase === 'pos_producao'
      ? (raw.obs || raw.observacao || '')
      : (raw.observacao || raw.obs || ''),
    tutorial: raw.tutorial || '',
  }
}

/**
 * Fetches a single sheet tab as CSV and parses it.
 * Returns cached result from sessionStorage if available.
 */
export async function fetchSheetTab(gid, cacheKey) {
  const cached = sessionStorage.getItem(cacheKey)
  if (cached) return JSON.parse(cached)

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sheets fetch failed for gid=${gid}: ${res.status}`)

  const text = await res.text()
  const data = parseCSV(text)
  sessionStorage.setItem(cacheKey, JSON.stringify(data))
  return data
}

/**
 * Loads all checklist items for a given fase from Google Sheets.
 * Returns normalized items sorted by ordem.
 */
export async function loadChecklistFase(fase) {
  const gid = SHEET_GIDS[fase]
  const raw = await fetchSheetTab(gid, `checklist_${fase}`)
  return raw.map(row => normalizeItem(row, fase))
            .sort((a, b) => a.ordem - b.ordem)
}

/**
 * Loads the clients list from Google Sheets.
 * Returns array of { cliente_id, nome_cliente }.
 */
export async function loadClientes() {
  return fetchSheetTab(SHEET_GIDS.clientes, 'clientes')
}
