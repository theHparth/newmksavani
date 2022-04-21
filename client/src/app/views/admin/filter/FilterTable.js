import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Button,
} from '@mui/material'
import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
    SimpleCard,
    ContainerTable,
    StyledTable,
    SearchBox,
    DateChoose,
} from 'app/components'

import { getallFilteredData } from 'app/redux/actions/admin/filterAction'

const AllStock = () => {
    // for date search
    let [searchDate, setSearchDate] = React.useState({})

    let { filteredData = [] } = useSelector((state) => state.filterList)
    const dispatch = useDispatch()

    // search for all
    let [searchText, setSearchText] = React.useState('')

    const handleChangeSearch = (value) => {
        setSearchText(value)
    }

    useEffect(() => {
        var state = { searchText, searchDate }
        dispatch(getallFilteredData(state))
    }, [dispatch, searchDate, searchText])

    // useEffect(() => {
    //     filteredData = filteredData.filter((hospi) => {
    //         return hospi._id == searchText
    //     })
    // }, [searchText])

    const [rowsPerPage, setRowsPerPage] = React.useState(100)
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
            <Button sx={{ mb: 2 }} variant="contained" color="primary">
                Add New Stock
            </Button>

            <SearchBox
                onSearch={handleChangeSearch}
                onSearchValueChange={searchText}
            />

            <DateChoose dateProjection={(state) => setSearchDate(state)} />

            {filteredData.length === 0 || filteredData === undefined ? (
                <h1>No stock data found..!!</h1>
            ) : (
                <SimpleCard title="Stocks List">
                    <Box width="100%" overflow="auto">
                        {filteredData.map((subscriber, index) => (
                            <div key={index}>
                                <StyledTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="left"
                                                style={{ fontSize: '25px' }}
                                            >
                                                {subscriber._id}
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                style={{ fontSize: '15px' }}
                                            >
                                                Stock Name
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                style={{ fontSize: '15px' }}
                                            >
                                                Total Qty.
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {subscriber.stockInfo.map(
                                            (subscriberIn, index2) => (
                                                <TableRow key={index2}>
                                                    <TableCell align="left">
                                                        {' '}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {subscriberIn.itemName}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {subscriberIn.totalQty}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        {/* <TableCell align="left"> </TableCell> */}
                                    </TableBody>
                                </StyledTable>
                            </div>
                        ))}

                        <TablePagination
                            sx={{ px: 2 }}
                            rowsPerPageOptions={[50, 100]}
                            component="div"
                            count={filteredData.length}
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
                        {/* {shouldOpenEditorDialog && (
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
                        )} */}
                    </Box>
                    {/* {showAlert ? (
                        <MyAlert
                            isOpen={showAlert}
                            typeSeverity={alertType}
                            alrtTextToShow={
                                privatrRoute
                                    ? 'Stock activated successfully'
                                    : alertText
                            }
                        />
                    ) : null} */}
                </SimpleCard>
            )}
        </ContainerTable>
    )
}

export default AllStock
