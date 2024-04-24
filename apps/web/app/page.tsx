import apiClient from '../shared/client'


export default async function Page() {
  const response = await apiClient.get('/posts')
  console.log(response.data)
  return (
    <div>
      {[].map((post) => (
        <div key={post.id}>
          <h1>{post.attributes.title}</h1>
          <p>{post.attributes.content}</p>
        </div>
      ))}
    </div>
  )
}