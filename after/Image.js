export class Image {

    constructor(width, height, src) {
        this.width = width || 16
        this.height = height || 16
        this._src = src || "../Images/Colored/PNG/user.png"
    }

    createImage() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', () => resolve(img))
            img.addEventListener('error', (err) => reject(err))
            img.src = this.src
        })
    }

    onMouseMove(x, y, ctx) {

    }

    onMouseUp(x, y, ctx) {

    }

    onMouseDown(x, y, ctx) {
        const result = this.createImage()
        result.then(img => console.log(img))
        .catch(err => console.log(err))
    }
}