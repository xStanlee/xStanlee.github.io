export class Shape {

    constructor(size, color) {
        this._size = size || 10
        this._color = color || 'orangered'
    }

    onMouseMove(x, y, ctx) {

    }

    onMouseUp(x, y, ctx) {

    }

    onMouseDown(x, y, ctx) {
        ctx.strokeStyle = this._color
        ctx.strokeRect(x - this._size / 2, y - this._size / 2, this._size, this._size)
    }

}