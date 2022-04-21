import {
    CREATE_SUCCESS_STOCK,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS_STOCK,
    SET_EDIT_STOCK,
    DELETE_BEGIN,
    EDIT_SUCCESS_STOCK,
    EDIT_ERROR,
    CLEAR_VALUES_STOCK,
    CLEAR_STOCK_ALERT,
    DELETE_STOCK_SUCCESS,
} from '../../actions/admin/StockActions'

const initialState = {
    stockData: [],
    isLoading: false,
    showAlert: false,
    clearValues: '',
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    price: 0,
    qty: 0,
    totalQtyInOneBox: 0,
    totalBox: 0,
    box: 0,
    stock_name: '',
    minimumLimit: '',
}

const StockReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS_STOCK: {
            return {
                ...state,
                isLoading: false,
                stockData: action.payload.stockList,
            }
        }

        case CREATE_SUCCESS_STOCK: {
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
        case EDIT_SUCCESS_STOCK: {
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
        case DELETE_STOCK_SUCCESS: {
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
        case EDIT_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
                alertType: 'error',
            }
        }
        //delete state
        case DELETE_BEGIN: {
            return { ...state, isLoading: false }
        }
        case SET_EDIT_STOCK: {
            const subscriber = action.payload.subscriber
            const { _id, description, minimumLimit, stock_name } = subscriber

            return {
                ...state,
                isEditing: true,
                _id,
                description,
                minimumLimit,
                stock_name,
            }
        }

        /////////////////////////////////////////////////////////

        case CLEAR_STOCK_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES_STOCK: {
            const initialState = {
                clearValues: '',
                _id: '',
                description: '',
                minimumLimit: '',
                stock_name: '',
            }
            return {
                ...state,
                ...initialState,
            }
        }

        default: {
            return {
                ...state,
            }
        }
    }
}
export default StockReducer
