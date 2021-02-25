import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

import {resizeHandler} from './table.resize.js'
import {shoudResize} from './table.utils'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mousemove', 'click'],
    });
  }

  toHTML() {
    return createTable(12);
  }

  onMousedown(event) {
    if (shoudResize(event)) {
      resizeHandler(event, this.$root)
    }
  }
}
