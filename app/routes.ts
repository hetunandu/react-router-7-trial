import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about","routes/About.tsx"),
    
    // Authentication routes
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    
    // Apps routes (protected)
    route("apps", "routes/apps.tsx"),
    route("apps/:id", "routes/apps.$id.tsx"),
    
    // Settings routes (protected, with nested admin route)
    route("settings", "routes/settings.tsx", [
        route("deployment", "routes/settings.deployment.tsx"),
        route("auth", "routes/settings.auth.tsx"),
        route("admin", "routes/settings.admin.tsx"), // Admin only
    ]),
    
    // Catch-all route for unmatched URLs
    route("*", "routes/404.tsx")
] satisfies RouteConfig;
