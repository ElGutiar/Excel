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

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
