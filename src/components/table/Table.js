import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import {TableSection} from './TableSelection'
import {$} from '../../core/dom'

import {resizeHandler} from './table.resize.js'
import {shoudResize, isCell, matrix, selectNext} from './table.utils'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  prepare() {
    this.selection = new TableSection()
  }

  toHTML() {
    return createTable(12);
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shoudResize(event) && !event.shiftKey) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = event

    if (keys.includes(key)) {
      event.preventDefault()
      const current = this.selection.current.id(true)
      const $next = this.$root.find(selectNext(key, current))
      this.selection.select($next)
    }
  }
}
