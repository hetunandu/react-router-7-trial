import { useLocation } from "react-router";

export default function NotFound() {
  const location = useLocation();
  
  // Handle Chrome DevTools and other well-known URLs silently
  if (location.pathname.startsWith("/.well-known/")) {
    return null;
  }
  
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "50vh",
      textAlign: "center"
    }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Go back home
        </a>
      </p>
    </div>
  );
} 