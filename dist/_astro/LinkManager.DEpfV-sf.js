import{r as g,a as u}from"./index._OACqPSs.js";var y={exports:{}},m={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j;function _(){if(j)return m;j=1;var e=g(),t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,c=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,r={key:!0,ref:!0,__self:!0,__source:!0};function d(l,i,x){var o,p={},h=null,k=null;x!==void 0&&(h=""+x),i.key!==void 0&&(h=""+i.key),i.ref!==void 0&&(k=i.ref);for(o in i)a.call(i,o)&&!r.hasOwnProperty(o)&&(p[o]=i[o]);if(l&&l.defaultProps)for(o in i=l.defaultProps,i)p[o]===void 0&&(p[o]=i[o]);return{$$typeof:t,type:l,key:h,ref:k,props:p,_owner:c.current}}return m.Fragment=n,m.jsx=d,m.jsxs=d,m}var b;function C(){return b||(b=1,y.exports=_()),y.exports}var s=C();/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),$=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,a)=>a?a.toUpperCase():n.toLowerCase()),N=e=>{const t=$(e);return t.charAt(0).toUpperCase()+t.slice(1)},w=(...e)=>e.filter((t,n,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===n).join(" ").trim(),E=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var O={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=u.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:a,className:c="",children:r,iconNode:d,...l},i)=>u.createElement("svg",{ref:i,...O,width:t,height:t,stroke:e,strokeWidth:a?Number(n)*24/Number(t):n,className:w("lucide",c),...!r&&!E(l)&&{"aria-hidden":"true"},...l},[...d.map(([x,o])=>u.createElement(x,o)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(e,t)=>{const n=u.forwardRef(({className:a,...c},r)=>u.createElement(L,{ref:r,iconNode:t,className:w(`lucide-${R(N(e))}`,`lucide-${e}`,a),...c}));return n.displayName=N(e),n};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],q=f("cloud",P);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["line",{x1:"22",x2:"2",y1:"6",y2:"6",key:"15w7dq"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18",key:"1ip48p"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22",key:"a2lnyx"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22",key:"8vb6jd"}]],S=f("frame",A);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],z=f("palette",I);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],M=f("wrench",J),U={Cloud:q,Frame:S,Palette:z,Wrench:M};function B({category:e,selected:t,onClick:n}){const a=e.iconName?U[e.iconName]:null;return s.jsx("button",{onClick:n,className:`w-full rounded border p-3 text-left transition
        ${t?"border-skin-accent bg-skin-accent text-skin-inverted":"border-skin-line bg-skin-card text-skin-base hover:border-skin-accent hover:bg-skin-card-muted"}
        focus-outline`,children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[a?s.jsx(a,{className:"size-5","aria-hidden":"true"}):s.jsx("span",{className:"size-5","aria-hidden":"true"}),s.jsx("span",{className:"font-medium",children:e.name})]}),s.jsx("span",{className:`text-sm ${t?"text-skin-inverted opacity-80":"text-skin-base opacity-60"}`,children:e.count})]})})}const v=(e,t=!1)=>{const n=e.replace(/^https?:\/\//i,"").replace(/\/+$/g,""),[a,...c]=n.split("/");let r=a;if(r=r.replace(/^www\./i,""),t){const l=r.split(".");l.length>2&&(r=l.slice(-2).join("."))}const d=c.join("/");return d?`${r}/${d}`:r};function T({link:e}){return s.jsxs("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:`flex gap-4 w-full items-center rounded border border-skin-line
        bg-skin-card p-4 transition hover:border-skin-accent
        hover:bg-skin-card-muted focus-outline`,children:[s.jsx("img",{src:`https://www.google.com/s2/favicons?domain=${v(e.url,!0)}&sz=128`,alt:`${e.name}'s favicon`,width:24,height:24,className:"size-6 rounded-sm shrink-0"}),s.jsxs("div",{className:"flex flex-col gap-1 min-w-0",children:[s.jsxs("div",{className:"flex flex-col sm:flex-row sm:gap-2 sm:items-baseline",children:[s.jsx("h3",{className:"font-medium text-skin-base truncate",children:e.name}),s.jsx("p",{className:"text-sm text-skin-base opacity-60 truncate",children:v(e.url)})]}),e.description&&s.jsx("p",{className:"text-sm text-skin-base opacity-70 line-clamp-2",children:e.description})]})]})}function F({links:e,categories:t}){const[n,a]=u.useState("all"),c=n==="all"?e:e.filter(r=>r.category===n);return s.jsx("div",{className:"w-full",children:s.jsxs("div",{className:"flex flex-col gap-6 sm:flex-row",children:[s.jsx("aside",{className:"hidden w-60 shrink-0 sm:block",children:s.jsx("div",{className:"space-y-2",children:t.map(r=>s.jsx(B,{category:r,selected:n===r.id,onClick:()=>a(r.id)},r.id))})}),s.jsxs("main",{className:"flex-1",children:[s.jsx("div",{className:"mb-6 sm:hidden",children:s.jsx("select",{value:n,onChange:r=>a(r.target.value),className:`w-full rounded border border-skin-line bg-skin-card
                p-3 text-skin-base focus-outline`,children:t.map(r=>s.jsx("option",{value:r.id,children:`${r.name} (${r.count})`},r.id))})}),c.length>0?s.jsx("div",{className:"grid gap-4 sm:grid-cols-2",children:c.map(r=>s.jsx(T,{link:r},r.id))}):s.jsx("p",{className:"text-center text-skin-base opacity-70",children:"No links in this category yet."})]})]})})}export{F as default};
