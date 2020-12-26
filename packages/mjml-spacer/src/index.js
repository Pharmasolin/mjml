import { BodyComponent } from 'mjml-core'

import widthParser from 'mjml-core/lib/helpers/widthParser'

export default class MjSpacer extends BodyComponent {
  static allowedAttributes = {
    align: 'enum(left,center,right)',
    'container-background-color': 'color',
    height: 'unit(px)',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    padding: 'unit(px,%){1,4}',
    'spacer-color': 'color',
    width: 'unit(px,%)',
  }

  static defaultAttributes = {
    align: 'center',
    height: '20px',
    width: '100%',
  }

  getStyles() {
    let computeAlign = '0px auto'
    if (this.getAttribute('align') === 'left') {
      computeAlign = '0px'
    } else if (this.getAttribute('align') === 'right') {
      computeAlign = '0px 0px 0px auto'
    }

    return {
      hr: {
        'border-width': 0,
        background: this.getAttribute('spacer-color'),
        color: this.getAttribute('spacer-color'),
        height: this.getAttribute('height'),
        width: this.getAttribute('width'),
        'max-width': this.getAttribute('width'),
      },
    }
  }

  getOutlookWidth() {
    const { containerWidth } = this.context
    const paddingSize =
      this.getShorthandAttrValue('padding', 'left') +
      this.getShorthandAttrValue('padding', 'right')

    const width = this.getAttribute('width')

    const { parsedWidth, unit } = widthParser(width)

    switch (unit) {
      case '%':
        return `${
          (parseInt(containerWidth, 10) * parseInt(parsedWidth, 10)) / 100 -
          paddingSize
        }`
      case 'px':
        return width.slice(0, -2);
      default:
        return `${parseInt(containerWidth, 10) - paddingSize}`
    }
  }

  render() {
    return `
      <hr
        ${this.htmlAttributes({
          align: this.getAttribute('align'),
          style: 'hr',
          width: this.getOutlookWidth('width'),
        })}
      / >
    `
  }
}
