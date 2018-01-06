/// <reference path="gameItem.ts" />



class Asteroid extends GameItem {
    private _id: number;
    

    constructor( name: string, id: number,   xPosition: number = 0, yPosition: number = 0) {
        super(name, xPosition, yPosition);
        this._id = id;
       
    }
}