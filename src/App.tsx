import React, { useEffect, useState } from 'react'
import { toggleCell } from './ToggleCell'
import { update } from './UpdateGrid'

const numRows = 60
const numCols = 60
const cellSize = '10px'
let interval: any

const App: React.FC = () => {
  // Creates the grid matrix filled with dead cells
  // dead cell = 0
  const arr = new Array(numCols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(numRows).fill(0)
  }

  const [started, setStarted] = useState(false)
  const [grid, setGrid] = useState(arr)
  useEffect(() => {
    if (started) {
      interval = setInterval(() => {
        const updatedGrid = update(grid, numRows, numCols)
        setGrid(updatedGrid)
      }, 600)
    }

    return () => clearInterval(interval)
  }, [grid, started])

  const start = () => {
    setStarted(true)
  }

  const stop = () => {
    clearInterval(interval)

    setStarted(false)
  }

  const clear = () => {
    setGrid(arr)
  }

  const handleToggleCell = (indexRow: number, indexCol: number) => {
    const updatedGrid = toggleCell(grid, indexRow, indexCol)
    setGrid(updatedGrid)
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
              onClick={() => handleToggleCell(indexRow, indexCol)}
              style={{
                width: cellSize,
                height: cellSize,
                borderWidth: '0.09px',
                borderStyle: 'solid',
                borderColor: 'lightgrey',
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
