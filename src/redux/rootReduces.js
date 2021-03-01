import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_HEADER} from './types'

export function rootReducer(state, action) {
  let prevState;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [field]: {...prevState}}

    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value
      return {...state, currentText: action.data.value, dataState: prevState}

    case CHANGE_HEADER:
      return {...state, headerName: action.data}

    default: return state
  }
}
