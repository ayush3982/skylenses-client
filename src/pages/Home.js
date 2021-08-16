import React, {useEffect, useState} from 'react'
import { getProducts} from "../functions/product";
import ProductCard from '../components/cards/ProductCard';
import { Carousel } from 'react-bootstrap';
import "../styles/homepage.css"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading ] = useState(false)

  const loadAllProducts = () => {
    setLoading(true);
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  useEffect(() => {
    loadAllProducts();
  }, [])

  const carousel = () => (   
    <div className="carousel-container">
          <Carousel fade={false} pause={false} indicators={false} controls={false}>
          <Carousel.Item interval={5000} >     
              <img
                src= "https://res.cloudinary.com/skylenses/image/upload/v1629068672/069A8846_1_kz8q6k.png"
                alt="First slide"
              />
            </Carousel.Item>
          <Carousel.Item interval={5000} >     
              <img
                src= "https://res.cloudinary.com/skylenses/image/upload/v1629068393/069A9679_1_bt4vu6.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={5000} >     
              <img
                src= "https://res.cloudinary.com/skylenses/image/upload/v1629067985/img6_iawrm4.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img
                src= "https://res.cloudinary.com/skylenses/image/upload/v1629067985/img7_onv44m.jpg"   
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img
                src= "https://res.cloudinary.com/skylenses/image/upload/v1629067984/img5_wg36ss.jpg"   
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
    </div>
  )

  // return (
  //   <div className="container-fluid">
  //     <div className="container">
  //       <div className="row">
  //         <br />
  //         <br />
  //         <br />
  //         {products.map((product) => (
  //           <div key = {product._id} className="col-md-4">
  //             <ProductCard product={product} />
  //           </div>
  //         ))}
  //       </div>
  //     </div> 
  //   </div>
  // );

    return (
      <div className="home">
        {carousel()}
        <div className="category-container">
          <div className="category-heading">
            C A T E G O R I E S
          </div>
          <div className="category-cards-container row">
            <div className="col-md- 3 card-box">
              <div className="image-heading">
                6  M O N T H S
              </div>
              <img className = "category-image" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
            </div>
            <div className="col-md- 3 card-box">
            <div className="image-heading">
                6  M O N T H S
              </div>
              <img className = "category-image" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
            </div>
            <div className="col-md- 3 card-box">
              <div className="image-heading">
                6  M O N T H S
              </div>
              <img className = "category-image" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
            </div>
            <div className="col-md- 3 card-box">
              <div className="image-heading">
                1  D A Y
              </div>
              <img className = "category-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629069718/1_ylnlps.png" />
            </div>
          </div>
        </div>
        <div className="solution-container">
          <div className="solution-box row">
            <div className="col-md-5 small-box">

            </div>
            <div className="col-md-5 small-box">
              
            </div>
          </div>
        </div>
        <div className="app-container">
          <div className="app-box">

          </div>
        </div>
        <div className="app-container">
          <div className="use-box">
            
          </div>
        </div>
        <div className="footer-container">
          <div className="footer-box row">
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/jjUpM.png"/>
                </div>
                  <div className="app-heading margin-top">
                    Marketed By
                  </div>
                  <p className = "branding-text">VYOMAN CLAIRE PVT LTD.</p>
                  <p className = "branding-text">GSTIN: 07AAHCV4657N1ZM</p>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-heading">Get Our App</div>
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j57rF.png"/>
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j5sV6.png"/>
                </div>
              </div>
            </div>
            <div className="footer-section col-md- 3">

            </div>
            <div className="footer-section col-md- 3">

            </div>
            <p className = "copyright">© skycosmeticlenses.com All Right Reserved. {window.location.href}</p>
          </div>
        </div>
      </div>
    )
  
};

export default Home;
