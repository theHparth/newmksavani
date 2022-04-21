import React, { useEffect } from 'react'
import { Icon } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { Button, TextField } from '@mui/material'

const AddStockCard = ({
    stockOut,
    stockOutData,
    setStockOutData,
    index,
    stockData,
    updateStockInDetail,
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target
        setStockOutData([
            ...stockOutData.slice(0, index),
            {
                ...stockOutData[index],
                [name]: value,
            },
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
        console.log(stockOutData)
    }

    const clearForm = () => {
        setStockOutData([
            ...stockOutData.slice(0, index),
            {
                stock_name: '',
                totalBox: '',
                totalQtyInOneBox: '',
            },
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
    }

    const removeField = () => {
        setStockOutData([
            ...stockOutData.slice(0, index),
            ...stockOutData.slice(index + 1, stockOutData.length),
        ])
    }

    useEffect(() => {}, [])
    const aaa = () => {}
    return (
        <ValidatorForm onError={() => null} onSubmit={aaa}>
            {/* {updateStockInDetail.length == 0 ? ( */}
            <Card
                sx={{
                    minWidth: 275,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px 30px 30px 30px',
                }}
            >
                <div style={{ display: 'flex' }}>
                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120, width: 200 }}
                    >
                        <InputLabel id="demo-simple-select-standard-label">
                            Stock Name
                        </InputLabel>

                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            label="Stock Name"
                            name="stock_name"
                            value={stockOut.stock_name}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {stockData.map((stockObj, index) => (
                                <MenuItem
                                    key={index}
                                    value={stockObj.stock_name}
                                >
                                    {stockObj.stock_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* </div>
                    <div style={{ display: 'flex' }}> */}
                    <TextValidator
                        type="number"
                        id="standard-basic"
                        label="Box"
                        variant="standard"
                        sx={{ m: 1, minWidth: 120, width: 200 }}
                        name="totalBox"
                        value={stockOut.totalBox}
                        onChange={handleChange}
                        validators={['required', 'minNumber:1']}
                        errormessages={['this field is required']}
                    />
                    <TextField
                        type="number"
                        id="standard-basic"
                        label="Quantity Per Box"
                        variant="standard"
                        sx={{ m: 1, minWidth: 120, width: 200 }}
                        name="totalQtyInOneBox"
                        value={stockOut.totalQtyInOneBox}
                        onChange={handleChange}
                        validators={['required', 'minNumber:1']}
                        errormessages={['this field is required']}
                    />

                    <Button
                        variant="outlined"
                        sx={{
                            width: '50px',
                            height: '40px',
                            margin: '1px 20px 0px 480px',
                        }}
                        onClick={clearForm}
                    >
                        <Icon>clear</Icon>
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{
                            width: '50px',
                            height: '40px',
                            marginLeft: 'auto',
                        }}
                        onClick={removeField}
                    >
                        <Icon>delete</Icon>
                    </Button>
                </div>
            </Card>
        </ValidatorForm>
    )
}

export default AddStockCard
