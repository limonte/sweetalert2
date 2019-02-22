import { swalClasses } from './classes.js'
import { warn } from './utils.js'
import * as dom from './dom/index.js'
import defaultInputValidators from './defaultInputValidators.js'

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
export default function setParameters (params) {
  // Use default `inputValidator` for supported input types if not provided
  if (!params.inputValidator) {
    Object.keys(defaultInputValidators).forEach((key) => {
      if (params.input === key) {
        params.inputValidator = defaultInputValidators[key]
      }
    })
  }

  // Determine if the custom target element is valid
  if (
    !params.target ||
    (typeof params.target === 'string' && !document.querySelector(params.target)) ||
    (typeof params.target !== 'string' && !params.target.appendChild)
  ) {
    warn('Target parameter is not valid, defaulting to "body"')
    params.target = 'body'
  }

  // Animation
  if (typeof params.animation === 'function') {
    params.animation = params.animation.call()
  }

  let popup
  const oldPopup = dom.getPopup()
  let targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = dom.init(params)
  } else {
    popup = oldPopup || dom.init(params)
  }

  // Set popup width
  if (params.width) {
    popup.style.width = (typeof params.width === 'number') ? params.width + 'px' : params.width
  }

  // Set popup padding
  let isPaddingNumber = (typeof params.padding === 'number');
  if (isPaddingNumber || typeof params.padding === 'string') {
    popup.style.padding = isPaddingNumber ? params.padding + 'px' : params.padding
  } else if (params.padding) {
    warn('"padding" parameter requires either a `string` or `number`')
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background
  }
  const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color')
  const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix')
  for (let i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor
  }

  const container = dom.getContainer()
  const closeButton = dom.getCloseButton()
  const footer = dom.getFooter()

  // Title
  dom.renderTitle(params)

  // Content
  dom.renderContent(params)

  // Backdrop
  if (typeof params.backdrop === 'string') {
    dom.getContainer().style.background = params.backdrop
  } else if (!params.backdrop) {
    dom.addClass([document.documentElement, document.body], swalClasses['no-backdrop'])
  }
  if (!params.backdrop && params.allowOutsideClick) {
    warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`')
  }

  // Position
  if (params.position in swalClasses) {
    dom.addClass(container, swalClasses[params.position])
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"')
    dom.addClass(container, swalClasses.center)
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    let growClass = 'grow-' + params.grow
    if (growClass in swalClasses) {
      dom.addClass(container, swalClasses[growClass])
    }
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel)
    dom.show(closeButton)
  } else {
    dom.hide(closeButton)
  }

  // Default Class
  popup.className = swalClasses.popup
  if (params.toast) {
    dom.addClass([document.documentElement, document.body], swalClasses['toast-shown'])
    dom.addClass(popup, swalClasses.toast)
  } else {
    dom.addClass(popup, swalClasses.modal)
  }

  // Custom Class
  if (params.customClass) {
    dom.addClass(popup, params.customClass)
  }

  if (params.customContainerClass) {
    dom.addClass(container, params.customContainerClass)
  }

  // Progress steps
  dom.renderProgressSteps(params)

  // Icon
  dom.renderIcon(params)

  // Image
  dom.renderImage(params)

  // Actions (buttons)
  dom.renderActions(params)

  // Footer
  dom.parseHtmlToContainer(params.footer, footer)

  // CSS animation
  if (params.animation === true) {
    dom.removeClass(popup, swalClasses.noanimation)
  } else {
    dom.addClass(popup, swalClasses.noanimation)
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn(
      'showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' +
      'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' +
      'https://sweetalert2.github.io/#ajax-request'
    )
  }
}

