import { useState } from 'react'
import './App.css'
import { Turnos } from './constants'
import { Square } from './components/Square'
import { checkEndGame, checkWinnerFrom } from './logic'
import { WinnerModal } from './components/WinnerModal'
import confetti from 'canvas-confetti'

function App() {
    const [board, setBoard] = useState(Array(9).fill(null)) 
    const [turn, setTurn] = useState(Turnos.x);
    const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que hubo empate

    //cambia el turno siguiente
    const changeTurn = () => {
      //Al usar una nueva variable para el nuevo turno, no estoy cambiando nunca el valor del turno ya que un estado 
      //es inmutable
      console.log(turn)
      const newTurn = turn == Turnos.x ? Turnos.o : Turnos.x
      setTurn(newTurn);
    }

    //Resetea el juego
    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(Turnos.x)
      setWinner(null)
    }

    const updateBoard = (index) => {
      // no actualizamos esta posición si ya tiene algo
      if (board[index] || winner) return

      // actualizar el tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)

      // cambiar el turno
      const newTurn = turn === Turnos.x ? Turnos.o : Turnos.x
      setTurn(newTurn)
    
      // revisar si hay ganador
      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner) {
        confetti()
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)) {
        setWinner(false) // empate
      }
    }

  return (
      <main className='board'>
        <h1>TaTeTi</h1>

        <section className='game'>
          {
            board.map((square, index) => {
              return (
                <Square key= {index} index={index} isSelected={false} updateBoard={updateBoard}>
                    {board[index]}
                </Square>
              )

            })
          }
        </section>
        <footer className='turnos'>
            <>
              <Square isSelected={turn == Turnos.x} onClick={changeTurn}>
                ❌
              </Square>
              
              <Square isSelected={turn == Turnos.o} onClick={changeTurn}>
              ⚪
              </Square>
            </>
        </footer>

        <WinnerModal  winner= {winner} resetGame={resetGame} />
      </main>
  )
}

export default App
