import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  // Obtener la imagen con las 3 primeras palabras del fact
  useEffect(() => {
    if (!fact) return
    // Paso el string a array, obtengo las 3 primeras palabras y las paso a string
    const threeFirstWords = fact.split(' ', 3).join(' ')
    // const threeFirstWords = fact.split(' ').slice(0, 3).join(' ') Otra forma
    console.log(threeFirstWords)
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { _id } = response
        setImageUrl(`/cat/${_id}/says/${threeFirstWords}`)
      })
  }, [fact])
  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}// { imageUrl: 'https:// ...' }
