import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

// const AddStockInWereHouse = Loadable(
//     lazy(() => import('./AddStockInWereHouse'))
// )

const AddStockOutForm = Loadable(lazy(() => import('./StockInForm')))

const WereHouseStock = Loadable(lazy(() => import('./AllWereHouseStock')))

const wereHouseRoutes = [
    {
        path: '/addStockInWereHouse',
        element: <AddStockOutForm />,
    },
    {
        path: '/wereHouseStock',
        element: <WereHouseStock />,
    },
    {
        path: '/wereHouseStock/:vendorname',
        element: <WereHouseStock />,
    },
]

export default wereHouseRoutes
