import React, { useEffect } from "react";
import Order from "./Order/Order";

const Orders = () => {
  useEffect(() => {
    // Scroll to the top of the page when the componenet mounts
    window.scrollTo(0, 0);
  });

  // Sample products
  const sampleProducts = [{ name: "Product 1", quantity: "2", image: "https://loremflickr.com/100/100" }];

  const sampleProductsLarge = [
    { name: "Product 1", quantity: "2", image: "https://loremflickr.com/100/100" },
    { name: "Product 2", quantity: "3", image: "https://loremflickr.com/100/100" },
    { name: "Product 3", quantity: "1", image: "https://loremflickr.com/100/100" },
    { name: "Product 3", quantity: "1", image: "https://loremflickr.com/100/100" },
    { name: "Product 3", quantity: "1", image: "https://loremflickr.com/100/100" },
  ];

  const sampleAddress = {
    addressLine1: "123 Fake Street",
    addressLine2: "Fake Town",
    city: "Fake City",
    postcode: "FA1 2KE",
  };

  const sampleOrders = [
    { orderDate: "02/07/2024", totalPrice: "£29.99", status: "Delivered", products: sampleProducts, address: sampleAddress, payment: "Card ending in 1234" },
    { orderDate: "02/07/2024", totalPrice: "£29.99", status: "Delivered", products: sampleProductsLarge, address: sampleAddress, payment: "Card ending in 1234" },
    { orderDate: "02/07/2024", totalPrice: "£99.99", status: "Dispatched", products: sampleProducts, address: sampleAddress, payment: "Card ending in 1234" },
    { orderDate: "15/07/2024", totalPrice: "£100.99", status: "Delivered", products: sampleProductsLarge, address: sampleAddress, payment: "Card ending in 1234" },
    { orderDate: "02/07/2024", totalPrice: "£29.99", status: "In Progress", products: sampleProducts, address: sampleAddress, payment: "Card ending in 1234" },
    { orderDate: "02/07/2024", totalPrice: "£29.99", status: "Delivered", products: sampleProducts, address: sampleAddress, payment: "Card ending in 1234" },
  ];

  return (
    <section id="orders">
      <div className="container min-vh-100 my-5 p-5">
        <h2 className="fw-bold mb-0">My Orders</h2>

        <div className="row mt-5">
          {sampleOrders.map((order, index) => (
            <Order key={index} orderDate={order.orderDate} totalPrice={order.totalPrice} status={order.status} products={order.products} address={order.address} payment={order.payment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Orders;
