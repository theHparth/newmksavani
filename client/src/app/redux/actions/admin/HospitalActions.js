import axios from 'axios'

export const GET_BEGIN = 'GET_BEGIN'
export const UPDATE_HOSPITAL_BEGIN = 'UPDATE_HOSPITAL_BEGIN'
export const UPDATE_HOSPITAL_SUCCESS = 'UPDATE_HOSPITAL_SUCCESS'
export const UPDATE_HOSPITAL_ERROR = 'UPDATE_HOSPITAL_ERROR'
export const CLEAR_VALUES_HOSPITAL = 'CLEAR_VALUES_HOSPITAL'
export const GET_HOSPITAL_MINIMUM_THRESOLD = 'GET_HOSPITAL_MINIMUM_THRESOLD'
export const CREATE_HOSPITAL_BEGIN = 'CREATE_HOSPITAL_BEGIN'
export const CREATE_HOSPITAL_SUCCESS = 'CREATE_HOSPITAL_SUCCESS'
export const CREATE_HOSPITAL_ERROR = 'CREATE_HOSPITAL_ERROR'
export const GET_HOSPITAL_BEGIN = 'GET_HOSPITAL_BEGIN'
export const GET_HOSPITAL_SUCCESS = 'GET_HOSPITAL_SUCCESS'
export const SET_EDIT_HOSPITAL = 'SET_EDIT_HOSPITAL'
export const DELETE_HOSPITAL_BEGIN = 'DELETE_HOSPITAL_BEGIN'
export const EDIT_HOSPITAL_BEGIN = 'EDIT_HOSPITAL_BEGIN'
export const EDIT_HOSPITAL_SUCCESS = 'EDIT_HOSPITAL_SUCCESS'
export const EDIT_HOSPITAL_ERROR = 'EDIT_HOSPITAL_ERROR'
export const EDIT_HOSPITAL_COMPLETE = 'EDIT_HOSPITAL_COMPLETE'
export const SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN'
export const GET_HOSPITAL_SELLING_SUCCESS = 'GET_HOSPITAL_SELLING_SUCCESS'
export const DELETE_HOSPITAL_SUCCESS = 'DELETE_HOSPITAL_SUCCESS'
export const GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS =
    'GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const CLEAR_VALUES = 'CLEAR_VALUES'
export const CLEAR_HOSPITAL_ALERT = 'CLEAR_HOSPITAL_ALERT'

const token = localStorage.getItem('token')
const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    },
})

function FirstCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

///////////////////////////////////////////////////////////////
const clearValue = () => (dispatch) => {
    dispatch({ type: CLEAR_VALUES_HOSPITAL })
}
const clearAlert = () => (dispatch) => {
    setTimeout(() => {
        dispatch({ type: CLEAR_HOSPITAL_ALERT })
    }, 3000)
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

////////////////////////////////////////////////////////////////////////

const getHospitalsData = (hospitalName) => async (dispatch) => {
    let url = '/hospitals'
    if (hospitalName) {
        url = url + `?hospitalName=${hospitalName}`
    }
    // dispatch({
    //     type: GET_BEGIN,
    // })
    try {
        const { data } = await authFetch.get(url)
        const { hospitals } = data
        dispatch({
            type: GET_HOSPITAL_SUCCESS,
            payload: { hospitals },
        })
    } catch (error) {
        console.log(error)
        // removeUserFromLocalStorage()
    }
}
const hospitalMinimumTheresold = () => async (dispatch) => {
    let url = '/hospitalDataAdmin/minimumThresold'

    dispatch({
        type: GET_BEGIN,
    })
    try {
        const { data } = await authFetch.get(url)
        const { minimumThresoldData } = data
        console.log('in action hospital', minimumThresoldData)
        dispatch({
            type: GET_HOSPITAL_MINIMUM_THRESOLD,
            payload: { minimumThresoldData },
        })
    } catch (error) {
        console.log(error)
        // removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}
const hospitalStockInformation = (state) => async (dispatch) => {
    var { id, searchText } = state
    let url = '/hospitalDataAdmin/?all=all'
    if (id) {
        url = url + `&id=${id}`
    }
    if (searchText) {
        url = url + `&searchText=${searchText}`
    }
    dispatch({
        type: GET_BEGIN,
    })
    try {
        const { data } = await authFetch.get(url)
        const { hospitalPresentStock } = data
        dispatch({
            type: GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS,
            payload: { hospitalPresentStock },
        })
    } catch (error) {
        console.log(error)
        // removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}
const hospitalSellingInfo = (state) => async (dispatch) => {
    var { id, searchText } = state
    let url = '/hospitalDataAdmin/hospitalSelling?all=all'
    if (id) {
        url = url + `&id=${id}`
    }
    if (searchText) {
        url = url + `&searchText=${searchText}`
    }
    dispatch({
        type: GET_BEGIN,
    })
    try {
        const { data } = await authFetch.get(url)
        const { hospitalSelling } = data
        dispatch({
            type: GET_HOSPITAL_SELLING_SUCCESS,
            payload: { hospitalSelling },
        })
    } catch (error) {
        console.log(error)
        // removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

const addHospital = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        var {
            address,
            pincode,
            contect,
            email,
            username,
            password,
            hospitalName,
        } = state

        hospitalName = FirstCapitalize(hospitalName)
        await authFetch.post('/hospitals', {
            address,
            pincode,
            contect,
            email,
            username,
            password,
            hospitalName,
        })
        dispatch({ type: CREATE_HOSPITAL_SUCCESS })
        // dispatch({ type: CLEAR_VALUES_HOSPITAL })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: CREATE_HOSPITAL_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    // setTimeout(() => {
    dispatch(clearAlert())
    // }, 3000)
}

const setEditHospital = (subscriber) => (dispatch) => {
    dispatch({ type: SET_EDIT_HOSPITAL, payload: { subscriber } })
}

const editHospital = (state) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        var { address, pincode, contect, email, username, id, hospitalName } =
            state
        hospitalName = FirstCapitalize(hospitalName)
        await authFetch.patch(`/hospitals/${id}`, {
            address,
            pincode,
            contect,
            email,
            username,
            hospitalName,
        })
        dispatch({ type: EDIT_HOSPITAL_SUCCESS })
    } catch (error) {
        if (error.response.status === 401) return
        dispatch({
            type: EDIT_HOSPITAL_ERROR,
            payload: { msg: error.response.data.msg },
        })
    }
    dispatch(clearAlert())
}

// delete the
const deleteHospital = (hospitalId) => async (dispatch) => {
    dispatch({
        type: GET_BEGIN,
    })
    try {
        await authFetch.put(`/hospitals/${hospitalId}`)
        dispatch({ type: DELETE_HOSPITAL_SUCCESS })

        dispatch(getHospitalsData())
    } catch (error) {
        console.log(error)
        removeUserFromLocalStorage()
    }
    dispatch(clearAlert())
}

export {
    clearValue,
    clearAlert,
    getHospitalsData,
    addHospital,
    setEditHospital,
    editHospital,
    deleteHospital,
    hospitalStockInformation,
    hospitalMinimumTheresold,
    hospitalSellingInfo,
}
