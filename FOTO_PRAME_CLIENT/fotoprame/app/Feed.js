import{k,b as d,d as R,a0 as p,r as l,a as _,_ as M,j as s,T,S as $}from"./index.js";import{g as U,a as A,s as P,b as F,d as N,c as g,T as W}from"./client.js";import{M as X}from"./MasonryLayout.js";import{G as f,p as B,s as E}from"./Home.js";import{S as L}from"./Spinner.js";import{S as z}from"./Pins.js";import"./module.js";import"./index.esm.js";function G(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function I(t){return parseFloat(t)}function K(t){return U("MuiSkeleton",t)}A("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Q=["animation","className","component","height","style","variant","width"];let c=t=>t,x,b,y,v;const q=t=>{const{classes:e,variant:a,animation:n,hasChildren:i,width:r,height:o}=t;return N({root:["root",a,n,i&&"withChildren",i&&!r&&"fitContent",i&&!o&&"heightAuto"]},K,e)},O=k(x||(x=c`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),V=k(b||(b=c`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),D=P("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const a=G(t.shape.borderRadius)||"px",n=I(t.shape.borderRadius);return d({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:R(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${a}/${Math.round(n/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&p(y||(y=c`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),O),({ownerState:t,theme:e})=>t.animation==="wave"&&p(v||(v=c`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),V,(e.vars||e).palette.action.hover)),H=l.forwardRef(function(e,a){const n=_({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:r,component:o="span",height:h,style:C,variant:w="text",width:S}=n,u=M(n,Q),m=d({},n,{animation:i,component:o,variant:w,hasChildren:!!u.children}),j=q(m);return s.jsx(D,d({as:o,ref:a,className:F(j.root,r),ownerState:m},u,{style:d({width:S,height:h},C)}))}),J=H,Y=()=>{const{currentTheme:t}=l.useContext(T);return s.jsx(f,{container:!0,spacing:1,padding:2,children:[1,2,3,4,5,6,7,8,9,10].map(e=>s.jsx(f,{item:!0,xl:3,lg:3,md:4,sm:6,xs:12,children:s.jsx(J,{variant:"rectangular",animation:"wave",sx:t.name==="dark"?{bgcolor:"grey.900",width:"100%",height:330,borderRadius:"10px"}:{width:"100%",height:330,borderRadius:"10px"}})},e))})},ot=()=>{const[t,e]=l.useState(!1),{categoryId:a}=$(),[n,i]=l.useState(null);return l.useEffect(()=>{if(e(!0),a){const r=E(a);g.fetch(r).then(o=>{i(o),e(!1)})}else g.fetch(B).then(r=>{i(r),e(!1)})},[a]),t?s.jsxs(s.Fragment,{children:[s.jsx(L,{message:"We are adding new ideas to your feed!"}),s.jsx(Y,{})]}):n!=null&&n.length?n&&s.jsx(X,{pins:n}):s.jsx(z,{direction:"row",justifyContent:"center",alignItems:"center",children:s.jsx(W,{variant:"caption",fontWeight:"semiBold",textTransform:"capitalize",fontSize:18,children:"No Pins Available!"})})};export{ot as default};
//# sourceMappingURL=Feed.js.map
