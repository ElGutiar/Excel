import { ExcelComponent } from '@core/ExcelComponent';
import {headerTemplate} from './header.template'
import * as actions from '@/redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['headerName'],
      ...options
    })
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
}
