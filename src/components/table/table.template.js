const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function withWidthFrom(state) {
  return function(char, index) {
    return {
      char, index, width: getWidth(state.colState, index)
    }
  }
}

const createRow = function(index, col) {
  const resize = index
    ? '<div class="resize-row" data-resize="row"></div>'
    : '';
  return `
   <div class="row" data-type="resizable">
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
    const width = getWidth(state.colState, index)
    return `
        <div 
        class="cell"
        style="width: ${width}"
        onfocus="this.value"
        contenteditable 
        data-col="${index}"
        data-type="cell"
        data-id="${row}:${index}"
        ></div>
      `;
  }
}

const goToChar = function(_, index) {
  return String.fromCharCode(CODES.A + index);
};

export function createTable(rowsCount = 15, state) {
  console.log('Template', state)
  const columnCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnCount)
      .fill('')
      .map(goToChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, columns));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(columnCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cell));
  }

  return rows.join('');
}
