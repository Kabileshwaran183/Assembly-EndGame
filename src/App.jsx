import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"
import { getFarewellText, getRandomWord } from "./farewell"
import Confetti from 'react-confetti'

function App() {
  //state values
  const [word, setWord] = useState(getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  //derived values
  const wrongGuessCount =
    guessedLetters.filter(letter => !word.includes(letter)).length
  const isGameWon =
    word.split("").every(letter => guessedLetters.includes(letter))
  const isGameLoss =
    wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLoss
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !word.includes(lastGuessedLetter)

  //static values
  const alphabets = "qwertyuiopasdfghjklzxcvbnm"

  const langElements = languages.map((lang, ind) => {
    const isLostLang = ind < wrongGuessCount
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span className={clsx("language", { lost: isLostLang })} style={styles}>
        {lang.name}
      </span>
    )
  })

  const wordEl = word.split("").map((w, index) => {
    const isFind = guessedLetters.includes(w)
    const shouldReveal = isGameLoss || isFind
    const className = clsx({
      found: isFind,
      notFound: !isFind,
    })

    return (
      <span key={index} className={className}>
        {shouldReveal ? w.toUpperCase() : ""}
      </span>
      // <span key={index}>
      //{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      //</span>  but we use className changeable...
    )
  })

  const keyboard = alphabets.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && word.includes(letter)
    const isWrong = isGuessed && !word.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })
    return (
      <button key={letter}
        onClick={() => addGuessLetter(letter)}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        className={className}>
        {letter.toUpperCase()}
      </button>)
  })

  function addGuessLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
    )
  }
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLoss,
    farewell: !isGameLoss && isLastGuessIncorrect,
    gif: !isGameLoss && !isLastGuessIncorrect && !isGameWon
  })
  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      )
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }
    if (isGameOver) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
  }
  function startNewGame() {
    setWord(getRandomWord())
    setGuessedLetters([])
  }
  return (
    <>
      {isGameWon && <Confetti numberOfPieces={120}
        gravity={0.08}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centering the confetti
        }} />}
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word within 8 attempts to keep the
            programming world safe from Assembly!</p>
        </header>
        <section aria-live="polite"
          role="status"
          className={gameStatusClass}>
          {renderGameStatus()}
        </section>
        <section className="language">
          {langElements}
        </section>
        <section className="word">
          {wordEl}
        </section>
        <section
          className="sr-only"
          aria-live="polite"
          role="status"
        >
          <p>Current word: {word.split("").map(letter =>
            guessedLetters.includes(letter) ? letter + "." : "blank.")
            .join(" ")}</p>
        </section>
        <section className="keyboard">
          {keyboard}
        </section>

        {isGameOver && <button className="newGame" onClick={startNewGame}>New Game</button>}

      </main>
    </>
  )
}

export default App
