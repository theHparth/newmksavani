import { Table } from '@mui/material'
import { Box, styled } from '@mui/system'
// import { getInvoiceById } from './InvoiceService'

import { H5 } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))

const ButtonBox = styled(FlexBox)(() => ({
    paddingLeft: '16px',
    paddingRight: '16px',
    marginBottom: '20px',
    alignItems: 'center',
    '& button': {
        fontSize: '13px',
        textTransform: 'capitalize',
    },
}))

const TextBox = styled('div')(() => ({
    textAlign: 'right',
    '& h5': {
        fontWeight: '500',
        textTransform: 'capitalize',
    },
}))

const StyledH5 = styled(H5)(() => ({
    fontSize: 15,
    '& span': { fontWeight: 'normal' },
}))

const StyledTable = styled(Table)(({ theme }) => ({
    '& thead': {
        '& tr': {
            background: theme.palette.background.default,
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
            '& th:first-of-type': {
                paddingLeft: '24px !important',
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '16px !important',
                },
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
            '& td:first-of-type': {
                textTransform: 'capitalize',
                paddingLeft: '24px !important',
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: '16px !important',
                },
            },
        },
    },
}))

export { StyledTable, StyledH5, TextBox, ButtonBox, FlexBox }
