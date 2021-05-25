import React, { useState } from 'react'
import useInterval from './useInterval'

const numRows = 50
const numCols = numRows
const cellSize = '10px'

const App: React.FC = () => {
  // Creates a grid matrix filled with dead cells.
  const emptyGrid = new Array(numCols)
  for (let i = 0; i < emptyGrid.length; i++) {
    emptyGrid[i] = new Array(numRows).fill(0)
  }

  const [intervalTime, setIntervalTime] = useState(500)
  const [grid, setGrid] = useState(emptyGrid)
  const [running, setRunning] = useState(false)

  useInterval(() => update(), running ? intervalTime : null)

  const update = () => {
    // create a copy of the grid
    // https://ozmoroz.com/2020/07/how-to-copy-array/
    //const gridClone = grid.map((row) => [...row]).map((col) => [...col])
    const gridClone = [...grid].map((row) => [...row])

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
            gridClone[j][i] = 1
          }
        } else if (grid[j][i] === 1) {
          if (sumNeighbour < 2) {
            gridClone[j][i] = 0
          }
          if (sumNeighbour === 2 || sumNeighbour === 3) {
            gridClone[j][i] = 1
          }
          if (sumNeighbour > 3) {
            gridClone[j][i] = 0
          }
        }
      }
    }

    setGrid(gridClone)
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
      <button
        style={{ backgroundColor: running ? 'lightgreen' : 'white' }}
        onClick={() => setRunning(true)}
      >
        Start
      </button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button onClick={() => setGrid(emptyGrid)}>Clear</button>
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
                  grid[indexRow][indexCol] === 1 ? 'black' : 'white',
              }}
            />
          ))
        )}
      </div>
    </>
  )
}

export default App
