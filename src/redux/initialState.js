import {storage} from '@/core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  headerName: 'Новая таблица'
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
