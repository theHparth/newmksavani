import {
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS_TODAY_SELLING,
    SET_EDIT,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES,
    CLEAR_STOCK_ALERT,
    DELETE_STOCKSELIING_SUCCESS,
} from '../../actions/userCreatedByAdmin/TodaySellingUserAction'

const initialState = {
    todaySellingData: [],
    isLoading: false,
    showAlert: false,
    clearValues: '',
    alertType: '',
    alertText: '',
    isEditing: false,
    stock_name: '',
    totalQtyInOneBox: '',
    _id: '',
    totalBox: '',
    userPrice: '',
    todaySellingDataArr: '',
}

const WareHouseReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS_TODAY_SELLING: {
            return {
                ...state,
                todaySellingData: action.payload.stockListTodaySelling,
                isLoading: false,
            }
        }

        case CREATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                clearValues: true,
                alertText: 'New stock data added!',
            }
        }
        case CREATE_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'warning',
                alertText: action.payload.msg,
            }
        }

        // edit VENDOR
        case EDIT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Stock data updated successfully',
            }
        }
        case EDIT_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'error',
            }
        }

        case DELETE_STOCKSELIING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Stock data removed successfully',
            }
        }

        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const { _id, todaySellingData } = subscriber

            return {
                ...state,
                isLoading: false,
                isEditing: true,
                _id,
                todaySellingDataArr: todaySellingData,
            }
        }

        /////////////////////////////////////////////////////////

        case CLEAR_STOCK_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
                isLoading: false,
            }
        }
        case CLEAR_VALUES: {
            const initialState = {
                clearValues: '',
                _id: '',
                todaySellingDataArr: '',
                isLoading: false,
            }
            return {
                ...state,
                ...initialState,
            }
        }

        default: {
            return {
                ...state,
                isLoading: false,
            }
        }
    }
}
export default WareHouseReducer
