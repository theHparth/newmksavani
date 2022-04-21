import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import {
    Breadcrumb,
    SimpleCard,
    Heading,
    SecondaryHeading,
    ThirdHeading,
    ContainerTable,
    StyledTable,
    InvoiceDetails,
    LodingShow,
} from 'app/components'
import { useLocation } from 'react-router-dom' // my import
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button,
    FormLabel,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import {
    AllstockInUser,
    statusChange,
} from 'app/redux/actions/userCreatedByAdmin/StockInUserAction'
import moment from 'moment'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

const PendingStockIn = () => {
    // for printing and deleting pperpose
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)
    const [info, setInfo] = useState()
    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        dispatch(AllstockInUser({ status: false }))
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(statusChange(hospitalDa)).then(() => {
            handleDialogClose()
            setExpanded(false)
        })
    }

    // check for route
    const location = useLocation()

    var privatrRoute = false
    if (location.pathname === '/allReceivedSrtock') {
        privatrRoute = true
    }

    // get data
    let { stockInUserData = [], isLoading } = useSelector(
        (state) => state.stockInUserList
    )

    const dispatch = useDispatch()

    useEffect(() => {
        var state = {}
        state.status = false
        if (privatrRoute) {
            state.status = true
        }
        dispatch(AllstockInUser(state))
        setExpanded(false)
    }, [dispatch, privatrRoute])

    // for pagination purposes
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    // for penal setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <ContainerTable>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Add Stock', path: '/addStock' },
                        { name: 'Table' },
                    ]}
                />
            </div>
            {isLoading && <LodingShow />}

            <SimpleCard>
                <Box width="100%">
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Heading>Invoice No</Heading>
                        <ThirdHeading>Date</ThirdHeading>
                    </AccordionSummary>
                    {/* data print start from here*/}
                    {stockInUserData
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                key={index}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Heading>{subscriber.invoiceNum}</Heading>
                                    <SecondaryHeading>
                                        {moment(subscriber.createdAt).format(
                                            'MMM Do, YYYY'
                                        )}
                                    </SecondaryHeading>

                                    {privatrRoute && (
                                        <ThirdHeading>
                                            <FormLabel color="primary">
                                                Received
                                            </FormLabel>
                                        </ThirdHeading>
                                    )}
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ backgroundColor: '#F5F5F5' }}
                                >
                                    <StyledTable>
                                        <TableHead
                                            style={{
                                                backgroundColor: '#EBF5FB',
                                            }}
                                        >
                                            <TableRow>
                                                <TableCell>
                                                    Stock Name
                                                </TableCell>
                                                <TableCell>Total Qty</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>
                                                    {!privatrRoute && (
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    subscriber._id
                                                                )
                                                            }
                                                        >
                                                            Pending
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => {
                                                            setShouldOpenEditorDialog(
                                                                true
                                                            )
                                                            setInfo(subscriber)
                                                        }}
                                                    >
                                                        <Icon color="primary">
                                                            print
                                                        </Icon>
                                                        {/* Print */}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subscriber.stockOutDetail.map(
                                                (subscriberInside, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {
                                                                subscriberInside.stock_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {subscriberInside.totalBox *
                                                                subscriberInside.totalQtyInOneBox}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${' '}
                                                            {subscriberInside.price
                                                                ? subscriberInside.price
                                                                : 0}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {/* status change button */}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                            {subscriber.messageForHospital && (
                                                <TableCell>
                                                    Note :{' '}
                                                    {
                                                        subscriber.messageForHospital
                                                    }
                                                </TableCell>
                                            )}
                                        </TableBody>
                                    </StyledTable>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    {shouldOpenConfirmationDialog && (
                        <ConfirmationDialog
                            open={shouldOpenConfirmationDialog}
                            onConfirmDialogClose={handleDialogClose}
                            onYesClick={handleConfirmationResponse}
                            text="Are you sure you received product?"
                        />
                    )}
                    {shouldOpenEditorDialog && (
                        <InvoiceDetails
                            handleClose={handleDialogClose}
                            open={shouldOpenEditorDialog}
                            invoiceInfo={info}
                        />
                    )}
                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={stockInUserData.length}
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
        </ContainerTable>
    )
}

export default PendingStockIn
