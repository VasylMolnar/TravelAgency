export const calculatePrice = (price, dataEnd, dataOff) => {
  if (price) {
    const diffMs = new Date(dataOff) - new Date(dataEnd);
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return price * diffDays;
  }

  return price;
};
