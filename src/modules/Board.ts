import {Cell} from "./Cell"
export class Board {
    cells: Cell[][] = []

    public initCells() {
        for (let i = 0; i < 8; i += 1) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j += 1) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell()) //black
                } else {
                    row.push(new Cell()) // white
                }
            }
            this.cells.push(row)
        }

    }
}