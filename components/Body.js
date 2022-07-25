import { useState } from "react"
import Search from "./Search"

function Body() {
  const [search, setSearch] = useState("")
  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
    </section>
  )
}

export default Body