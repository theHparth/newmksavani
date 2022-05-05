import { Button, Card } from '@mui/material'
import { Breadcrumb, ContainerForm, MyAlert, LodingShow } from 'app/components'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AddStockCard from './AddStockCard'

import { inStockUser } from 'app/redux/actions/userCreatedByAdmin/StockInUserAction'
import {
    add,
    edit,
    clearValuesTodaySelling,
} from 'app/redux/actions/userCreatedByAdmin/TodaySellingUserAction'

function AddStockOutForm() {
    const dispatch = useDispatch()
    let { presentStockUserData = [] } = useSelector((x) => x.stockInUserList)
    let {
        isLoading,
        showAlert,
        clearValues,
        alertType,
        alertText,
        isEditing,
        _id,
        todaySellingDataArr,
        stockInDetail,
    } = useSelector((x) => x.todaySellingUserList)
    // isLoading = false
    useEffect(() => {
        if (todaySellingDataArr && todaySellingDataArr.length) {
            setStockOutData(todaySellingDataArr)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(inStockUser({}))
    }, [dispatch])

    var [stockOutData, setStockOutData] = React.useState([
        {
            stock_name: '',
            totalQtyInOneBox: '',
            totalBox: '',
        },
    ])

    const emptyField = {
        stock_name: '',
        totalQtyInOneBox: '',
        totalBox: '',
    }

    useEffect(() => {
        if (clearValues) {
            dispatch(clearValuesTodaySelling())
            setStockOutData([emptyField])
        }
        // eslint-disable-next-line
    }, [clearValues])

    const handleSubmit = () => {
        const data = {
            id: _id,

            todaySellingData: stockOutData,
        }
        console.log('stock out data', data)
        if (!isEditing) {
            dispatch(add(data))
        } else {
            dispatch(edit(data))
        }
    }

    console.log('alertType alertText', alertType, alertText)
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
                {isLoading && <LodingShow />}
            </div>
            <Card
                sx={{
                    minWidth: 275,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '30px',
                }}
            >
                {/* {!stockInDetail
                    ?  */}
                {stockOutData.map((stockOut, index) => (
                    <AddStockCard
                        key={index}
                        stockOut={stockOut}
                        stockOutData={stockOutData}
                        setStockOutData={setStockOutData}
                        index={index}
                        stockData={presentStockUserData}
                        updateStockInDetail={stockInDetail}
                    />
                ))}

                <div style={{ display: 'flex', marginLeft: 'auto' }}>
                    <Button
                        variant="outlined"
                        color="success"
                        sx={{
                            m: 1,
                            minWidth: 120,
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
