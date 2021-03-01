import {TABLE_RESIZE, CHANGE_TEXT, CHANGE_HEADER} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data: data
  }
}

export function changeHeader(data) {
  return {
    type: CHANGE_HEADER,
    data: data
  }
}
