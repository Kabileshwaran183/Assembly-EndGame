import { languages } from "./languages"

function App() {
  const langElements = languages.map(lang => {
    const styles = {
        backgroundColor: lang.backgroundColor,
        color: lang.color
    }
    return (
        <span className="chip" style={styles}>{lang.name}</span>
    )
})

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
            <section className="lang-chips">
                {langElements}
            </section>
      </main>
    </>
  )
}

export default App
