import settings from "./settings";
import Tile from "./tile";

type MyGenerator = Generator<[Tile | null, number, number], null, unknown>;
export type MyGeneratorGenerator = Generator<() => MyGenerator, null, unknown>;

function* loopColTop(tiles: (Tile | null)[][], col: number, amount: number): MyGenerator {
    for (let y = 0; y < amount; y++)  yield [tiles[y][col], col, y];
    return null;
}

export function* loopColsTop(tiles: (Tile | null)[][]): MyGeneratorGenerator {
    for (let x = 0; x < settings.field.size; x++) for (let i = 0; i < settings.field.size + 1; i++) yield () => loopColTop(tiles, x, i);
    return null;
}

function* loopColBottom(tiles: (Tile | null)[][], col: number, amount: number): MyGenerator {
    for (let y = settings.field.size - 1; y > settings.field.size - amount; y--)  yield [tiles[y][col], col, y];
    return null;
}

export function* loopColsBottom(tiles: (Tile | null)[][]): MyGeneratorGenerator {
    for (let x = 0; x < settings.field.size; x++) for (let i = 1; i < settings.field.size + 2; i++) yield () => loopColBottom(tiles, x, i);
    return null;
}

function* loopRowLeft(tiles: (Tile | null)[][], row: number, amount: number): MyGenerator {
    for (let x = 0; x < amount; x++)  yield [tiles[row][x], x, row];
    return null;
}

export function* loopRowsLeft(tiles: (Tile | null)[][]): MyGeneratorGenerator {
    for (let y = 0; y < tiles.length; y++) for (let i = 1; i < settings.field.size + 1; i++) yield () => loopRowLeft(tiles, y, i);
    return null;
}

function* loopRowRight(tiles: (Tile | null)[][], row: number, amount: number): MyGenerator {
    for (let x = settings.field.size - 1; x > settings.field.size - amount; x--)  yield [tiles[row][x], x, row];
    return null;
}

export function* loopRowsRight(tiles: (Tile | null)[][]): MyGeneratorGenerator {
    for (let y = 0; y <  settings.field.size; y++) for (let i = 1; i < settings.field.size + 2; i++) yield () => loopRowRight(tiles, y, i);
    return null;
}
