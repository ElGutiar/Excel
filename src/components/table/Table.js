import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

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
    if (event.target.dataset.resize === 'col') {
      const $target = $(event.target);
      const $parent = $target.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = (e) => {
        console.log('mousemove')
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = `${value}px`;
        cells.forEach(item => item.style.width = `${value}px`)
      };

      document.onmouseup = () => (document.onmousemove = null);
    } else if (event.target.dataset.resize === 'row') {
      const $target = $(event.target);
      const $parent = $target.closest('[data-type="resizable"]');
      const coords = $parent.getCoords()

      document.onmousemove = (e) => {
        const delta = e.pageY - coords.bottom
        const value = coords.height + delta
        $parent.$el.style.height = `${value}px`
      }
      document.onmouseup = () => (document.onmousemove = null);
    }
  }
}
