import { Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import {
    FlexBox,
    Container,
    StyledButton,
    MyAlert,
    LodingShow,
} from 'app/components'
import React, { useState, useEffect } from 'react'
import {
    Avatar,
    Grow,
    Icon,
    IconButton,
    TextField,
    Button,
} from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { H5, Small } from 'app/components/Typography'
import ConfirmationDialog from 'app/components/ConfirmationDialog/ConfirmationDialog'
import { useLocation } from 'react-router-dom'

// my import
import HandleVendor from './HandleVendor'
import {
    getAllVendor,
    setEditData,
    deleteData,
} from 'app/redux/actions/admin/VendorActions'

const CustomerList = () => {
    // for add and edit diology actions
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)

    // auto open add vendor dialog

    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/allVendor/new') {
            setShouldOpenEditorDialog(true)
        }
    }, [location.pathname])

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        dispatch(getAllVendor())
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(deleteData(hospitalDa)).then(() => {
            handleDialogClose()
        })
        dispatch(getAllVendor())
    }
    // complete
    let {
        vendorData = [],
        showAlert,
        alertType,
        alertText,
        isLoading,
    } = useSelector((state) => state.vendorList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllVendor())
    }, [dispatch])
    // my import finish

    var privatrRoute = false
    if (location.pathname === '/allVendorD') {
        privatrRoute = true
    }

    vendorData = vendorData.filter((data) => {
        return privatrRoute ? !data.vendorStatus : data.vendorStatus
    })

    const { palette } = useTheme()
    const textMuted = palette.text.secondary
    const bgSuccess = palette.success.main

    const columns = [
        {
            name: 'vendor_name', // field name in the row object
            label: 'Info', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let user = vendorData[dataIndex]

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48 }}
                                src={user?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>
                                    {user?.vendor_name}
                                </H5>
                                <Small sx={{ color: textMuted }}>
                                    {user?.email}
                                </Small>
                            </Box>
                        </FlexBox>
                    )
                },
            },
        },
        {
            name: 'address',
            label: 'Address',
            options: {
                filter: true,
            },
        },
        {
            name: 'pincode',
            label: 'Pincode',
            options: {
                filter: true,
            },
        },
        {
            name: 'contect',
            label: 'Contect',
            options: {
                filter: true,
            },
        },

        {
            name: '',
            label: '',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>

                        <Button
                            variant={privatrRoute ? 'contained' : 'outlined'}
                            color={privatrRoute ? 'success' : 'error'}
                            onClick={() =>
                                handleDeleteUser(vendorData[dataIndex]._id)
                            }
                        >
                            {privatrRoute ? 'Active' : 'Deactive'}
                        </Button>
                        <Box flexGrow={1}></Box>
                        {!privatrRoute && (
                            <StyledButton
                                // variant="contained"
                                sx={{ color: bgSuccess }}
                                onClick={() => {
                                    dispatch(setEditData(vendorData[dataIndex]))
                                    setShouldOpenEditorDialog(true)
                                }}
                            >
                                <Icon color="primary">edit</Icon>
                            </StyledButton>
                        )}
                    </FlexBox>
                ),
            },
        },
        {
            name: '',
            label: '',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>

                        <Link
                            to={`/wereHouseStock/${vendorData[dataIndex].vendor_name}`}
                        >
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Link>
                    </FlexBox>
                ),
            },
        },
    ]

    return (
        <Container>
            {!privatrRoute && (
                <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={() => setShouldOpenEditorDialog(true)}
                >
                    Add New Vendor
                </Button>
            )}
            {isLoading && <LodingShow />}
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'Vendor list'}
                        data={vendorData}
                        columns={columns}
                        options={{
                            filterType: 'textField',
                            responsive: 'simple',
                            selectableRows: 'none',
                            // filter: true,
                            // sort: true,
                            // selectableRows: "none", // set checkbox for each row
                            // search: false, // set search option
                            // filter: false, // set data filter option
                            // download: false, // set download option
                            // print: false, // set print option
                            // pagination: true, //set pagination option
                            // viewColumns: false, // set column option
                            elevation: 0,
                            rowsPerPageOptions: [10, 20, 40, 80, 100],
                            customSearchRender: (
                                searchText,
                                handleSearch,
                                hideSearch,
                                options
                            ) => {
                                return (
                                    <Grow appear in={true} timeout={300}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={({ target: { value } }) =>
                                                handleSearch(value)
                                            }
                                            InputProps={{
                                                style: {
                                                    paddingRight: 0,
                                                },
                                                startAdornment: (
                                                    <Icon
                                                        fontSize="small"
                                                        sx={{ mr: 1 }}
                                                    >
                                                        search
                                                    </Icon>
                                                ),
                                                endAdornment: (
                                                    <IconButton
                                                        onClick={hideSearch}
                                                    >
                                                        <Icon fontSize="small">
                                                            clear
                                                        </Icon>
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grow>
                                )
                            },
                        }}
                    />
                    {shouldOpenEditorDialog && (
                        <HandleVendor
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
            </Box>{' '}
            {showAlert ? (
                <MyAlert
                    isOpen={showAlert}
                    typeSeverity={alertType}
                    alrtTextToShow={
                        privatrRoute
                            ? 'Vendor activated successfully'
                            : alertText
                    }
                />
            ) : null}
        </Container>
    )
}

export default CustomerList

// import { Container, StyledTable } from 'app/components/admin/table/index'
// import Modal from 'app/components/Modal/Modal'
// // import Invoice from 'app/components/Invoice/Invoice'
// // import VendorInfo from 'app/components/Invoice/VendorInfo'

// const AllVendor = () => {
//     const [search, setSearch] = useState('')
//     const vendorData = useSelector(
//         (state) => state.vendorList
//     ).vendorData.filter(
//         (vendor) =>
//             vendor.vendor_name.toLowerCase().includes(search.toLowerCase()) ||
//             vendor.email.toLowerCase().includes(search.toLowerCase())
//     )
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllVendor())
//     }, [dispatch])

//     const [rowsPerPage, setRowsPerPage] = React.useState(10)
//     const [page, setPage] = React.useState(0)
//     const [showModal, setShowModal] = useState(false)
//     const [currentVendor, setCurrentVendor] = useState({})

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage)
//     }

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value)
//         setPage(0)
//     }

