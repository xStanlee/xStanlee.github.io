window.addEventListener('DOMContentLoaded, e => {
  alert('Press enter to apply correct action on our LED screen.');

  const domElem = document.documentElement;
  const check = document.querySelector('.side-nav__link > span')

  document.addEventListener('keypress', fullScreenMode);

  
  function fullScreenMode(e) {
    if(e.code === 'Enter') { domElem.requestFullscreen ? domElem.requestFullscreen() : alert('Problem with full screen mode please press F11');}
  }

}
