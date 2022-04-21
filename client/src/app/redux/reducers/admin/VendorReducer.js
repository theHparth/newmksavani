import {
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_BEGIN,
    GET_SUCCESS,
    SET_EDIT,
    EDIT_SUCCESS,
    EDIT_ERROR,
    CLEAR_VALUES_VENDOR,
    CLEAR_VENDOR_ALERT,
    DELETE_VENDOR_SUCCESS,
} from '../../actions/admin/VendorActions'

const initialState = {
    vendorData: [],
    isLoading: false,
    showAlert: false,
    clearValues: '',
    alertType: '',
    alertText: '',
    isEditing: false,
    vendor_name: '',
    address: '',
    contect: '',
    email: '',
    pincode: '',
}

const VendorReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }
        case GET_SUCCESS: {
            return {
                ...state,
                vendorData: action.payload.vendorList,
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
                alertText: 'New Vendor data Added!',
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
                alertText: 'Vendor data Updated!',
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

        case DELETE_VENDOR_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Vednor Deactivated !!',
            }
        }
        case SET_EDIT: {
            const subscriber = action.payload.subscriber
            const {
                _id,
                address,
                pincode,
                contect,
                email,
                vendor_name,
                password,
            } = subscriber
            return {
                ...state,
                isEditing: true,
                _id,
                address,
                pincode,
                contect,
                email,
                vendor_name,
                password,
            }
        }

        /////////////////////////////////////////////////////////

        case CLEAR_VENDOR_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
            }
        }
        case CLEAR_VALUES_VENDOR: {
            const initialState = {
                clearValues: '',
                _id: '',
                vendor_name: '',
                address: '',
                contect: '',
                password: '',
                email: '',
                pincode: '',
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

export default VendorReducer
