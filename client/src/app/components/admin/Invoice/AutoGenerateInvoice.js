import {
    Button,
    Divider,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
} from '@mui/material'
import { Box } from '@mui/system'
// import { getInvoiceById } from './InvoiceService'
import React, { useEffect } from 'react'
import { Paragraph } from 'app/components/Typography'
import {
    StyledTable,
    StyledH5,
    TextBox,
    ButtonBox,
    FlexBox,
} from './StyleInvoice'
import { useDispatch, useSelector } from 'react-redux'
import { getHospitalsData } from 'app/redux/actions/admin/HospitalActions'
import moment from 'moment'

const InvoiceViewer = ({ invoiceInfo }) => {
    const user = localStorage.getItem('user')
    const hospital = localStorage.getItem('hospital')
    const { Iaddress, Icontect, Iemail, Ipincode } = useSelector(
        (stat) => stat.hospitalList
    )
    const {
        hospitalName,
        invoiceNum,
        status,
        stockOutDetail,
        updatedAt,
        createdAt,
        messageForHospital,
    } = invoiceInfo

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHospitalsData(hospitalName))
    }, [dispatch, hospitalName])

    var userAdd
    if (user) {
        var adminInfo = JSON.parse(user)
        userAdd =
            adminInfo['address'] +
            ' - ' +
            adminInfo['pincode'] +
            '\nContect: ' +
            adminInfo['contect'] +
            '\nEmail: ' +
            adminInfo['email']
    }

    var hospitalAdd
    if (hospital) {
        var hospitalInfo = JSON.parse(hospital)
        hospitalAdd =
            hospitalInfo['address'] +
            ' - ' +
            hospitalInfo['pincode'] +
            '\nContect: ' +
            hospitalInfo['contect'] +
            '\nEmail: ' +
            hospitalInfo['email']
    }

    // var hospitalAdd =
    if (Iaddress) {
        hospitalAdd =
            Iaddress +
            ' - ' +
            Ipincode +
            '\nContect: ' +
            Icontect +
            '\nEmail: ' +
            Iemail
    }

    const handlePrint = (e) => {
        e.preventDefault()
        window.print()
    }
    let subTotalCost = 0

    return (
        <Box py={2} className="invoice-viewer">
            <ButtonBox className="viewer_actions">
                <div>
                    <Button
                        sx={{ py: 1 }}
                        onClick={handlePrint}
                        variant="contained"
                        color="secondary"
                    >
                        Print Invoice
                    </Button>
                </div>
            </ButtonBox>

            <div id="print-area">
                <FlexBox px={2} mb={2} className="viewer__order-info">
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Order Info</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>Order Number</Paragraph>
                        <Paragraph># {invoiceNum}</Paragraph>
                    </div>
                    <TextBox>
                        <StyledH5 sx={{ mb: 1 }}>
                            <strong>Order status: </strong>
                            <span>{status ? 'Delivered' : 'Pending'}</span>
                        </StyledH5>
                        <StyledH5>
                            <strong>Order date: </strong>
                            <span>
                                {moment(createdAt).format('MMM Do, YYYY')}
                            </span>
                        </StyledH5>
                        {'\n'}
                        <StyledH5>
                            {status && <strong>Delivered on: </strong>}

                            {status && (
                                <span>
                                    {moment(updatedAt).format('MMM Do, YYYY')}
                                </span>
                            )}
                        </StyledH5>
                    </TextBox>
                </FlexBox>

                <Divider />

                <FlexBox
                    px={2}
                    py="20px"
                    mb={2}
                    className="viewer__billing-info"
                >
                    {user && (
                        <div>
                            <StyledH5 sx={{ mb: 1 }}>Bill From</StyledH5>
                            <Paragraph sx={{ mb: 2 }}>
                                {adminInfo['name']}
                            </Paragraph>
                            <Paragraph sx={{ whiteSpace: 'pre' }}>
                                {userAdd}
                            </Paragraph>
                        </div>
                    )}
                    <Box width="100%" textAlign="right">
                        <StyledH5 sx={{ mb: 1 }}>Bill To</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>{hospitalName}</Paragraph>
                        <Paragraph sx={{ whiteSpace: 'pre' }}>
                            {hospitalAdd}
                        </Paragraph>
                    </Box>
                    <div />
                </FlexBox>

                <StyledTable sx={{ mb: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Units</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockOutDetail.map((item, index) => {
                            item.priceForUser &&
                                (subTotalCost +=
                                    item.totalBox *
                                    item.totalQtyInOneBox *
                                    item.priceForUser)

                            return (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.stock_name}
                                    </TableCell>
                                    <TableCell>
                                        {item.totalBox * item.totalQtyInOneBox}
                                    </TableCell>
                                    <TableCell>{item.priceForUser}</TableCell>
                                    <TableCell>
                                        {item.priceForUser &&
                                            item.totalBox *
                                                item.totalQtyInOneBox *
                                                item.priceForUser}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </StyledTable>

                <FlexBox px={2} mb={2} className="viewer__order-info">
                    <Grid item xs={6}>
                        <Paragraph
                            label="Custom Notes"
                            name="notes"
                            size="small"
                            variant="outlined"
                            multiline
                            rows={6}
                            fullWidth
                        >
                            {messageForHospital}
                        </Paragraph>
                    </Grid>
                    {/* </FlexBox>

                <FlexBox px={2} sx={{ justifyContent: 'flex-end' }}> */}
                    <Box display="flex">
                        <Box pr={6}>
                            <Paragraph sx={{ my: 2 }}>Sub Total:</Paragraph>
                            {/* <Paragraph sx={{ mb: 2 }}>Vat(%):</Paragraph>
                            <strong>
                                <p>Grand Total:</p>
                            </strong> */}
                        </Box>
                        <div>
                            <Paragraph sx={{ my: 2 }}>{subTotalCost}</Paragraph>
                            {/* <Paragraph sx={{ mb: 2 }}>{vat}</Paragraph>
                            <p>
                                <strong>
                                    $
                                    {
                                        (subTotalCost +=
                                            (subTotalCost * vat) / 100)
                                    }
                                </strong>
                            </p> */}
                        </div>
                    </Box>
                </FlexBox>
            </div>
        </Box>
    )
}

export default InvoiceViewer
