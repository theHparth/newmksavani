import { styled } from '@mui/system'

const RadioRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    '& .formControl': {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
    '& .group': {
        margin: theme.spacing(1, 0),
    },
}))

export default RadioRoot
