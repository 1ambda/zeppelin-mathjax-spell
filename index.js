import {
  SpellBase,
  SpellResult,
  DefaultDisplayType,
} from 'zeppelin-spell'


/**
 * MathJax currently (v2.7) doesn't support webpack
 * - http://stackoverflow.com/questions/38694924/mathjax-with-webpack
 * - https://github.com/mathjax/MathJax/issues/1629
 *
 */
import {} from 'mathjax/MathJax.js?config=default'

const MathjaxDOMClass = 'mathjax-spell-dom'

MathJax.Hub.Config({
  extensions: ["tex2jax.js"],
  jax: ["input/TeX","output/HTML-CSS"],
  tex2jax: {
    inlineMath: [['$','$'],['\\(','\\)']],
    processClass: MathjaxDOMClass,
  },
})

export default class MathjaxSpell extends SpellBase {
  constructor() {
    super("%mathjax")
  }

  interpret(paragraphText, config) {
    const callback = (elemId) => {
      const elem = document.getElementById(elemId)
      if (!elem) { return }

      elem.classList.add(MathjaxDOMClass)
      elem.innerHTML = paragraphText
      MathJax.Hub.Queue( ["Typeset", MathJax.Hub, elemId, ] )
    }

    return new SpellResult(callback)
  }
}
