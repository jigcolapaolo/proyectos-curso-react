import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import { Otro } from './Components/Otro'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = () => {
    refreshFact()
    // getRandomFact().then(newFact => setFact(newFact))
    // o const newFact = await getRandomFact()
    // setFact(newFact)
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img
          src={imageUrl}
          alt={`Image extracted using the first 3 words for ${fact}`}
                     />}
      </section>
      <Otro />
    </main>
  )
}
