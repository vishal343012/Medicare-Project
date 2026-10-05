import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

function App(){
 const [patients,setPatients]=useState([]),[me,setMe]=useState({}),[error,setError]=useState("");
 useEffect(()=>{
  Promise.all([fetch("/api/me").then(r=>r.json()),fetch("/api/patients").then(async r=>{if(!r.ok)throw Error("API request failed");return r.json()})])
   .then(([u,p])=>{setMe(u);setPatients(p)})
   .catch(e=>setError(e.message));
 },[]);
 return <div className="page">
  <header><div><h1>Medical Evidence Portal</h1><p>NGINX + OAuth2 Proxy + Entra ID + Node.js + PostgreSQL</p></div><a href="/oauth2/sign_out">Sign out</a></header>
  <main>
   <section className="card"><h2>Authenticated User</h2><p><b>Name:</b> {me.name||"Authenticated user"}</p><p><b>Email:</b> {me.email||"Not supplied"}</p></section>
   <section className="card"><h2>Demo Patient Records</h2><p>These are synthetic records for lab use only.</p>{error&&<p className="error">{error}</p>}
   <table><thead><tr><th>ID</th><th>Name</th><th>Condition</th><th>Status</th></tr></thead><tbody>
   {patients.map(p=><tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.condition}</td><td>{p.status}</td></tr>)}
   </tbody></table></section>
  </main>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
