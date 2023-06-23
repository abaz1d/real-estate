import React, { Component } from "react"
// import { Link } from 'react-router-dom';
// import parse from 'html-react-parser';

class ContactForm extends Component {
  componentDidMount() {
    // Get the form.
    var form = document.querySelector("#contact-form")

    // Get the messages div.
    var formMessages = document.querySelector(".form-messege")

    // Set up an event listener for the contact form.
    form.addEventListener("submit", function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault()

      // Serialize the form data.
      var formData = new FormData(form)

      // Submit the form using AJAX.
      var xhr = new XMLHttpRequest()
      xhr.open("POST", form.getAttribute("action"))
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Make sure that the formMessages div has the 'success' class.
          formMessages.classList.remove("error")
          formMessages.classList.add("success")

          // Set the message text.
          formMessages.textContent = xhr.responseText

          // Clear the form.
          var inputs = form.querySelectorAll("input, textarea")
          inputs.forEach(function (input) {
            input.value = ""
          })
        } else {
          // Make sure that the formMessages div has the 'error' class.
          formMessages.classList.remove("success")
          formMessages.classList.add("error")

          // Set the message text.
          if (xhr.responseText !== "") {
            formMessages.textContent = xhr.responseText
          } else {
            formMessages.textContent =
              "Oops! An error occurred and your message could not be sent."
          }
        }
      }
      xhr.send(formData)
    })
  }

  render() {
    return (
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Get A Quote</h4>
                <form id="contact-form" action={"mail.php"} method="post">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <select className="nice-select" name="service">
                          <option>Select Service Type</option>
                          <option>Property Management </option>
                          <option>Mortgage Service </option>
                          <option>Consulting Service</option>
                          <option>Home Buying</option>
                          <option>Home Selling</option>
                          <option>Escrow Services</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea
                      name="message"
                      placeholder="Enter message"
                      defaultValue={""}
                    />
                  </div>
                  <p>
                    <label className="input-info-save mb-0">
                      <input type="checkbox" name="agree" /> Save my name,
                      email, and website in this browser for the next time I
                      comment.
                    </label>
                  </p>
                  <div className="btn-wrapper mt-0">
                    <button
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                      type="submit"
                      aria-label="submit-button"
                    >
                      get a free service
                    </button>
                  </div>
                  <p className="form-messege mb-0 mt-20" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactForm
