const formatPrice = (price: string | number) => {
   if (typeof price === 'string') {
      price = parseInt(price);
   }
   return price?.toFixed(0)?.replace(/\d(?=(\d{3})+$)/g, '$&.') + '₫';
};

export default formatPrice;
