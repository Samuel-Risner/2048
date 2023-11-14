import Tile from "./tile";

export function* loopTiles(tiles: (Tile | null)[][]): Generator<Tile, void, unknown> {
    for (let y = 0; y < tiles.length; y++) for (let x = 0; x < tiles[y].length; x++) if (tiles[y][x] !== null) yield tiles[y][x] as Tile;
}

export function* loopTilesFromTop(tiles: (Tile | null)[][]): Generator<Tile, void, unknown> {
    for (let y = 0; y < tiles.length; y++) for (let x = 0; x < tiles[y].length; x++) if (tiles[y][x] !== null) yield tiles[y][x] as Tile;
}

export function* loopTilesFromBottom(tiles: (Tile | null)[][]): Generator<Tile, void, unknown> {
    for (let y = tiles.length - 1; y > -1; y--) for (let x = 0; x < tiles[y].length; x++) if (tiles[y][x] !== null) yield tiles[y][x] as Tile;
}

export function* loopTilesFromLeft(tiles: (Tile | null)[][]): Generator<Tile, void, unknown> {
    for (let y = 0; y < tiles.length; y++) for (let x = tiles[y].length - 1; x > -1; x--) if (tiles[y][x] !== null) yield tiles[y][x] as Tile;
}

export function* loopTilesFromRight(tiles: (Tile | null)[][]): Generator<Tile, void, unknown> {
    for (let y = 0; y < tiles.length; y++) for (let x = 0; x < tiles[y].length; x++) if (tiles[y][x] !== null) yield tiles[y][x] as Tile;
}
