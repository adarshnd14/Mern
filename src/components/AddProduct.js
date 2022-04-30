import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/userReducer';
import { TextareaAutosize, TextField } from '@mui/material';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

function AddProduct() {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const open = state.modal
    const toggle = state.toggle
    const edit = state.editModal
    const _id = state._id
    const editProduct = state.editProduct

    // console.log('edit', edit, 'id', _id);

    const handleOpen = () => {
        dispatch(userAction.modalOpen(true))
    }

    const handleClose = () => {
        dispatch(userAction.modalOpen(false))
        dispatch(userAction.editModal(false))
        dispatch(userAction.editProduct({
            pName: '',
            pPrice: '',
            pBrand: '',
            pDesc: '',
            pImg: ''
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e);
        const data = new FormData(e.currentTarget)

        //getting token from localStorage
        const token = localStorage.getItem('login')
        const prodObj = {
            pName: data.get('pName'),
            pBrand: data.get('pBrand'),
            pPrice: data.get('pPrice'),
            pDesc: data.get('pDesc'),
            pImg: data.get('pImg')
        }

        //for edited data to send
        if (edit) {

            //send id in Query params, edited obj in body and token in headers
            try {
                const res = await axios.put(`http://localhost:8000/products/editproduct/?_id=${_id}`,
                    prodObj, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch(userAction.tableToggle(!toggle))
                handleClose()
                console.log(res);
            } catch (err) {
                console.log(err);
            }
            dispatch(userAction.editProduct({
                pName: '',
                pPrice: '',
                pBrand: '',
                pDesc: '',
                pImg: ''
            }))
        } else {

            //to add the product
            try {
                axios.post('http://localhost:8000/products/addproduct', prodObj, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                dispatch(userAction.tableToggle(!toggle))
                // console.log(res);
                handleClose()

            } catch (err) {
                console.log(err);
            }
        }
    }



    return (
        <div>
            <Button
                variant='contained'
                className='m-3'
                id={'buttonColor'}
                onClick={handleOpen}>Add Product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form" noValidate
                    onSubmit={(e) => { handleSubmit(e) }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {edit ? 'Update Prodcut Details' : 'Fill Product Details'}
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pName"
                        label="Prodcut name"
                        type="text"
                        id="pName"
                        defaultValue={editProduct.pName}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pBrand"
                        label="Brand"
                        type="text"
                        id="pBrand"
                        defaultValue={editProduct.pBrand}

                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pPrice"
                        label="Price"
                        type="number"
                        id="pPrice"
                        defaultValue={editProduct.pPrice}

                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pImg"
                        label="Image URL"
                        type="Text"
                        id="pImg"
                        defaultValue={editProduct.pImg}

                    />

                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        name='pDesc'
                        type="text"
                        id="pDesc"
                        placeholder="Description"
                        style={{ width: 335 }}
                        className='mt-3'
                        defaultValue={editProduct.pDesc}
                    />



                    <Button
                        variant='contained'
                        className='m-2'
                        type='submit'
                    >{edit ? 'Edit Product' : 'Add Product'}</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AddProduct
