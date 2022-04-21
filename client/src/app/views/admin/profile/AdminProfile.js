import {
    Breadcrumb,
    SimpleCard,
    ContainerForm,
    TextField,
} from 'app/components'
import { ValidatorForm } from 'react-material-ui-form-validator'
// import { getAllVendor } from 'app/redux/actions/VendorActions'

import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'

import useAuth from 'app/hooks/useAuth'

const AdminProfile = () => {
    const { updateAdmin } = useAuth()

    const user = localStorage.getItem('user')
    var adminInfo = JSON.parse(user)

    const [state, setState] = useState({
        _id: adminInfo['_id'],
        name: adminInfo['name'],
        lastName: adminInfo['lastName'],
        address: adminInfo['address'],
        pincode: adminInfo['pincode'],
        contect: adminInfo['contect'],
        email: adminInfo['email'],
        password: '',
    })

    const handleSubmit = async (e) => {
        // e.preventDefault()

        // dispatch(updateProfile(state))

        await updateAdmin(state)
    }

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <ContainerForm>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Home page', path: '/dashboard/default' },
                        { name: 'Dashboard' },
                    ]}
                />
            </div>
            <SimpleCard>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <h3>Profile</h3>

                            <TextField
                                type="text"
                                name="name"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.name}
                                validators={['required']}
                                label="First Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="lastName"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.lastName}
                                validators={['required']}
                                label="Last name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="address"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.address}
                                validators={['required']}
                                label="Address"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="pincode"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.pincode}
                                validators={['required']}
                                label="Pincode"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="contect"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.contect}
                                validators={['required']}
                                label="Contact"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="email"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.email}
                                validators={['required']}
                                label="Email"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="password"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.password}
                                label="New password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        style={{ margin: '5px' }}
                        // disabled={isLoading}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Submit
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
            {/* {showAlert ? (
                <MyAlert
                    isOpen={showAlert}
                    typeSeverity={alertType}
                    alrtTextToShow={alertText}
                />
            ) : null} */}
        </ContainerForm>
    )
}

export default AdminProfile
