/// <reference path="gameItem.ts" />

class Character extends GameItem {

    constructor(name: string,id: number, xPosition: number = 0, yPosition: number = 0) {
        super(name,id, xPosition, yPosition);
    }

    public moveY(yPosition: number): void {
        this._yPos -= yPosition;
        //this._element.classList.add('flying');
    }

    public moveX(xPosition: number): void {
        this._xPos -= xPosition;
        //this._element.classList.add('flying');
    }
}