import { Box, styled } from '@mui/system'
import { Button, TableCell } from '@mui/material'

import { Small } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '13px',
    marginBottom: '16px',
    color: theme.palette.text.primary,
    '& span, svg': {
        fontSize: '1.25rem',
        marginRight: '16px',
    },
}))

const StyledCell = styled(TableCell)(() => ({
    paddingTop: '4px',
    paddingBottom: '4px',
    textTransform: 'capitalize',
}))

const StyedSmall = styled(Small)(({ theme, status }) => ({
    padding: '2px 8px',
    color: '#fff',
    borderRadius: '4px',
    background:
        status === 'paid'
            ? '#08ad6c'
            : status === 'unpaid' && theme.palette.error.main,
}))

export { FlexBox, Container, StyledButton, StyledCell, StyedSmall }
