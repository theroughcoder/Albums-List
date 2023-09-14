import { arrayUnion, collection, doc, getDoc, runTransaction, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useReducer, useRef, useState } from "react";
import { getFirestore } from "firebase/firestore";
import "../Style/album.css"
import { app } from "../initializeFirebase";
import Photo from "../components/photo";
import { Form } from "../components/form";

const db = getFirestore(app);
// Reducer function
const reducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case "GET_IMAGES": {
            // console.log("hi")
            return {
                ...state, images: payload
            };
        }
        case "ADD_IMAGE": {
            return {
                ...state, images: [payload, ...state.images]
            };
        }
        case "DELETE_IMAGE": {
            const images = state.images;

            return {
                ...state, images: images.filter((i) => {
                    if (i.id != payload.id) {
                       
                        return i
                    }
                })
            };
        }
        case "UPDATE_IMAGE": {
            const images = state.images;

            return {
                ...state, images: images.map((i) => {
                    if (i.id == payload.id) {
                        i.title = payload.title
                    }
                    return i
                })
            };
        }
        default:
            return state;
    }
};

// This is the component where all the album photos are displayed of an album
export function Album() {
    const [albumForm, setAlbumForm] = useState(false);
    const [isEdit, setIsEdit] = useState(null);
    const [state, dispatch] = useReducer(reducer, { name: "", images: [] });


    // Add function for adding album photos
    async function addPhoto(title, id) {
        // An object with the data that will be send to the server
        const data = {
            title: title,
            userId: id,
        };
        // Define the options for the request, including the method (POST), headers, and body
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                // Add any other headers you need here
            },
            body: JSON.stringify(data) 
        };

        // Make the POST request
        fetch('https://jsonplaceholder.typicode.com/albums', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                console.log(data); // Do something with the data returned from the server
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        dispatch({ type: "ADD_IMAGE", payload: { title } })
    }

    //This function is used for switching the form from add to edit 
    function changeToEdit(id, userId, title) {
        setAlbumForm(true);
        setIsEdit({ title, id, userId });
        // console.log( photoUrlInput.current.value)

    }

    // Function used for editing photos
    async function editPhoto(id, userId, title) {

        // Create an object with the data you want to send in the request body
        const data = {
            title,
            userId,
            id
        };

        // Define the options for the request, including the method (PUT), headers, and body
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string


        };

        // Make the PUT request
        fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                console.log(data); // Do something with the data returned from the server
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        dispatch({ type: "UPDATE_IMAGE", payload: { title, id } })

    }
    
    // Function for deleting photos
    async function deletePhoto(id) {

        // Define the options for the request, including the method (DELETE) and any headers
        const options = {
            method: 'DELETE',
    
        };

        // Make the DELETE request
        fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // The resource is deleted successfully if the response status is 204 (No Content)
                if (response.status === 204) {
                    console.log('Resource deleted successfully');
                } else {
                    console.log('Unexpected response:', response.status);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            dispatch({ type: "DELETE_IMAGE", payload: { id } })
    }

    useEffect(() => {

        async function fetchData() {
            fetch('https://jsonplaceholder.typicode.com/albums')
                .then(response => response.json())
                .then(json => {
                    dispatch({ type: "GET_IMAGES", payload: json })
                    console.log(state.images)
                })
                .catch(error => console.error(error));
        }
        fetchData();

    }, [])
    return (
        <div className="container">
            <div className="album-header">

                <h1>Albums</h1>
                <button onClick={() => { setAlbumForm(true); setIsEdit(null) }} className="attractive-button">Add Image</button>
            </div>
            {albumForm &&
                <Form length={state.images.length} name={state.name} addPhoto={addPhoto} isEdit={isEdit} setAlbumForm={setAlbumForm} editPhoto={editPhoto} />
            }
            <div className="album-body">
                {state.images && state.images.map((img) => (
                    <Photo key={img.id} id={img.id} userId={img.userId} title={img.title} handleEdit={changeToEdit} deletePhoto={deletePhoto} />
                ))}
            </div>
        </div>
    )
}