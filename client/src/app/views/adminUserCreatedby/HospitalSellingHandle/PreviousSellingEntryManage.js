import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom' // my import
import moment from 'moment'
import {
    Breadcrumb,
    SimpleCard,
    ContainerTable,
    StyledTable,
    Heading,
    SecondaryHeading,
    MyAlert,
    LodingShow,
} from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'

import {
    getAllDataTodaySelling,
    setEditData,
    deleteData,
} from 'app/redux/actions/userCreatedByAdmin/TodaySellingUserAction'

const PreviousSellingEntryManage = () => {
    // for printing and deleting pperpose
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)
    const handleDialogClose = () => {
        setShouldOpenConfirmationDialog(false)
        // dispatch(getHospitalsData())
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(deleteData(hospitalDa)).then(() => {
            handleDialogClose()
            setExpanded(false)
        })
        dispatch(getAllDataTodaySelling({}))
    }

    // for panel setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    // for page setup
    const [rowsPerPage, setRowsPerPage] = React.useState(25)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    let {
        todaySellingData = [],
        showAlert,
        alertType,
        alertText,
        isLoading,
    } = useSelector((state) => state.todaySellingUserList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDataTodaySelling({}))
        setExpanded(false)
    }, [dispatch])

    console.log('todaySellingData', todaySellingData)

    return (
        <ContainerTable>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Stock out form', path: '/stockOutForm' },
                        { name: 'Form' },
                    ]}
                />
                {/* date chooser from--------FROM---------- */}
                {/* <SearchBox
                    onSearch={handleChangeSearch}
                    onSearchValueChange={searchText}
                />
                <DateChoose dateProjection={(state) => setSearchDate(state)} /> */}
                {isLoading && <LodingShow />}
            </div>

            <SimpleCard title="Selling Info.">
                <Box width="100%">
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Heading>Seeling date</Heading>
                        <SecondaryHeading>Total Items</SecondaryHeading>
                    </AccordionSummary>
                    {/* data print start from here*/}
                    {todaySellingData
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
                                    <Heading>
                                        {' '}
                                        {moment(subscriber.createdAt).format(
                                            'MMM Do, YYYY'
                                        )}
                                    </Heading>
                                    <SecondaryHeading>
                                        {subscriber.todaySellingData.length}
                                    </SecondaryHeading>
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

                                                <TableCell align="right">
                                                    <>
                                                        <Button
                                                            variant="outlined"
                                                            color="success"
                                                            onClick={() =>
                                                                dispatch(
                                                                    setEditData(
                                                                        subscriber
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Link
                                                                to={
                                                                    '/newEntryForm'
                                                                }
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        {/* <TableCell></TableCell> */}
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    subscriber._id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                </TableCell>
                                                {/* <TableCell align="center">
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
                                                        
                                                    </Button>
                                                </TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subscriber.todaySellingData.map(
                                                (subscriber, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {
                                                                subscriber.stock_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {subscriber.totalBox *
                                                                subscriber.totalQtyInOneBox}
                                                        </TableCell>
                                                        <TableCell>
                                                            ${' '}
                                                            {subscriber.price
                                                                ? subscriber.price
                                                                : 0}
                                                        </TableCell>
                                                    </TableRow>
                                                )
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
                            text="Are you sure to delete?"
                        />
                    )}
                    {/* {shouldOpenEditorDialog && (
                        <InvoiceDetails
                            handleClose={handleDialogClose}
                            open={shouldOpenEditorDialog}
                            invoiceInfo={info}
                        />
                    )} */}
                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={todaySellingData.length}
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
                    {showAlert ? (
                        <MyAlert
                            isOpen={showAlert}
                            typeSeverity={alertType}
                            alrtTextToShow={alertText}
                        />
                    ) : null}
                </Box>
            </SimpleCard>
        </ContainerTable>
    )
}

export default PreviousSellingEntryManage
