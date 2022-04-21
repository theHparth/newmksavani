import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import moment from 'moment'
import {
    SimpleCard,
    ContainerTable,
    StyledTable,
    Heading,
    SecondaryHeading,
    LodingShow,
    H1Alert,
} from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'

import { hospitalSellingInfo } from 'app/redux/actions/admin/HospitalActions'

const PreviousSellingEntryManage = ({ id }) => {
    // for panel setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    // for page setup
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    let { hospitalSellingData = [], isLoading } = useSelector(
        (state) => state.hospitalList
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hospitalSellingInfo({ id }))
        setExpanded(false)
    }, [dispatch, id])
    return (
        <ContainerTable>
            {/* date chooser from--------FROM---------- */}
            {/* <SearchBox
                    onSearch={handleChangeSearch}
                    onSearchValueChange={searchText}
                />
                <DateChoose dateProjection={(state) => setSearchDate(state)} /> */}
            {isLoading && <LodingShow />}

            {hospitalSellingData.length === 0 ? (
                <H1Alert />
            ) : (
                <SimpleCard>
                    <Box width="100%">
                        <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Heading>Seeling date</Heading>
                            <SecondaryHeading>Total Items</SecondaryHeading>
                        </AccordionSummary>
                        {/* data print start from here*/}
                        {hospitalSellingData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <Accordion
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                    key={index}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel2bh-header"
                                    >
                                        <Heading>
                                            {' '}
                                            {moment(
                                                subscriber.createdAt
                                            ).format('MMM Do, YYYY')}
                                        </Heading>
                                        <SecondaryHeading>
                                            {subscriber.todaySellingData.length}
                                        </SecondaryHeading>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        style={{ backgroundColor: '#F5F5F5' }}
                                    >
                                        <StyledTable>
                                            <TableHead
                                                style={{
                                                    backgroundColor: '#EBF5FB',
                                                }}
                                            >
                                                <TableRow>
                                                    <TableCell>
                                                        Stock Name
                                                    </TableCell>
                                                    <TableCell>
                                                        Total Qty
                                                    </TableCell>
                                                    <TableCell>Price</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {subscriber.todaySellingData.map(
                                                    (subscriber, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {
                                                                    subscriber.stock_name
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {subscriber.totalBox *
                                                                    subscriber.totalQtyInOneBox}
                                                            </TableCell>
                                                            <TableCell>
                                                                ${' '}
                                                                {subscriber.price
                                                                    ? subscriber.price
                                                                    : 0}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </StyledTable>
                                    </AccordionDetails>
                                </Accordion>
                            ))}

                        <TablePagination
                            sx={{ px: 2 }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={hospitalSellingData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </SimpleCard>
            )}
        </ContainerTable>
    )
}

export default PreviousSellingEntryManage
