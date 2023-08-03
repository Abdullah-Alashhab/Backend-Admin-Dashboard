import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewProduct(props) {
  let [description, setDescription] = useState();
  let [price, setPrice] = useState();
  let nav = useNavigate();

  function add() {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        description,
        price,
      }),
    }).then(()=>{
      nav('/products');
      props.reversh();
    });

  }

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Product Description
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Product Price
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            add();
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default AddNewProduct;
