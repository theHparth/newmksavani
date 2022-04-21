import { Snackbar, Alert, LinearProgress } from '@mui/material'
import { H1 } from 'app/components/Typography'

const MyAlert = ({ isOpen, typeSeverity, alrtTextToShow }) => (
    <Snackbar
        open={isOpen}
        autoHideDuration={typeSeverity === 'danger' ? 5000 : 3000}
        vertical="top"
        horizontal="center"
    >
        <Alert
            severity={typeSeverity}
            sx={{ width: '100%' }}
            // vertical="top"
            // horizontal="center"
        >
            {alrtTextToShow}
        </Alert>
    </Snackbar>
)

const LodingShow = () => {
    return (
        <div>
            {' '}
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
        </div>
    )
}

const H1Alert = () => {
    return <H1 sx={{ mb: '20px' }}>No data available</H1>
}

export { MyAlert, LodingShow, H1Alert }
