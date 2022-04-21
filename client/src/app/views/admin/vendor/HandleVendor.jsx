import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Dialog, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { MyAlert, TextField, FormHandlerBox } from 'app/components'
import { edit, add, clearValue } from 'app/redux/actions/admin/VendorActions'

const MemberEditorDialog = ({ uid, open, handleClose }) => {
    const {
        alertType,
        showAlert,
        clearValues,

        isEditing,
        alertText,
        address,
        contect,
        email,
        pincode,
        vendor_name,
        _id,
    } = useSelector((x) => x.vendorList)

    const [state, setState] = useState({
        id: _id,

        contect: contect,
        pincode: pincode,
        address: address,
        vendor_name: vendor_name,
        email: email,
    })

    const dispatch = useDispatch()
    const cancleWithClean = () => {
        handleClose()
        dispatch(clearValue())
    }

    useEffect(() => {
        if (clearValues) {
            cancleWithClean()
        }
        // eslint-disable-next-line
    }, [clearValues])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEditing) {
            dispatch(edit(state))
        } else {
            dispatch(add(state))
        }
    }

    const handleHospitalInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                {isEditing ? (
                    <H4 sx={{ mb: '20px' }}>Update Vendor Info</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>Add New Vendor</H4>
                )}
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="vendor_name"
                                id="standard-basic"
                                onChange={handleHospitalInput}
                                value={state.vendor_name}
                                validators={['required']}
                                label="Vendor Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="address"
                                id="standard-basic"
                                onChange={handleHospitalInput}
                                value={state.address}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="pincode"
                                id="standard-basic"
                                onChange={handleHospitalInput}
                                value={state.pincode}
                                validators={['required']}
                                label="Pincode"
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item sm={16} xs={12}>
                            <TextField
                                label="Email"
                                onChange={handleHospitalInput}
                                type="email"
                                name="email"
                                value={state.email}
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                    'this field is required',
                                    'email is not valid',
                                ]}
                            />

                            <TextField
                                label="Mobile Nubmer"
                                onChange={handleHospitalInput}
                                type="text"
                                name="contect"
                                value={state.contect}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>

                    <FormHandlerBox>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={cancleWithClean}
                        >
                            Cancel
                        </Button>
                    </FormHandlerBox>
                </ValidatorForm>
            </Box>
            {showAlert ? (
                <MyAlert
                    isOpen={showAlert}
                    typeSeverity={alertType}
                    alrtTextToShow={alertText}
                />
            ) : null}
        </Dialog>
    )
}

export default MemberEditorDialog