//     const changeModal = (subscriber) => {
//         setShowModal(!showModal)
//         setCurrentVendor(subscriber)
//     }
//     return (
//         <Container>
//             <div className="breadcrumb">
//                 <Breadcrumb
//                     routeSegments={[
//                         { name: 'Add Vendor', path: '/addVendor' },
//                         { name: 'Form' },
//                     ]}
//                 />
//             </div>
//             {vendorData.length == 0 || vendorData == undefined ? (
//                 <h1> No vendor data in database</h1>
//             ) : (
//                 <SimpleCard title="Vendor List">
//                     <input
//                         type="text"
//                         placeholder="Vendor Name"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <Box width="100%" overflow="auto">
//                         <StyledTable>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Name</TableCell>
//                                     {/* <TableCell>Contect</TableCell> */}
//                                     <TableCell>Email</TableCell>
//                                     {/* <TableCell>Address</TableCell> */}
//                                     {/* <TableCell align="center">Pincode</TableCell> */}
//                                     <TableCell align="center">Edit</TableCell>
//                                     <TableCell>Delete</TableCell>
//                                     <TableCell>Print</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {vendorData
//                                     .slice(
//                                         page * rowsPerPage,
//                                         page * rowsPerPage + rowsPerPage
//                                     )
//                                     .map((subscriber, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell>
//                                                 {subscriber.vendor_name}
//                                             </TableCell>
//                                             {/* <TableCell>
//                                             {subscriber.contect}
//                                         </TableCell> */}
//                                             <TableCell>
//                                                 {subscriber.email}
//                                             </TableCell>
//                                             {/* <TableCell>
//                                             {subscriber.address}
//                                         </TableCell> */}
//                                             {/* <TableCell align="center">
//                                             {subscriber.pincode}
//                                         </TableCell> */}
//                                             <TableCell align="center">
//                                                 <Link
//                                                     to={`/addVendor`}
//                                                     onClick={() =>
//                                                         dispatch(
//                                                             setEditData(
//                                                                 subscriber
//                                                             )
//                                                         )
//                                                     }
//                                                 >
//                                                     <IconButton>
//                                                         <Icon color="error">
//                                                             edit
//                                                         </Icon>
//                                                     </IconButton>
//                                                 </Link>
//                                             </TableCell>
//                                             <TableCell
//                                                 onClick={() => {
//                                                     {
//                                                         alert(
//                                                             'Are you sure you want to delete?'
//                                                         )
//                                                         dispatch(
//                                                             deleteData(
//                                                                 subscriber._id
//                                                             )
//                                                         )
//                                                     }
//                                                 }}
//                                             >
//                                                 <IconButton>
//                                                     <Icon color="error">
//                                                         close
//                                                     </Icon>
//                                                 </IconButton>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <IconButton
//                                                     onClick={() => {
//                                                         changeModal(subscriber)
//                                                     }}
//                                                 >
//                                                     <Icon color="primary">
//                                                         print
//                                                     </Icon>
//                                                 </IconButton>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </StyledTable>

//                         <TablePagination
//                             sx={{ px: 2 }}
//                             rowsPerPageOptions={[5, 10, 25]}
//                             component="div"
//                             count={vendorData.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             backIconButtonProps={{
//                                 'aria-label': 'Previous Page',
//                             }}
//                             nextIconButtonProps={{
//                                 'aria-label': 'Next Page',
//                             }}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </Box>

//                     {showModal ? (
//                         <Modal>
//                             {console.log('model open')}
//                             <div>
//                                 <h1>Model Open</h1>
//                                 {/* <VendorInfo
//                                     changeModal={changeModal}
//                                     currentVendor={currentVendor}
//                                 /> */}
//                                 <div
//                                     style={{
//                                         display: 'flex',
//                                         width: '200px',
//                                         justifyContent: 'space-between',
//                                         margin: 'auto',
//                                     }}
//                                 >
//                                     <button onClick={changeModal}>Close</button>
//                                     <button>Print</button>
//                                 </div>
//                             </div>
//                         </Modal>
//                     ) : null}
//                 </SimpleCard>
//             )}
//         </Container>
//     )
// }

// export default AllVendor
