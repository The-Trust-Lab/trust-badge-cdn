"use strict";var TrustLabsBadge=(()=>{var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var g=(a,o)=>{for(var t in o)l(a,t,{get:o[t],enumerable:!0})},b=(a,o,t,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of m(o))!u.call(a,i)&&i!==t&&l(a,i,{get:()=>o[i],enumerable:!(e=p(o,i))||e.enumerable});return a};var h=a=>b(l({},"__esModule",{value:!0}),a);var f={};g(f,{TrustLabsBadge:()=>n});var n=class a extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance()}attributeChangedCallback(t,e,i){e!==i&&(this.updateAttributes(),t==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}registerInstance(){if(!this.email){this.showFallback();return}a.instanceQueue.push({element:this,email:this.email}),a.processingQueue||setTimeout(()=>{a.processQueue()},0)}static async processQueue(){if(!(a.processingQueue||a.instanceQueue.length===0)){a.processingQueue=!0;try{await a.processInstanceGroup(a.instanceQueue)}catch(t){console.error("Error processing badge queue:",t),a.instanceQueue.forEach(e=>{e.element.showFallback()})}finally{a.instanceQueue=[],a.processingQueue=!1}}}static async processInstanceGroup(t){let e=t.map(i=>i.email).join(",");try{let i=await fetch(`https://api.trustlabs.pro/api/public/trust-status?emails=${encodeURIComponent(e)}`,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);let r=await i.json(),d=new Map;r.results?.forEach(s=>{d.set(s.email,s)}),t.forEach(s=>{let c=d.get(s.email);c?s.element.updateDisplay(c):s.element.showFallback()})}catch(i){console.error("Error fetching trust status:",i),t.forEach(r=>{r.element.showNetworkError()})}}updateDisplay(t){let e=this.shadow.querySelector(".trustlabs-badge"),i=this.shadow.querySelector(".modal");if(!(!e||!i))if(t.verified){e.classList.remove("unverified"),e.classList.add("verified");let r=t.completed_at?new Date(t.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Unknown";i.innerHTML=`
        <div class="modal-title" style="color: #2e7d32; margin-bottom: 8px;">
          <strong>Verified</strong>
        </div>
        <div class="modal-row" style="margin-bottom: 8px;">
          <strong>Verified since:</strong> ${r}
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
          <a href="https://trustlabs.pro" 
             style="color: #0066cc; text-decoration: none; display: block;">
            Learn more about Trust Verification
          </a>
        </div>
      `}else{e.classList.add("unverified"),e.classList.remove("verified");let r=t.completed_at?new Date(t.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"N/A";i.innerHTML=`
        <div class="modal-title" style="color: #757575; margin-bottom: 8px;">
          <strong>Not Verified</strong>
        </div>
        <div class="modal-row" style="margin-bottom: 8px;">
          This user has not completed trust verification.
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
          <a href="https://trustlabs.pro" 
             style="color: #0066cc; text-decoration: none; display: block;">
            Learn more about Trust Verification
          </a>
        </div>
      `}}showFallback(){let t=this.shadow.querySelector(".trustlabs-badge"),e=this.shadow.querySelector(".modal");!t||!e||(t.classList.add("unverified"),t.classList.remove("verified"),e.innerHTML=`
      <div class="modal-title" style="color: #757575; margin-bottom: 8px;">
        <strong>User Not Found</strong>
      </div>
      <div class="modal-row" style="margin-bottom: 8px;">
        This user has not registered for trust verification.
      </div>
      <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
        <a href="https://trustlabs.pro" 
           style="color: #0066cc; text-decoration: none; display: block;">
          Learn more about Trust Verification
        </a>
      </div>
    `)}showNetworkError(){let t=this.shadow.querySelector(".trustlabs-badge"),e=this.shadow.querySelector(".modal");!t||!e||(t.classList.add("unverified"),t.classList.remove("verified"),e.innerHTML=`
      <div class="modal-title" style="color: #757575; margin-bottom: 8px;">
        <strong>Verification Unknown</strong>
      </div>
      <div class="modal-row" style="margin-bottom: 8px;">
        Unable to fetch verification status. Please try again later.
      </div>
      <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
        <a href="https://trustlabs.pro" 
           style="color: #0066cc; text-decoration: none; display: block;">
          Learn more about Trust Verification
        </a>
      </div>
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
          position: absolute !important;
          display: none !important;
          background: #ffffff !important;
          background-color: #ffffff !important;
          border: 2px solid #333333 !important;
          border-radius: 6px !important;
          padding: 12px !important;
          box-shadow: 0 2px 8px #000000 !important;
          z-index: 99999 !important;
          width: 240px !important;
          left: calc(100% + 8px) !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          font-size: 13px !important;
          color: #000000 !important;
          font-family: Arial, sans-serif !important;
          line-height: 1.3 !important;
          opacity: 1 !important;
          visibility: visible !important;
          backdrop-filter: none !important;
          filter: none !important;
        }

        .trustlabs-badge:hover .modal {
          display: block !important;
          background: #ffffff !important;
          background-color: #ffffff !important;
          opacity: 1 !important;
          visibility: visible !important;
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
    `}};customElements.define("trustlabs-badge",n);return h(f);})();
