import React from 'react'
import "./SearchBar.css"
import { UilSearch ,UilPackage, UilClipboardAlt,} from "@iconscout/react-unicons";

const SearchBar = () => {
  return (
    <div className='upBar'>   
     <div className='SearchBar'> 
     <UilSearch className="search-icon" />
      tap here to search
    </div>
     <div className='notification' >
     <UilClipboardAlt className="search-icon" />
     </div>
     <div className='notification' >
     <UilPackage className="search-icon" />
     </div>
    </div>
  )
}

export default SearchBar
