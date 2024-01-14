import{b as C,d as M,r as i,a as H,_ as q,j as t,u as A}from"./index.js";import{S as J,d as K}from"./Spinner.js";import{B as Q,r as X,i as Y,G as r,I as Z,k as ee}from"./Home.js";import{a as _,g as te,s as ae,x as se,u as ie,i as ne,b as P,d as oe,B as p,T as y,c as z}from"./client.js";import{L as G,T as F,a as re}from"./Pins.js";import{B as le}from"./module.js";import"./index.esm.js";const ce=_("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),V=ce,de=_("MuiListItemIcon",["root","alignItemsFlexStart"]),D=de,ue=_("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),L=ue;function pe(e){return te("MuiMenuItem",e)}const ge=_("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),b=ge,me=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],xe=(e,s)=>{const{ownerState:l}=e;return[s.root,l.dense&&s.dense,l.divider&&s.divider,!l.disableGutters&&s.gutters]},fe=e=>{const{disabled:s,dense:l,divider:o,disableGutters:g,selected:d,classes:u}=e,c=oe({root:["root",l&&"dense",s&&"disabled",!g&&"gutters",o&&"divider",d&&"selected"]},pe,u);return C({},u,c)},ve=ae(Q,{shouldForwardProp:e=>se(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:xe})(({theme:e,ownerState:s})=>C({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!s.disableGutters&&{paddingLeft:16,paddingRight:16},s.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${b.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${b.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${b.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${b.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${V.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${V.inset}`]:{marginLeft:52},[`& .${L.root}`]:{marginTop:0,marginBottom:0},[`& .${L.inset}`]:{paddingLeft:36},[`& .${D.root}`]:{minWidth:36}},!s.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},s.dense&&C({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${D.root} svg`]:{fontSize:"1.25rem"}}))),he=i.forwardRef(function(s,l){const o=H({props:s,name:"MuiMenuItem"}),{autoFocus:g=!1,component:d="li",dense:u=!1,divider:j=!1,disableGutters:c=!1,focusVisibleClassName:k,role:I="menuitem",tabIndex:m,className:S}=o,n=q(o,me),h=i.useContext(G),$=i.useMemo(()=>({dense:u||h.dense||!1,disableGutters:c}),[h.dense,u,c]),x=i.useRef(null);ie(()=>{g&&x.current&&x.current.focus()},[g]);const R=C({},o,{dense:$.dense,divider:j,disableGutters:c}),f=fe(o),w=ne(x,l);let T;return o.disabled||(T=m!==void 0?m:-1),t.jsx(G.Provider,{value:$,children:t.jsx(ve,C({ref:w,role:I,tabIndex:T,component:d,focusVisibleClassName:P(f.focusVisible,k),className:P(f.root,S)},n,{ownerState:R,classes:f}))})}),W=he;var O={},ye=Y;Object.defineProperty(O,"__esModule",{value:!0});var U=O.default=void 0,be=ye(X()),N=t,Ce=(0,be.default)([(0,N.jsx)("path",{d:"m19.21 12.04-1.53-.11-.3-1.5C16.88 7.86 14.62 6 12 6 9.94 6 8.08 7.14 7.12 8.96l-.5.95-1.07.11C3.53 10.24 2 11.95 2 14c0 2.21 1.79 4 4 4h13c1.65 0 3-1.35 3-3 0-1.55-1.22-2.86-2.79-2.96zm-5.76.96v3h-2.91v-3H8l4-4 4 4h-2.55z",opacity:".3"},"0"),(0,N.jsx)("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"},"1")],"CloudUploadTwoTone");U=O.default=Ce;const Se=({user:e})=>{const[s,l]=i.useState(""),[o,g]=i.useState(""),[d,u]=i.useState(""),[j,c]=i.useState(!1),[k,I]=i.useState(!1),[m,S]=i.useState(null),[n,h]=i.useState(null),[$,x]=i.useState(!1),R=A(),f=i.useRef(null),w=a=>{const{type:v,name:E}=a.target.files[0];v==="image/png"||v==="image/svg"||v==="image/jpeg"||v==="image/gif"||v==="image/tiff"?(x(!1),c(!0),z.assets.upload("image",a.target.files[0],{contentType:v,filename:E}).then(B=>{h(B),c(!1)}).catch(B=>{console.log("Image upload error",B)})):x(!0)},T=()=>{if(s&&o&&d&&(n!=null&&n._id)&&m){const a={_type:"pin",title:s,about:o,destination:d,image:{_type:"image",asset:{_type:"reference",_ref:n==null?void 0:n._id}},userId:e._id,postedBy:{_type:"postedBy",_ref:e._id},category:m};z.create(a).then(()=>R("/"))}else I(!0),setTimeout(()=>I(!1),2e3)};return t.jsxs(r,{container:!0,spacing:1,children:[t.jsx(r,{item:!0,xs:12,lg:6,children:t.jsx(p,{display:"flex",justifyContent:"center",alignItems:"center",marginTop:5,children:t.jsxs(p,{padding:2,borderColor:"grey.500",borderRadius:2,width:400,height:400,cursor:"pointer",bgcolor:"#F9F5F6",display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",children:[j&&t.jsx(J,{}),$&&t.jsx(y,{variant:"caption",children:"Wrong image type"}),n?t.jsxs(p,{sx:{position:"relative",height:"100%"},children:[t.jsx("img",{src:n==null?void 0:n.url,alt:"uploaded-pic",style:{height:"100%",width:"100%"}}),t.jsx(Z,{color:"inherit","aria-label":"menu",onClick:()=>h(null),sx:{position:"absolute",bottom:3,right:3,background:"white",opacity:.7,color:"white",outline:"none",transition:"opacity 0.3s ease",":hover":{opacity:1,background:"red"}},children:t.jsx(K,{style:{color:"black"}})})]}):t.jsxs(t.Fragment,{children:[t.jsxs(p,{display:"flex",flexDirection:"column",alignItems:"center",onClick:()=>f.current.click(),children:[t.jsx(U,{}),t.jsx("input",{ref:f,type:"file",hidden:!0,name:"upload-image",onChange:w}),t.jsx(y,{variant:"body1",children:"Click to upload"})]}),t.jsx(y,{variant:"caption",children:"Use high-quality JPG, SVG, PNG, GIF, or TIFF less than 20MB"})]})]})})}),t.jsx(r,{item:!0,xs:12,lg:6,children:t.jsxs(r,{container:!0,spacing:2,marginTop:5,children:[k&&t.jsx(r,{item:!0,xs:12,lg:12,children:t.jsx(p,{display:"flex",justifyContent:"center",alignItems:"center",children:t.jsx(y,{variant:"caption",children:"Please fill in all the fields"})})}),t.jsx(r,{item:!0,xs:12,lg:12,children:t.jsxs(p,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",gap:"8px",children:[t.jsx(F,{id:"title",variant:"outlined",placeholder:"Add Title",value:s,onChange:a=>l(a.target.value),size:"small",fullWidth:!0}),e&&t.jsxs(p,{sx:{display:"flex",alignItems:"center",gap:"18px",padding:"2px",textDecoration:"none"},children:[t.jsx("img",{src:e.image,alt:"user-profile",style:{height:"50px",width:"50px",borderRadius:"50%"}}),t.jsx(y,{variant:"caption",children:e.userName})]})]})}),t.jsx(r,{item:!0,xs:12,lg:12,children:t.jsx(F,{id:"about",variant:"outlined",placeholder:"What is your pin about",value:o,onChange:a=>g(a.target.value),size:"small",fullWidth:!0})}),t.jsx(r,{item:!0,xs:12,lg:12,children:t.jsx(F,{id:"destination",variant:"outlined",placeholder:"Add a destination link",value:d,onChange:a=>u(a.target.value),size:"small",fullWidth:!0})}),t.jsx(r,{item:!0,xs:12,lg:12,children:t.jsxs(re,{id:"select-pin-category",value:m||"",displayEmpty:!0,renderValue:a=>a===""?"Choose Pin category":a,fullWidth:!0,size:"small",onChange:a=>S(a.target.value),children:[t.jsx(W,{value:"other",children:t.jsx("em",{children:"Select Category"})}),ee.map(a=>t.jsx(W,{value:a.name,children:a.name},a.name))]})}),t.jsx(r,{item:!0,xs:12,sm:12,lg:12,children:t.jsx(le,{variant:"contained",color:"error",onClick:T,style:{borderRadius:"14px"},children:"Save Pin"})})]})})]})};export{Se as default};
//# sourceMappingURL=CreatePin.js.map