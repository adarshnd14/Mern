import { Button, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../redux/userReducer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Cart() {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        prod()
    }, []);

    const id = state._id
    const product = state.product

    const prod = async () => {
        try {
            const res = await axios.get('http://localhost:8000/products/product')
            const data = res.data.data
            dispatch(userAction.fetchProduct(data))
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            {/* <div className='col d-flex justify-content-center mt-4'> */}
            <Card sx={{ marginTop: '4vh', marginRight:'3vw' }}
                className='col-7 cardHeight'
            >
                <CardContent>
                    <div className='cartCard imgStat'>
                        <div className='mobView '>
                            {product &&
                                <img src={product[id].pImg}
                                    className=' d-flex align-items-start'
                                    alt='mob img' height={'130px'} />
                            }
                        </div>

                        {/* <div className='contain'> */}
                        <div className='text-left textBox pl-3'>
                            <Typography>
                                <CheckCircleIcon color='success' /> <b> ADDED TO CART</b>
                            </Typography>

                            <Typography>
                                <b>Name</b>: {product && product[id].pName}
                            </Typography>

                            <Typography color="text.primary">
                                <b>Price</b>: <CurrencyRupeeIcon
                                    fontSize='10px'
                                />
                                {product && product[id].pPrice}
                            </Typography>

                            <Typography variant="body2">
                                <b>Brand</b> : {product && product[id].pBrand}
                            </Typography>
                        </div>

                        <div>
                            <Button
                                className='mt-4 btnDisp'
                                variant='contained'
                            >Proceed to buy</Button>
                        </div>
                    </div>
                    {/* </div> */}
                </CardContent>
            </Card>
        </div>

        // </div>
    )
}

export default Cart