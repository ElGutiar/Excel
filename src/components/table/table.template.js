const CODES = {
  A: 65,
  Z: 90,
};

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

const toColumn = function(char, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
    ${char}
    <div class="resize-col" data-resize="col"></div>
    </div>
 `;
};

const toCell = function(row) {
  return function(_, col) {
    return `
        <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        ></div>
      `;
  }
}

const goToChar = function(_, index) {
  return String.fromCharCode(CODES.A + index);
};

export function createTable(rowsCount = 15) {
  const columnCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const columns = new Array(columnCount)
      .fill('')
      .map(goToChar)
      // .map((_, col) => toCell(row, col))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, columns));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(columnCount)
        .fill('')
        .map(toCell(row))
        .join('');
    rows.push(createRow(row + 1, cell));
  }

  return rows.join('');
}
