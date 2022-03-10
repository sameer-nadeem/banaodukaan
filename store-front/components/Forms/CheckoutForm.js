import CheckoutDetails from "./CheckoutDetails";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const CheckoutForm = () => {
    const user = useSelector((state) => state.auth.user);
    const [showError, setShowError] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [terms, setTerms] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [postalCode, setPostalCode] = useState(0);
    const [buttonClicked, setButtonClicked] = useState(false);
    useEffect(() => {
        setShowError(false);
        user !== null ? setFullName(user.userId.firstName) : null
        user !== null ? setEmail(user.email) : null
        user !== null ? setAddress(user.address) : null
    }, [user]);

    const onChangeCity = (city) => {
        setCity(city);
    }
    const onChangePhoneNumber = (phoneNum) => {
        setPhoneNumber(phoneNum);
    }
    const onChangePostalCode = (postCode) => {
        setPostalCode(postCode);
    }
    const onChangeTerms = (t) => {
        setTerms(t);
    }
    const onchangeAddress = (addr) => {
        setAddress(addr)
    }

    const handleClick = () => {
        if(city === "" || address === "" || phoneNumber === 0 || terms === false || fullName === "" || email === "" || postalcode === ""){
            console.log("Show error")
            return
        }
        // add code here 
    }
  return (
    <div>
      <div class="checkout_area section-padding-80">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="checkout_details_area mt-50 clearfix">
                <div class="cart-page-heading mb-30">
                  <h5>Billing Address</h5>
                </div>

                <form action="#" method="post">
                  <div class="row">
                    <div class="col-12 mb-3">
                      <label for="first_name">
                        Full Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="first_name"
                        value={fullName}
                        disabled = {user !== null ? true : false}
                        required
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="street_address">
                        Address <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control mb-3"
                        id="street_address"
                        value= {address}
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="postcode">
                        Postcode <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="postcode"
                        value=""
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="city">
                        Town/City <span>*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        value=""
                      />
                    </div>
                    <div class="col-12 mb-3">
                      <label for="phone_number">
                        Phone No <span>*</span>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="phone_number"
                        min="0"
                        value=""
                      />
                    </div>
                    <div class="col-12 mb-4">
                      <label for="email_address">
                        Email Address <span>*</span>
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email_address"
                        value= {email}
                        disabled = {user !== null ? true : false}
                      />
                    </div>

                    <div class="col-12">
                      <div class="custom-control custom-checkbox d-block mb-2">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                          value = {terms}
                        />
                        <label class="custom-control-label" for="customCheck1">
                          Terms and conditions
                        </label>
                      </div>
                      <div class="custom-control custom-checkbox d-block mb-2">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck2"
                          disabled = {user !== null ? true : false}
                        />
                        <label class="custom-control-label" for="customCheck2">
                          Create an account
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <CheckoutDetails buttonClick = {handleClick} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
