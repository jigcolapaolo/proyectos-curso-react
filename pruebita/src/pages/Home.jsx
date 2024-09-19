import { Link } from "jin-router"
import { useState } from "react"

export default function HomePage () {

    const [search, setSearch] = useState("java")

    const changeInput = (event) => {
      setSearch(event.target.value)
    }

    return (
        <>
        <h1>Home</h1>
        <input 
          type="text"
          onChange={changeInput}
          value={search}
        />
        <Link to="/about">Go to About</Link>
        <Link to={`/search/${search}`}>Go to Search</Link>
      </>
    )
}