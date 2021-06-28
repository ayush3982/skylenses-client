import React, {useEffect, useState} from 'react'
import { getProducts} from "../functions/product";
import ProductCard from '../components/cards/ProductCard';

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

  useEffect(() => {
    loadAllProducts();
  }, [])

  return (
    <>
      <div className="jumbotron">
        {loading ? (<h1 className="text-danger h1">Loading...</h1>) : (<h1>All Products</h1>)}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key = {product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
