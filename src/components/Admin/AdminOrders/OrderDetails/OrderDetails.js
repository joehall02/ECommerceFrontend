import React from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const sampleOrder = {
    orderNumber: "123456",
    orderDate: "2021-09-01",
    totalPrice: "100",
    status: "Processing",
    customer: {
      customerName: "John Doe",
      customerEmail: "johndoe@gmail.com",
    },
    products: [
      {
        productName: "Product 1",
        productPrice: "50",
        productQuantity: "2",
        productImage: "https://loremflickr.com/100/100",
      },
      {
        productName: "Product 2",
        productPrice: "50",
        productQuantity: "2",
        productImage: "https://loremflickr.com/100/100",
      },
      {
        productName: "Product 2",
        productPrice: "50",
        productQuantity: "2",
        productImage: "https://loremflickr.com/100/100",
      },
    ],
    address: {
      addressLine1: "123 Main Street",
      addressLine2: "Apt 1",
      city: "New York",
      postcode: "G16 8TY",
      addressName: "John",
    },
  };

  return (
    <section id="order-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 py-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">
            Order Number <span className="text-danger">#{sampleOrder.orderNumber}</span>
          </h2>
          <Link to={"/admin/orders"}>Go back</Link>
        </div>

        {/* Product Details */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="fw-bold my-auto">Product Details</h5>
          </div>
          <div className="card-body py-4">
            {sampleOrder.products.map((product, index) => (
              <div key={index} className="d-flex align-items-center mb-2 p-1 text-decoration-none text-dark order-product">
                <img src={product.productImage} alt={product.productName} />
                <div className="d-flex flex-column ms-3">
                  <span className="fw-bold">{product.productName}</span>
                  <span>Price: £{product.productPrice}</span>
                  <span>Quantity: {product.productQuantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Details */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="fw-bold my-auto">Address Details</h5>
          </div>
          <div className="card-body py-4">
            <div className="d-flex flex-column">
              <p className="card-text">
                <span className="fw-bold">Customer Name: </span>
                {sampleOrder.address.addressName}
                <br />
                <span className="fw-bold">Address Line 1: </span>
                {sampleOrder.address.addressLine1}
                <br />
                <span className="fw-bold">Address Line 2: </span>
                {sampleOrder.address.addressLine2}
                <br />
                <span className="fw-bold">City: </span>
                {sampleOrder.address.city}
                <br />
                <span className="fw-bold">Postcode: </span>
                {sampleOrder.address.postcode}
              </p>
            </div>
          </div>
        </div>

        {/* Customer and order details */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="fw-bold my-auto">Customer Details and Order Summary</h5>
          </div>
          <div className="card-body py-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <p className="card-text">
                  <span className="fw-bold">Customer Name: </span>
                  {sampleOrder.customer.customerName}
                  <br />
                  <span className="fw-bold">Customer Email: </span>
                  {sampleOrder.customer.customerEmail}
                  <br />
                  <span className="fw-bold">Order Date: </span>
                  {sampleOrder.orderDate}
                  <br />
                  <span className="fw-bold">Total Price: </span>£{sampleOrder.totalPrice}
                  <br />
                  <span className="fw-bold">Status: </span>
                  {sampleOrder.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
