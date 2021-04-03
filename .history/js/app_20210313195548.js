import {DrawingBoardUI} from '../after/DrawingBoardUI.js';

window.addEventListener('DOMContentLoaded', (ev) => {
  alert('Press enter to apply correct action on our LED screen.');

  const domElem = document.documentElement;
  document.addEventListener('keypress', fullScreenMode);
 
  function fullScreenMode(e) {
    if(e.code === 'Enter') { 
      domElem.requestFullscreen ? domElem.requestFullscreen() : alert('Problem with full screen mode please press F11');
    }
  }

  const board = new DrawingBoardUI('body', 54, 24);
  console.log(board);
});
