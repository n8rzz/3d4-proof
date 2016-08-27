import 'babel-polyfill';
import { CLASSNAMES } from './constants';
import GameView from './GameView';
import GameController from './GameController';
import GameBoardController from './GameBoardController';

export default (function () {
    const $gameBoard = document.getElementsByClassName(CLASSNAMES.GAME_BOARD);
    const $currentPlayer = document.getElementsByClassName(CLASSNAMES.PLAYER);

    const gameBoardController = new GameBoardController();
    const gameView = new GameView($currentPlayer);
    const gameController = new GameController($gameBoard, gameView, gameBoardController);
}());
