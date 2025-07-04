import { Link } from "react-router";
import type { Route } from "./+types/posts";

export async function clientLoader() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Response("Not Found", { status: 404 });
    return res.json();
}


export default function Posts({loaderData}:Route.ComponentProps) {
    const posts = loaderData;
  return <div>
    <h1>Posts</h1>
    <ul>
        {posts.map((post:any)=><li key={post.id}><Link to={`/posts/${post.id}`} prefetch="intent">{post.title}</Link></li>)}
    </ul>
  </div>;
}