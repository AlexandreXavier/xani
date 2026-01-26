import{r as w,a as u}from"./index._OACqPSs.js";var k={exports:{}},h={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v;function N(){if(v)return h;v=1;var e=w(),r=Symbol.for("react.element"),n=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,l=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function p(d,c,m){var o,x={},y=null,f=null;m!==void 0&&(y=""+m),c.key!==void 0&&(y=""+c.key),c.ref!==void 0&&(f=c.ref);for(o in c)a.call(c,o)&&!t.hasOwnProperty(o)&&(x[o]=c[o]);if(d&&d.defaultProps)for(o in c=d.defaultProps,c)x[o]===void 0&&(x[o]=c[o]);return{$$typeof:r,type:d,key:y,ref:f,props:x,_owner:l.current}}return h.Fragment=n,h.jsx=p,h.jsxs=p,h}var _;function C(){return _||(_=1,k.exports=N()),k.exports}var s=C();/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),$=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,n,a)=>a?a.toUpperCase():n.toLowerCase()),b=e=>{const r=$(e);return r.charAt(0).toUpperCase()+r.slice(1)},j=(...e)=>e.filter((r,n,a)=>!!r&&r.trim()!==""&&a.indexOf(r)===n).join(" ").trim(),R=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var L={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=u.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:n=2,absoluteStrokeWidth:a,className:l="",children:t,iconNode:p,...d},c)=>u.createElement("svg",{ref:c,...L,width:r,height:r,stroke:e,strokeWidth:a?Number(n)*24/Number(r):n,className:j("lucide",l),...!t&&!R(d)&&{"aria-hidden":"true"},...d},[...p.map(([m,o])=>u.createElement(m,o)),...Array.isArray(t)?t:[t]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=(e,r)=>{const n=u.forwardRef(({className:a,...l},t)=>u.createElement(q,{ref:t,iconNode:r,className:j(`lucide-${M(b(e))}`,`lucide-${e}`,a),...l}));return n.displayName=b(e),n};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]],E=i("bug",A);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],z=i("cloud",O);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],S=i("code",P);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],B=i("coins",I);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["line",{x1:"22",x2:"2",y1:"6",y2:"6",key:"15w7dq"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18",key:"1ip48p"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22",key:"a2lnyx"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22",key:"8vb6jd"}]],U=i("frame",J);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],T=i("globe",H);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],F=i("lock",W);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],D=i("music",Z);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],G=i("palette",V);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],Y=i("sparkles",K);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],X=i("wrench",Q),ee={Bug:E,Cloud:z,Code:S,Coins:B,Frame:U,Globe:T,Lock:F,Music:D,Palette:G,Sparkles:Y,Wrench:X};function te({category:e,selected:r,onClick:n}){const a=e.iconName?ee[e.iconName]:null;return s.jsx("button",{onClick:n,className:`w-full rounded border p-3 text-left transition
        ${r?"border-skin-accent bg-skin-accent text-skin-inverted":"border-skin-line bg-skin-card text-skin-base hover:border-skin-accent hover:bg-skin-card-muted"}
        focus-outline`,children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[a?s.jsx(a,{className:"size-5","aria-hidden":"true"}):s.jsx("span",{className:"size-5","aria-hidden":"true"}),s.jsx("span",{className:"font-medium",children:e.name})]}),s.jsx("span",{className:`text-sm ${r?"text-skin-inverted opacity-80":"text-skin-base opacity-60"}`,children:e.count})]})})}const g=(e,r=!1)=>{const n=e.replace(/^https?:\/\//i,"").replace(/\/+$/g,""),[a,...l]=n.split("/");let t=a;if(t=t.replace(/^www\./i,""),r){const d=t.split(".");d.length>2&&(t=d.slice(-2).join("."))}const p=l.join("/");return p?`${t}/${p}`:t};function re({link:e}){return s.jsxs("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:`flex gap-4 w-full items-center rounded border border-skin-line
        bg-skin-card p-4 transition hover:border-skin-accent
        hover:bg-skin-card-muted focus-outline`,children:[s.jsx("img",{src:`https://www.google.com/s2/favicons?domain=${g(e.url,!0)}&sz=128`,alt:`${e.name}'s favicon`,width:24,height:24,className:"size-6 rounded-sm shrink-0"}),s.jsxs("div",{className:"flex flex-col gap-1 min-w-0",children:[s.jsxs("div",{className:"flex flex-col sm:flex-row sm:gap-2 sm:items-baseline",children:[s.jsx("h3",{className:"font-medium text-skin-base truncate",children:e.name}),s.jsx("p",{className:"text-sm text-skin-base opacity-60 truncate",children:g(e.url)})]}),e.description&&s.jsx("p",{className:"text-sm text-skin-base opacity-70 line-clamp-2",children:e.description})]})]})}function ne({links:e,categories:r}){const[n,a]=u.useState("all"),l=n==="all"?e:e.filter(t=>t.category===n);return s.jsx("div",{className:"w-full",children:s.jsxs("div",{className:"flex flex-col gap-6 sm:flex-row",children:[s.jsx("aside",{className:"hidden w-60 shrink-0 sm:block",children:s.jsx("div",{className:"space-y-2",children:r.map(t=>s.jsx(te,{category:t,selected:n===t.id,onClick:()=>a(t.id)},t.id))})}),s.jsxs("main",{className:"flex-1",children:[s.jsx("div",{className:"mb-6 sm:hidden",children:s.jsx("select",{value:n,onChange:t=>a(t.target.value),className:`w-full rounded border border-skin-line bg-skin-card
                p-3 text-skin-base focus-outline`,children:r.map(t=>s.jsx("option",{value:t.id,children:`${t.name} (${t.count})`},t.id))})}),l.length>0?s.jsx("div",{className:"grid gap-4 sm:grid-cols-2",children:l.map(t=>s.jsx(re,{link:t},t.id))}):s.jsx("p",{className:"text-center text-skin-base opacity-70",children:"No links in this category yet."})]})]})})}export{ne as default};
