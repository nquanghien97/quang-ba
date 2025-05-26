export interface UserEntity {
  id: number;
  fullName: string;
  username: string;
  createdAt: Date;
  role: 'ADMIN' | 'USER';
  phoneNumber: string;
  community: string | null
  revenue_by_month: {
    totalRevenue: number
    commission: number
    commmissionRate: number
    month: number
    year: number
    rank: number
  }
  todayRevenue: number
}