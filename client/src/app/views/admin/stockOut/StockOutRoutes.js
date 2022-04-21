import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStockOutForm = Loadable(lazy(() => import('./AddStockOutForm')))
// const PendingStockOut = Loadable(lazy(() => import('./PendingStockOut')))
const AllStockOut = Loadable(lazy(() => import('./AllStockOut')))

const wereHouseRoutes = [
    {
        path: '/stockOutForm',
        element: <AddStockOutForm />,
    },
    {
        path: '/listStockOut',
        element: <AllStockOut />,
    },
    {
        path: '/pendingStockOut',
        element: <AllStockOut />,
    },
]

export default wereHouseRoutes
