import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Dialog, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { MyAlert, TextField, FormHandlerBox } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'

import {
    edit,
    add,
    clearValueStock,
} from 'app/redux/actions/admin/StockActions'

const StockEditDialog = ({ uid, open, handleClose }) => {
    const {
        alertType,
        showAlert,
        clearValues,

        isEditing,
        alertText,
        description,
        minimumLimit,
        _id,
        stock_name,
    } = useSelector((x) => x.stockList)

    const [newStock, setNewStock] = useState({
        id: _id,
        description: description,
        minimumLimit: minimumLimit,
        stock_name: stock_name,
    })

    const dispatch = useDispatch()
    const cancleWithClean = () => {
        handleClose()
        dispatch(clearValueStock())
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
            dispatch(edit(newStock))
        } else {
            dispatch(add(newStock))
        }
    }

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setNewStock({
            ...newStock,
            [name]: value,
        })
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={3}>
                {isEditing ? (
                    <H4 sx={{ mb: '20px' }}>Update Stock</H4>
                ) : (
                    <H4 sx={{ mb: '20px' }}>Add new stock</H4>
                )}
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="stock_name"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.stock_name}
                                validators={['required']}
                                label="Stock Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="text"
                                name="description"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                        </Grid>

                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                name="minimumLimit"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.minimumLimit}
                                validators={['required']}
                                label="Minimum limit to show warning"
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

export default StockEditDialog
