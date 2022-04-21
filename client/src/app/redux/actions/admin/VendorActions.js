import axios from 'axios'

export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS = 'GET_SUCCESS'
export const SET_EDIT = 'SET_EDIT'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_BEGIN = 'EDIT_BEGIN'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'
export const DELETE_VENDOR_SUCCESS = 'DELETE_VENDOR_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES_VENDOR = 'CLEAR_VALUES_VENDOR'
export const CLEAR_VENDOR_ALERT = 'CLEAR_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

function FirstCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

///////////////////////////////////////////////////////////////
const clearValue = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_VENDOR })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_VENDOR_ALERT })
    }, 3000)
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}
////////////////////////////////////////////////////////////////////////

const getAllVendor = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        const { data } = await authFetch.get('/vendors')
        const { vendorList } = data

        dispatch({
            type: GET_SUCCESS,
            payload: { vendorList },
        })
    } catch (error) {
        console.log(error)
        // removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

const add = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        let { address, pincode, contect, email, vendor_name } = state
        vendor_name = FirstCapitalize(vendor_name)
        await authFetch.post('/vendors', {
            address,
            pincode,
            contect,
            email,
            vendor_name,
        })
        dispatch({ type: CREATE_SUCCESS })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        let { address, pincode, contect, email, vendor_name, id } = state
        vendor_name = FirstCapitalize(vendor_name)
        await authFetch.patch(`/vendors/${id}`, {
            address,
            pincode,
            contect,
            email,
            vendor_name,
        })
        dispatch({ type: EDIT_SUCCESS })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

// delete the
const deleteData = (Id) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        await authFetch.put(`/vendors/${Id}`)
        dispatch({ type: DELETE_VENDOR_SUCCESS })

        dispatch(getAllVendor())
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

export {
    clearValue,
    clearAlert,
    getAllVendor,
    add,
    setEditData,
    edit,
    deleteData,
}
