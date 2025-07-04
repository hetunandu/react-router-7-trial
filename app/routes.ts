import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about","routes/About.tsx"),
    route("posts","routes/posts.tsx", [
        route(":id","routes/post.tsx")
    ]),
    // Nested Routes
    layout("routes/dashboard.tsx",[
        ...prefix("dashboard", [
            route("finances","routes/finances.tsx"),
            route("personal-info","routes/personal-info.tsx")
        ]),
    ]),
    // Catch-all route for unmatched URLs (including Chrome DevTools URLs)
    route("*", "routes/404.tsx")
] satisfies RouteConfig;
