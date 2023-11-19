import settings from "./settings";

function setStyleInitialPositionElement(el: HTMLElement) {
    el.style.position = "absolute";
    el.style.width = `${settings.style.widthPerUnitPx}px`;
    el.style.height = `${settings.style.widthPerUnitPx}px`;
    el.style.display = "flex";
}

function setStyle(el: HTMLElement, bgColor: string, x: number, y: number) {
    el.style.top = `${y * settings.style.widthPerUnitPx}px`;
    el.style.left = `${x * settings.style.widthPerUnitPx}px`;
}

function setStyleInitialColorElement(el: HTMLDivElement) {
    el.style.backgroundColor = "white";
    el.style.width = "90%";
    el.style.height = "90%";
    el.style.display = "flex";
    el.style.margin = "auto";
    el.style.borderRadius = "10%";
}

function setStyleInitialTextElement(el: HTMLDivElement) {
    el.style.display = "flex";
    el.style.margin = "auto";
    el.style.fontSize = `${settings.style.widthPerUnitPx / 3}px`;
}

export default class Tile {

    private positionElement: HTMLDivElement;
    private colorElement: HTMLDivElement;
    private textElement: HTMLDivElement;

    private value!: number;
    private hasMerged: boolean;

    constructor(private x: number, private y: number, root: HTMLDivElement) {
        this.positionElement = document.createElement("div");
        this.colorElement = document.createElement("div");
        this.textElement = document.createElement("div");

        setStyleInitialPositionElement(this.positionElement);
        setStyle(this.positionElement, "red", x, y);
        setStyleInitialColorElement(this.colorElement);
        setStyleInitialTextElement(this.textElement);
        this.setValue(Math.random() < 0.5 ? 2 : 4);

        root.appendChild(this.positionElement);
        this.positionElement.appendChild(this.colorElement);
        this.colorElement.appendChild(this.textElement);

        this.hasMerged = false;
    }

    setValue(v: number) {
        this.value = v;
        this.textElement.textContent = String(v);

        switch(v) {
            case 2:
                this.colorElement.style.backgroundColor = "#FCD0A1";
                break;

            case 4:
                this.colorElement.style.backgroundColor = "#B1B695";
                break;

            case 8:
                this.colorElement.style.backgroundColor = "#A690A4";
                break;

            case 16:
                this.colorElement.style.backgroundColor = "#5E4B56";
                break;

            case 32:
                this.colorElement.style.backgroundColor = "#AFD2E9";
                break;

            case 64:
                this.colorElement.style.backgroundColor = "#F42272";
                break;

            case 128:
                this.colorElement.style.backgroundColor = "#F397D6";
                break;

            case 256:
                this.colorElement.style.backgroundColor = "#D7B8F3";
                break;

            case 512:
                this.colorElement.style.backgroundColor = "#B8B8F3";
                break;

            case 2048:
                this.colorElement.style.backgroundColor = "#deb841";
                break;

            default:
                this.colorElement.style.backgroundColor = "white";
                break; 
        }
    }

    getValue(): number {
        return this.value;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getHasMerged(): boolean {
        return this.hasMerged;
    }

    setHasMerged(merged: boolean) {
        this.hasMerged = merged;
    }

    remove() {
        this.positionElement.remove();
    }

    setAnimation(destinationX: number, destinationY: number, newValue: number, mergeWith: Tile | null) {
        const animation = this.positionElement.animate([
            {
                left: `${this.x * settings.style.widthPerUnitPx}px`,
                top: `${this.y * settings.style.widthPerUnitPx}px`
            },
            {
                left: `${destinationX * settings.style.widthPerUnitPx}px`,
                top: `${destinationY * settings.style.widthPerUnitPx}px`
            }
        ], {
            duration: settings.animation.durationMS,
            iterations: 1
        });

        this.x = destinationX;
        this.y = destinationY;
        
        animation.onfinish = () => {
            animation.cancel();
            mergeWith?.remove();

            this.setValue(newValue);
            setStyle(this.positionElement, "aquamarine", this.x, this.y);
        };
    }
    
}
