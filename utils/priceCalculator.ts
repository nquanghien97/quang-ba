
export const priceCalculator = (quantity: number = 1): { value: number } => {
  // const fixed_price = 1200000
  if (0 < quantity && quantity < 3) {
    return {
      value: 965000 * quantity
    }
  }
  if (3 <= quantity && quantity < 6) {
    return {
      value: 830000 * quantity
    }
  }
  if (6 <= quantity && quantity < 12) {
    return {
      value: 800000 * quantity
    }
  }
  if (quantity >= 12) {
    return {
      value: 750000 * quantity
    }
  }
  return {
    value: 965000 * quantity
  }
}