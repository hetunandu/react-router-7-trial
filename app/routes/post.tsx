import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    if (!res.ok) throw new Response("Not Found", { status: 404 });
    return res.json();
}

export default function Post({loaderData}:Route.ComponentProps) {
  return <div>Post {loaderData.title}</div>;
}