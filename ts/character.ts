/// <reference path="gameItem.ts" />

class Character extends GameItem {

    constructor(name: string, xPosition: number = 0, yPosition: number = 0) {
        super(name, xPosition, yPosition);
    }

    public moveY(yPosition: number): void {
        this._yPos -= yPosition;
        this._element.classList.add('flying');
    }

    public moveX(xPosition: number): void {
        this._xPos -= xPosition;
        this._element.classList.add('flying');
    }
}