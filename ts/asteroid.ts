/// <reference path="gameItem.ts" />

class Asteroid extends GameItem {
    
    //constructor
    constructor( name: string, id: number,   xPosition: number, yPosition: number) {
        super(name, id, xPosition, yPosition);
    }
}