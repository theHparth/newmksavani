import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../../auth/authRoles'

const Analytics = Loadable(lazy(() => import('./Analytics')))

const dashboardRoutes = [
    {
        path: '/user/dashboard/default',
        element: <Analytics />,
        auth: authRoles.name,
    },
]

export default dashboardRoutes
