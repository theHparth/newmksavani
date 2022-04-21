import {
    Breadcrumb,
    SimpleCard,
    ContainerForm,
    TextField,
    MyAlert,
} from 'app/components'
import { ValidatorForm } from 'react-material-ui-form-validator'
// import { getAllVendor } from 'app/redux/actions/VendorActions'

import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
    edit,
    add,
    clearValueStock,
} from 'app/redux/actions/admin/StockActions'

const AddStock = () => {
    const {
        alertType,
        showAlert,
        clearValues,
        isLoading,
        isEditing,
        alertText,
        description,
        minimumLimit,
        _id,
        stock_name,
    } = useSelector((x) => x.stockList)

    const [state, setState] = useState({
        id: _id,
        description: description,
        minimumLimit: minimumLimit,
        stock_name: stock_name,
    })
    const dispatch = useDispatch()
    const cancleWithClean = () => {
        dispatch(clearValueStock())
    }
    const clear = () => {
        setState({
            id: '',
            description: '',
            minimumLimit: '',
            stock_name: '',
        })
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
    // // for getting vendor data
    // const { vendorData } = useSelector((state) => state.vendorList)
    // useEffect(() => {
    //     dispatch(getAllVendor())
    // }, [dispatch])

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
                        { name: 'All Stock', path: '/allStock' },
                        { name: 'Table' },
                    ]}
                />
            </div>
            <SimpleCard>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <h3>{_id ? 'Edit Stock' : 'Add Stock'}</h3>

                            <TextField
                                type="text"
                                name="stock_name"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.stock_name}
                                validators={['required']}
                                label="Stock Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="description"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="minimumLimit"
                                id="standard-basic"
                                onChange={handleInput}
                                value={state.minimumLimit}
                                validators={['required']}
                                label="Minimum limit to show warning"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        style={{ margin: '5px' }}
                        disabled={isLoading}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Submit
                        </Span>
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        style={{ margin: '5px' }}
                        onClick={(e) => {
                            e.preventDefault()
                            clear()
                        }}
                    >
                        <Icon>clear</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Clear Value
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
            {showAlert ? (
                <MyAlert
                    isOpen={showAlert}
                    typeSeverity={alertType}
                    alrtTextToShow={alertText}
                />
            ) : null}
        </ContainerForm>
    )
}

export default AddStock
