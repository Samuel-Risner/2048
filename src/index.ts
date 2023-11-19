import { MyGeneratorGenerator, loopColsBottom, loopColsTop, loopRowsLeft, loopRowsRight } from "./generators";
import { getScoreText, increaseScore, loadHighScore, setScore } from "./score";
import settings from "./settings";
import Tile from "./tile";

const root = document.getElementById("root") as HTMLDivElement;

function setRootStyleSize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (w > h) {
        const scale = h / (settings.field.size * settings.style.widthPerUnitPx);
        root.style.transform = `scale(${scale})`;
        root.style.left = `${(w - settings.field.size * settings.style.widthPerUnitPx * scale) / 2 }px`;
        root.style.top = "0px";
    } else {
        const scale = w / (settings.field.size * settings.style.widthPerUnitPx);
        root.style.transform = `scale(${scale})`;
        root.style.left = "0px";
        root.style.top = `${(h - settings.field.size * settings.style.widthPerUnitPx * scale) / 2 }px`;
    }
}

window.onload = () => {
    setRootStyleSize();
    window.onresize = setRootStyleSize;
    loadHighScore();
}

root.style.width = `${settings.field.size * settings.style.widthPerUnitPx}px`;
root.style.height = `${settings.field.size * settings.style.widthPerUnitPx}px`;
root.style.position = "relative";
root.style.transformOrigin = "0% 0% 0px";

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
    for (const row of tiles) for (const tile of row) if (tile !== null) tile.setHasMerged(false);
}

let tilesWereMoved = false;

const successfulMoves = {
    up: true,
    down: true,
    left: true,
    right: true
}

/**
 * @returns `true` if tiles were moved, otherwise `false`.
 */
function calculate(genGen: MyGeneratorGenerator): boolean {
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
                            tilesWereMoved = true;
                            increaseScore(v*2);
                            continue;
                        }

                        tile.setAnimation(lastX, lastY, v, null);
                        tiles[lastY][lastX] = tile;
                        tiles[y][x] = null;
                        tilesWereMoved = true;
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
                            tilesWereMoved = true;
                            increaseScore(v*2);
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

    if (tilesWereMoved) {
        resetMerged();
        tilesWereMoved = false;
        setTimeout(() => {
            createTile();
            movementLock = false;
        }, settings.animation.durationMS);
        return true;
    }

    movementLock = false;
    tilesWereMoved = false;
    return false;
}

function handleDefeat() {
    if (!successfulMoves.up && !successfulMoves.down && !successfulMoves.left && !successfulMoves.right) {
        alert("Defeat!\n" + getScoreText());

        setScore(0);

        for (let y = 0; y < tiles.length; y++) for (let x = 0; x < tiles[y].length; x++) if (tiles[y][x] !== null) {
            (tiles[y][x] as Tile).remove();
            tiles[y][x] = null;
        }

        successfulMoves.up = true;
        successfulMoves.down = true;
        successfulMoves.left = true;
        successfulMoves.right = true;

        createTile();
        createTile();

        return;
    }
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (movementLock) return;
    movementLock = true;

    switch (e.code) {
        case "ArrowUp":
            if (!calculate(loopColsTop(tiles))) successfulMoves.up = false;
            break;
            
        case "ArrowDown":
            if (!calculate(loopColsBottom(tiles))) successfulMoves.down = false;
            break;

        case "ArrowLeft":
            if (!calculate(loopRowsLeft(tiles))) successfulMoves.left = false;
            break;

        case "ArrowRight":
            if (!calculate(loopRowsRight(tiles))) successfulMoves.right = false;
            break;

        default:
            movementLock = false;
            return;
    }

    handleDefeat();
});

let xTouchStart = 0;
let yTouchStart = 0;

root.ontouchstart = (e: TouchEvent) => {
    e.preventDefault();

    xTouchStart = e.touches[0].clientX;
    yTouchStart = e.touches[0].clientY;
}

root.ontouchmove = (e: TouchEvent) => {
    e.preventDefault();
}

root.ontouchend = (e: TouchEvent) => {
    e.preventDefault();

    if (movementLock) return;
    movementLock = true;

    const xTouchEnd = e.changedTouches[0].clientX;
    const yTouchEnd = e.changedTouches[0].clientY;

    const xDistance = Math.abs(xTouchStart - xTouchEnd);
    const yDistance = Math.abs(yTouchStart - yTouchEnd);

    if (xDistance < yDistance) {
        if (yTouchStart > yTouchEnd) {
            if (!calculate(loopColsTop(tiles))) successfulMoves.up = false;
        } else {
            if (!calculate(loopColsBottom(tiles))) successfulMoves.down = false;
        }
    } else {
        if (xTouchStart > xTouchEnd) {
            if (!calculate(loopRowsLeft(tiles))) successfulMoves.left = false;
        } else {
            if (!calculate(loopRowsRight(tiles))) successfulMoves.right = false;
        }
    }

    handleDefeat();
}

createTile();
createTile();

root.hidden = false;
