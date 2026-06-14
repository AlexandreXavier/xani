import{r as s}from"./index.DK-fsZOb.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),h=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),i=t=>{const e=h(t);return e.charAt(0).toUpperCase()+e.slice(1)},l=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),C=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:n="",children:a,iconNode:u,...c},m)=>s.createElement("svg",{ref:m,...f,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:l("lucide",n),...!a&&!C(c)&&{"aria-hidden":"true"},...c},[...u.map(([p,d])=>s.createElement(p,d)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(t,e)=>{const r=s.forwardRef(({className:o,...n},a)=>s.createElement(g,{ref:a,iconNode:e,className:l(`lucide-${w(i(t))}`,`lucide-${t}`,o),...n}));return r.displayName=i(t),r};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],A=k("lock",y);export{A as L,k as c};
