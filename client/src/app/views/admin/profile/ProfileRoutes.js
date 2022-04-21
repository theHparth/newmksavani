import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AdminProfile = Loadable(lazy(() => import('./AdminProfile')))

const ProfileRoutes = [
    {
        path: '/myProfile',
        element: <AdminProfile />,
    },
]

export default ProfileRoutes
