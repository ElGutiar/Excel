import {toInlineStyles} from '@/core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@/core/parse'

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 20

function getMeasure(state = {}, index, measure) {
  switch (measure) {
    case 'width':
      return (state[index] || DEFAULT_WIDTH) + 'px'

    case 'height':
      return (state[index] || DEFAULT_HEIGHT) + 'px'

    default: return measure
  }
}

function withWidthFrom(state) {
  return function(char, index) {
    return {
      char, index, width: getMeasure(state, index, 'width')
    }
  }
}

const createRow = function(index, col, state) {
  const height = getMeasure(state, index, 'height')
  const resize = index
    ? '<div class="resize-row" data-resize="row"></div>'
    : '';
  return `
   <div 
    class="row"
    style="height: ${height}"
    data-type="resizable"
    data-row="${index}"
   >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${col}</div>
  </div>
  `;
};

const toColumn = function({char, index, width}) {
  return `
    <div 
      class="column"
      style="width: ${width}"
      data-type="resizable"
      data-col="${index}"
    >
    ${char}
    <div class="resize-col" data-resize="col"></div>
    </div>
 `;
};

const toCell = function(state, row) {
  return function(_, index) {
    const id = `${row}:${index}`
    const width = getMeasure(state.colState, index, 'width')
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.styleState[id]
    })
    return `
        <div
        class="cell"
        style="${styles}; width: ${width}"
        onfocus="this.value"
        contenteditable 
        data-col="${index}"
        data-type="cell"
        data-value="${data || ''}"
        data-id="${id}"
        >${parse(data) || ''}</div>
      `;
  }
}

const goToChar = function(_, index) {
  return String.fromCharCode(CODES.A + index);
};

export function createTable(rowsCount = 15, state) {
  const columnCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnCount)
      .fill('')
      .map(goToChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, columns));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(columnCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cell, state.rowState));
  }

  return rows.join('');
}
