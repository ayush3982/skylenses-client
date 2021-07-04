import { Loading3QuartersOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react'
import {getProduct, productStar, productComment, getRelated} from "../functions/product"
import SingleProduct from "../components/cards/SingleProduct"
import {useSelector} from 'react-redux'
import ProductCard from "../components/cards/ProductCard";
import { Button } from "antd";



const Product = ({match, history}) => {
    const [product, setProduct] = useState({})
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
          // load related
          getRelated(res.data._id).then((res) => setRelated(res.data));
        });
      };

    return (
        <div className ="container-fluid">
            {JSON.stringify(product)}
            <div className = "row pt-4">
                <SingleProduct product={product} onStarClick={onStarClick} star = {star} />
            </div>

            <div className="row">
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
                        autoFocus
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

            </div>
        </div>
    )
}

export default Product