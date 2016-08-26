import 'babel-polyfill';
import GameView from './GameView';
import GameController from './GameController';
import GameBoardController from './GameBoardController';

export default (function() {
    const $gameBoard = document.getElementsByClassName('js-gameBoard');
    const $currentPlayer = document.getElementsByClassName('js-player');

    const gameBoardController = new GameBoardController();
    const gameView = new GameView($currentPlayer);
    const gameController = new GameController($gameBoard, gameView, gameBoardController);
})();
