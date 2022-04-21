import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const InventoryManagement = Loadable(
    lazy(() => import('./InventoryManagement'))
)

export const dashboardRoutes = [
    {
        path: 'dashboard/default',
        element: <InventoryManagement />,
    },
]
