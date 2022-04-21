import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Dialog, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { MyAlert, TextField, FormHandlerBox, LodingShow } from 'app/components'

import {
    editHospital,
    addHospital,
    clearValue,
} from 'app/redux/actions/admin/HospitalActions'

const MemberEditorDialog = ({ open, handleClose }) => {
    const {
        alertType,
        showAlert,
        clearValues,
        isEditing,
        address,
        contect,
        email,
        pincode,

        hospitalName,
        _id,
        alertText,

        isLoading,
    } = useSelector((x) => x.hospitalList)
    const [state, setState] = useState({
        id: _id,

        contect: contect,
        pincode: pincode,
        address: address,
        password: '',
        confirmPassword: '',
        email: email,
        hospitalName: hospitalName,
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
            dispatch(editHospital(state))
        } else {
            dispatch(addHospital(state))
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

    // for password verification
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                {isEditing ? (
                    <H4 sx={{ mb: '20px' }}>Update Hospital</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>Add Hospital</H4>
                )}
                {isLoading && <LodingShow />}
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="hospitalName"
                                id="standard-basic"
                                onChange={handleHospitalInput}
                                value={state.hospitalName}
                                validators={['required']}
                                label="HospitalName  ||  Username"
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
                            <div>
                                <TextField
                                    label="Password"
                                    onChange={handleHospitalInput}
                                    name="password"
                                    type="password"
                                    value={state.password}
                                    validators={!isEditing && ['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextField
                                    label="Confirm Password"
                                    onChange={handleHospitalInput}
                                    name="confirmPassword"
                                    type="password"
                                    value={state.confirmPassword}
                                    validators={
                                        !isEditing && [
                                            'required',
                                            'isPasswordMatch',
                                        ]
                                    }
                                    errorMessages={[
                                        'this field is required',
                                        "password didn't match",
                                    ]}
                                />
                            </div>
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
