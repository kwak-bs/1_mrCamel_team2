import styled from "styled-components";

export const ProductBox = styled.li`
  display: flex;
  flex-direction: column;
  float: left;
  width: 340px;
  margin: 30px;
  font-size: 16px;
  border: solid 1px #8d8d8d;
  cursor: pointer;
  img {
    width: 340px;
    height: 300px;
  }
`;

export const ProductContentWrap = styled.div``;

export const ProductContentItem = styled.p`
  margin: 10px 5px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  .brandName {
    margin: 0;
    opacity: 0.5;
  }
`;

export const style = {
  ProductBox,
  ProductContentWrap,
  ProductContentItem,
};
