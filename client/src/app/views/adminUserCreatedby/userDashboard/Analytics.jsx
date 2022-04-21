import React, { Fragment } from 'react'

import { Grid } from '@mui/material'

import TopSellingTable from './shared/TopSellingTable'
import { styled } from '@mui/system'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    marginTop: '-72px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Analytics = () => {
    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <TopSellingTable />
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    )
}

export default Analytics

// import React, { Fragment } from 'react'
// import { Grid, Card } from '@mui/material'

// import { styled, useTheme } from '@mui/system'
// import TopSellingTable from './shared/TopSellingTable'

// const ContentBox = styled('div')(({ theme }) => ({
//     margin: '30px',
//     [theme.breakpoints.down('sm')]: {
//         margin: '16px',
//     },
// }))

// const Title = styled('span')(() => ({
//     fontSize: '1rem',
//     fontWeight: '500',
//     textTransform: 'capitalize',
// }))

// const SubTitle = styled('span')(({ theme }) => ({
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary,
// }))

// const H4 = styled('h4')(({ theme }) => ({
//     fontSize: '1rem',
//     fontWeight: '500',
//     marginBottom: '16px',
//     textTransform: 'capitalize',
//     color: theme.palette.text.secondary,
// }))

// const Analytics = () => {
//     const { palette } = useTheme()

//     return (
//         <Fragment>
//             <ContentBox className="analytics">
//                 <Grid container spacing={3}>
//                     <Grid item lg={12} md={12} sm={12} xs={12}>
//                         {/* <StatCards /> */}
//                         <TopSellingTable />
//                     </Grid>
//                 </Grid>
//             </ContentBox>
//         </Fragment>
//     )
// }

// export default Analytics
