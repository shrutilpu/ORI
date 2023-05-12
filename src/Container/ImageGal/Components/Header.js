import React, { useRef, useState } from 'react'
import { mangeLocalSearchQuery } from '../../../utils/common';
import  "../style.css";

const Header = props => { 
  const [suggestion, setSuggestion] = useState([]);
  const ref = useRef();

  const handleKeyDown = (e)=>{
    clearTimeout(ref.current);
    if(suggestion.length<=1){
      setSuggestion(mangeLocalSearchQuery());
    }
    ref.current = setTimeout(()=>{setSuggestion([])},5000);
  }
  return (
    <div className='header'>
    <div className='input__container'>
    <input type="search" placeholder='type to search...' onChange={props.changeHandler} onKeyDown={handleKeyDown} />
    {
      suggestion.length>0 && <div className='search__suggestion'>
      {suggestion.map(item=><p onClick={()=>props.changeHandler(item)}>{item}</p>)}
     </div>
    }
    </div>
    </div>
  )
}



export default Header