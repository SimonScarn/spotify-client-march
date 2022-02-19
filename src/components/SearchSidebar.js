import { useState, useEffect } from 'react'

function SearchSidebar() {
    const [query, setQuery] = useState('');

    
    return (
        <div style={{ marginTop: "5px"}}>
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search for a playlist..."></input>
            <div></div>
        </div>
    )
}

export default SearchSidebar
