class GameItem {

    //fields/attributes
    protected _element: HTMLElement;
    protected _name: string;
    protected _id: number;
    protected _xPos: number;
    protected _yPos: number;
    

    constructor(name: string, id: number, xPosition: number, yPosition: number) {
        this._name = name;
        this._id = id;
        this._xPos = xPosition;
        this._yPos = yPosition;
    }


    //methods

    //setters
    public set xPos(xPosition: number) {
        this._xPos = xPosition;
    }

    public set yPos(yPosition: number) {
        this._yPos = yPosition;
    }

    //writing elements tot the DOM/HTML
    public render(): void {
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;
        
    }

    public draw(container: HTMLElement): void {
        //create div
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._id.toString();
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;

        //create image
        const image = document.createElement('img');
        image.src = `./assets/images/${this._name}.png `;

        //append elements
        this._element.appendChild(image);
        container.appendChild(this._element);  
        }
     
}