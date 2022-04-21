import axios from 'axios'

export const CREATE_SUCCESS_STOCK = 'CREATE_SUCCESS_STOCK'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS_STOCK = 'GET_SUCCESS_STOCK'
export const SET_EDIT_STOCK = 'SET_EDIT_STOCK'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_SUCCESS_STOCK = 'EDIT_SUCCESS_STOCK'
export const EDIT_ERROR = 'EDIT_ERROR'
export const DELETE_STOCK_SUCCESS = 'DELETE_STOCK_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES_STOCK = 'CLEAR_VALUES_STOCK'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

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

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

const add = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        var { description, stock_name, minimumLimit } = state

        // function FirstCapitalize(str) {
        //     return str.charAt(0).toUpperCase() + str.slice(1)
        // }
        stock_name = FirstCapitalize(stock_name)

        await authFetch.post('/stocks', {
            description,
            stock_name,
            minimumLimit,
        })
        dispatch({ type: CREATE_SUCCESS_STOCK })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

const getAllData = (searchText) => async (dispatch) => {
    // const { searchStock } = state
    let url = '/stocks'
    // var { searchStock } = state
    if (searchText) {
        url = url + `?searchText=${searchText}`
    }

    dispatch({
        type: GET_BEGIN,
    })

    try {
        const { data } = await authFetch.get(url, { searchText })
        const { stockList } = data
        dispatch({
            type: GET_SUCCESS_STOCK,
            payload: { stockList },
        })
    } catch (error) {
        console.log(error)
        // removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT_STOCK, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        var { description, id, stock_name, minimumLimit } = state

        function FirstCapitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
        stock_name = FirstCapitalize(stock_name)

        await authFetch.patch(`/stocks/${id}`, {
            description,
            minimumLimit,
            stock_name,
        })
        dispatch({ type: EDIT_SUCCESS_STOCK })
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
        await authFetch.put(`/stocks/${Id}`)
        dispatch({ type: DELETE_STOCK_SUCCESS })
        dispatch(getAllData())
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

///////////////////////////////////////////////////////////////
const clearValueStock = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_STOCK })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_STOCK_ALERT })
    }, 3000)
}

////////////////////////////////////////////////////////////////////////

export {
    clearValueStock,
    clearAlert,
    getAllData,
    add,
    setEditData,
    edit,
    deleteData,
}
