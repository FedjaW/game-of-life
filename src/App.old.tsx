import React, { useEffect, useState } from 'react'

const numRows = 100
const numCols = 100
const cellSize = '5px'
let interval: any

const App: React.FC = () => {
  useEffect(() => {
    setInterval(() => {
      update()
    }, 10000)
  })

  // Creates the grid matrix filled with dead cells
  // dead cell = 0
  const arr = new Array(numCols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(numRows).fill(0)
  }

  const [grid, setGrid] = useState(arr)

  const update = () => {
    const gridCopy = grid.map((row) => [...row]).map((col) => [...col])

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const n1 = j - 1 < 0 ? 0 : grid[j - 1][i]
        const n2 = j - 1 < 0 || i - 1 < 0 ? 0 : grid[j - 1][i - 1]
        const n3 = j - 1 < 0 || i + 1 === numRows ? 0 : grid[j - 1][i + 1]
        const n4 = j + 1 === numCols ? 0 : grid[j + 1][i]
        const n5 = j + 1 === numCols || i - 1 < 0 ? 0 : grid[j + 1][i - 1]
        const n6 =
          j + 1 === numCols || i + 1 === numRows ? 0 : grid[j + 1][i + 1]
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

    setGrid((_) =>
      // Important: read `state` instead of `this.state` when updating.
      gridCopy.map((row: any) => [...row]).map((col: any) => [...col])
    )
    console.log('update')
  }

  const start = () => {
    update()
  }

  const stop = () => {
    clearInterval(interval)
  }

  const clear = () => {
    setGrid(arr)
  }

  const toggleCell = (indexRow: number, indexCol: number) => {
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

    setGrid(updatedArray)
  }

  return (
    <>
      <div>Game of Life</div>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => clear()}>Clear</button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, ${cellSize})`,
        }}
      >
        {grid.map((rows, indexRow) =>
          rows.map((col: any, indexCol: number) => (
            <div
              key={indexCol}
              onClick={() => toggleCell(indexRow, indexCol)}
              style={{
                width: cellSize,
                height: cellSize,
                borderWidth: '0.1px',
                borderStyle: 'solid',
                borderColor: 'black',
                backgroundColor:
                  grid[indexRow][indexCol] === 1 ? 'blue' : 'red',
              }}
            />
          ))
        )}
      </div>
    </>
  )
}

export default App