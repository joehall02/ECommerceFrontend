import React, { useState } from "react";
import "./Contact.css";
import contactBackground from "../../../assets/about.jpg";
import { sendContactEmail } from "../../../api/user";
import Error from "../../Error/Error";
import Success from "../../Success/Success";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const charNameCount = formData.from_name.length;
  const charEmailCount = formData.from_email.length;
  const charSubjectCount = formData.subject.length;
  const charMessageCount = formData.message.length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonDisabled(true);

    const contactData = { ...formData };

    const response = await sendContactEmail(contactData);

    if (response.success) {
      setError("");
      setSuccess(response.response.message);
      setButtonDisabled(false);
    } else {
      setSuccess("");
      setError(response.message);
      setButtonDisabled(false);
    }

    setFormData({
      from_name: "",
      from_email: "",
      subject: "",
      message: "",
    });
  };

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
            <form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="from_name" className="form-label text-white mb-0">
                    Name
                  </label>
                  <small className="text-white">{charNameCount}/100</small>
                </div>
                <input type="text" className="form-control" id="from_name" name="from_name" placeholder="John Doe" value={formData.from_name} onChange={handleChange} maxLength={100} required />
              </div>

              {/* Email */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="from_email" className="form-label text-white mb-0">
                    Email address
                  </label>
                  <small className="text-white">{charEmailCount}/100</small>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="from_email"
                  name="from_email"
                  placeholder="email@email.co.uk"
                  value={formData.from_email}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="subject" className="form-label text-white mb-0">
                    Subject
                  </label>

                  <small className="text-white">{charSubjectCount}/100</small>
                </div>
                <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} maxLength={100} required />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="phone" className="form-label text-white">
                  Phone (optional)
                </label>
                <input type="tel" className="form-control" id="phone" name="phone" placeholder="+44*********" />
              </div> */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="message" className="form-label text-white mb-0">
                    Message
                  </label>

                  <small className="text-white">{charMessageCount}/500</small>
                </div>
                <textarea className="form-control" id="message" rows="5" name="message" placeholder="Message..." value={formData.message} onChange={handleChange} maxLength={500} required></textarea>
              </div>

              {/* Error Message */}
              {error && <Error message={error} setError={setError} />}

              {/* Success Message */}
              {success && <Success message={success} setMessage={setSuccess} />}

              <button type="submit" className="btn mt-4 px-5 py-2 fw-bold custom-button w-auto mx-auto" disabled={buttonDisabled}>
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
