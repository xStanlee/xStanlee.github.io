import {ToolsUI} from './after/ToolsUI.js'
import {ToolsFactory} from './after/ToolsFactory.js'
import {DrawingBoardUI} from './after/DrawingBoardUI.js'
import {DrawingContextUI} from './after/DrawingContextUI.js'


window.addEventListener('DOMContentLoaded', (ev) => {
    alert('Press enter to apply correct action on our LED screen.');

    const domElem = document.documentElement;
    document.addEventListener('keypress', fullScreenMode);

    function fullScreenMode(e) {
      if(e.code === 'Enter') { 
        domElem.requestFullscreen ? domElem.requestFullscreen() : alert('Problem with full screen mode please press F11');
      }
    }
    const factory = new ToolsFactory()
    const tools = new ToolsUI('.js-tools')
    const board = new DrawingBoardUI('.js-canvas', 54, 24)
    const context = new DrawingContextUI('.js-context')

    tools.subscribe(selectedTool => {
        const tool = factory.getTool(selectedTool)
        board.changeTool(tool)
    })

    tools.subscribe(selectedTool => {
        context.updateContext(selectedTool)
    });
}