export const update = (grid: any[][], numRows: number, numCols: number) => {
  const gridCopy = grid.map(row => [...row]).map(col => [...col])

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const n1 = j - 1 < 0 ? 0 : grid[j - 1][i]
      const n2 = j - 1 < 0 || i - 1 < 0 ? 0 : grid[j - 1][i - 1]
      const n3 = j - 1 < 0 || i + 1 === numRows ? 0 : grid[j - 1][i + 1]
      const n4 = j + 1 === numCols ? 0 : grid[j + 1][i]
      const n5 = j + 1 === numCols || i - 1 < 0 ? 0 : grid[j + 1][i - 1]
      const n6 = j + 1 === numCols || i + 1 === numRows ? 0 : grid[j + 1][i + 1]
      const n7 = i + 1 === numRows ? 0 : grid[j][i + 1]
      const n8 = i - 1 < 0 ? 0 : grid[j][i - 1]

      const sumNeighbour = n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8

      if (grid[j][i] === 0) {
        if (sumNeighbour === 3) {
          gridCopy[j][i] = 1
        }
      } else if (grid[j][i] === 1) {
        if (sumNeighbour < 2) {
          gridCopy[j][i] = 0
        }
        if (sumNeighbour === 2 || sumNeighbour === 3) {
          gridCopy[j][i] = 1
        }
        if (sumNeighbour > 3) {
          gridCopy[j][i] = 0
        }
      }
    }
  }

  return gridCopy
}
