import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

// const AllStockInDetails = Loadable(lazy(() => import('./AllStockInDetails')))
const PendingStockIn = Loadable(lazy(() => import('./PendingStockIn')))
const InstockListUser = Loadable(lazy(() => import('./InstockListUser')))

const StockInUserRoutes = [
    {
        path: '/pendingStockInUser',
        element: <PendingStockIn />,
    },
    {
        path: '/inStockUser',
        element: <InstockListUser />,
    },

    {
        path: '/allReceivedSrtock',
        element: <PendingStockIn />,
    },
]

export default StockInUserRoutes
