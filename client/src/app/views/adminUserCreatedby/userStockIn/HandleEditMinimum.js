import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Dialog, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { H4 } from 'app/components/Typography'
import { MyAlert, TextField, FormHandlerBox } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'

import {
    inStockMinimumChange,
    clearValueStockUser,
} from 'app/redux/actions/userCreatedByAdmin/StockInUserAction'

const StockEditDialog = ({ open, handleClose }) => {
    const {
        alertType,
        showAlert,
        clearValues,

        alertText,

        minimumLimit,
        _id,
        stock_name,
    } = useSelector((x) => x.stockInUserList)

    const [newStock, setNewStock] = useState({
        id: _id,

        minimumLimit: minimumLimit,
        stock_name: stock_name,
    })

    const dispatch = useDispatch()
    const cancleWithClean = () => {
        handleClose()
        dispatch(clearValueStockUser())
    }

    useEffect(() => {
        if (clearValues) {
            cancleWithClean()
        }
        // eslint-disable-next-line
    }, [clearValues])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(inStockMinimumChange(newStock))
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
                <H4 sx={{ mb: '20px' }}>Edit minumum</H4>

                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid sx={{ mb: '16px' }} container spacing={4}>
                        <Grid item sm={16} xs={12}>
                            <TextField
                                type="text"
                                // name="stock_name"
                                id="standard-basic"
                                onChange={handleInput}
                                value={newStock.stock_name}
                                validators={['required']}
                                label="Stock Name"
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
