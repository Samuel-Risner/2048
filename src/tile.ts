import settings from "./settings";

function setStyleInitial(el: HTMLElement) {
    el.style.position = "absolute";
    el.style.width = `${settings.style.widthPerUnitPx}px`;
    el.style.height = `${settings.style.widthPerUnitPx}px`;
}

function setStyle(el: HTMLElement, bgColor: string, x: number, y: number) {
    el.style.backgroundColor = bgColor;
    el.style.top = `${y * settings.style.widthPerUnitPx}px`;
    el.style.left = `${x * settings.style.widthPerUnitPx}px`;
}

export default class Tile {

    private element: HTMLDivElement;
    private value!: number;
    private hasMerged: boolean;

    constructor(private x: number, private y: number, root: HTMLDivElement) {
        this.element = document.createElement("div");

        setStyleInitial(this.element);
        setStyle(this.element, "red", x, y);
        this.setValue(2);

        root.appendChild(this.element);

        this.hasMerged = false;
    }

    setValue(v: number) {
        this.value = v;
        this.element.textContent = String(v);
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
        const animation = this.element.animate([
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
            setStyle(this.element, "aquamarine", this.x, this.y);
        };
    }
    
}
