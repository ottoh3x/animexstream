import React from 'react'

function RandomRecommended() {
    
    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
      
        return shuffled.slice(0, num);
      }
      
      const arr = ['b', 'c', 'a', 'd'];
      
  return (
    <div>RandomRecommended</div>
  )
}

export default RandomRecommended
