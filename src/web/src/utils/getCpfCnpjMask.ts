export const getCpfCnpjMask = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  return numericValue.length > 11 ? "99.999.999/9999-99" : "999.999.999-99";
};