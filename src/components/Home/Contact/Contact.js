import React from "react";
import "./Contact.css";
import contactBackground from "../../../assets/about.jpg";

const Contact = () => {
  return (
    <section id="contact">
      <div className="d-flex flex-column-reverse flex-lg-row">
        {/* About image */}
        <div className="col-lg-6 d-flex align-items-stretch d-none d-lg-block position-relative">
          {/* Dark overlay, zIndex used to position homepage content above the overlay */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
          <img src={contactBackground} alt="About" className="img-fluid w-100 h-100" />
        </div>
        {/* Contact form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center vh-100 contact-form">
          <div className="col-10 col-lg-8">
            <h1 className="text-white text-center pb-5">Get In Touch</h1>
            <form className="d-flex flex-column justify-content-center">
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Name
                </label>
                <input type="text" className="form-control" id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email address
                </label>
                <input type="email" className="form-control" id="email" name="email" placeholder="email@email.co.uk" required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label text-white">
                  Phone (optional)
                </label>
                <input type="tel" className="form-control" id="phone" name="phone" placeholder="+44*********" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label text-white">
                  Message
                </label>
                <textarea className="form-control" id="message" rows="3" name="message" placeholder="Message..." required></textarea>
              </div>
              <button type="submit" className="btn mt-4 px-5 py-2 fw-bold custom-button w-auto mx-auto">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
