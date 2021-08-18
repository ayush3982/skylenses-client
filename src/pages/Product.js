import { Loading3QuartersOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react'
import {getProduct, productStar, productComment, getRelated} from "../functions/product"
import SingleProduct from "../components/cards/SingleProduct"
import {useSelector} from 'react-redux'
import ProductCard from "../components/cards/ProductCard";
import { Button } from "antd";
import '../styles/product.css';

const Product = ({match, history}) => {
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState({})
    const [star, setStar] = useState(0)
    const [comment, setComment] = useState('')
    const [allowComment, setAllowComment] = useState(false)
    const [related, setRelated] = useState('')
    const {slug} = match.params;

    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadSingleProduct()
        console.log(product)
    }, [slug])

    useEffect(() => {
        if(user && user.token) {
            setAllowComment(true);
        }
    })

    useEffect(() => {
        if (product.ratings && user) {
          let existingRatingObject = product.ratings.find(
            (ele) => ele.postedBy.toString() === user._id.toString()
          );
          existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    });


    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => { 
          console.log("rating clicked", res.data);
          loadSingleProduct(); // if you want to show updated rating in real time
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        productComment(product._id, comment, user.token).then((res) => {
            console.log("comment posted", res.data);
            loadSingleProduct(); // if you want to show updated
            setComment('')
        })
    }

    const handleRedirect = () => {
        history.push({
            pathname: "/login",
            state: { from: `/product/${slug}` },
        });
    }

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
          setProduct(res.data);
          setCategory(res.data.category);
          // load related
          getRelated(res.data._id).then((res) => setRelated(res.data));
        });
    };

    let backgroundStyles = {
        background: `linear-gradient(to top, ${product.hexCodeDark}, ${product.hexCodeLight})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <div>
            <div className ="container-fluid" style={backgroundStyles}>
            <div className = "row pt-4"> 
                <SingleProduct product={product} onStarClick={onStarClick} star = {star} />   
            </div>

            {/* <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
            <div className="row pb-5">
                {related.length ? (
                    related.map((r) => (
                        <div key={r._id} className="col-md-4">
                        <ProductCard product={r} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col">No Products Found</div>
                )}
            </div>
            <div className="row p-5">
                <div className="col-md-6">
                <div> <h3>Comments</h3></div> <br />
                {allowComment ? (
                    <form onSubmit={handleCommentSubmit} className="pt-5">
                    <div className="form-group">
                        <textarea
                        type="text"
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your comment"
                        />
                    </div>
                    <Button
                        onClick={handleCommentSubmit}
                        type="primary"
                        className="mb-3"
                        block
                        shape="round"
                        disabled={!comment || comment.length < 5}
                    >
                        Post
                    </Button>
                </form>
                ) : (
                    <div className="btn btn-primary" onClick={handleRedirect}>Please log in to comment</div>
                )}
                </div>
            </div> */}
            
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
}

export default Product