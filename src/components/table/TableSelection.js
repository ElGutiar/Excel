export class TableSection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSection.className))
    this.group = []
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass(TableSection.className)
  }

  selectGroup() {
  }
}
