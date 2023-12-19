export function MoneySeparator ( value ){
  // Function to format a number as currency with a separator
  const formatCurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Format the value with a separator
  return formatCurrency(value)
};
