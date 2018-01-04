/// <reference path="gameItem.ts" />

class Finishline extends GameItem {

   
    constructor(name: string) {
        super(name);
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