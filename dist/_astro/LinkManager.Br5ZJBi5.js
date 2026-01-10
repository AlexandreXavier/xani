import{r as N,a as p}from"./index._OACqPSs.js";var y={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b;function w(){if(b)return m;b=1;var e=N(),r=Symbol.for("react.element"),n=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,i=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function u(l,a,h){var o,x={},f=null,k=null;h!==void 0&&(f=""+h),a.key!==void 0&&(f=""+a.key),a.ref!==void 0&&(k=a.ref);for(o in a)c.call(a,o)&&!t.hasOwnProperty(o)&&(x[o]=a[o]);if(l&&l.defaultProps)for(o in a=l.defaultProps,a)x[o]===void 0&&(x[o]=a[o]);return{$$typeof:r,type:l,key:f,ref:k,props:x,_owner:i.current}}return m.Fragment=n,m.jsx=u,m.jsxs=u,m}var j;function C(){return j||(j=1,y.exports=w()),y.exports}var s=C();/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),M=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,n,c)=>c?c.toUpperCase():n.toLowerCase()),v=e=>{const r=M(e);return r.charAt(0).toUpperCase()+r.slice(1)},g=(...e)=>e.filter((r,n,c)=>!!r&&r.trim()!==""&&c.indexOf(r)===n).join(" ").trim(),R=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=p.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:n=2,absoluteStrokeWidth:c,className:i="",children:t,iconNode:u,...l},a)=>p.createElement("svg",{ref:a,...E,width:r,height:r,stroke:e,strokeWidth:c?Number(n)*24/Number(r):n,className:g("lucide",i),...!t&&!R(l)&&{"aria-hidden":"true"},...l},[...u.map(([h,o])=>p.createElement(h,o)),...Array.isArray(t)?t:[t]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(e,r)=>{const n=p.forwardRef(({className:c,...i},t)=>p.createElement(O,{ref:t,iconNode:r,className:g(`lucide-${$(v(e))}`,`lucide-${e}`,c),...i}));return n.displayName=v(e),n};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]],L=d("bug",q);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],P=d("cloud",A);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],S=d("code",z);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],B=d("coins",I);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["line",{x1:"22",x2:"2",y1:"6",y2:"6",key:"15w7dq"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18",key:"1ip48p"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22",key:"a2lnyx"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22",key:"8vb6jd"}]],U=d("frame",J);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],W=d("globe",T);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],H=d("music",F);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],D=d("palette",Z);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],K=d("wrench",G),V={Bug:L,Cloud:P,Code:S,Coins:B,Frame:U,Globe:W,Music:H,Palette:D,Wrench:K};function Y({category:e,selected:r,onClick:n}){const c=e.iconName?V[e.iconName]:null;return s.jsx("button",{onClick:n,className:`w-full rounded border p-3 text-left transition
        ${r?"border-skin-accent bg-skin-accent text-skin-inverted":"border-skin-line bg-skin-card text-skin-base hover:border-skin-accent hover:bg-skin-card-muted"}
        focus-outline`,children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[c?s.jsx(c,{className:"size-5","aria-hidden":"true"}):s.jsx("span",{className:"size-5","aria-hidden":"true"}),s.jsx("span",{className:"font-medium",children:e.name})]}),s.jsx("span",{className:`text-sm ${r?"text-skin-inverted opacity-80":"text-skin-base opacity-60"}`,children:e.count})]})})}const _=(e,r=!1)=>{const n=e.replace(/^https?:\/\//i,"").replace(/\/+$/g,""),[c,...i]=n.split("/");let t=c;if(t=t.replace(/^www\./i,""),r){const l=t.split(".");l.length>2&&(t=l.slice(-2).join("."))}const u=i.join("/");return u?`${t}/${u}`:t};function Q({link:e}){return s.jsxs("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:`flex gap-4 w-full items-center rounded border border-skin-line
        bg-skin-card p-4 transition hover:border-skin-accent
        hover:bg-skin-card-muted focus-outline`,children:[s.jsx("img",{src:`https://www.google.com/s2/favicons?domain=${_(e.url,!0)}&sz=128`,alt:`${e.name}'s favicon`,width:24,height:24,className:"size-6 rounded-sm shrink-0"}),s.jsxs("div",{className:"flex flex-col gap-1 min-w-0",children:[s.jsxs("div",{className:"flex flex-col sm:flex-row sm:gap-2 sm:items-baseline",children:[s.jsx("h3",{className:"font-medium text-skin-base truncate",children:e.name}),s.jsx("p",{className:"text-sm text-skin-base opacity-60 truncate",children:_(e.url)})]}),e.description&&s.jsx("p",{className:"text-sm text-skin-base opacity-70 line-clamp-2",children:e.description})]})]})}function ee({links:e,categories:r}){const[n,c]=p.useState("all"),i=n==="all"?e:e.filter(t=>t.category===n);return s.jsx("div",{className:"w-full",children:s.jsxs("div",{className:"flex flex-col gap-6 sm:flex-row",children:[s.jsx("aside",{className:"hidden w-60 shrink-0 sm:block",children:s.jsx("div",{className:"space-y-2",children:r.map(t=>s.jsx(Y,{category:t,selected:n===t.id,onClick:()=>c(t.id)},t.id))})}),s.jsxs("main",{className:"flex-1",children:[s.jsx("div",{className:"mb-6 sm:hidden",children:s.jsx("select",{value:n,onChange:t=>c(t.target.value),className:`w-full rounded border border-skin-line bg-skin-card
                p-3 text-skin-base focus-outline`,children:r.map(t=>s.jsx("option",{value:t.id,children:`${t.name} (${t.count})`},t.id))})}),i.length>0?s.jsx("div",{className:"grid gap-4 sm:grid-cols-2",children:i.map(t=>s.jsx(Q,{link:t},t.id))}):s.jsx("p",{className:"text-center text-skin-base opacity-70",children:"No links in this category yet."})]})]})})}export{ee as default};
