import React from "react";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import "./AdminProducts.css";

const AdminProducts = () => {
  const sampleProducts = [
    { id: 1, name: "Product 1", price: "12.59", stock: 10 },
    { id: 2, name: "Product 2", price: "12.59", stock: 10 },
    { id: 3, name: "Product 3", price: "12.59", stock: 10 },
    { id: 4, name: "Product 4", price: "12.59", stock: 10 },
  ];

  return (
    <section id="admin-products" className="d-flex min-vh-100">
      <AdminSidebar />
      <div className="container my-5 py-5">
        <div className="d-flex justify-content-between">
          <h2 className="fw-bold mt-4">Products</h2>

          <button className="btn btn-dark px-4 rounded-0 fw-bold my-auto">New Product</button>
        </div>

        <div className="d-flex mt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="w-10">
                  #
                </th>
                <th scope="col" className="w-25">
                  Name
                </th>

                <th scope="col" className="w-15">
                  Price
                </th>

                <th scope="col" className="w-15">
                  Stock
                </th>

                <th scope="col" className="w-35 text-end actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleProducts.map((product, index) => (
                <tr key={index}>
                  <th scope="row" className="w-10">
                    {product.id}
                  </th>
                  <td className="w-25">{product.name}</td>
                  <td className="w-15">{product.price}</td>
                  <td className="w-15">{product.stock}</td>
                  <td className="w-35 text-end">
                    <button className="btn btn-dark rounded-0 btn-sm me-2">Details</button>
                    <button className="btn btn-danger rounded-0 btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
