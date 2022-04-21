import {
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    SET_EDIT,
    DELETE_BEGIN,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES_STOCKOUT,
    CLEAR_STOCK_ALERT,
    GET_ALL_SUCCESS_STOCKOUT,
    DELETE_STOCKOUT_SUCCESS,
} from '../../actions/admin/StockOutAction'

const initialState = {
    allStockOutData: [],
    isLoading: false,
    showAlert: false,
    alertType: '',
    alertText: '',
    isEditing: false,
    description: '',
    // vendor_name: '',
    _id: '',
    stock_name: '',
    totalQtyInOneBox: 1,
    totalBox: 1,
    price: 0,
    priceForUser: 0,
    status: false,
    showPrice: false,
    createdFor: '',
    createdAt: '',
    latestStatus: '',
    updatedAt: '',
    hospitalName: '',
    invoiceNum: '',
    stockOutDetail: '',
    messageForHospital: '',
}

const StockOutReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }

        case GET_ALL_SUCCESS_STOCKOUT: {
            return {
                ...state,
                isLoading: false,
                allStockOutData: action.payload.allStockOutData,
            }
        }
        case CREATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                clearValues: true,
                alertText: 'Stock send successfully',
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
                alertText: 'Stock out data updated successfully',
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
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const {
                _id,
                hospitalName,
                invoiceNum,
                stockOutDetail,
                createdFor,
                createdAt,
                status,
                updatedAt,

                messageForHospital,
            } = subscriber

            return {
                ...state,
                isEditing: true,
                isLoading: false,
                _id,
                hospitalName,
                invoiceNum,
                stockOutDetail,
                createdFor,
                createdAt,
                updatedAt,
                latestStatus: status,
                messageForHospital,
            }
        }

        case DELETE_BEGIN: {
            return { ...state, isLoading: true }
        }
        case DELETE_STOCKOUT_SUCCESS: {
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
        /////////////////////////////////////////////////////////

        case CLEAR_STOCK_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES_STOCKOUT: {
            const initialState = {
                clearValues: '',
                _id: '',
                hospitalName: '',
                stockOutDetail: '',
                messageForHospital: '',
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
export default StockOutReducer
