import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"
function App() {
  const [word, setWord] = useState("kabi")
  const [guessedLetters, setGuessedLetters] = useState([])

  const guessedWordCount =
    guessedLetters.filter(letter => !word.includes(letter)).length
  console.log(guessedWordCount)
  const alphabets = "qwertyuiopasdfghjklzxcvbnm"

  const langElements = languages.map((lang, ind) => {
    const isLostLang = ind < guessedWordCount
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
    const className = clsx({
      found: isFind,
      notFound: !isFind,
    })

    return (
      <span key={index} className={className}>
        {isFind ? w.toUpperCase() : ""}
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

  return (
    <>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>Guess the word within 8 attempts to keep the
            programming world safe from Assembly!</p>
        </header>
        <section className="game-status">
          <h2>YOU WIN ! </h2>
          <p> well done! 🎉</p>
        </section>
        <section className="language">
          {langElements}
        </section>
        <section className="word">
          {wordEl}
        </section>
        <section className="keyboard">
          {keyboard}
        </section>

        <button className="newGame">New Game</button>

      </main>
    </>
  )
}

export default App
