
export default async function Page() {

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