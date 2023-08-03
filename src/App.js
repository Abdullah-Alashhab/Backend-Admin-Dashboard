import { useEffect, useState } from "react";
import "./style/app.css";
import Swal from "sweetalert2";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import AddNewProduct from "./components/AddNewProduct";
function App() {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  function deleteRecord(id) {
    Swal.fire({
      text: "Do you want to continue ?",
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        }).then(() => {
          getAllProducts();
        });
      }
    });
  }

  return (
    <div className="App">
      <header>Admin Dashboard</header>
      <div className="container row">
        <div className="col-2">
          <Link to={'/products'}>All Products</Link>
        </div>

        <div className="col-10">
          <Routes>
            <Route
              path=""
              element={
                <>
                  <h1>
                    Welcome to Admin Dashboard Feel free to navigate to each
                    section in left handside
                  </h1>
                </>
              }
            />

            <Route path="products" element={<Outlet />}>
              <Route
                path=""
                element={
                  <>
                    <h1>Our Products</h1>
                    <Link className="btn btn-success" to="add">Add Product</Link>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Operation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => {
                          return (
                            <tr key = {product.id}>
                              <td>{product.id}</td>
                              <td>{product.description.slice(0, 80)}...</td>
                              <td>{product.price} $</td>
                              <td>
                                <button
                                  className="btn btn-danger mr"
                                  onClick={() => deleteRecord(product.id)}
                                >
                                  Delete
                                </button>
                                <button className="btn btn-info mr">
                                  Edit
                                </button>
                                <Link
                                  className="btn btn-primary mr"
                                  to={`${product.id}`}
                                >
                                  Details
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                }
              />
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="add" element={<AddNewProduct reversh = {getAllProducts}/>} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
