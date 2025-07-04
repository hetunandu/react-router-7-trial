import { useState } from "react";
import { Link } from "react-router";

export default function About() {
    const [count,setCount] = useState(20); 
  return <div>
    <h1>About</h1>
    <button onClick={()=>setCount(count+1)}>Click me</button>
    <p>Count: {count}</p>
    <Link to="/">Home</Link>
  </div>;
}