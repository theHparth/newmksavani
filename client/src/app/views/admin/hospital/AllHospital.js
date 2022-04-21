import { Link } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { FlexBox, Container, StyledButton, MyAlert } from 'app/components'
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
import { useLocation } from 'react-router-dom' // my import
import HandleHospital from './HandleHospital'
import {
    getHospitalsData,
    setEditHospital,
    deleteHospital,
    hospitalStockInformation,
} from 'app/redux/actions/admin/HospitalActions'

const CustomerList = () => {
    const [hospitalDa, setHospitalDa] = useState(null)
    const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
    const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
        useState(false)

    const handleDialogClose = () => {
        setShouldOpenEditorDialog(false)
        setShouldOpenConfirmationDialog(false)
        dispatch(getHospitalsData())
    }
    const handleDeleteUser = (hospitalId) => {
        setHospitalDa(hospitalId)
        setShouldOpenConfirmationDialog(true)
    }

    const handleConfirmationResponse = () => {
        dispatch(deleteHospital(hospitalDa)).then(() => {
            handleDialogClose()
        })
        dispatch(getHospitalsData())
    }

    let {
        hospitalsData = [],
        showAlert,
        alertType,
        alertText,
    } = useSelector((state) => state.hospitalList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHospitalsData())
    }, [dispatch])
    // my import finish
    const location = useLocation()

    var privatrRoute = false
    if (location.pathname === '/allHospitalsD') {
        privatrRoute = true
    }
    console.log(privatrRoute)

    hospitalsData = hospitalsData.filter((data) => {
        return privatrRoute ? !data.hospitalStatus : data.hospitalStatus
    })

    // for design
    const { palette } = useTheme()
    const textMuted = palette.text.secondary
    const bgSuccess = palette.success.main

    const columns = [
        {
            name: 'hospitalName', // field name in the row object
            label: 'Name', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let user = hospitalsData[dataIndex]

                    return (
                        <FlexBox>
                            <Avatar
                                sx={{ width: 48, height: 48 }}
                                src={user?.imgUrl}
                            />
                            <Box ml="12px">
                                <H5 sx={{ fontSize: '15px' }}>
                                    {user?.hospitalName}
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
            // options: {
            //     filter: true,
            // },
        },
        {
            name: 'contect',
            label: 'Contect',
            // options: {
            //     filter: true,
            // },
        },
        {
            name: 'lastActive',
            label: 'Last seen',
            // options: {
            //     filter: true,
            // },
        },
        {
            name: '',
            label: '',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => (
                    <FlexBox>
                        <Box flexGrow={1}></Box>

                        <Button
                            variant={privatrRoute ? 'contained' : 'outlined'}
                            color={privatrRoute ? 'success' : 'error'}
                            onClick={() =>
                                handleDeleteUser(hospitalsData[dataIndex]._id)
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
                                    dispatch(
                                        setEditHospital(
                                            hospitalsData[dataIndex]
                                        )
                                    )
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
                            to={`/hospitalData/${hospitalsData[dataIndex]._id}`}
                            onClick={() =>
                                dispatch(
                                    hospitalStockInformation(
                                        hospitalsData[dataIndex]._id
                                    )
                                )
                            }
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
                    Add New Hospital
                </Button>
            )}
            <Box overflow="auto">
                <Box minWidth={750}>
                    <MUIDataTable
                        title={'Hospital list'}
                        data={hospitalsData}
                        columns={columns}
                        options={{
                            filterType: 'textField',
                            responsive: 'simple',
                            selectableRows: 'none',
                            // filterType: 'checkbox',
                            // responsive: 'standard',

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
                        <HandleHospital
                            handleClose={handleDialogClose}
                            open={shouldOpenEditorDialog}
                        />
                    )}
                    {shouldOpenConfirmationDialog && (
                        <ConfirmationDialog
                            open={shouldOpenConfirmationDialog}
                            onConfirmDialogClose={handleDialogClose}
                            onYesClick={handleConfirmationResponse}
                            text={
                                privatrRoute
                                    ? 'Sure to active    !!'
                                    : 'Are you sure to deactive?'
                            }
                        />
                    )}
                </Box>
                {showAlert ? (
                    <MyAlert
                        isOpen={showAlert}
                        typeSeverity={alertType}
                        alrtTextToShow={
                            privatrRoute
                                ? 'Hospital activated successfully'
                                : alertText
                        }
                    />
                ) : null}
            </Box>
        </Container>
    )
}

export default CustomerList
