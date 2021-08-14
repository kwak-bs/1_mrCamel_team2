import React, { Component } from "react";
import { style } from "./ProductStyle";
import { Link } from "react-router-dom";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      recentItems: JSON.parse(localStorage.getItem("recentItems")),
    };
  }

  AddProduct = (recentItems, ClickProd) => {
    recentItems.push(ClickProd);
    const stringProds = JSON.stringify(recentItems);
    localStorage.setItem("recentItems", stringProds);
  };

  HandleProduct = (ClickProd) => {
    let recentItems = this.state.recentItems;

    if (recentItems === null) {
      recentItems = [];
      this.AddProduct(recentItems, ClickProd);
    } else {
      const filterItems = recentItems.filter(
        (el) => JSON.stringify(el) !== JSON.stringify(ClickProd)
      );
      this.AddProduct(filterItems, ClickProd);
    }
  };

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
          onClick={() => this.HandleProduct(ClickProd)}
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
