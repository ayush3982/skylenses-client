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
                src= "https://i.im.ge/2021/08/08/0DS68.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img
                src= "https://i.im.ge/2021/08/08/0DtIT.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <img
                src= "https://i.im.ge/2021/08/08/0D3fa.jpg"   
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
        <div className="categories">
          <div className="categories-heading">
            Categories
          </div>
          <div className="categories-card-container">
            <div className = "category-box">
              <div className = "category-image">
                <img className="category-photo" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
              </div>
              <button className = "category-button">
                6 Months
              </button>
            </div>
            <div className = "category-box">
              <div className = "category-image">
                <img className="category-photo" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
              </div>
              <button className = "category-button">
                6 Months
              </button>
            </div>
            <div className = "category-box">
              <div className = "category-image">
                <img className="category-photo" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
              </div>
              <button className = "category-button">
                6 Months
              </button>
            </div>
            <div className = "category-box">
              <div className = "category-image">
                <img className="category-photo" src = "https://i.im.ge/2021/08/08/0i4v6.png" />
              </div>
              <button className = "category-button">
                6 Months
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  
};

export default Home;
