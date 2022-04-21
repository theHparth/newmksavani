import axios from 'axios'

export const CREATE_BEGIN = 'CREATE_BEGIN'
export const CREATE_SUCCESS = 'CREATE_SUCCESS'
export const CREATE_ERROR = 'CREATE_ERROR'
export const GET_BEGIN = 'GET_BEGIN'
export const GET_SUCCESS = 'GET_SUCCESS'
export const SET_EDIT = 'SET_EDIT'
export const DELETE_BEGIN = 'DELETE_BEGIN'
export const EDIT_BEGIN = 'EDIT_BEGIN'
export const EDIT_SUCCESS_STOCKIN = 'EDIT_SUCCESS_STOCKIN'
export const EDIT_ERROR = 'EDIT_ERROR'
export const GET_SET_VENDORNAME = 'GET_SET_VENDORNAME'
export const DELETE_STOCKIN_SUCCESS = 'DELETE_STOCKIN_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES_STOCKIN = 'CLEAR_VALUES_STOCKIN'
export const CLEAR_STOCKIN_ALERT = 'CLEAR_STOCKIN_ALERT'

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

const add = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        let { invoiceNumStockIn, vendor_name, stockInDetail, stockInNote } =
            state
        stockInNote = FirstCapitalize(stockInNote)
        await authFetch.post('/wereHouse', {
            invoiceNumStockIn,
            vendor_name,
            stockInDetail,
            stockInNote,
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

const getAllData = (state) => async (dispatch) => {
    var { search, searchText, vendorname, new_dates } = state

    let url = '/wereHouse?all=all'

    if (search) {
        url = url + `&search=${search}`
    }
    if (vendorname) {
        url = url + `&vendorName=${vendorname}`
    }
    if (searchText) {
        url = url + `&searchText=${searchText}`
    }
    if (new_dates && new_dates[0] !== undefined) {
        console.log('first search date', new_dates[0])
        url = url + `&startDate=${new_dates[0]}&endDate=${new_dates[1]}`
    }
    dispatch({
        type: GET_BEGIN,
    })

    try {
        const { data } = await authFetch.get(url)
        const { stockList } = data
        dispatch({
            type: GET_SUCCESS,
            payload: { stockList },
        })
    } catch (error) {
        console.log(error)
    }
    dispatch(clearAlert())
}

const setEditData = (subscriber) => (dispatch) => {
    console.log(subscriber, 'data for update ')
    dispatch({ type: SET_EDIT, payload: { subscriber } })
}

const edit = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })

    try {
        let { id, invoiceNumStockIn, vendor_name, stockInDetail, stockInNote } =
            state
        stockInNote = FirstCapitalize(stockInNote)
        await authFetch.patch(`/wereHouse/${id}`, {
            invoiceNumStockIn,
            vendor_name,
            stockInDetail,
            stockInNote,
        })
        dispatch({ type: EDIT_SUCCESS_STOCKIN })
        // dispatch(clearValues())
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
        await authFetch.delete(`/wereHouse/${Id}`)
        dispatch({ type: DELETE_STOCKIN_SUCCESS })
        dispatch(getAllData({}))
    } catch (error) {
        // logout()
        console.log(error)
    }
}

///////////////////////////////////////////////////////////////

const clearValuesWerehouse = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_STOCKIN })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_STOCKIN_ALERT })
    }, 3000)
}

////////////////////////////////////////////////////////////////////////

export {
    clearValuesWerehouse,
    clearAlert,
    getAllData,
    add,
    setEditData,
    edit,
    deleteData,
}
