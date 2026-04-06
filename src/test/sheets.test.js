import { describe, it, expect, vi, beforeEach } from 'vitest'
import { parseCSV, normalizeItem, SHEET_GIDS } from '../sheets'

describe('parseCSV', () => {
  it('parses header + rows into array of objects', () => {
    const csv = `name,age\nAlex,30\nBob,25`
    const result = parseCSV(csv)
    expect(result).toEqual([
      { name: 'Alex', age: '30' },
      { name: 'Bob', age: '25' },
    ])
  })

  it('handles empty rows', () => {
    const csv = `name,age\nAlex,30\n\nBob,25`
    const result = parseCSV(csv)
    expect(result).toHaveLength(2)
  })

  it('handles values with commas inside quotes', () => {
    const csv = `name,desc\nAlex,"hello, world"`
    const result = parseCSV(csv)
    expect(result[0].desc).toBe('hello, world')
  })
})

describe('normalizeItem', () => {
  it('normalizes pre_light item: maps pre_light_id → id, adds fase', () => {
    const raw = {
      pre_light_id: 'aaa',
      etapa: 'Aplicar template Stype',
      ordem: '1',
      acao: 'Fazer download do template',
      observacao: 'ATENÇÃO',
      tutorial: '',
    }
    const result = normalizeItem(raw, 'pre_light')
    expect(result.id).toBe('aaa')
    expect(result.fase).toBe('pre_light')
    expect(result.etapa).toBe('Aplicar template Stype')
    expect(result.ordem).toBe(1)
    expect(result.observacao).toBe('ATENÇÃO')
  })

  it('normalizes gravacao item: maps gravacao_lista_id → id', () => {
    const raw = {
      gravacao_lista_id: 'D8F04E54',
      etapa: 'Configurar Stype DataRecorder',
      ordem: '1',
      acao: 'Abra o Stype DataRecorder',
      observacao: '',
      tutorial: '',
    }
    const result = normalizeItem(raw, 'gravacao')
    expect(result.id).toBe('D8F04E54')
    expect(result.fase).toBe('gravacao')
  })

  it('normalizes pos_producao item: maps obs → observacao', () => {
    const raw = {
      pos_producao_id: 'aaa',
      etapa: 'Preparo da mídia',
      ordem: '1',
      acao: 'Retira o cartão da camera',
      obs: 'Importante',
      tutorial: '',
    }
    const result = normalizeItem(raw, 'pos_producao')
    expect(result.id).toBe('aaa')
    expect(result.observacao).toBe('Importante')
    expect(result.fase).toBe('pos_producao')
  })

  it('converts ordem to integer', () => {
    const raw = { pre_light_id: 'x', etapa: 'T', ordem: '5', acao: 'A', observacao: '', tutorial: '' }
    expect(normalizeItem(raw, 'pre_light').ordem).toBe(5)
  })
})

describe('SHEET_GIDS', () => {
  it('has correct GIDs for all 3 phases', () => {
    expect(SHEET_GIDS.pre_light).toBe('2114056382')
    expect(SHEET_GIDS.gravacao).toBe('1540992141')
    expect(SHEET_GIDS.pos_producao).toBe('734522569')
    expect(SHEET_GIDS.clientes).toBe('1156136377')
  })
})
