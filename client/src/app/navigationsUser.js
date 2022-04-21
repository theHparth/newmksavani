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
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
            },
        ],
    },
]
