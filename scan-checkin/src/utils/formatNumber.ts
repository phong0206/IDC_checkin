export const formatPrice = (number: any) => {
  return new Intl.NumberFormat().format(number);
};
