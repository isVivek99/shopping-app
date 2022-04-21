export const validateCoupon = (couponCode: string) => {
  if (couponCode === 'GET20') {
    return {
      status: 200,
      message: 'coupon code applied',
    };
  }
  return {
    status: 400,
    message: 'invalid coupon code',
  };
};

export const calculateCouponDiscount = (
  totalPrice: number,
  discount: number
) => {
  console.log(totalPrice, discount);

  return {
    discountedPrice: totalPrice - totalPrice * (discount / 100),
    totalDiscount: totalPrice * (discount / 100),
  };
};
