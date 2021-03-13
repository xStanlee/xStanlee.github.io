import { Brush } from './Brush.js';
import { Pencil } from './Pencil.js';
import { Shape } from './Shape.js';
import { Image } from './Image.js';

export class ToolsFactory {

    constructor() {
        this.brush = new Brush(2, 'red');
        this.pencil = new Pencil(1, 'white');
        this.shape = new Shape(5, 'orangered');
        this.image = new Image(16, 16);
    }

    getTool(tool) {
        switch (tool) {
            case 'brush':
                return this.brush;
            case 'pencil':
                return this.pencil;
            case 'shape':
                return this.shape;
            case 'image':
                return this.image;
        }
    }

}