import{a as R,r as g}from"./index.CbttJwvd.js";var d={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m;function w(){if(m)return a;m=1;var n=R(),o=Symbol.for("react.element"),u=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,f=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function c(s,e,v){var r,i={},p=null,_=null;v!==void 0&&(p=""+v),e.key!==void 0&&(p=""+e.key),e.ref!==void 0&&(_=e.ref);for(r in e)l.call(e,r)&&!t.hasOwnProperty(r)&&(i[r]=e[r]);if(s&&s.defaultProps)for(r in e=s.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:o,type:s,key:p,ref:_,props:i,_owner:f.current}}return a.Fragment=u,a.jsx=c,a.jsxs=c,a}var x;function y(){return x||(x=1,d.exports=w()),d.exports}var b=y();const L=g.createContext(void 0),S=()=>{const n=g.useContext(L);return n||(console.warn("useLanguage must be used within a LanguageProvider. Using default values."),{language:"en",toggleLanguage:()=>console.warn("Language toggle not available - provider not found"),setLanguage:()=>console.warn("Language set not available - provider not found")})},O=({children:n})=>{const[o,u]=g.useState(()=>{if(typeof window<"u"){const t=localStorage.getItem("language");return t==="pt"||t==="en"?t:navigator.language.toLowerCase().startsWith("pt")?"pt":"en"}return"en"}),l=()=>{u(t=>t==="pt"?"en":"pt")},f=t=>{u(t)};return g.useEffect(()=>{typeof window<"u"&&localStorage.setItem("language",o)},[o]),b.jsx(L.Provider,{value:{language:o,toggleLanguage:l,setLanguage:f},children:n})};export{O as L,b as j,S as u};
