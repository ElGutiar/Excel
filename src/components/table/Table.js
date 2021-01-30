import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove'],
    });
  }

  toHTML() {
    return createTable(12);
  }

  onClick(event) {
    console.log('click', event.target);
  }

  onMousedown() {
    console.log('mosuedown');
  }

  onMousemove() {
    console.log('mosuemove');
  }
}