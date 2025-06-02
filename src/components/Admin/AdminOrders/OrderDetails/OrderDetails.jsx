import React, { useState, useEffect } from "react";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "../../../../api/order";
import "../../../../App.css";
import noImageAvailable from "../../../../assets/no-image-available.png";
import Error from "../../../Error/Error";

const OrderDetails = () => {
  const { order_id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);

    // If editing and theres an order with a tracking URL, set the tracking URL state to the order's tracking URL
    if (!isEditing && order.order && order.order.trackingUrl) {
      setTrackingUrl(order.order.trackingUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Disable the button to prevent multiple clickss
    setButtonDisabled(true);

    // If the new status is the same as the current status or empty, navigate back to the orders page
    if ((newStatus === order.order.status || newStatus === "") && trackingUrl === order.order.tracking_url) {
      navigate("/admin/orders");
      return;
    }

    // Create a json object with the new status
    const data = {
      status: newStatus,
    };

    // If the new status is "Shipped", add a tracking URL to the data object
    if (newStatus === "Shipped") {
      data.tracking_url = trackingUrl;
    }

    const response = await updateOrderStatus(order_id, data);

    if (response.success) {
      setError("");
      navigate("/admin/orders");
    } else {
      setError(response.message);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrderById(order_id);

      if (response.success) {
        setError("");
        setOrder(response.order);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [order_id]);

  return (
    <section id="order-details" className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="container my-5 col-12 col-xl-6">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold my-4">
            Order Number <span className="text-danger">#{order_id}</span>
          </h2>
          <Link to={"/admin/orders"}>Go back</Link>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" />
          </div>
        ) : order.order ? (
          <>
            {/* Product Details */}
            <div className="card mb-5">
              <div className="card-header">
                <h5 className="fw-bold my-auto">Product Details</h5>
              </div>
              <div className="card-body py-4">
                {order.order_items.map((product, index) => (
                  <Link to={`/shop/product-page/${product.product_id}`} key={index} className="d-flex align-items-center mb-2 p-1 text-decoration-none text-dark order-product">
                    {/* <img src={`https://storage.googleapis.com/${product.product_image ? product.product_image : noImageAvailable}`} alt={product.name} style={{ width: "75px", height: "75px" }} /> */}
                    <img src={product.product_image ? `https://storage.googleapis.com/${product.product_image}` : noImageAvailable} alt={product.name} style={{ width: "75px", height: "75px" }} />
                    <div className="d-flex flex-column ms-3">
                      <span className="fw-bold">{product.name}</span>
                      <span>Price: £{product.price}</span>
                      <span>Quantity: {product.quantity}</span>
                    </div>
                  </Link>
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
                    <span className="fw-bold">Address Name: </span>
                    {order.order.full_name}
                    <br />
                    <span className="fw-bold">Address Line 1: </span>
                    {order.order.address_line_1}
                    <br />
                    {order.order.address_line_2 && (
                      <>
                        <span className="fw-bold">Address Line 2: </span>
                        {order.order.address_line_2}
                        <br />
                      </>
                    )}
                    <span className="fw-bold">City: </span>
                    {order.order.city}
                    <br />
                    <span className="fw-bold">Postcode: </span>
                    {order.order.postcode}
                  </p>
                </div>
              </div>
            </div>
            {/* Customer and order details */}
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="fw-bold my-auto">Customer Details and Order Summary</h5>
              </div>
              <div className="card-body py-4">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <p className="card-text">
                      {/* if customer name and email are not null, display them, otherwise display "Customer account deleted" */}
                      {order.customer_name && order.order.customer_email ? (
                        <>
                          <span className="fw-bold">Customer Name: </span>
                          {order.customer_name}
                          <br />
                          <span className="fw-bold">Customer Email: </span>
                          {order.order.customer_email}
                          <br />
                        </>
                      ) : (
                        <>
                          <span className="fw-bold">Customer Name: </span>
                          <span className="text-danger">Customer account deleted</span>
                          <br />
                          <span className="fw-bold">Customer Order Email: </span>
                          {order.order.customer_email}
                          <br />
                        </>
                      )}
                      <span className="fw-bold">Order Date: </span>
                      {order.order.order_date}
                      <br />
                      <span className="fw-bold">Total Price: </span>£{order.order.total_price}
                      <br />
                      <span className="fw-bold">Status: </span>
                      {isEditing ? (
                        <>
                          <select className="form-select mb-3" value={newStatus || order.order.status} onChange={handleStatusChange}>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <span className="text-danger">Warning: </span> Changing the status to 'Shipped' will send an email to the customer.
                          {newStatus === "Shipped" && (
                            <div className="mt-2">
                              <label htmlFor="trackingUrl" className="form-label">
                                Tracking URL:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="trackingUrl"
                                placeholder="Enter tracking URL"
                                value={trackingUrl}
                                required={newStatus === "Shipped"}
                                onChange={(e) => setTrackingUrl(e.target.value)}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        newStatus || order.order.status
                      )}
                      {/* Display tracking URL if one is in the order */}
                      {order.order.tracking_url && (
                        <>
                          <br />
                          <span className="fw-bold">Tracking URL: </span>
                          {order.order.tracking_url}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <button type="button" className="btn btn-dark mt-4 px-5 py-2 rounded-0 fw-bold w-auto" onClick={() => handleEdit()}>
                  {isEditing ? "Done" : "Edit"}
                </button>
              </div>
            </div>

            {/* Save changes button */}
            <button type="submit" className="btn btn-dark mt-2 px-5 py-2 rounded-0 fw-bold" onClick={handleSubmit} disabled={buttonDisabled}>
              Save Changes
            </button>

            {/* Error message */}
            {error && <Error message={error} setError={setError} />}
          </>
        ) : (
          <Error message="Order not found" setError={setError} />
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
