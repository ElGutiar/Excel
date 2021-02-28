import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '../../core/dom'
export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div 
      class="input"
      id="input-formula"
      contenteditable
      spellcheck="false"
      >
    </div>
    `;
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#input-formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', cellText => {
      this.$formula.text(cellText)
    })

    this.$subscribe(state => {
      console.log('Formula', state)
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
