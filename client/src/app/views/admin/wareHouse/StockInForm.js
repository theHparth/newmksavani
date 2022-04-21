import { Button, Card, TextField, Grid } from '@mui/material'
import { Breadcrumb, ContainerForm, MyAlert } from 'app/components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AddStockCard from './AddStockCard'

import { getAllData } from 'app/redux/actions/admin/StockActions'
import { getAllVendor } from 'app/redux/actions/admin/VendorActions'
import {
    edit,
    add,
    clearValuesWerehouse,
} from 'app/redux/actions/admin/WareHouseAction'

function AddStockOutForm() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    let { stockData } = useSelector((state) => state.stockList)
    const { vendorData = [] } = useSelector((states) => states.vendorList)
    const {
        showAlert,
        clearValues,
        alertType,
        alertText,
        isEditing,
        _id,
        invoiceNumStockIn,
        vendor_name,
        stockInDetail,
        stockInNote,
    } = useSelector((x) => x.wareHouseStockList)

    useEffect(() => {
        dispatch(getAllVendor())
    }, [dispatch])

    useEffect(() => {
        if (stockInDetail.length) {
            setStockOutData(stockInDetail)
        }
    }, [stockInDetail])

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    var [stockOutData, setStockOutData] = React.useState([
        {
            stock_name: '',
            price: '',
            totalQtyInOneBox: '',
            totalBox: '',
            priceType: 'individualPrice',
        },
    ])

    const emptyField = {
        stock_name: '',
        price: '',
        totalQtyInOneBox: '',
        totalBox: '',
    }

    const [newVendorInvoice, setVendorInvoice] = React.useState({
        invoiceNumStockIn: invoiceNumStockIn || '',
        vendor_name: vendor_name || '',
        stockInNote: stockInNote || '',
    })
    const onChangeVendorInvoice = (e) => {
        const name = e.target.name
        const value = e.target.value

        setVendorInvoice({
            ...newVendorInvoice,
            [name]: value,
        })
    }
    useEffect(() => {
        if (clearValues) {
            dispatch(clearValuesWerehouse())
            newVendorInvoice.vendor_name = ''
            newVendorInvoice.stockInNote = ''
            newVendorInvoice.invoiceNumStockIn = ''
            setStockOutData([emptyField])
        }
        // eslint-disable-next-line
    }, [dispatch, clearValues])

    const handleSubmit = () => {
        const data = {
            id: _id,
            invoiceNumStockIn: newVendorInvoice.invoiceNumStockIn,
            vendor_name: newVendorInvoice.vendor_name,
            stockInNote: newVendorInvoice.stockInNote,
            stockInDetail: stockOutData,
        }
        console.log('stock out data', data)
        if (!isEditing) {
            dispatch(add(data))
        } else {
            dispatch(edit(data))
        }
    }

    return (
        <ContainerForm>
            <div>
                <Breadcrumb
                    routeSegments={[
                        {
                            name: 'Werehouse Stock Details',
                            path: '/wereHouseStock',
                        },
                        { name: 'Table' },
                    ]}
                />
            </div>
            <Card
                sx={{
                    minWidth: 275,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '30px',
                }}
            >
                <Card
                    sx={{
                        minWidth: 275,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px 30px 30px 30px',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <FormControl
                            onSubmit={handleSubmit}
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                        >
                            <InputLabel id="demo-simple-select-standard-label">
                                Vendor Name
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={onChangeVendorInvoice}
                                label="Age"
                                name="vendor_name"
                                value={newVendorInvoice.vendor_name || ''}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {vendorData.map((vendorObj, index) => (
                                    <MenuItem
                                        value={vendorObj.vendor_name}
                                        key={index}
                                    >
                                        {vendorObj.vendor_name}
                                    </MenuItem>
                                ))}
                                <MenuItem
                                    key={'last'}
                                    onClick={() => navigate('/allVendor/new')}
                                >
                                    Add new vendor
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            // type="number"
                            id="standard-basic"
                            label="Invoice Number"
                            variant="standard"
                            sx={{ m: 1, minWidth: 120, width: 200 }}
                            name="invoiceNumStockIn"
                            value={newVendorInvoice.invoiceNumStockIn || ''}
                            onChange={onChangeVendorInvoice}
                        />
                    </div>
                </Card>

                {/* {!stockInDetail
                    ?  */}
                {stockOutData.map((stockOut, index) => (
                    <AddStockCard
                        key={index}
                        stockOut={stockOut}
                        stockOutData={stockOutData}
                        setStockOutData={setStockOutData}
                        index={index}
                        stockData={stockData}
                        vendorData={vendorData}
                        updateStockInDetail={stockInDetail}
                    />
                ))}

                <div style={{ display: 'flex', marginLeft: 'auto' }}>
                    <Grid
                        item
                        sx={{
                            m: 1,
                            minWidth: 300,
                            width: 'auto',
                            marginLeft: 'auto',
                        }}
                    >
                        <TextField
                            label="Custom Notes"
                            name="stockInNote"
                            size="small"
                            variant="outlined"
                            multiline
                            rows={5}
                            fullWidth
                            value={newVendorInvoice.stockInNote || ''}
                            onChange={onChangeVendorInvoice}
                        />
                    </Grid>
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{
                            m: 1,
                            minWidth: 120,
                            maxHeight: 38,
                            width: 120,
                            marginLeft: 'auto',
                        }}
                        onClick={() =>
                            setStockOutData([...stockOutData, emptyField])
                        }
                    >
                        Add More
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            m: 1,
                            minWidth: 120,
                            maxHeight: 38,
                            width: 120,
                            marginLeft: 'auto',
                        }}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </div>
            </Card>
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

export default AddStockOutForm
