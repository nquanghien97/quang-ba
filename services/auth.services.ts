export async function loginUser( { username, password } : { username: string, password: string }) {
  const res =  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  return res.json();
}