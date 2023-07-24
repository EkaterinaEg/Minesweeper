class Cell {
  // eslint-disable-next-line no-unused-vars
  constructor(element, x, y) {
    this.x = '';
    this.y = '';
    this.element = '';
  }

  buildElements(x, y) {
    this.element = document.createElement('div');
    this.x = x;
    this.y = y;
    this.element.classList.add('board__cell', 'closed');

    // return this.element;

    this.appendElements();
    // this.setAttribute();
  }

  appendElements() {
    document.querySelector('.page__board').append(this.element);
  }

  // getPosition() {
  //   return { x: this.x, y: this.y };
  // }

  setAttribute() {
    // this.element.setAttribute("data-coord", `{x: ${this.x}, y: ${this.y}}`);
    this.element.setAttribute('data-x', `${this.x}`);
    this.element.setAttribute('data-y', `${this.y}`);
    this.element.setAttribute('data-coord', `${this.x}${this.y}`);
  }
}
export default Cell;
