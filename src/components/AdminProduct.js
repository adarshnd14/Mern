import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/userReducer';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddProduct from './AddProduct';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function AdminProduct() {

  const state = useSelector(state => state)

  const productArr = state.product
  const toggle = state.toggle
  const dispatch = useDispatch()
  // console.log(toggle);

  useEffect(() => {
    productData()
  }, [toggle]);

  //get data of all products from backend
  const productData = async () => {
    const res = await axios.get('http://localhost:8000/products/product')
    const product = res.data.data
    dispatch(userAction.fetchProduct(product))
  }

  //to edit product details
  const handleEdit = (val) => {
    console.log(val);
    dispatch(userAction.editId(val._id))
    dispatch(userAction.editProduct(val))
    dispatch(userAction.editModal(true))
    dispatch(userAction.modalOpen(true))
  }

  //to delete
  const handleDelete = async (_id) => {
    const token = localStorage.getItem('login')
    try {
      const res = await axios.delete(`http://localhost:8000/products/deleteproduct/?_id=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      dispatch(userAction.tableToggle(!toggle))
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  // console.log('product arr ',productArr);

  return (
    <div className='col'
    id={'product'}>
      <AddProduct       />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Brand</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productArr && productArr.map((val) => (
              <StyledTableRow key={val._id}>
                <StyledTableCell component="th" scope="row">
                  <img src={val.pImg} alt='img'/>
                </StyledTableCell>
                <StyledTableCell align="right">{val.pName}</StyledTableCell>
                <StyledTableCell align="right">{val.pBrand}</StyledTableCell>
                <StyledTableCell align="right">{val.pPrice}</StyledTableCell>
                <StyledTableCell align="right">{val.pDesc}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button onClick={() => { handleEdit(val) }}>
                    <EditIcon color='success' />
                  </Button>

                  <Button onClick={() => { handleDelete(val._id) }}>
                    <DeleteForeverIcon color='error' />
                  </Button>

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AdminProduct