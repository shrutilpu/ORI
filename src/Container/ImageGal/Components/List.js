import React, { useState } from 'react'
import { getImageUrl } from '../../../utils/common';
import "../style.css";



const List = props => {
  const [modalData, setModal] = useState(null);

  const setModalData = (data)=>{
    setModal(data);
  }
  return (
    <>
    <div className='list__container'>
     {
      props.data?.map((item, ind) =>{
      return <div key={`${item.id}${ind}`} className="list__item" onClick={()=>setModalData(item)}>
        <img src={getImageUrl(item)} alt="img" loading='lazy'/> 
      </div>})
     }
    </div>
    {modalData && (
        <div className="modal">
          <div className="modal__content">
          <h4 className="close" onClick={()=>setModal(null)}>&times;</h4>
           
            <h2 className='modal__header'>{modalData?.title}</h2>
          
            <img src={getImageUrl(modalData)} alt="img" width={200} height={200}/> 
          </div>
        </div>
      )}
    </>
  )
}



export default List