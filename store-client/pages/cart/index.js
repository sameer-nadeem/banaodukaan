import React from 'react' 

import styles from "../../styles/Cart.module.css";
import {ShoppingCart , faTimes} from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
    return (
        <>
            <div className= {styles.Wrapper}>
                <div icon = {ShoppingCart} ></div>
            </div>
           <div className= {styles.cartSideBar}>
               <div className={styles.SideBarHeader}>Shopping Cart</div>
               {/* <div className= {styles.EmptyCart}>EmptyCart</div> */}
               <div className = {styles.Card} >
                    
                    <img className = {styles.CardImage} src = "https://m.media-amazon.com/images/I/51S6IQ2lGwL._AC_UY327_FMwebp_QL65_.jpg"></img>
                    <div className= {styles.CardBody}>
                        <div className= {styles.CardRow}>
                            <div className= {styles.CardTiltle}>
                                Mouse
                            </div>

                            <div className= {styles.CardRemove} icon = {faTimes}> X
                            </div>
                        
                        </div>

                        <div className= {styles.CardRow}>
                            <div className= {styles.CardTiltle}>
                                Total Quantity 1 - $15
                            </div>
                        
                        </div>

                    </div>
               </div>

               
               <div className = {styles.Card} >
                    
                    <img className = {styles.CardImage} src = "https://m.media-amazon.com/images/I/61HEqHMkRhL._AC_UL480_FMwebp_QL65_.jpg"></img>
                    <div className= {styles.CardBody}>
                        <div className= {styles.CardRow}>
                            <div className= {styles.CardTiltle}>
                                Gamin Chair
                            </div>
                            <div className= {styles.CardRemove} icon = {faTimes}> X
                            </div>
                        
                        </div>

                        <div className= {styles.CardRow}>
                            <div className= {styles.CardTiltle}>
                                Total Quantity 1 - $150
                            </div>
                        
                        </div>

                    </div>
               </div>
               <div className= {styles.ClearButton}>Clear Cart</div>
           </div>

        </>
    )
}