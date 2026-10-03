import {getAllImages,
        deleteImage,
        addImage,
        editImageDate
} from '../services/kushokaAPI'
import {useEffect, useReducer} from 'react'

const initialStates = {
    loading: true,
    error: null,
    images: []
}

function reducer(state, action) {
    switch(action.type) {
        case "fetch_success": return {...state,
            loading: false,
            images: action.payload
        }
        case "fetch_error": return {...state,
            loading: false,
            error: action.payload
        }
        case "add": return {...state,
            images: [...state.images, action.payload]
        }
        case "delete": return {...state,
            images: state.images.filter(image => image.id !== action.payload)
        }
        case "edit_date": return {...state,
            images: state.images.map(image => image.id === action.payload.id
                ? {...image, tarehe: action.payload.tarehe}
                : image
            )
        }
        default: return state;
    }
}

export function useImages() {
    const [allImages, dispatch] = useReducer(reducer, initialStates)

    useEffect(() => {
        async function callAllImages() {
            try {
                const images = await getAllImages()
                dispatch({
                    type: "fetch_success",
                    payload: images
                })
            }
            catch(err) {
                dispatch({
                    type: "fetch_error",
                    payload: err.message + ",kuna hitirafu kidogo!"
                })
            }
        }
        callAllImages()
    },[])

    async function uploadImage(img_object,img_file) {
        try {
            const image = await addImage(img_object, img_file)
            dispatch({
                type: "add",
                payload: image
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message + ",imegoma kurusha!"}
        }
    } 

    async function removeImage(id, faili) {
        try {
            await deleteImage(id,faili)
            dispatch({
                type: "delete",
                payload: id
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message + ",imegoma kufuta!"}
        }
    }

    async function editDate(id, date_obj) {
        try {
            const img_obj = await editImageDate(id, date_obj)
            dispatch({
                type: "edit_date",
                payload: img_obj
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message + ",imegoma kubadiri!"}
        }
    }

    return {loading: allImages.loading,
            error: allImages.error,
            images: allImages.images,
            uploadImage,
            removeImage,
            editDate,
    }

}