import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    SimpleCard,
    ContainerTable,
    StyledTable,
    StockAlert,
    StyledButton,
    MyAlert,
    SearchBox,
    LodingShow,
} from 'app/components'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

import { useLocation } from 'react-router-dom'
import HandleStock from './HandleStock'
import {
    getAllData,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/StockActions'

const AllStock = () => {
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)

    let {
        stockData = [],
        showAlert,
        alertType,
        alertText,
        isLoading,
    } = useSelector((state) => state.stockList)
    const dispatch = useDispatch()

    // search for all
    let [searchText, setSearchText] = React.useState('')

    const handleChangeSearch = (value) => {
        setSearchText(value)
    }

    useEffect(() => {
        // var state = { searchText }
        dispatch(getAllData(searchText))
    }, [dispatch, searchText])

    const location = useLocation()
    // auto open add new stock
    useEffect(() => {
        if (location.pathname === '/allStock/new') {
            setShouldOpenEditorDialog(true)
        }
    }, [location.pathname])

    var privatrRoute = false
    if (location.pathname === '/allStockD') {
        privatrRoute = true
    }

    stockData = stockData.filter((data) => {
        return privatrRoute ? !data.stockStatus : data.stockStatus
    })

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        dispatch(getAllData())
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(deleteData(hospitalDa)).then(() => {
            handleDialogClose()
        })
        dispatch(getAllData())
    }

    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const bgSuccess = palette.success.main

    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <ContainerTable>
            {!privatrRoute && (
                <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={() => setShouldOpenEditorDialog(true)}
                >
                    Add New Stock
                </Button>
            )}
            <SearchBox
                onSearch={handleChangeSearch}
                onSearchValueChange={searchText}
            />

            {isLoading && <LodingShow />}
            {stockData.length === 0 || stockData === undefined ? (
                <h1>No stock data found..!!</h1>
            ) : (
                <SimpleCard title="Stocks List">
                    <Box width="100%" overflow="auto">
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Stock Name
                                    </TableCell>
                                    <TableCell align="center">
                                        Description
                                    </TableCell>
                                    <TableCell>total value</TableCell>
                                    <TableCell>Individual Price</TableCell>

                                    <TableCell> Total Qty </TableCell>

                                    {/* <TableCell>Address</TableCell>
                        <TableCell align="center">Pincode</TableCell> */}
                                    {!privatrRoute && (
                                        <TableCell align="center">
                                            Edit
                                        </TableCell>
                                    )}
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stockData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((subscriber, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                {subscriber.stock_name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {subscriber.description}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price *
                                                      subscriber.totalQty
                                                    : 0}
                                            </TableCell>
                                            <TableCell>
                                                ${' '}
                                                {subscriber.price
                                                    ? subscriber.price
                                                    : 0}
                                            </TableCell>

                                            <TableCell
                                                sx={{ px: 0 }}
                                                align="left"
                                                // colSpan={2}
                                            >
                                                {subscriber.totalQty ? (
                                                    <StockAlert
                                                        bgcolor={
                                                            subscriber.totalQty <
                                                            subscriber.minimumLimit
                                                                ? bgSecondary
                                                                : bgPrimary
                                                        }
                                                    >
                                                        {subscriber.totalQty}{' '}
                                                        available
                                                    </StockAlert>
                                                ) : (
                                                    <StockAlert
                                                        bgcolor={bgError}
                                                    >
                                                        out of stock
                                                    </StockAlert>
                                                )}
                                            </TableCell>

                                            {!privatrRoute && (
                                                <TableCell align="center">
                                                    <StyledButton
                                                        // variant="contained"
                                                        sx={{
                                                            color: bgSuccess,
                                                        }}
                                                        onClick={() => {
                                                            dispatch(
                                                                setEditData(
                                                                    subscriber
                                                                )
                                                            )
                                                            setShouldOpenEditorDialog(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        <Icon color="primary">
                                                            edit
                                                        </Icon>
                                                    </StyledButton>
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                {/* <StyledButton
                                                    sx={{ color: bgError }}
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            subscriber._id
                                                        )
                                                    }
                                                >
                                                    <Icon>delete</Icon>
                                                </StyledButton> */}

                                                {privatrRoute ? (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                subscriber._id
                                                            )
                                                        }
                                                    >
                                                        Active
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                subscriber._id
                                                            )
                                                        }
                                                    >
                                                        Deactive
                                                    </Button>
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
                            count={stockData.length}
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
                        {shouldOpenEditorDialog && (
                            <HandleStock
                                handleClose={handleDialogClose}
                                open={shouldOpenEditorDialog}
                            />
                        )}
                        {shouldOpenConfirmationDialog && (
                            <ConfirmationDialog
                                open={shouldOpenConfirmationDialog}
                                onConfirmDialogClose={handleDialogClose}
                                onYesClick={handleConfirmationResponse}
                                text="Are you sure to delete?"
                            />
                        )}
                    </Box>
                    {showAlert ? (
                        <MyAlert
                            isOpen={showAlert}
                            typeSeverity={alertType}
                            alrtTextToShow={
                                privatrRoute
                                    ? 'Stock activated successfully'
                                    : alertText
                            }
                        />
                    ) : null}
                </SimpleCard>
            )}
        </ContainerTable>
    )
}

export default AllStock
