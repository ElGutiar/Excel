import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_HEADER,
  CHANGE_STYLES,
  APLLY_STYLE
} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeHeader(data) {
  return {
    type: CHANGE_HEADER,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APLLY_STYLE,
    data
  }
}
