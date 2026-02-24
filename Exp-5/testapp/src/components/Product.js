import { useState, useEffect } from "react";
import { fetchProduct } from "../api/productApi";

function Product(){
    const [productData,setproductData]  = useState({});
    useEffect(()=>{
    
        fetchProduct().then((res)=>{
            setproductData(res);
        })
    
    });
    return(

        <div>
            <h1> {productData?.name} </h1>
            <h1> {productData?.price} </h1>
        </div>
    )

}

export default Product;