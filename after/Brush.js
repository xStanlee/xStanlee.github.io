export class Brush {

    constructor(capSize, color) {
        this._drawing = false
        this._capSize = capSize || 2
        this._color = color || 'red'
    }

    onMouseMove(x, y, ctx) {
        if (this._drawing) {
            ctx.lineWidth = this._capSize
            ctx.lineCap = 'round'
            ctx.strokeStyle = this._color
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }

    onMouseUp(x, y, ctx) {
        this._drawing = false
        ctx.beginPath()
    }

    onMouseDown(x, y, ctx) {
        if (!this._drawing) {
            this._drawing = true
        }
    }

}