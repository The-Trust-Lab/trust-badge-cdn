"use strict";var TrustLabsBadge=(()=>{var o=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var m=(t,a)=>{for(var e in a)o(t,e,{get:a[e],enumerable:!0})},p=(t,a,e,i)=>{if(a&&typeof a=="object"||typeof a=="function")for(let s of h(a))!g.call(t,s)&&s!==e&&o(t,s,{get:()=>a[s],enumerable:!(i=d(a,s))||i.enumerable});return t};var b=t=>p(o({},"__esModule",{value:!0}),t);var v={};m(v,{TrustLabsBadge:()=>n});var n=class t extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance()}attributeChangedCallback(e,i,s){i!==s&&(this.updateAttributes(),e==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}registerInstance(){if(!this.email){this.showFallback();return}t.instanceQueue.push({element:this,email:this.email}),t.processingQueue||setTimeout(()=>{t.processQueue()},0)}static async processQueue(){if(!(t.processingQueue||t.instanceQueue.length===0)){t.processingQueue=!0;try{await t.processInstanceGroup(t.instanceQueue)}catch(e){console.error("Error processing badge queue:",e),t.instanceQueue.forEach(i=>{i.element.showFallback()})}finally{t.instanceQueue=[],t.processingQueue=!1}}}static async processInstanceGroup(e){let i=e.map(s=>s.email).join(",");try{let s=await fetch(`https://api.trustlabs.pro/api/public/trust-status?emails=${encodeURIComponent(i)}`,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);let l=await s.json(),u=new Map;l.results?.forEach(r=>{u.set(r.email,r)}),e.forEach(r=>{let c=u.get(r.email);c?r.element.updateDisplay(c):r.element.showFallback()})}catch(s){console.error("Error fetching trust status:",s),e.forEach(l=>{l.element.showNetworkError()})}}updateDisplay(e){let i=this.shadow.querySelector(".trustlabs-badge");i&&(e.verified?(i.classList.remove("unverified"),i.classList.add("verified")):(i.classList.add("unverified"),i.classList.remove("verified")))}showFallback(){let e=this.shadow.querySelector(".trustlabs-badge");e&&(e.classList.add("unverified"),e.classList.remove("verified"))}showNetworkError(){let e=this.shadow.querySelector(".trustlabs-badge");e&&(e.classList.add("unverified"),e.classList.remove("verified"))}render(){this.shadow.innerHTML=`
      <style>
        :host {
          display: inline-block;
          vertical-align: middle;
          line-height: 1;
        }

        .trustlabs-badge {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          cursor: default; /* No longer interactive */
          line-height: 1;
        }

        .trustlabs-badge-img {
          height: 1.2em;
          width: auto;
          display: block;
          vertical-align: middle;
        }
        
        .trustlabs-badge.unverified .trustlabs-badge-img {
          opacity: 0.5;
          filter: grayscale(100%);
        }
      </style>
      <div class="trustlabs-badge">
        <img src="https://nlpchevsebljzvqznvzw.supabase.co/storage/v1/object/sign/Trust%20Badge/trustscorebadge.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82N2ViYzdjNy1iYmVhLTRmNTEtOWIxMS05ZjEzZWIzMDU2YjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUcnVzdCBCYWRnZS90cnVzdHNjb3JlYmFkZ2UucG5nIiwiaWF0IjoxNzU1NjI5NTcxLCJleHAiOjE3ODcxNjU1NzF9.28_bwInSW1aJrqcuuDzEhS_JdbK2t2hik5qA9rl8QvM" class="trustlabs-badge-img" alt="TrustLabs Verification Badge" />
      </div>
    `}};customElements.define("trustlabs-badge",n);return b(v);})();
