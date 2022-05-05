import axios from 'axios'

export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS_STOCKOUT = 'GET_SUCCESS_STOCKOUT'

export const SET_EDIT = 'SET_EDIT'
export const SET_EDIT_MINIMUM_LIMIT = 'SET_EDIT_MINIMUM_LIMIT'
export const GET_SUCCESS_PRESENT_STOCK = 'GET_SUCCESS_PRESENT_STOCK'
export const STATUS_EDIT_SUCCESS = 'STATUS_EDIT_SUCCESS'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_ERROR = 'EDIT_ERROR'
export const EDIT_MINIMUM_SUCCESS = 'EDIT_MINIMUM_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES_STOCK_USER = 'CLEAR_VALUES_STOCK_USER'
export const CLEAR_STOCK_ALERT_USER = 'CLEAR_STOCK_ALERT_USER'
export const DISPLAY_STOCK_ALERT = ' DISPLAY_STOCK_ALERT'

const authFetch = axios.create({
    baseURL: '/api/v1/stocksUser',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenHospital')}`,
    },
})

const AllstockInUser = (state) => async (dispatch) => {
    const { status, searchText } = state
    var url = `/stockInUser?status=${status}`
    if (searchText) {
        url = url + `&searchText=${searchText}`
    }
    dispatch({
        type: GET_BEGIN,
    })

    try {
        const { data } = await authFetch.get(url)
        const { stockInUser } = data
        // console.log('userData', stockInDataFalseStatus)
        dispatch({
            type: GET_SUCCESS_STOCKOUT,
            payload: { stockInUser },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}
const inStockUser = (state) => async (dispatch) => {
    var { searchText } = state

    let url = '/totalStocks'
    // var { searchStock } = state
    if (searchText) {
        url = url + `?searchText=${searchText}`
    }

    dispatch({
        type: GET_BEGIN,
    })

    try {
        const { data } = await authFetch.get(url)
        const { presentStockUser } = data
        console.log('presentstockdata', presentStockUser)
        dispatch({
            type: GET_SUCCESS_PRESENT_STOCK,
            payload: { presentStockUser },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}

const setEditMinimumLimit = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT_MINIMUM_LIMIT, payload: { subscriber } })
}

const inStockMinimumChange = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        const { minimumLimit, id } = state
        await authFetch.patch(`/totalStocks/${id}`, {
            id,
            minimumLimit,
        })
        dispatch({ type: EDIT_MINIMUM_SUCCESS })
        // dispatch(getAllDataStatusFalse())
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}
const statusChange = (id) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        // const { id } = state
        await authFetch.patch(`/status/${id}`, {
            id,
            status: true,
        })
        dispatch({ type: STATUS_EDIT_SUCCESS })
        dispatch(AllstockInUser({}))
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}
///////////////////////////////////////////////////////////////

const clearValueStockUser = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_STOCK_USER })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_STOCK_ALERT_USER })
    }, 3000)
}

////////////////////////////////////////////////////////////////////////

export {
    clearValueStockUser,
    AllstockInUser,
    inStockUser,
    inStockMinimumChange,
    setEditMinimumLimit,
    statusChange,
    clearAlert,
}
