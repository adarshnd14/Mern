import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()
  return (
    <div>
    <img src='https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-13617.jpg?t=st=1650859241~exp=1650859841~hmac=e89735346dbf309152b0d2b8458678173086bbb4628b54f43df5c8c739a60e2a&w=900'
      alt='404 error'
      height={'450px'}
      style={{marginTop:'10px'}}
      onClick={()=>{navigate('/')}}
    />
    </div>
  )
}

export default Error