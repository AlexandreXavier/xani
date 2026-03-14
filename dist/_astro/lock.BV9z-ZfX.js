import{a as v,r as p}from"./index.DK-fsZOb.js";var _={exports:{}},c={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var w;function C(){if(w)return c;w=1;var r=v(),e=Symbol.for("react.element"),o=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,u=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(i,t,m){var n,f={},d=null,x=null;m!==void 0&&(d=""+m),t.key!==void 0&&(d=""+t.key),t.ref!==void 0&&(x=t.ref);for(n in t)s.call(t,n)&&!a.hasOwnProperty(n)&&(f[n]=t[n]);if(i&&i.defaultProps)for(n in t=i.defaultProps,t)f[n]===void 0&&(f[n]=t[n]);return{$$typeof:e,type:i,key:d,ref:x,props:f,_owner:u.current}}return c.Fragment=o,c.jsx=l,c.jsxs=l,c}var h;function k(){return h||(h=1,_.exports=C()),_.exports}var P=k();/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,s)=>s?s.toUpperCase():o.toLowerCase()),y=r=>{const e=g(r);return e.charAt(0).toUpperCase()+e.slice(1)},R=(...r)=>r.filter((e,o,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===o).join(" ").trim(),L=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var b={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=p.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:u="",children:a,iconNode:l,...i},t)=>p.createElement("svg",{ref:t,...b,width:e,height:e,stroke:r,strokeWidth:s?Number(o)*24/Number(e):o,className:R("lucide",u),...!a&&!L(i)&&{"aria-hidden":"true"},...i},[...l.map(([m,n])=>p.createElement(m,n)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(r,e)=>{const o=p.forwardRef(({className:s,...u},a)=>p.createElement(O,{ref:a,iconNode:e,className:R(`lucide-${E(y(r))}`,`lucide-${r}`,s),...u}));return o.displayName=y(r),o};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],$=j("lock",A);export{$ as L,j as c,P as j};
