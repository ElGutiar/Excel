import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import {TableSection} from './TableSelection'
import {$} from '../../core/dom'

import {resizeHandler} from './table.resize.js'
import {shoudResize, isCell} from './table.utils'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mousemove', 'click'],
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
    if (shoudResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.selection.select($target)
    }
  }
}
