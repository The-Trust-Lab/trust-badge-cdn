"use strict";var TrustLabsBadge=(()=>{var l=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var h=(i,s)=>{for(var e in s)l(i,e,{get:s[e],enumerable:!0})},b=(i,s,e,a)=>{if(s&&typeof s=="object"||typeof s=="function")for(let t of m(s))!p.call(i,t)&&t!==e&&l(i,t,{get:()=>s[t],enumerable:!(a=u(s,t))||a.enumerable});return i};var g=i=>b(l({},"__esModule",{value:!0}),i);var v={};h(v,{TrustLabsBadge:()=>n});var n=class i extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance()}attributeChangedCallback(e,a,t){a!==t&&(this.updateAttributes(),e==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}registerInstance(){if(!this.email){this.showFallback();return}i.instanceQueue.push({element:this,email:this.email}),i.processingQueue||setTimeout(()=>{i.processQueue()},0)}static async processQueue(){if(!(i.processingQueue||i.instanceQueue.length===0)){i.processingQueue=!0;try{await i.processInstanceGroup(i.instanceQueue)}catch(e){console.error("Error processing badge queue:",e),i.instanceQueue.forEach(a=>{a.element.showFallback()})}finally{i.instanceQueue=[],i.processingQueue=!1}}}static async processInstanceGroup(e){let a=e.map(t=>t.email).join(",");try{let t=await fetch(`http://localhost:8080/api/public/trust-status?emails=${encodeURIComponent(a)}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);let o=await t.json(),d=new Map;o.results?.forEach(r=>{d.set(r.email,r)}),e.forEach(r=>{let c=d.get(r.email);c?r.element.updateDisplay(c):r.element.showFallback()})}catch(t){console.error("Error fetching trust status:",t),e.forEach(o=>{o.element.showFallback()})}}updateDisplay(e){let a=this.shadow.querySelector(".trustlabs-badge"),t=this.shadow.querySelector(".modal");if(!(!a||!t))if(e.verified){a.classList.remove("unverified"),a.classList.add("verified");let o=e.completed_at?new Date(e.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Unknown";t.innerHTML=`
        <div class="modal-title verified">Verified</div>
        <div class="modal-row">
          <strong>Verified since:</strong> ${o}
        </div>
      `}else a.classList.add("unverified"),a.classList.remove("verified"),t.innerHTML=`
        <div class="modal-title unverified">Not Verified</div>
      `}showFallback(){let e=this.shadow.querySelector(".trustlabs-badge"),a=this.shadow.querySelector(".modal");!e||!a||(e.classList.add("unverified"),e.classList.remove("verified"),a.innerHTML=`
      <div class="modal-title error">Verification Unavailable</div>
    `)}render(){this.shadow.innerHTML=`
      <style>
        :host {
          display: inline-block;
          vertical-align: middle;
        }

        .trustlabs-badge {
          display: inline-block;
          cursor: help;
          position: relative;
          transition: opacity 0.2s ease;
        }

        .trustlabs-badge:hover {
          opacity: 0.8;
        }

        .trustlabs-badge.unverified {
          opacity: 0.4;
        }

        .trustlabs-badge.unverified:hover {
          opacity: 0.6;
        }

        .badge-image {
          height: ${this.size==="sm"?"16px":"20px"};
          width: auto;
          display: block;
          vertical-align: middle;
        }

        .modal {
          position: absolute;
          visibility: hidden;
          opacity: 0;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          z-index: 10000;
          width: 250px;
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
          font-size: 14px;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.4;
          backdrop-filter: blur(10px);
        }

        .trustlabs-badge:hover .modal {
          visibility: visible;
          opacity: 1;
        }

        .modal-title {
          margin-bottom: 8px;
          font-weight: bold;
        }

        .modal-title.verified {
          color: #2e7d32;
        }

        .modal-title.unverified {
          color: #757575;
        }

        .modal-title.error {
          color: #d32f2f;
        }

        .modal-row {
          margin-top: 8px;
        }

        .modal-row strong {
          font-weight: 600;
        }

        @media (prefers-reduced-motion: reduce) {
          .trustlabs-badge,
          .modal {
            transition: none;
          }
        }
      </style>

      <div class="trustlabs-badge">
        <img class="badge-image" src="https://nlpchevsebljzvqznvzw.supabase.co/storage/v1/object/sign/Trust%20Badge/trustscorebadge.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82N2ViYzdjNy1iYmVhLTRmNTEtOWIxMS05ZjEzZWIzMDU2YjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUcnVzdCBCYWRnZS90cnVzdHNjb3JlYmFkZ2UucG5nIiwiaWF0IjoxNzU1NjI5NTcxLCJleHAiOjE3ODcxNjU1NzF9.28_bwInSW1aJrqcuuDzEhS_JdbK2t2hik5qA9rl8QvM" alt="TrustLabs Badge">
        <div class="modal">
          <div class="modal-title">Loading verification status...</div>
        </div>
      </div>
    `}};customElements.define("trustlabs-badge",n);return g(v);})();
