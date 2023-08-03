import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  let { productId } = useParams();
  let [productDetails, setProductDetails] = useState();

  console.log(productId);
  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  }, []);

  return (
    <>
      {productDetails && (
        <>
          <h1>{productDetails.title}</h1>
          <p>{productDetails.description}</p>
          <p>{productDetails.price} $</p>
        </>
      )}
    </>
  );
}

export default ProductDetails;
