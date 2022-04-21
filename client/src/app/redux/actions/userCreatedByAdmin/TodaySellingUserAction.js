import axios from 'axios'

export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS_TODAY_SELLING = 'GET_SUCCESS_TODAY_SELLING'
export const SET_EDIT = 'SET_EDIT'

export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'
export const DELETE_STOCKSELIING_SUCCESS = 'DELETE_STOCKSELIING_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES = 'CLEAR_VALUES'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1/stocksUser',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenHospital')}`,
    },
})

const add = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        let { todaySellingData } = state
        // price = priceType === 'individualPrice' ? price * box * qty : price
        await authFetch.post('/todaySellingHospital', {
            todaySellingData,
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

const getAllDataTodaySelling = (state) => async (dispatch) => {
    // var { searchText } = state
    dispatch({
        type: GET_BEGIN,
    })
    // if (searchText) {
    //     return
    // }
    try {
        const { data } = await authFetch.get('/todaySellingHospital')
        const { stockListTodaySelling } = data

        dispatch({
            type: GET_SUCCESS_TODAY_SELLING,
            payload: { stockListTodaySelling },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    // console.log(subscriber, 'new Data')
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        const { todaySellingData, id } = state
        await authFetch.patch(`/${id}`, {
            todaySellingData,
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
const deleteData = (id) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    // const { logout } = useAuth()
    try {
        await authFetch.delete(`/${id}`)
        dispatch({ type: DELETE_STOCKSELIING_SUCCESS })
        dispatch(getAllDataTodaySelling({}))
    } catch (error) {
        // logout()
        console.log(error)
    }
}

///////////////////////////////////////////////////////////////
const clearValuesTodaySelling = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_STOCK_ALERT })
    }, 3000)
}

////////////////////////////////////////////////////////////////////////

export {
    clearValuesTodaySelling,
    clearAlert,
    getAllDataTodaySelling,
    add,
    setEditData,
    edit,
    deleteData,
}
