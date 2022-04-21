import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    SimpleCard,
    ContainerTable,
    StyledTable,
    StockAlert,
    H1Alert,
} from 'app/components'

import { getAllData } from 'app/redux/actions/admin/StockActions'

const AllStock = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    let { stockData = [] } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const filterStockData = stockData.filter((data) => {
        console.log(data.minimumLimit, '>=', data.totalQty)
        return data.minimumLimit >= data.totalQty
    })

    return (
        <ContainerTable>
            {filterStockData.length === 0 ? (
                <H1Alert />
            ) : (
                <SimpleCard title="Stocks List">
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Stock Name</TableCell>

                                    <TableCell> Total Qty </TableCell>

                                    {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterStockData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {subscriber.stock_name}
                                            </TableCell>

                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={0}
                                            >
                                                {subscriber.totalQty ? (
                                                    subscriber.totalQty <
                                                    subscriber.minimumLimit ? (
                                                        <StockAlert
                                                            bgcolor={
                                                                bgSecondary
                                                            }
                                                        >
                                                            {
                                                                subscriber.totalQty
                                                            }{' '}
                                                            available
                                                        </StockAlert>
                                                    ) : (
                                                        <StockAlert
                                                            bgcolor={bgPrimary}
                                                        >
                                                            {
                                                                subscriber.totalQty
                                                            }{' '}
                                                            available
                                                        </StockAlert>
                                                    )
                                                ) : (
                                                    <StockAlert
                                                        bgcolor={bgError}
                                                    >
                                                        out of stock
                                                    </StockAlert>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            sx={{ px: 2 }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filterStockData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </SimpleCard>
            )}
        </ContainerTable>
    )
}

export default AllStock
