import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddStock = Loadable(lazy(() => import('./AddStock')))
const AllStock = Loadable(lazy(() => import('./AllStock')))

const StockRoutes = [
    {
        path: '/addStock',
        element: <AddStock />,
    },
    {
        path: '/allStock',
        element: <AllStock />,
    },
    {
        path: '/allStockD',
        element: <AllStock />,
    },
    {
        path: '/allStock/new',
        element: <AllStock />,
    },
]

export default StockRoutes
