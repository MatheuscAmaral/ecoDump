export const formatPostalCode = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length === 8) {
    return numbers.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }
  
  return value;
};