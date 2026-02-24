import {render,screen} from "@testing-library/react";
import Product from "../components/Product";
import * as api from "../api/productApi";

jest.mock("../api/productApi");

test("render product",async()=>{
    api.fetchProduct.mockResolvedValue(({
        id:1,
        name:"laptop",
        price:500,
    }))


    render (<Product/>);

    const productName = await screen.findByText("laptop");
    const productPrice = await screen.findByText("500");

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();


})