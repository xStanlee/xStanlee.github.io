export class DrawingContextUI {

    constructor(container) {
        this.context = document.createElement('div')
        this.context.textContent = '⬆️ Select a tool first ⬆️'
        document.querySelector(container).appendChild(this.context)
    }

    updateContext(tool) {
        this.context.textContent = this.formatText(tool)
    }

    formatText(tool) {
        switch (tool) {
            case 'brush':
                return `Selected tool 🧹`;
            case 'pencil':
                return `Selected tool ✏️`;
            case 'shape':
                return `Selected tool 🔲`;
            case 'image':
                return 'Selected tool image';
            }
    }

}