export const toggleCell = (
  grid: any[][],
  indexRow: number,
  indexCol: number
) => {
  const updatedArray = grid.map((row, i) => {
    row.map((col: any, j: number) => {
      if (indexRow === j && indexCol === i) {
        const value = grid[j][i] === 0 ? 1 : 0
        return (grid[j][i] = value)
      } else {
        return grid[j][i]
      }
    })

    return grid[i]
  })

  return updatedArray
}
