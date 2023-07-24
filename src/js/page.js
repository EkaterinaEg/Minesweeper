class PageContent {
  constructor() {
    this.container = '';
    this.title = '';
    this.board = '';
    this.button = '';
    this.screen = '';
    this.timer = '';
    this.bugsLeft = '';
    this.gameStatus = '';
  }

  buildElements() {
    this.container = this.createDomNode(this.container, 'div', 'container');
    this.title = this.createDomNode(this.title, 'h1', 'page__title');
    this.title.innerHTML = 'LadyBugsSweeper';
    this.gameStatus = this.createDomNode(
      this.gameStatus,
      'div',
      'page__game-status',
      'game-status',
    );
    // this.button = this.createDomNode(
    //   this.button,
    //   'button',
    //   'game-status__button',
    // );
    // this.button.innerHTML = 'New game';
    this.info = this.createDomNode(
      this.infoContainer,
      'div',
      'game-status__info',
    );

    this.timer = this.createDomNode(this.timer, 'div', 'info__timer');
    this.timer.innerHTML = '00:00';
    this.bugsLeft = this.createDomNode(this.bugsLeft, 'div', 'info__bugsLeft');
    this.clickNumbers = this.createDomNode(
      this.clickNumbers,
      'div',
      'info__clickNumbers',
    );

    this.board = this.createDomNode(this.board, 'div', 'page__board', 'board');
    this.screen = this.createDomNode(this.screen, 'div', 'page__screen');
    this.screen.innerHTML = 'Good luck!';

    this.appendElements();
  }

  appendElements() {
    document.body.append(this.container);
    this.container.append(this.title);
    this.container.append(this.gameStatus);
    this.gameStatus.append(this.info);
    // this.gameStatus.append(this.button);
    this.info.append(this.timer);
    this.info.append(this.bugsLeft);
    this.info.append(this.clickNumbers);
    this.container.append(this.board);
    this.container.append(this.screen);
  }

  // eslint-disable-next-line class-methods-use-this
  createDomNode(node, element, ...classes) {
    // eslint-disable-next-line no-param-reassign
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }
}
export default PageContent;
