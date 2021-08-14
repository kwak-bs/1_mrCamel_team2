import { AddRecentProduct } from "../utils/AddRecentProduct";

export function HandleProduct(ClickProd) {
  let recentItems = JSON.parse(localStorage.getItem("recentItems"));

  if (recentItems === null) {
    recentItems = [];
    AddRecentProduct(recentItems, ClickProd);
  } else {
    const filterItems = recentItems.filter(
      (el) => JSON.stringify(el) !== JSON.stringify(ClickProd)
    );
    AddRecentProduct(filterItems, ClickProd);
  }
}
