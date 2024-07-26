import React from 'react'
import SearchBar from "../../components/SearchBar/SearchBar"
import "./Expos.css"
import ExpoItem from '../../components/ExpoItem/ExpoItem'
import {staticExpos} from "../../data/ExposData"

const Expos = () => {
  return (
    <>
    <div >
      <SearchBar/>
        <div className='ExposBG'>
        <div className="ExposTitle">
        running Expos :
       </div>
        <ul id="Expos">
        { staticExpos.map((expo)=>
            <ExpoItem key={expo.id} expo={expo}/>
            )}
        </ul>    
      </div>
    </div>
    </>
  )
}

export default Expos
