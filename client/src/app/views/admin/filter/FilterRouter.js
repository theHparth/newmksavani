import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const FilterTable = Loadable(lazy(() => import('./FilterTable')))

const FilterRouter = [
    {
        path: '/filterdata',
        element: <FilterTable />,
    },
]

export default FilterRouter
