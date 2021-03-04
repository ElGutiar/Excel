import { createTable } from '@/components/table/table.template';
import { defaultStyles } from '@/constants';
import * as actions from '@/redux/actions';
import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { resizeHandler } from './table.resize.js';
import { isCell, matrix, selectNext, shoudResize } from './table.utils';
import { TableSection } from './TableSelection';
import {parse} from '@/core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styles = $cell.getStyle(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  toHTML() {
    return createTable(12, this.store.getState());
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn(error.message)
    }
  }

  onMousedown(event) {
    if (shoudResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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
    this.$emit('table:input', $(event.target).text())

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const current = this.selection.current.id(true)
      this.selectCell(this.$root.find(selectNext(key, current)))
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
