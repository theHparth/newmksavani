import axios from 'axios'

export const GET_FILTER_SUCCESS = 'GET_FILTER_SUCCESS'
export const CLEAR_VALUES_STOCKOUT = 'CLEAR_VALUES_STOCKOUT'
export const CLEAR_STOCK_ALERT = 'CLEAR_STOCK_ALERT'
export const GET_BEGIN = 'GET_BEGIN'

const authFetch = axios.create({
    baseURL: '/api/v1/stockOut',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})

const getallFilteredData = (state) => async (dispatch) => {
    const { searchDate, searchText, searchStock } = state
    console.log('in action ', searchDate)
    // let url = '/?searchStatus=false'
    let url = '/filterDataCalculation/?all=all'

    if (searchDate && searchDate[0] !== undefined) {
        console.log('first search date', searchDate)
        url = url + `&startDate=${searchDate[0]}&endDate=${searchDate[1]}`
    }
    if (searchText) {
        url = url + `&searchText=${searchText}`
    }
    if (searchStock) {
        url = url + `&searchStock=${searchStock}`
    }
    // if (new_dates && new_dates[0] != undefined) {
    //     console.log('first search date', new_dates[0])
    //     url = url + `&startDate=${new_dates[0]}&endDate=${new_dates[1]}`
    // }

    try {
        dispatch({ type: GET_BEGIN })
        const { data } = await authFetch.get(url)
        const { filterDataBack } = data

        dispatch({
            type: GET_FILTER_SUCCESS,
            payload: { filterDataBack },
        })
    } catch (error) {
        console.log(error)
        // logout()
    }
    dispatch(clearAlert())
}

///////////////////////////////////////////////////////////////
const clearValuesStockOut = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_STOCKOUT })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_STOCK_ALERT })
    }, 3000)
}

////////////////////////////////////////////////////////////////////////

export { clearValuesStockOut, clearAlert, getallFilteredData }
