import{r as n,j as t}from"./index.js";import{M as c}from"./MasonryLayout.js";import{c as f,B as m,T as p}from"./client.js";import{s as u,p as x}from"./Home.js";import{S as h}from"./Spinner.js";import"./module.js";const E=({searchTerm:s})=>{const[e,r]=n.useState(null),[i,o]=n.useState(!1);return n.useEffect(()=>{if(s){o(!0);const a=u(s.toLowerCase());f.fetch(a).then(l=>{r(l),o(!1)})}else f.fetch(x).then(a=>{r(a),o(!1)})},[s]),t.jsxs(t.Fragment,{children:[i&&t.jsx(h,{message:"Searching for pins..."}),(e==null?void 0:e.length)>0&&t.jsx(c,{pins:e}),(e==null?void 0:e.length)===0&&s!==""&&!i&&t.jsx(m,{display:"flex",justifyContent:"center",alignItems:"center",children:t.jsx(p,{variant:"caption",fontWeight:"semiBold",textTransform:"capitalize",fontSize:18,children:"No Pins Found!"})})]})};export{E as default};
//# sourceMappingURL=Search.js.map