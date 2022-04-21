// import {
//     Breadcrumb,
//     MatxSnackbar,
//     SimpleCard,
//     ContainerForm,
//     TextField,
// } from 'app/components'
// import { Box } from '@mui/system'
// import { Button, Icon, Grid, Snackbar, Alert } from '@mui/material'
// import { Span } from 'app/components/Typography'
// import React, { useState } from 'react'
// import { ValidatorForm } from 'react-material-ui-form-validator'

// import { useDispatch, useSelector } from 'react-redux'

// import {
//     editHospital,
//     addHospital,
//     clearValue,
// } from 'app/redux/actions/admin/HospitalActions'
// // import Alert from '../../components/Alert'

// const AddHospital = () => {
//     const {
//         showAlert,
//         clearValues,
//         isLoading,
//         isEditing,
//         address,
//         contect,
//         email,
//         pincode,
//         password,
//         hospitalName,
//         _id,
//         alertText,
//     } = useSelector((x) => x.hospitalList)
//     const [state, setState] = useState({
//         id: _id,

//         contect: contect,
//         pincode: pincode,
//         address: address,
//         password: '',
//         email: email,
//         hospitalName: hospitalName,
//     })
//     const clear = () => {
//         setState({
//             contect: '',
//             pincode: '',
//             address: '',
//             password: '',
//             email: '',
//             id: '',
//             hospitalName: '',
//         })
//     }
//     const dispatch = useDispatch()
//     console.log('clearValues', clearValues)
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (isEditing) {
//             dispatch(editHospital(state))
//             if (!clearValues) {
//                 dispatch(clearValue())
//                 clear()
//             }
//         } else {
//             dispatch(addHospital(state))
//             if (!clearValues) {
//                 clear()
//             }
//         }
//     }

//     const handleHospitalInput = (e) => {
//         const name = e.target.name
//         const value = e.target.value

//         setState({
//             ...state,
//             [name]: value,
//         })
//     }
//     return (
//         <ContainerForm>
//             <div className="breadcrumb">
//                 <Breadcrumb
//                     routeSegments={[
//                         { name: 'All Hospital', path: '/allHospitals' },
//                         { name: 'Table' },
//                     ]}
//                 />
//             </div>
//             <SimpleCard>
//                 <div>
//                     <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
//                         <Grid container spacing={6}>
//                             <Grid
//                                 item
//                                 lg={6}
//                                 md={6}
//                                 sm={12}
//                                 xs={12}
//                                 sx={{ mt: 2 }}
//                             >
//                                 <h3>
//                                     {isEditing
//                                         ? 'Edit Hospital'
//                                         : 'Add Hospital'}
//                                 </h3>
//                                 {/* {showAlert && <Alert />} */}
//                                 <TextField
//                                     type="text"
//                                     name="hospitalName"
//                                     id="standard-basic"
//                                     onChange={handleHospitalInput}
//                                     value={state.hospitalName}
//                                     validators={['required']}
//                                     label="HospitalName  ||  Username"
//                                     errorMessages={['this field is required']}
//                                 />
//                                 <TextField
//                                     type="text"
//                                     name="address"
//                                     id="standard-basic"
//                                     onChange={handleHospitalInput}
//                                     value={state.address}
//                                     validators={['required']}
//                                     label="Address"
//                                     errorMessages={['this field is required']}
//                                 />
//                                 <TextField
//                                     type="text"
//                                     name="pincode"
//                                     id="standard-basic"
//                                     onChange={handleHospitalInput}
//                                     value={state.pincode}
//                                     validators={['required']}
//                                     label="Pincode"
//                                     errorMessages={['this field is required']}
//                                 />

//                                 <TextField
//                                     label="Email"
//                                     onChange={handleHospitalInput}
//                                     type="email"
//                                     name="email"
//                                     value={state.email}
//                                     validators={['required', 'isEmail']}
//                                     errorMessages={[
//                                         'this field is required',
//                                         'email is not valid',
//                                     ]}
//                                 />

//                                 <TextField
//                                     label="Mobile Nubmer"
//                                     onChange={handleHospitalInput}
//                                     type="text"
//                                     name="contect"
//                                     value={state.contect}
//                                     validators={['required']}
//                                     errorMessages={['this field is required']}
//                                 />
//                                 {isEditing ? (
//                                     ''
//                                 ) : (
//                                     <TextField
//                                         label="Password"
//                                         onChange={handleHospitalInput}
//                                         name="password"
//                                         type="password"
//                                         value={state.password}
//                                         validators={['required']}
//                                         errorMessages={[
//                                             'this field is required',
//                                         ]}
//                                     />
//                                 )}
//                                 {/* <TextField
//                             label="Confirm Password"
//                             onChange={handleHospitalInput}
//                             name="confirmPassword"
//                             type="password"
//                             value={confirmPassword || ''}
//                             validators={['required', 'isPasswordMatch']}
//                             errorMessages={[
//                                 'this field is required',
//                                 "password didn't match",
//                             ]}
//                         /> */}
//                             </Grid>
//                         </Grid>
//                         <Button
//                             color="primary"
//                             variant="contained"
//                             type="submit"
//                             style={{ margin: '5px' }}
//                             disabled={isLoading}
//                         >
//                             <Icon>send</Icon>
//                             <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
//                                 Submit
//                             </Span>
//                         </Button>
//                         <Button
//                             color="primary"
//                             variant="contained"
//                             type="submit"
//                             style={{ margin: '5px' }}
//                             onClick={(e) => {
//                                 e.preventDefault()
//                                 clear()
//                             }}
//                         >
//                             <Icon>clear</Icon>
//                             <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
//                                 Clear Value
//                             </Span>
//                         </Button>
//                     </ValidatorForm>
//                     {showAlert ? (
//                         <Snackbar open={showAlert} autoHideDuration={3000}>
//                             <Alert
//                                 severity={
//                                     alertText === 'New Hoapital Added!' ||
//                                     alertText === 'Hospital Updated!'
//                                         ? 'success'
//                                         : 'error'
//                                 }
//                                 sx={{ width: '100%' }}
//                             >
//                                 {alertText}
//                             </Alert>
//                         </Snackbar>
//                     ) : null}
//                 </div>
//             </SimpleCard>

//             <Box py="12px" />
//         </ContainerForm>
//     )
// }

// export default AddHospital
