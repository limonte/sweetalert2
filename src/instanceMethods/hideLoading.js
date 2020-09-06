import * as dom from '../utils/dom/index.js'
import { swalClasses } from '../utils/classes.js'
import privateProps from '../privateProps.js'

/**
 * Enables buttons and hide loader.
 */
function hideLoading () {
  // do nothing if popup is closed
  const innerParams = privateProps.innerParams.get(this)
  if (!innerParams) {
    return
  }
  const domCache = privateProps.domCache.get(this)
  dom.hide(domCache.loader)
  if (innerParams.showConfirmButton) {
    dom.show(domCache.confirmButton)
  } else if (!innerParams.showConfirmButton && !innerParams.showCancelButton) {
    dom.hide(domCache.actions)
  }
  dom.removeClass([domCache.popup, domCache.actions], swalClasses.loading)
  domCache.popup.removeAttribute('aria-busy')
  domCache.popup.removeAttribute('data-loading')
}

export {
  hideLoading,
  hideLoading as disableLoading
}
