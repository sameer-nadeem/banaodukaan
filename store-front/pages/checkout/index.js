import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import CheckoutForm from "../../components/Forms/CheckoutForm";

export default function Checkout(){
    return (
        <div>
            <div class="breadcumb_area bg-img" style= {{backgroundImage: "url(img/bg-img/breadcumb.jpg);"}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="page-title text-center">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutForm />
        </div>
    )
};