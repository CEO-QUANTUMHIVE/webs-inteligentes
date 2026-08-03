var _=Object.defineProperty;var w=(e,t,n)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var s=(e,t,n)=>w(e,typeof t!="symbol"?t+"":t,n);var E="__framer_force_showing_editorbar_since",P="__framer_editor_button_position",c="2147483647";var F=300;var a=12,d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAApNJREFUSA2tlUtLlFEYgEe7mtFFQ8NLFBG1SJAwahtiLVy5ceVSEPQH1LZf0Lp9FO1bdYNyI7gyBFcS2kAzilYq3sfxeYZ55Zv6FGfohWfOd97vnPd23u9MXeZoaeb1Q7gPHXAFzsAS5GACxiEPqVKXqs1kmtAPQi+cAtedToz1PJ8ExxPwDl7CAlRImoN7rBiF86ABHTiGAzMIh8n3O+ifwWc4EL0n5TGTYQijvjNSxbUadozInUeGZ3nuh1WYgpIkM+hGMwYajAgdrfUn+AaLoLTCAxiAOxCZxL4RdB+gZMjxEjwHo4hS8Jh5DR9hz0mKaNizegoNEI7Wee6FXJTISG6AUgDr+QImoAiHie+mwZJow/PRps4uwnsnRj8Epqc4voVJJ8eULOtW4BFYYjPpgjc+3IWI2sh/wFeoVl6xYQ48dDGLfjOwc/ygQqz595hUMVouS9QHBm4l6k3HWpnBLqicgVrlCxujSbR1Swd+UDpQYRS/oVaZZ2MWwlZBB9Zdxf+QTYw8SRgq6sAvz7vH6JULEB9USVHFjzZskgPRQR4ayxoXXIdaHdg9HrB2rErByWxZERnYtrWUzD0esDbtTmXPhzXwHrKLxEUbYGbVyDkWWwkdadfqbPmwDXZSCyh2VAf8BM/nOOJH5Y0QopMt2I5U/KO4DZZJB47XwEX+ex0mGroMV8sLwp56gyuGwiyW4SZ4c8bt2cZzO7jBNeqtsRHbeZ1g9krsMbhfYPv/c5gecA+4yAVuitFszE5Hjva872OMdXagF19JIoOYWyozMTI3J0tmA6gLvXPfO1cc/XOqOLe/HbjwD8yCXRD3VNJROEgatiRZMJsKsbZHia3nAdphtq8fkiWyXJbBe8uM1aXKPouNnz2Bm1kwAAAAAElFTkSuQmCC",R="__framer-editorbar-container",u="__framer-editorbar-label",x="__framer-editorbar-button",v="__framer-editorbar-loading-spinner",I="__framer-editorbar-button-tooltip-visible",O=`
#${R} {
    align-items: center;
    display: flex;
    gap: 8px;
    position: fixed;
    z-index: calc(${c});
    width: max-content;
    cursor: pointer;
}

#${u} {
    background-color: #111;
    border-radius: 8px;
    font-family: "Inter", "Inter-Regular", system-ui, Arial, sans-serif;
    font-size: 12px;
    height: fit-content;
    opacity: 0;
    padding: 4px 8px;
    transition: opacity 0.4s ease-out;
    font-weight: 500;
    flex-shrink: 0;
    position: fixed;
    width: max-content;
    pointer-events: none;
    user-select: none;
}

#${x} {
    all: unset;
    align-items: center;
    border-radius: 15px;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 30px;
    flex-shrink: 0;
}

#${u}.${I} {
    opacity: 1;
}

#${u}, #${x} {
    backdrop-filter: blur(10px);
    background-color: rgba(34, 34, 34, 0.8);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px;
    color: #fff;
}

#${v} {
    width: ${a}px;
    height: ${a}px;
    -webkit-mask: url(${d});
    mask: url(${d});
    -webkit-mask-size: ${a}px;
    mask-size: ${a}px;
    background-color: #fff;


    animation-duration: 800ms;
    animation-iteration-count: infinite;
    animation-name: __framer-loading-spin;
    animation-timing-function: linear;
}

@keyframes __framer-loading-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`,g=document.createElement("style");g.innerHTML=O;document.head.appendChild(g);var f=class extends Promise{constructor(){let n,o;super((r,h)=>{n=r,o=h});s(this,"_state","initial");s(this,"resolve");s(this,"reject");this.resolve=r=>{this._state="fulfilled",n(r)},this.reject=r=>{this._state="rejected",o(r)}}get state(){return this._state}pending(){return this._state="pending",this}isResolved(){return this._state==="fulfilled"||this._state==="rejected"}};f.prototype.constructor=Promise;function i(){return typeof navigator<"u"?navigator:void 0}var T=/Edg\//u;function A(){let e=i();return e?T.test(e.userAgent):!1}var S=/Chrome/u,y=/Google Inc/u;function b(){let e=i();return e?S.test(e.userAgent)&&y.test(e.vendor)&&!A():!1}var k=/AppleWebKit\//u;function D(){let e=i();return e?k.test(e.userAgent)&&!b()&&!A():!1}function L(){let e=i();return e?b()&&e.userAgent.toLowerCase().includes("; wv)"):!1}function B(){let e=i();return e?D()&&!e.userAgent.toLowerCase().includes("safari/"):!1}function Z(){return L()||B()}function m(e){let t=window.__framer_editorBarDependencies;if(!t)throw new Error("Dependencies not found");if(t.__version<1||t.__version>3)throw new Error("Unsupported version");let n=t[e];if(!n)throw new Error("Dependency not found");return n}var{createElement:l,memo:G,useCallback:K,useEffect:$,useRef:J,useState:Q,useLayoutEffect:q}=m("react");function ne(e,t,n){let{children:o,...r}=t??{};return n!==void 0&&(r.key=n),l(e,r,o)}function oe(e,t,n){let{children:o,...r}=t??{};return n!==void 0&&(r.key=n),l(e,r,...o)}var p=class extends Error{};function ie(e,t){if(e)return;if(typeof t=="function")try{t=t()}catch{t="(assert message threw)"}typeof t=="string"&&t.length>2048&&(t=t.slice(0,2048)+"\u2026");let n=new p(t?"Assertion Error: "+t:"Assertion Error");if(n.stack)try{let o=n.stack.split(`
`);o[1]?.includes("assert")?(o.splice(1,1),n.stack=o.join(`
`)):o[0]?.includes("assert")&&(o.splice(0,1),n.stack=o.join(`
`))}catch{}throw n}function se(e,t){throw t instanceof Error?t:t!==void 0?new Error(String(t)):new Error(e?`Unexpected value: ${e}`:"Application entered invalid state")}export{s as a,E as b,P as c,c as d,F as e,R as f,u as g,x as h,v as i,I as j,f as k,Z as l,m,G as n,K as o,$ as p,J as q,Q as r,ie as s,se as t,ne as u,oe as v};
//# sourceMappingURL=https://app.framerstatic.com/chunk-SNOPVCZ2.mjs.map
