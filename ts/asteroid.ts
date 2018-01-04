/// <reference path="gameItem.ts" />

//Enum of AsteroidSize
enum AsteroidSize {
    small, //0
    medium, //1
    large //2
};

class Asteroid extends GameItem {
    private _id: number;
    private _size: AsteroidSize;

    constructor(name: string, id: number,  xPosition: number = 0, yPosition: number = 0, asteroidSize: AsteroidSize = AsteroidSize.small) {
        super(name, xPosition, yPosition);
        this._id = id;
        this._size = asteroidSize;
    }

    public remove(container: HTMLElement): void {
        const elem = document.getElementById(`${this._name}-${this._id}`);
        container.removeChild(elem);
    }
}