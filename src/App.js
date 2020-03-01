import React, { useState, useEffect } from "react";
import "./styles.css";
import styled from "styled-components";

const WinnerText = styled.div`
  text-align: center;
  width: 450px;
  padding: 10px 0;
`;

const Cell = styled.div`
  width: 30px;
  height: 30px;
  border-top: 1px solid black;
  border-left: 1px solid black;
  cursor: pointer;
  border-bottom: ${props =>
    props.shouldDrawBottomLine ? "1px solid black" : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    background: ${props => (props.color !== "black" ? "transparent" : "black")};
    border: ${props => {
      if (props.color !== "brown") {
        return "1px solid black";
      } else {
        return "none";
      }
    }};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    content: "";
  }
  &:last-child {
    border-right: 1px solid black;
  }
`;

const Row = styled.div`
  display: flex;
  width: 450px;
`;

function isRowValid(grid, r, c) {
  const offset = 5;
  const rowStart = c - offset < 0 ? 0 : c - offset;
  const rowEnd =
    c + offset > grid[r].length - 1 ? grid[r].length - 1 : c + offset;
  let rowCount = 0;
  let prev = grid[r][c];
  for (let j = rowStart; j <= rowEnd; j++) {
    if (rowCount === 4) {
      return true;
    }
    if (prev !== 0 && prev === grid[r][j]) {
      rowCount++;
    } else {
      rowCount = 0;
      prev = grid[r][j];
    }
  }
  return false;
}

function isColumnValid(grid, r, c) {
  const offset = 5;
  let count = 0;
  const rStart = r - offset < 0 ? 0 : r - offset;
  const range =
    r + offset > grid.length - 1
      ? grid.length - 1 - rStart
      : r + offset - rStart;
  let prev = grid[rStart][c];
  for (let i = 0; i < range; i++) {
    if (count === 4) {
      return true;
    }
    if (rStart + i > grid.length) {
      break;
    }
    if (prev !== 0 && prev === grid[rStart + i][c]) {
      count++;
    } else {
      count = 0;
      prev = grid[rStart + i][c];
    }
  }

  return false;
}

function isDiaglognalValid(grid, r, c) {
  let count1 = 0;
  let prev1 = grid[r][c];
  const offset = 5;
  for (let i = 0; i <= offset; i++) {
    if (count1 === 5) {
      console.log("1111");
      return true;
    }
    if (r + i > grid.length - 1 || c + i > grid[0].length - 1) {
      break;
    }
    if (prev1 !== 0 && prev1 === grid[r + i][c + i]) {
      count1++;
    } else {
      count1 = 0;
      prev1 = grid[r + i][c + i];
    }
  }

  let count2 = 0;
  let prev2 = grid[r][c];
  for (let i = 0; i <= offset; i++) {
    if (count2 === 5) {
      return true;
    }
    if (r - i < 0 || c - i < 0) {
      break;
    }
    if (prev2 !== 0 && prev2 === grid[r - i][c - i]) {
      count2++;
    } else {
      count2 = 0;
      prev2 = grid[r - i][c - i];
    }
  }

  let count3 = 0;
  let prev3 = grid[r][c];
  for (let i = 0; i <= offset; i++) {
    if (count3 === 5) {
      return true;
    }
    if (r - i < 0 || c + i > grid[0].length - 1) {
      break;
    }
    if (prev3 !== 0 && prev3 === grid[r - i][c + i]) {
      count3++;
    } else {
      count3 = 0;
      prev3 = grid[r - i][c + i];
    }
  }

  let count4 = 0;
  let prev4 = grid[r][c];
  for (let i = 0; i <= offset; i++) {
    if (count4 === 5) {
      return true;
    }
    if (r + i > grid.length - 1 || c - i < 0) {
      break;
    }
    if (prev4 !== 0 && prev4 === grid[r + i][c - i]) {
      count4++;
    } else {
      count4 = 0;
      prev4 = grid[r + i][c - i];
    }
  }

  return false;
}

function checkWinningState(grid, curPos) {
  const [r, c] = curPos;
  if (r == null || c == null) return false;
  return (
    isRowValid(grid, r, c) ||
    isColumnValid(grid, r, c) ||
    isDiaglognalValid(grid, r, c)
  );
}

const winningState = ["white win", "", "Black win"];

function Winner({ player = 0 }) {
  return <WinnerText>{winningState[player + 1]}</WinnerText>;
}

function getDefaultGridData(row, col) {
  const grid = Array.from({ length: row })
    .fill(0)
    .map((row, i) => {
      return Array.from({ length: col })
        .fill(0)
        .map((x, i) => 0);
    });
  return grid;
}

function Board() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const gridData = React.useRef(getDefaultGridData(15, 15));
  const [currentPos, setCurrentPos] = useState([null, null]);
  const [isWin, setIsWin] = useState(0);
  useEffect(() => {
    const [r, c] = currentPos;
    if (r === null || c === null) return;
    if (gridData.current[r][c] === 0) {
      gridData.current[r][c] = currentPlayer;
    }
    setIsWin(
      checkWinningState(gridData.current, currentPos) === true
        ? currentPlayer
        : 0
    );
    setCurrentPlayer(prev => (prev === 1 ? -1 : 1));
  }, [currentPos]);

  function handleClick(e) {
    const [r, c] = JSON.parse(e.target.dataset.pos);
    if (gridData.current[r][c] === 0 && isWin === 0) {
      setCurrentPos([r, c]);
    }
  }

  function colorCell(type) {
    if (type === 1) {
      return "black";
    } else if (type === -1) {
      return "white";
    } else {
      return "brown";
    }
  }

  return (
    <>
      {gridData.current.map((row, i) => {
        return (
          <Row onClick={handleClick} key={i}>
            {row.map((c, j) => {
              return (
                <Cell
                  color={colorCell(c)}
                  data-pos={JSON.stringify([i, j])}
                  key={`${i}_${j}_${c}`}
                  shouldDrawBottomLine={i === row.length - 1}
                />
              );
            })}
          </Row>
        );
      })}
      <Winner player={isWin} />
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}
