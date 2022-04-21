import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'

import { dashboardRoutes } from 'app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
// admin
import profileRoutes from 'app/views/admin/profile/ProfileRoutes'
import hospitalRoutes from 'app/views/admin/hospital/HospitalRoutes'
import vendorRoutes from 'app/views/admin/vendor/VendorRoutes'
import stockRoutes from 'app/views/admin/stock/StockRoutes'
import wereHouseRoutes from 'app/views/admin/wareHouse/WereHouseRoutes'
import stockOutRoutes from 'app/views/admin/stockOut/StockOutRoutes'
import filterRoutes from 'app/views/admin/filter/FilterRouter'
// hospital routes
import HospitalSellingHandleRoutes from 'app/views/adminUserCreatedby/HospitalSellingHandle/HospitalSellingHandleRoutes'
import userDashboardRoutes from 'app/views/adminUserCreatedby/userDashboard/DashboardRoutes'
import userStockInRoutes from 'app/views/adminUserCreatedby/userStockIn/StockInUserRoutes'

export const AllPages = () => {
    // window.reload()
    const user = localStorage.getItem('user')
    // const token = localStorage.getItem('token')

    // const authFetch = axios.create({
    //     baseURL: '/api/v1/auth',
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${token}`,
    //     },
    // })

    // authFetch.get('/verify')

    return [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: user
                ? [
                      ...dashboardRoutes,
                      ...profileRoutes,
                      ...hospitalRoutes,
                      ...vendorRoutes,
                      ...stockRoutes,
                      ...wereHouseRoutes,
                      ...stockOutRoutes,
                      ...filterRoutes,
                  ]
                : [
                      ...HospitalSellingHandleRoutes,
                      ...userDashboardRoutes,
                      ...userStockInRoutes,
                  ],
        },
        ...sessionRoutes,
        user
            ? {
                  path: '/',
                  element: <Navigate to="dashboard/default" />,
              }
            : {
                  path: '/',
                  element: <Navigate to="/user/dashboard/default" />,
              },
        ,
        {
            path: '*',
            element: <NotFound />,
        },
    ]
}
