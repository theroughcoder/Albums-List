import { useEffect, useRef } from "react";

// This is the form component for creating and deleting album photos
export function Form({name, addPhoto, isEdit , setAlbumForm, editPhoto, length}){
    const photoTitleInput = useRef("");
    
    // function that triggers on form submission 
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        if(isEdit){
            editPhoto( isEdit.id, isEdit.userId, photoTitleInput.current.value)
        }else{
            addPhoto( photoTitleInput.current.value, length)
        }

        photoTitleInput.current.value = "";
        // albumNameInput.current.value = "";
    } 
    useEffect(()=>{
        if(isEdit){
          
            photoTitleInput.current.value = isEdit.title;
        }
    }, [isEdit])

    return (
        <form onSubmit={onSubmitHandler} className="my-form">
            <div onClick={()=> setAlbumForm(false)} className="cancel">X</div>
            < label className="text-input" for="textInput">{isEdit ? "Edit "+ name  : "Add an Image"}</label>
            <input ref={photoTitleInput} className="my-input-album" type="text" id="textInput" name="textInput" placeholder="Add Title..." required/>

            <button style={{background: "red"}} className="my-button" type="reset">Reset</button>
            <button  className="my-button" type="submit">{isEdit ? "Edit"  : "Create"}</button>
         </form>
    )
}