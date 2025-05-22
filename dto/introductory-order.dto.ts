export interface CreateOrderDTO {
  customerName: string
  phoneNumber: string
  province: string
  district: string
  ward: string
  address: string
  quantity: number
  isRelatives?: boolean
}