import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="nav">
        <input type="checkbox" id="nav-check"/>
          <div className="nav-header">
            <div className="nav-title">
              NearbyKochiMetroFinder
            </div>
          </div>
          <div className="nav-btn">
            <label htmlFor="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className="nav-links">
            <a href="/all-kochi-metros-map" >All Metros Map</a>
            <a href="/my-nearest-metro">My Nearest Metro</a>
            <a href="/nearest-metro-map" >Choose Nearest on Map</a>
            <a href="/find-metro-by-coordinates" >Enter Cordinates</a>
          </div>
      </div>
    </>
  )
}

export default App
