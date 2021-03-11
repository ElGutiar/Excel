import { ExcelComponent } from '../../core/ExcelComponent';
import {headerTemplate} from './header.template'
import * as actions from '../../redux/actions'
import { debounce } from '../../core/utils';
import { filterStorage } from './header.functions';
import { $ } from '../../core/dom';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: ['headerName'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  init() {
    super.init()
    this.$headerInput = this.$root.find('#input-header')
  }

  toHTML() {
    return headerTemplate(this.store.getState())
  }

  storeChanged({headerName}) {
    this.$headerInput.text(headerName)
  }

  onInput() {
    this.$dispatch(actions.changeHeader(this.$headerInput.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.button === 'remove') {
      filterStorage()
    }
  }
}
