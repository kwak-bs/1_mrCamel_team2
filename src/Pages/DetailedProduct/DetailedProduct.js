import React, { Component } from "react";
import mockData from "Utils/mockData.json";
import { style } from "./DetailedProductStyle";

class DetailedProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dislikeItems: JSON.parse(localStorage.getItem(`dislikeItems`)),
      recentItems: JSON.parse(localStorage.getItem("recentItems")),
      ItemList: [],
      location: this.props.location,
      history: this.props.history,
      RandomId: -1,
      RandomTitle: "",
      RandomBrand: "",
      RandomPrice: 0,
    };
  }

  componentDidMount() {
    const { location, history } = this.state;

    // 클릭해서 들어온 것이 아니면 home으로 return
    if (location.state === undefined) {
      history.push("/");
      return;
    }

    // 랜덤 로드용 fetch()
    this.setState({
      ItemList: mockData,
    });
  }

  randomLoad =  (currentItem, clicked) => {
    const { ItemList, history, dislikeItems } = this.state;
    let RandomNumber = -1;

    let dislikeTitle = "";
    let dislikeTitleList = [];

    if (dislikeItems) {
      for (dislikeTitle of dislikeItems) {
        dislikeTitleList.push(dislikeTitle.title);
      }
    }

    // 차집합 : 전체 데이터 - 관심 없는 데이터
    let likeList = ItemList.filter(
      (el) => !dislikeTitleList.includes(el.title)
    );

    // 차집합 : likeList - 현재 선택된 데이터
    // 즉, 랜덤 로드시 관심 없는 상품과 현재 상품을 제외하고 랜덤 로드
    likeList = likeList.filter((el) => currentItem.title !== el.title);

    // 랜덤번호 생성
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min));
    RandomNumber = getRandom(0, likeList.length);

    const { title, brand, price } = likeList[RandomNumber];
    this.setState({
      RandomId: RandomNumber,
      RandomTitle: title,
      RandomBrand: brand,
      RandomPrice: price,
    });
    // 랜덤번호가 생성 됐으면 랜덤으로 뽑힌 아이템을 Product에 넣고 최근 조회 리스트에 추가
    if (this.state.RandomTitle) {
      const Product = {
        title: this.state.RandomTitle,
        brand: this.state.RandomBrand,
        price: this.state.RandomPrice,
      };
      // clicked를 받는 이유는 관심없는 버튼을 클릭했을 때는 최근 조회목록에 들어가면 안되기 때문.
      if (clicked) {
        this.HandleProduct(Product);
      }
    }
    history.push(`/product/${this.state.RandomId}`);
  };

  // 최근 조회 로컬 스토리지 저장.
  AddRecentProduct = (recentItems, ClickProd) => {
    recentItems.push(ClickProd);
    const stringProds = JSON.stringify(recentItems);
    localStorage.setItem("recentItems", stringProds);
  };

  HandleProduct = (ClickProd) => {
    let recentItems = this.state.recentItems;

    if (recentItems === null) {
      recentItems = [];
      this.AddRecentProduct(recentItems, ClickProd);
    } else {
      const filterItems = recentItems.filter(
        (el) => JSON.stringify(el) !== JSON.stringify(ClickProd)
      );
      this.AddRecentProduct(filterItems, ClickProd);
      this.setState({
        recentItems: JSON.parse(localStorage.getItem("recentItems")),
      });
    }
  };

  // 관심 없음 로컬 스토리지 저장
  AddDislikeProduct = (dislikeItems, ClickProd) => {
    dislikeItems.push(ClickProd);
    const stringProds = JSON.stringify(dislikeItems);
    localStorage.setItem("dislikeItems", stringProds);
  };

  HandleDislike = (ClickProd) => {
    let dislikeItems = this.state.dislikeItems;

    if (dislikeItems === null) {
      dislikeItems = [];
      this.AddDislikeProduct(dislikeItems, ClickProd);
    } else {
      const filterItems = dislikeItems.filter(
        (el) => JSON.stringify(el) !== JSON.stringify(ClickProd)
      );

      this.AddDislikeProduct(filterItems, ClickProd);
    }
    this.setState({
      dislikeItems: JSON.parse(localStorage.getItem("dislikeItems")),
    });
    this.randomLoad(ClickProd, false);
  };

  // 상품 조회 이력 버튼 페이지 이동.
  HandleRecentList = () => {
    const { history } = this.state;
    history.push({
      pathname: `/RecentList`,
    });
  };

  render() {
    const { location, RandomTitle, RandomBrand, RandomPrice } = this.state;
    let RandomProduct = {};
    if (location.state) {
      const { title, brand, price, id } = location.state;
      const currentItem = { title, brand, price, id };
      if (RandomTitle) {
        RandomProduct = {
          title: RandomTitle,
          brand: RandomBrand,
          price: RandomPrice,
        };
      }

      return (
        <ProductContainer>
          <ProductWrap>
            <LeftSide>
              <img
                src={`https://picsum.photos/5`}
                alt="product"
                aria-label={brand + "image"}
              />
            </LeftSide>
            <RightSide>
              <ProductContentWrap>
                <ContentWrap>
                  <ProductTitle>
                    <h1>{RandomTitle ? RandomTitle : title}</h1>
                  </ProductTitle>
                  <ProductBrand>
                    <h2>{RandomBrand ? RandomBrand : brand}</h2>
                  </ProductBrand>
                  <ProductPrice>
                    <h1>{`${
                      RandomPrice ? RandomPrice : price.toLocaleString()
                    } 원`}</h1>
                  </ProductPrice>
                </ContentWrap>
                <BtnWrap>
                  <RandomBtn>
                    <button
                      onClick={() =>
                        this.randomLoad(
                          RandomTitle ? RandomProduct : currentItem,
                          true
                        )
                      }
                    >
                      랜덤상품 조회
                    </button>
                  </RandomBtn>
                  <NoInterestBtn>
                    <button
                      onClick={() =>
                        this.HandleDislike(
                          RandomTitle ? RandomProduct : currentItem
                        )
                      }
                    >
                      관심없음
                    </button>
                  </NoInterestBtn>
                </BtnWrap>
              </ProductContentWrap>
            </RightSide>
          </ProductWrap>
          <RecentListBtnWrap>
            <button onClick={this.HandleRecentList}>
              상품 조회 이력 확인하기
            </button>
          </RecentListBtnWrap>
        </ProductContainer>
      );
    } else {
      return null;
    }
  }
}

export default DetailedProduct;

const {
  ProductContainer,
  ProductWrap,
  LeftSide,
  RightSide,
  ProductContentWrap,
  ContentWrap,
  ProductTitle,
  ProductBrand,
  ProductPrice,
  BtnWrap,
  RandomBtn,
  NoInterestBtn,
  RecentListBtnWrap,
} = style;
