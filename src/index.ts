import { MyGeneratorGenerator, loopColsBottom, loopColsTop, loopRowsLeft, loopRowsRight } from "./generators";
import settings from "./settings";
import Tile from "./tile";

// const canvas = document.getElementById("root") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// canvas.width = settings.canvas.size;
// canvas.height = settings.canvas.size;

// function setCanvasStyleSize() {
//     canvas.style.width = `${window.innerWidth < window.innerHeight? window.innerWidth : window.innerHeight}px`;
// }

// setCanvasStyleSize();
// window.onresize = setCanvasStyleSize;

// ctx.fillStyle = "red";
// ctx.fillRect(0, 0, 500, 500);

const root = document.getElementById("root") as HTMLDivElement;
let movementLock: boolean = false;

/**
 * [y][x]
 */
const tiles: (Tile | null)[][] = [];
for (let y = 0; y < 4; y++) {
    tiles.push([]);
    for (let x = 0; x < 4; x++) {
        tiles[y][x] = null;
    }
}

function createTile(): boolean {
    const freeSpaces: [number, number][] = [];
    for (let y = 0; y < tiles.length; y++) for (let x = 0; x < tiles[y].length; x++) if (tiles[y][x] === null) freeSpaces.push([x, y]);
    if (freeSpaces.length === 0) return false;

    const [x, y] = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
    tiles[y][x] = new Tile(x, y, root);

    return true;
}

function resetMerged() {
    for (const i of tiles) for (const j of i) if (j !== null) j.setHasMerged(false);
    for (const i of tiles) for (const j of i) if (j !== null) console.log(j.getHasMerged());
}

createTile();
createTile();

function calculate(genGen: MyGeneratorGenerator) {
    for (const tileGen of genGen) {
        for (let _i = 0; _i < settings.field.size; _i++) {
            const gen = tileGen();
            let temp = gen.next().value;
            if (temp === null) continue;
            let [lastTile, lastX, lastY] = temp;
            let lastValueTile: Tile | null = lastTile;

            for (const [tile, x, y] of gen) {
                // If the current tile is null:
                if (tile === null) {
                    // If the last one is also null, keep the last ones position:
                    if (lastTile === null) continue;

                    // Otherwise use the current position:
                    lastX = x;
                    lastY = y;
                    lastTile = tile;
                    continue;
                
                // If the current tile is actually a tile:
                } else {
                    // If there is a place for it to move to:
                    if (lastTile === null) {
                        let v = tile.getValue();

                        if (lastValueTile !== null) if (lastValueTile.getValue() === v && !lastValueTile.getHasMerged()) {
                            tile.setAnimation(lastValueTile.getX(), lastValueTile.getY(), v * 2, lastValueTile);
                            tiles[lastValueTile.getY()][lastValueTile.getX()] = tile;
                            tiles[y][x] = null;
                            tile.setHasMerged(true);
                            lastValueTile.setHasMerged(true);
                            continue;
                        }

                        tile.setAnimation(lastX, lastY, v, null);
                        tiles[lastY][lastX] = tile;
                        tiles[y][x] = null;
                        continue;
                    // If it can merge with the next one:
                    } else {
                        let v = tile.getValue();

                        if (lastValueTile !== null) if (lastValueTile.getValue() === v && !lastValueTile.getHasMerged()) {
                            tile.setAnimation(lastValueTile.getX(), lastValueTile.getY(), v * 2, lastValueTile);
                            tiles[lastValueTile.getY()][lastValueTile.getX()] = tile;
                            tiles[y][x] = null;
                            tile.setHasMerged(true);
                            lastValueTile.setHasMerged(true);
                            continue;
                        }
                    }

                    lastTile = tile;
                    lastValueTile = tile;
                    continue;
                }
            }
        }
    }

    resetMerged();
    setTimeout(() => {
        createTile();
        movementLock = false;
    }, settings.animation.durationMS);
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (movementLock) return;
    movementLock = true;

    switch (e.code) {
        case "ArrowUp":
            calculate(loopColsTop(tiles));
            return;
            
        case "ArrowDown":
            calculate(loopColsBottom(tiles));
            return;

        case "ArrowLeft":
            calculate(loopRowsLeft(tiles));
            return;

        case "ArrowRight":
            calculate(loopRowsRight(tiles));
            return;

        default:
            movementLock = false;
            return;
    }
});
