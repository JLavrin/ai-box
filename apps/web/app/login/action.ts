'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData) {
  const identifier = formData.get('email')
  const password = formData.get('password')
  console.log('login', identifier, password)
  const response = await fetch('http://localhost:1337/api/auth/local', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  })
  const json = await response.json()

  if (!response.ok) {
    throw new Error('Login failed')
  }

  cookies().set('token', json.jwt, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    httpOnly: true,
  })

  redirect('/')
}