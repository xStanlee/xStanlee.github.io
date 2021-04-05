import { DrawingBoardUI } from '../after/DrawingBoardUI.js';
import videoStream from '../video/video.js';
import chooseContent from '../video/content.js';

window.addEventListener('DOMContentLoaded', (ev) => {
  alert('Press enter to apply correct action on our LED screen.');
  const contents = document.querySelectorAll('.side-nav__video-item');
  chooseContent(contents);
  videoStream(navigator, "video");
  //playVideo();
  const domElem = document.documentElement;
  document.addEventListener('keypress', fullScreenMode);

  function fullScreenMode(e) {
    if (e.code === 'Enter') {
      domElem.requestFullscreen ? domElem.requestFullscreen() : alert('Problem with full screen mode please press F11');
    }
  }
  const board = new DrawingBoardUI('.js-canvas', 54, 24);
});
