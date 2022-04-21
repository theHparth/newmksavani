import { Card } from '@mui/material'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system'
import { InvoiceAutoGenerate } from 'app/components'

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const InvoiceDetails = () => {
    return (
        <StyledCard elevation={6}>
            <InvoiceAutoGenerate />
        </StyledCard>
    )
}

export default InvoiceDetails
