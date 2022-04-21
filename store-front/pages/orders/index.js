import OrderCards from "../../components/shop/OrderCards";

export default function Orders(){
    return (
        <div>
            <div class="breadcumb_area bg-img" style= {{backgroundImage: "url(img/bg-img/breadcumb.jpg);"}}>
                <div class="container h-100">
                    <div class="row h-100 align-items-center">
                        <div class="col-12">
                            <div class="page-title text-center">
                                <h2>Orders</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* component comes here */}
            <OrderCards />
        </div>
    )
};