export const formatCurrency = (price: number): number => {
  const formatCurrency = new Intl.NumberFormat('vi-Vi', {
    style: 'currency',
    currency: 'VND'
  })
  return formatCurrency.format(price) as unknown as number
} 