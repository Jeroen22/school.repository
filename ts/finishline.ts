/// <reference path="gameItem.ts" />

class Finishline extends GameItem {

   
    constructor(name: string,id: number, xPosition: number = 0, yPosition: number = 0) {
        super(name,id, xPosition, yPosition);
    }

    public draw(container: HTMLElement): void {
        //create div
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;

        //create image
        const image = document.createElement('img');
        image.src = `./assets/images/${this._name}.png `;

         //append elements
         this._element.appendChild(image);
         container.appendChild(this._element);
    }
}