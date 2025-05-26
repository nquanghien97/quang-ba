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

export interface ListRevenueByMonth {
  id: number
  userId: number
  totalRevenue: number
  commission: number
  commmissionRate: number
  fullName: string
  username:string
  month: number
  year: number
  image_url?: string
}