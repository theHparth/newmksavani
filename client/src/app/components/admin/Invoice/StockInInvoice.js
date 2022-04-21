import {
    Icon,
    Button,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Grid,
    TextField,
} from '@mui/material'
import { format } from 'date-fns'
import { Box, styled } from '@mui/system'
// import { getInvoiceById } from './InvoiceService'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { H5, Paragraph } from 'app/components/Typography'
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
// import json
import ReactToPrint from 'react-to-print'
import PrintButton from './PrintButton'

const InvoiceViewer = ({ toggleInvoiceEditor }) => {
    const {
        showAlert,
        clearValues,
        isLoading,
        isEditing,
        _id,
        hospitalName,
        invoiceNum,
        stockOutDetail,
        createdFor,
        createdAt,
        alertText,
        latestStatus,
        updatedAt,
    } = useSelector((x) => x.stockOutList)

    const user = localStorage.getItem('user')
    const { Iaddress, Icontect, Iemail, Ipincode, IhopsitalId } = useSelector(
        (stat) => stat.hospitalList
    )
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getHospitalsData(hospitalName))
    // }, [dispatch, hospitalName])
    const state = {}

    var adminInfo = JSON.parse(user)
    var userAdd =
        adminInfo['address'] +
        ' - ' +
        adminInfo['pincode'] +
        '\nContect: ' +
        adminInfo['contect'] +
        '\nEmail: ' +
        adminInfo['email']

    var hospitalAdd =
        Iaddress +
        ' - ' +
        Ipincode +
        '\nContect: ' +
        Icontect +
        '\nEmail: ' +
        Iemail

    const handlePrint = (e) => {
        e.preventDefault()
        window.print()
    }
    let subTotalCost = 0

    return (
        <Box py={2} className="invoice-viewer">
            <ButtonBox className="viewer_actions">
                <Link
                    to={
                        IhopsitalId
                            ? `/hospitalData/${IhopsitalId}`
                            : '/allHospitals'
                    }
                >
                    <IconButton>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                </Link>

                <div>
                    {/* <Button
                        sx={{ mr: 2, py: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => toggleInvoiceEditor()}
                    >
                        Edit InvoiceZ
                    </Button> */}
                    <Button
                        sx={{ py: 1 }}
                        onClick={handlePrint}
                        variant="contained"
                        color="secondary"
                    >
                        Print Invoice
                    </Button>
                    {/* <PrintButton /> */}
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
                            <span>
                                {latestStatus == true ? 'Delivered' : 'Pending'}
                            </span>
                        </StyledH5>
                        <StyledH5>
                            <strong>Order date: </strong>
                            <span>
                                {moment(createdAt).format('MMM Do, YYYY')}
                            </span>
                        </StyledH5>
                        {'\n'}
                        <StyledH5>
                            {latestStatus == true && (
                                <strong>Delivered on: </strong>
                            )}

                            {latestStatus == true && (
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
                    <div>
                        <StyledH5 sx={{ mb: 1 }}>Bill From</StyledH5>
                        <Paragraph sx={{ mb: 2 }}>
                            {adminInfo['name']}
                        </Paragraph>
                        <Paragraph sx={{ whiteSpace: 'pre' }}>
                            {userAdd}
                        </Paragraph>
                    </div>
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
                            {
                                item.priceForUser &&
                                    (subTotalCost +=
                                        item.totalBox *
                                        item.totalQtyInOneBox *
                                        item.priceForUser)
                            }
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
                            Join our Online Class: Building Your Collection: A
                            Master Class for Short Story Writers with Patrick
                            Ryan — April 21st - 24th. Applications for our
                            Summer Writers’ Conference which will take place
                            online July 17th - 24th, 2022 are now open. Apply
                            today! Together with the Talve-Goodman family, One
                            Story is pleased to announce our 2022 Adina
                            Talve-Goodman Fellow: Ani Cooney. We are excited to
                            announce that One Story is the recipient of a 2020
                            Whiting Literary Magazine Prize! Congratulations to
                            the winners and runners-up of our 2022 Teen Writing
                            Contest! Read excerpts from the winning stories
                            here. In order for structural change to happen, it
                            must happen at all levels, from the Big 5 publishers
                            to small nonprofits like ours. Read about the steps
                            that One Story is taking to increase the inclusivity
                            of our organization. One Story’s Submission Manager
                            is now free!
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
