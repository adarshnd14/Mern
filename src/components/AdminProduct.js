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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function AdminProduct() {

  const state = useSelector(state => state)
  const productArr = state.product
  const dispatch = useDispatch()

  useEffect(() => {
    productData()
  }, []);

  const productData = async () => {
    const res = await axios.get('http://localhost:8000/products/product')
    const product = res.data.data
    dispatch(userAction.fetchProduct(product))
  }

  //to add product details
  const handleAdd = () => {
    dispatch(userAction.modalOpen(true))
  }

  //to edit product details
  const handleEdit = () => {

  }

  console.log('product arr ',productArr);
  
  return (
    <div className=''>
    
    <Button
    variant='contained'
    className='m-3'
    >Add Product</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product ID</StyledTableCell>
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
                  {val._id}
                </StyledTableCell>
                <StyledTableCell align="right">{val.pName}</StyledTableCell>
                <StyledTableCell align="right">{val.pBrand}</StyledTableCell>
                <StyledTableCell align="right">{val.pPrice}</StyledTableCell>
                <StyledTableCell align="right">{val.pDesc}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button onClick={() => { handleEdit(val._id) }}>
                    <EditIcon color='success' />
                  </Button>

                  <Button>
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