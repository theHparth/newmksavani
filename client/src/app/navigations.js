export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    // parth
    {
        label: 'PAGES',
        type: 'label',
    },
    {
        name: 'Hospital Manage',
        path: '/allHospitals',
        icon: 'library_add',
    },
    {
        name: 'Vendor Manage',
        path: '/allVendor',
        icon: 'person_add',
    },
    {
        name: 'Stock Manage',
        path: '/allStock',
        icon: 'history',
    },
    {
        name: 'Werehouse',
        icon: 'business',
        children: [
            {
                name: 'Stock Add',
                iconText: 'SI',
                path: '/addStockInWereHouse',
            },
            {
                name: 'Stock In report',
                iconText: 'SI',
                path: '/wereHouseStock',
            },
        ],
    },
    {
        name: 'Stock-Out',
        icon: 'business',
        children: [
            {
                name: 'Form',
                iconText: 'SI',
                path: '/stockOutForm',
            },
            {
                name: 'Stock out data',
                iconText: 'SI',
                path: '/listStockOut',
            },
            {
                name: 'Pending List',
                iconText: 'SI',
                path: '/pendingStockOut',
            },
        ],
    },
    {
        name: 'Filter',
        path: '/filterdata',
        icon: 'analytics',
    },
    // parth complete
]

export const getfilteredNavigations = (navList = [], role) => {
    return navList.reduce((array, nav) => {
        if (nav.auth) {
            if (nav.auth.includes(role)) {
                array.push(nav)
            }
        } else {
            if (nav.children) {
                nav.children = getfilteredNavigations(nav.children, role)
                array.push(nav)
            } else {
                array.push(nav)
            }
        }
        return array
    }, [])
}
