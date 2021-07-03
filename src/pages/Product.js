import { Loading3QuartersOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react'
import {getProduct, productStar, productComment, getRelated} from "../functions/product"
import SingleProduct from "../components/cards/SingleProduct"
import {useSelector} from 'react-redux'
import ProductCard from "../components/cards/ProductCard";



const Product = ({match}) => {
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState('')
    const {slug} = match.params;

    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadSingleProduct()
        console.log(product)
    }, [slug])

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

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
          setProduct(res.data);
          // load related
          getRelated(res.data._id).then((res) => setRelated(res.data));
        });
      };

    return (
        <div className ="container-fluid">
            {JSON.stringify(product.ratings)}
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
        </div>
    )
}

export default Product