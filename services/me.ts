import { api } from "@/utils/api";

export function getMe() {
  return api(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}