
import React, { useState } from 'react';
import "../Style/photo.css"

// This is a card component for album photos
export default function Photo({id, userId, title, handleEdit, deletePhoto}){
    // console.log(id)
    const [currentHoverIndex, setCurrentHoverIndex] = useState(false);
    return(
        <div onMouseOver={() => {
            setCurrentHoverIndex(true);
          }}
          onMouseLeave={() => {
            setCurrentHoverIndex(false);
          }} className="card ">
        <img className="card-image" src="./album.webp" alt="Card Image"/>
        <div className="card-content">
            <h2 className="card-title">{title}</h2>
          
        </div>
        <div
          className={`btnContainer ${
            currentHoverIndex == true && "active"
          }`}
        >
          <div
            className="edit"
            onClick={() => {
                handleEdit(id, userId,  title) 
            }}
          >
            <img src="https://stalwart-wisp-382f3c.netlify.app/assets/edit.png" height="100%" alt="Edit" />
          </div>
          <div
            className="delete"
            onClick={() => deletePhoto(id)}
          >
            <img src="https://stalwart-wisp-382f3c.netlify.app/assets/trash-bin.png" height="100%" alt="Delete" />
          </div>
        </div>
        </div>
    )
}