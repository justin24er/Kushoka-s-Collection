import {getAllImages,
        deleteImage,
        addImage,
        getImageDate
} from '../services/kushokaAPI'
import {useState, useEffect, useReducer} from 'react'

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

    
}