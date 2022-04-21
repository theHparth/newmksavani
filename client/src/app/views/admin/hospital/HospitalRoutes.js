import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const AllHospital = Loadable(lazy(() => import('./AllHospital')))
const Invoice = Loadable(
    lazy(() => import('app/components/admin/Invoice/InvoiceDetails'))
)
const Viewer = Loadable(lazy(() => import('./hospital-viewer/Viewer')))
// const IndividualHospitalStock = Loadable(
//     lazy(() => import('./IndividualHospitalStock'))
// )

const hospitalRoutes = [
    // {
    //     path: '/addHospital',
    //     element: <AddHospital />,
    // },
    {
        path: '/allHospitals',
        element: <AllHospital />,
    },
    {
        path: '/allHospitalsD',
        element: <AllHospital />,
    },

    // {
    //     path: '/hospitalData/:id',
    //     element: <IndividualHospitalStock />,
    // },
    {
        path: '/hospitalData/:id',
        element: <Viewer />,
    },

    {
        path: '/invoice',
        element: <Invoice />,
    },
]

export default hospitalRoutes
