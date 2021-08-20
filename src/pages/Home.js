import React, {useEffect, useState} from 'react'
import { getProducts} from "../functions/product";
import ProductCard from '../components/cards/ProductCard';
import { Carousel } from 'react-bootstrap';
import "../styles/homepage.css"
import axios from "axios";

const Home = ({history}) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [carouselData, setCarouselData] = useState([]);

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

  const solution = () => {
    history.push('/product/sky-solution')
  }

  const howToUse = () => {
    history.push('/howtouse')
  }

  const loadCarousel = async () => {
    const res = await axios.get('https://skycosmeticlenses.com/api/carousel/get/data')
    setCarouselData(res.data)
  }

  const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  useEffect(() => {
    loadAllProducts();
    loadCarousel()
  }, [])

  const carousel = () => (   
    <div className="carousel-container">
          <Carousel fade={false} pause={false} indicators={false} controls={false}>
            {carouselData.map((c) => (
              <Carousel.Item interval={5000} >     
                <img
                  src= {c.image}
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          {/* <Carousel.Item interval={5000} >     
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
            </Carousel.Item> */}
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
            S K Y &nbsp; C O L L E C T  I O N
          </div>
          <div className="category-cards-container row">
            <a style = {{color: 'black'}} href = "/category/6-months">
            <div className="col-md- 3 card-box months-6">
              <div className="image-heading">
                P R E M I U M
              </div>
              <div className="sub-heading">
                6 &nbsp; M O N T H S &nbsp; L E N S E S
              </div>
              <img className = "category-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629471098/069A7931_3_hl9mdz.png" />
            </div>
            </a>
            <a style = {{color: 'black'}} href = "/category/3-months">
            <div className="col-md- 3 card-box months-3">
            <div className="image-heading">
                  G L O B E
              </div>
              <div className="sub-heading">
                3 &nbsp; M O N T H S &nbsp; L E N S E S
              </div>
              <img className = "category-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629468484/3_months_isywod.png" />
            </div>
            </a>
            <a style = {{color: 'black'}} href = "/category/1-month">
            <div className="col-md- 3 card-box month-1">
            <div className="image-heading">
                C L A S S I C
              </div>
              <div className="sub-heading">
                1 &nbsp; M O N T H  &nbsp; L E N S E S
              </div>
              <img className = "category-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629472580/069A9000_copy_jes0to.png" />
            </div>
            </a>
            <a style = {{color: 'black'}} href = "/category/1-day">
            <div className="col-md- 3 card-box day-1">
            <div className="image-heading">
                B A S I C 
              </div>
              <div className="sub-heading">
                1 &nbsp; D A Y &nbsp; L E N S E S
              </div>
              <img className = "category-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629473151/069A9460_copy_kjcuxi.png" />
            </div>
            </a>
            <a style = {{color: 'black'}} href = "/product/sky-solution">
            <div className="col-md- 3 card-box solution-color ">
              <div className="image-heading">
                S K Y &nbsp; S O L U T I O N
              </div>
              <img className = "category-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629290470/1629290468511.png" />
            </div>
            </a>
          </div>
        </div>
        {/* <div className="solution-container">
          <div className="solution-box row">
            <div className="col-md-5 small-box">
              <img className="solution-image" src = "https://res.cloudinary.com/skylenses/image/upload/v1629290470/1629290468511.png"/>
            </div>
            <div className="col-md-5 small-box">
              <h4>I N D T R O D U C I N G</h4>
              <h3>S K Y &nbsp;&nbsp;  S O L U T I O N</h3>
              <h5 className="solution-body">60 ml Solution for contact lenses, specially formalized for both colored and non colored lenses</h5>
              <h3 className="solution-money">J U S T &nbsp; I N &nbsp; ₹ 99/-</h3>
              <button onClick={solution}  className="solution-button">EXPLORE</button>
            </div>
          </div>
        </div> */}
        <div className="app-container">
          <div className="app-box">
              <h4 className="mt-5">New at using contact lenses? Here's a little heads up</h4>
              <button onClick={howToUse} className="use-button">How to use</button>
          </div>
        </div>
        {/* <div className="app-container">
          <div className="use-box">
            
          </div>
        </div> */}
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
              <div className="get-app-container">
              <div className="app-heading">Shop Our Range</div>
                <a href = "/category/6-months" style = {{color: 'white'}}><p className = "branding-text mt-2">6 &nbsp; Months</p></a>
                <a href = "/category/3-months" style = {{color: 'white'}}><p className = "branding-text mt-2">3 &nbsp; Months</p></a>
                <a href = "/category/1-month" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Month</p></a>
                <a href = "/category/1-day" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Day</p></a>
              </div>
            </div>
            <div className="footer-section col-md- 3">
            <div className="get-app-container">
              <div className="app-heading">Our Policies</div>
                <a href = "/privacypolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Privacy and Policy</p></a>
                <a href = "/returnpolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Return Policy</p></a>
                <a href = "/tandc" style = {{color: 'white'}}><p className = "branding-text mt-2">Terms & Conditions</p></a>
              </div>
            </div>
            <p className = "copyright">© skycosmeticlenses.com All Rights Reserved.</p>
          </div>
        </div>
      </div>
    )
  
};

export default Home;
