import{r as t,o as M}from"./index.js";function V(o={}){const{nonce:n,onScriptLoadSuccess:i,onScriptLoadError:r}=o,[a,c]=t.useState(!1),u=t.useRef(i);u.current=i;const s=t.useRef(r);return s.current=r,t.useEffect(()=>{const d=document.createElement("script");return d.src="https://accounts.google.com/gsi/client",d.async=!0,d.defer=!0,d.nonce=n,d.onload=()=>{var l;c(!0),(l=u.current)===null||l===void 0||l.call(u)},d.onerror=()=>{var l;c(!1),(l=s.current)===null||l===void 0||l.call(s)},document.body.appendChild(d),()=>{document.body.removeChild(d)}},[n]),a}const j=t.createContext(null);function K({clientId:o,nonce:n,onScriptLoadSuccess:i,onScriptLoadError:r,children:a}){const c=V({nonce:n,onScriptLoadSuccess:i,onScriptLoadError:r}),u=t.useMemo(()=>({clientId:o,scriptLoadedSuccessfully:c}),[o,c]);return M.createElement(j.Provider,{value:u},a)}function q(){const o=t.useContext(j);if(!o)throw new Error("Google OAuth components must be used within GoogleOAuthProvider");return o}function D(o){var n;return(n=o==null?void 0:o.clientId)!==null&&n!==void 0?n:o==null?void 0:o.client_id}const F={large:40,medium:32,small:20};function N({onSuccess:o,onError:n,useOneTap:i,promptMomentNotification:r,type:a="standard",theme:c="outline",size:u="large",text:s,shape:d,logo_alignment:l,width:x,locale:C,click_listener:k,containerProps:w,...B}){const A=t.useRef(null),{clientId:p,scriptLoadedSuccessfully:I}=q(),O=t.useRef(o);O.current=o;const g=t.useRef(n);g.current=n;const R=t.useRef(r);return R.current=r,t.useEffect(()=>{var _,m,S,h,L,b,y,E,G;if(I)return(S=(m=(_=window==null?void 0:window.google)===null||_===void 0?void 0:_.accounts)===null||m===void 0?void 0:m.id)===null||S===void 0||S.initialize({client_id:p,callback:e=>{var v;if(!(e!=null&&e.credential))return(v=g.current)===null||v===void 0?void 0:v.call(g);const{credential:f,select_by:H}=e;O.current({credential:f,clientId:D(e),select_by:H})},...B}),(b=(L=(h=window==null?void 0:window.google)===null||h===void 0?void 0:h.accounts)===null||L===void 0?void 0:L.id)===null||b===void 0||b.renderButton(A.current,{type:a,theme:c,size:u,text:s,shape:d,logo_alignment:l,width:x,locale:C,click_listener:k}),i&&((G=(E=(y=window==null?void 0:window.google)===null||y===void 0?void 0:y.accounts)===null||E===void 0?void 0:E.id)===null||G===void 0||G.prompt(R.current)),()=>{var e,v,f;i&&((f=(v=(e=window==null?void 0:window.google)===null||e===void 0?void 0:e.accounts)===null||v===void 0?void 0:v.id)===null||f===void 0||f.cancel())}},[p,I,i,a,c,u,s,d,l,x,C]),M.createElement("div",{...w,ref:A,style:{height:F[u],...w==null?void 0:w.style}})}function P(){var o,n,i;(i=(n=(o=window==null?void 0:window.google)===null||o===void 0?void 0:o.accounts)===null||n===void 0?void 0:n.id)===null||i===void 0||i.disableAutoSelect()}export{K as G,N as a,P as g};
//# sourceMappingURL=index.esm.js.map
