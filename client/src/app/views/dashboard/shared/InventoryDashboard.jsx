import React, { Fragment } from 'react'
import TopSellingTable from './TopSellingTable'
import { Grid } from '@mui/material'

const InventoryDashboard = () => {
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <TopSellingTable />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default InventoryDashboard
