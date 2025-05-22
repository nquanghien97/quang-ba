import { CreateOrderDTO } from "@/dto/introductory-order.dto";
import { api } from "@/utils/api";

export async function CreateOrder(data: CreateOrderDTO) {
  const res = await api(`${process.env.NEXT_PUBLIC_API_BASE_URL}/introductory-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || 'Something went wrong!');
  }
  return res.json();
}