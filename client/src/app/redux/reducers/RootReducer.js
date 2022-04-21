import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'

//for admin
import HospitalReducer from './admin/HospitalReducer'
import VendorReducer from './admin/VendorReducer'
import StockReducer from './admin/StockReducer'
import WareHouseReducer from './admin/WareHouseReducer'
import StockOutReducer from './admin/StockOutReducer'
import filterDataReducer from './admin/filterReducer'

// for hospitals created by admin
import StockInUserReducer from './userCreatedByAdmin/StockInUserReducer'
import TodaySellingUserReducer from './userCreatedByAdmin/TodaySellingUserReducer'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    // admin: AdminReducer
    hospitalList: HospitalReducer,
    vendorList: VendorReducer,
    stockList: StockReducer,
    wareHouseStockList: WareHouseReducer,
    stockOutList: StockOutReducer,
    filterList: filterDataReducer,

    //for hospital
    stockInUserList: StockInUserReducer,
    todaySellingUserList: TodaySellingUserReducer,
})

export default RootReducer
