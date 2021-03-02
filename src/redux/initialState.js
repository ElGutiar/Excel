import {storage} from '@/core/utils'
import {defaultStyles} from '@/constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  stylesState: {},
  headerName: 'Новая таблица',
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
