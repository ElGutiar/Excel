export function shoudResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export const matrix = ($target, $current) => {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function selectNext(key, {row, col}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'ArrowLeft':
      col - 1 < MIN_VALUE ? col : col--
      break

    case 'ArrowRight':
    case 'Tab':
      col++
      break

    case 'ArrowDown':
    case 'Enter':
      row++
      break

    case 'ArrowUp':
      row - 1 < MIN_VALUE ? col : row--
      break
  }
  return `[data-id="${row}:${col}"]`
}
