import { $ } from '@core/dom';

export const resizeHandler = (event, $root) => {
  return new Promise(resolve => {
    const $resizeTarget = $(event.target)
    const $parent = $resizeTarget.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizeTarget.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value;

    $resizeTarget.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;

        $resizeTarget.css({
          right: -delta + 'px',
        })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta

        $resizeTarget.css({
          bottom: -delta + 'px'
        })
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
          $root.findAll(`[data-col="${$parent.data.col}"]`)
              .forEach(el => el.style.width = value + 'px')
        } else {
          $parent.css({
            height: value + 'px'
          })
        }
        resolve({
          value,
          type,
          id: $parent.data[type]
        })

        $resizeTarget.css({
          right: 0,
          bottom: 0,
          opacity: 0
        })
      }
    }
  })
}
