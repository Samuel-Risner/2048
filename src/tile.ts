import settings from "./settings";

function setStyleInitial(el: HTMLElement) {
    el.style.position = "absolute";
    el.style.width = `${settings.tiles.size}px`;
    el.style.height = `${settings.tiles.size}px`;
}

function setStyle(el: HTMLElement, bgColor: string, x: number, y: number) {
    el.style.backgroundColor = bgColor;
    el.style.top = `${y * settings.tiles.size}px`;
    el.style.left = `${x * settings.tiles.size}px`;
}

export default class Tile {

    private element: HTMLDivElement;
    private value: number;
    private hasMerged: boolean;

    constructor(private x: number, private y: number, root: HTMLDivElement) {
        this.element = document.createElement("div");
        setStyleInitial(this.element);
        setStyle(this.element, "red", x, y);
        root.appendChild(this.element);

        this.value = 2;
        this.element.textContent = String(this.value);
        this.hasMerged = false;
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
        this.element.remove();
    }

    setAnimation(destinationX: number, destinationY: number, newValue: number, mergeWith: Tile | null) {
        // this.setHasMerged(true);
        // mergeWith?.setHasMerged(true);

        const a = this.element.animate([
            {
                left: `${this.x * settings.tiles.size}px`,
                top: `${this.y * settings.tiles.size}px`
            },
            {
                left: `${destinationX * settings.tiles.size}px`,
                top: `${destinationY * settings.tiles.size}px`
            }
        ], {
            duration: 2000,
            iterations: 1
        });

        this.x = destinationX;
        this.y = destinationY;
        
        a.onfinish = () => {
            a.cancel();

            mergeWith?.remove();

            this.value = newValue;
            this.element.textContent = String(this.value);

            setStyle(this.element, "aquamarine", this.x, this.y);
        };
    }
    
}
