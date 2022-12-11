import React from 'react'
import Cocktail from './Cocktail'

const Feed = ({ cocktails }) => {
  return (
    <div className="Feed">
        {cocktails.map(cocktail => (
            <Cocktail key={cocktail._id} cocktail={cocktail} />
        ))}
    </div>
  )
}

export default Feed