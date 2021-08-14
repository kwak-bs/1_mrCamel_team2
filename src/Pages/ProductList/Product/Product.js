import React, { Component } from "react";
import { style } from "./ProductStyle";
import { Link } from "react-router-dom";
import { HandleProduct } from "../utils/HandleProduct";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      recentItems: JSON.parse(localStorage.getItem("recentItems")),
    };
  }

  render() {
    const { id, title, brand, price } = this.props;
    const ClickProd = {
      title,
      brand,
      price,
    };
    return (
      <>
        <Link
          to={{
            pathname: `/product/${id}`,
            state: {
              title,
              brand,
              price,
            },
          }}
          onClick={() => HandleProduct(ClickProd)}
        >
          <ProductBox>
            <img
              src={`https://picsum.photos/${id}`}
              alt="product"
              aria-label={brand + "image"}
            />
            <ProductContentWrap>
              <ProductContentItem>
                <span>{title}</span>
              </ProductContentItem>
              <ProductContentItem>
                <span className="brandName">{brand}</span>
              </ProductContentItem>
              <ProductContentItem>
                <span>{`${price.toLocaleString()} 원`}</span>
              </ProductContentItem>
            </ProductContentWrap>
          </ProductBox>
        </Link>
      </>
    );
  }
}

export default Product;

const { ProductBox, ProductContentWrap, ProductContentItem } = style;
