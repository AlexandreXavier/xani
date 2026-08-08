import{j as e}from"./jsx-runtime.ClP7wGfN.js";import{r}from"./index.DK-fsZOb.js";import{c}from"./createLucideIcon.BzBjTmwi.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],f=c("pause",x);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],h=c("play",y),l={pt:{play:"Ouvir",pause:"Pausa"},en:{play:"Listen",pause:"Pause"}};function P({src:u,lang:p="en"}){const n=r.useRef(null),[a,t]=r.useState(!1),o=l[p]??l.en,i=a?o.pause:o.play,d=()=>{const s=n.current;s&&(s.paused?s.play():s.pause())};return e.jsxs("span",{className:"inline-flex items-center",children:[e.jsxs("button",{type:"button",onClick:d,"aria-pressed":a,"aria-label":i,className:"focus-outline inline-flex items-center gap-1 text-sm hover:opacity-75",children:[a?e.jsx(f,{className:"h-4 w-4","aria-hidden":"true"}):e.jsx(h,{className:"h-4 w-4","aria-hidden":"true"}),e.jsx("span",{children:i})]}),e.jsx("audio",{ref:n,src:u,preload:"none",onPlay:()=>t(!0),onPause:()=>t(!1),onEnded:()=>t(!1)})]})}export{P as default};
