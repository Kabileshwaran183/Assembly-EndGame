import { languages } from "./languages"
import { useState } from "react"
function App() {
  const langElements = languages.map(lang => {
    const styles = {
        backgroundColor: lang.backgroundColor,
        color: lang.color
    }
    return (
        <span className="lang-box" style={styles}>{lang.name}</span>
    )
})

const [word,setWord]=useState("kabi")
const wordEl = word.split("").map(w=>(
  <span className="each-word">{w.toUpperCase()}</span>
))

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
            <section className="lang">
                {langElements}
            </section>
            <section className="word">
                {wordEl}
            </section>
      </main>
    </>
  )
}

export default App
