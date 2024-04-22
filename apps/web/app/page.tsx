import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getPosts() {
  const cookie = cookies().get('token').value
  console.log(cookie)
  const response = await fetch('http://localhost:1337/api/posts', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookie}`
    },
  })
  const json = await response.json()
  console.log(json)
  if (response.status === 401 || response.status === 403) {
    redirect('/login')
    return
  }

  return json
}

export default async function Page() {
  const json = await getPosts()
  console.log(JSON.stringify(json, null, 2))
  return (
    <div>
      {json.data.map((post) => (
        <div key={post.id}>
          <h1>{post.attributes.title}</h1>
          <p>{post.attributes.content}</p>
        </div>
      ))}
    </div>
  )
}