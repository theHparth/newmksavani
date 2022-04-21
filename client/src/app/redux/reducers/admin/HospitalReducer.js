import {
    GET_BEGIN,
    CREATE_HOSPITAL_SUCCESS,
    CREATE_HOSPITAL_ERROR,
    GET_HOSPITAL_SUCCESS,
    SET_EDIT_HOSPITAL,
    DELETE_HOSPITAL_BEGIN,
    EDIT_HOSPITAL_SUCCESS,
    EDIT_HOSPITAL_ERROR,
    CLEAR_HOSPITAL_ALERT,
    CLEAR_VALUES_HOSPITAL,
    GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS,
    DELETE_HOSPITAL_SUCCESS,
    GET_HOSPITAL_MINIMUM_THRESOLD,
    GET_HOSPITAL_SELLING_SUCCESS,
} from '../../actions/admin/HospitalActions'

const initialState = {
    hospitalsData: [],
    hospitalIndividualStockData: [],
    isLoading: false,
    minimumThresoldData: [],
    minimumThresold: [],
    hospitalSellingData: [],
    showAlert: false,
    clearValues: '',
    alertType: '',
    alertText: '',
    isEditing: false,
    hospitalName: '',
    address: '',
    contect: '',
    password: '',
    email: '',
    pincode: '',
    _id: '',
    IhospitalName: '',
    Iaddress: '',
    Icontect: '',
    Iemail: '',
    Ipincode: '',
    IhopsitalId: '',
}
const HospitalReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_BEGIN: {
            return { ...state, isLoading: true, showAlert: false }
        }

        case GET_HOSPITAL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hospitalsData: action.payload.hospitals,
                IhospitalName: action.payload.hospitals[0].hospitalName,
                Iaddress: action.payload.hospitals[0].address,
                Icontect: action.payload.hospitals[0].contect,
                Iemail: action.payload.hospitals[0].email,
                Ipincode: action.payload.hospitals[0].pincode,
                IhopsitalId: action.payload.hospitals[0]._id,
            }
        }
        case GET_HOSPITAL_INDIVIDUAL_DATA_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hospitalIndividualStockData:
                    action.payload.hospitalPresentStock,
            }
        }
        case GET_HOSPITAL_MINIMUM_THRESOLD: {
            return {
                ...state,
                isLoading: false,
                minimumThresold: action.payload.minimumThresoldData,
            }
        }
        case GET_HOSPITAL_SELLING_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hospitalSellingData: action.payload.hospitalSelling,
            }
        }

        case CREATE_HOSPITAL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Hoapital Added!',
                clearValues: true,
            }
        }
        case CREATE_HOSPITAL_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'warning',
                alertText: action.payload.msg,
            }
        }

        // edit hospital
        case EDIT_HOSPITAL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                alertText: 'Hospital Updated!',
                clearValues: true,
                _id: '',
            }
        }

        case EDIT_HOSPITAL_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: action.payload.msg,
            }
        }
        //delete state
        case DELETE_HOSPITAL_BEGIN: {
            return { ...state, isLoading: false }
        }
        case DELETE_HOSPITAL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isEditing: false,
                alertType: 'success',
                clearValues: true,
                _id: '',
                alertText: 'Hospital deactivated !!',
            }
        }
        case SET_EDIT_HOSPITAL: {
            const subscriber = action.payload.subscriber
            const {
                _id,
                address,
                pincode,
                contect,
                email,
                username,
                password,
                hospitalName,
            } = subscriber
            return {
                ...state,
                isEditing: true,
                isLoading: false,
                _id,
                address,
                pincode,
                contect,
                email,
                username,
                password,
                hospitalName,
            }
        }

        /////////////////////////////////////////////////////////
        case CLEAR_HOSPITAL_ALERT: {
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
                isLoading: false,
            }
        }
        case CLEAR_VALUES_HOSPITAL: {
            const initialState = {
                clearValues: '',
                hospitalName: '',
                address: '',
                contect: '',
                password: '',
                email: '',
                pincode: '',
                _id: '',
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
            }
        }
    }
}

export default HospitalReducer
