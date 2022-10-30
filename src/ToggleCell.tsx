export const toggleCell = (
  grid: any[][],
  indexRow: number,
  indexCol: number
) => {
  const updatedGrid = grid.map(row => {
    return row.slice()
  })
  updatedGrid[indexRow][indexCol] = updatedGrid[indexRow][indexCol] === 0 ? 1 : 0

  return updatedGrid
}
