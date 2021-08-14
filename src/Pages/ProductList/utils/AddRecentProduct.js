export function AddRecentProduct(recentItems, ClickProd) {
  recentItems.push(ClickProd);
  const stringProds = JSON.stringify(recentItems);
  localStorage.setItem("recentItems", stringProds);
}
