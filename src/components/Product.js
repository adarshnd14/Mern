import axios from 'axios';
import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../redux/userReducer';
import { Button, CardActionArea } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';




function Product() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = localStorage.getItem('role')
  console.log(cart);

  useEffect(() => {
    prod()
  }, []);

  const prod = async () => {
    try {
      const res = await axios.get('http://localhost:8000/products/product')
      const data = res.data.data
      dispatch(userAction.fetchProduct(data))
    } catch (err) {
      console.log(err);
    }
  }
  const product = state.product
  console.log(product);

  const handleCart = (ind) => {
    navigate('/cart')
    dispatch(userAction.editId(ind))
  }

  return (
    <div id='product'>
      {product && product.map((val, ind) => {
        return <Card sx={{ width: 300, height: 400, display: 'inline-block', margin: '20px' }}
          key={val._id}
        >
          <CardActionArea>

            <CardContent>

              <Typography variant="h5" component="div">
                <img src={val.pImg} alt='mob img' height={'100px'} />
              </Typography>

              <Typography variant="h5" component="div">
                {val.pName}
              </Typography>
              <hr />
              <Typography variant="h6">
                {val.pBrand}
              </Typography>
              <Typography color="text.primary">
                Rs.{val.pPrice}
              </Typography>

              <Typography variant="body2">
                {val.pDesc}
              </Typography>

              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {val._id}
              </Typography>
              <hr />

              {cart === 'user' && <Button
                color='info'
                variant='contained'
                onClick={() => { handleCart(ind) }}
              ><AddShoppingCartIcon /></Button>}

            </CardContent>
          </CardActionArea>

        </Card>
      })}
    </div>
  )
}

export default Product