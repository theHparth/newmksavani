import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AddVendor = Loadable(lazy(() => import('./AddVendor')))
const AllVendor = Loadable(lazy(() => import('./AllVendor')))

const vendorRoutes = [
    {
        path: '/addVendor',
        element: <AddVendor />,
    },
    {
        path: '/allVendor',
        element: <AllVendor />,
    },
    {
        path: '/allVendorD',
        element: <AllVendor />,
    },
    {
        path: '/allVendor/new',
        element: <AllVendor />,
    },
]

export default vendorRoutes
