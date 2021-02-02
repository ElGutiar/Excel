import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import {$} from '@core/dom';

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

  onMousemove(event) {
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $target = $(event.target);
      const $parent = $target.closest()
    }
  }

  onMouseup(event) {
  }

  onClick(event) {
  }
}
