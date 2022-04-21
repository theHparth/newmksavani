import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const TodaySellingAddForm = Loadable(
    lazy(() => import('./TodaySellingAddForm'))
)
const PreviousSellingEntryManage = Loadable(
    lazy(() => import('./PreviousSellingEntryManage'))
)

const HospitalSellingHandleRoutes = [
    {
        path: '/newEntryForm',
        element: <TodaySellingAddForm />,
    },
    {
        path: '/listStockOut',
        element: <PreviousSellingEntryManage />,
    },
]

export default HospitalSellingHandleRoutes
