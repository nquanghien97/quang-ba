import { CreateOrderDTO } from "@/dto/introductory-order.dto";
import { api } from "@/utils/api";

export async function CreateOrder(data: CreateOrderDTO) {
  return await api(`${process.env.NEXT_PUBLIC_API_BASE_URL}/introductory-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export async function GetRevenueByMonth({ page = 1, pageSize = 10, month, year }: { page?: number, pageSize?: number, month: number, year: number }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());
  const res = await api(`${process.env.NEXT_PUBLIC_API_BASE_URL}/introductory-order?${params.toString()}`)
  return res;
}