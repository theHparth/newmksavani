export const navigationsUser = [
    // {
    //     name: 'Dashboard',
    //     path: '/user/dashboard/default',
    //     icon: 'dashboard',
    // },
    // {
    //     label: 'PAGES',
    //     type: 'label',
    // },
    {
        name: 'New Arriving',
        icon: 'business',
        path: '/pendingStockInUser',
    },
    {
        name: 'In stock item',
        icon: 'business',
        path: '/inStockUser',
    },
    {
        name: 'Stock-Out',
        icon: 'business',
        children: [
            {
                name: 'New entry',
                iconText: 'SI',
                path: '/newEntryForm',
            },
            {
                name: 'Entry manage',
                iconText: 'SI',
                path: '/listStockOut',
            },
        ],
    },
    {
        name: 'Total Received',
        icon: 'business',

        path: '/allReceivedSrtock',
    },
]
