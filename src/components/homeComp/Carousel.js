import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Carousel() {
    const navigate = useNavigate()
    return (
        <div className=''>
            <div id="carouselExampleControls" className="carousel slide col-12" data-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://i02.appmifile.com/17_operator_in/22/04/2022/af2f47a2468a0238f1ffd36710ef77b9.jpg"
                            className="d-block w-100" alt="..."
                        />


                    </div>
                    <div className="carousel-item">
                        <img src="https://i02.appmifile.com/592_operator_in/21/04/2022/091024e66d654eb1e0a88f470a7905e1.png"
                            className="d-block w-100" alt="..." />

                    </div>
                    <div className="carousel-item">
                        <img src="https://i02.appmifile.com/987_operator_in/21/04/2022/93a05564d3dd2c2f09d147d85c32571d.jpg"
                            className="d-block w-100" alt="..." />

                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
                <button
                    className='btn btnAlign'
                    
                    onClick={()=>{
                        navigate('/product')
                    }}
                    // style={{ marginTop: '-500px', marginLeft: "25vw", position: 'absolute', color: 'white', padding: '10px', fontSize: '20px' }}
                >Shop Now</button>
            </div>
        </div>
    )
}

export default Carousel