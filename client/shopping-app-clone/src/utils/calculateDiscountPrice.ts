export const calculateDiscount = (price: number, discount: string) => {
  const discountStr = discount?.substring(0, 2);

  if (discountStr !== '') {
    const discountNum = parseInt(discountStr);
    const discountedPrice = price * (discountNum / 100);
    const discountedPricenew = price - discountedPrice;
    return Math.round(discountedPricenew * 1e2) / 1e2;
  }
  return price;
};
