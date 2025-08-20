"use strict";var TrustLabsBadge=(()=>{var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var g=(a,s)=>{for(var e in s)l(a,e,{get:s[e],enumerable:!0})},h=(a,s,e,t)=>{if(s&&typeof s=="object"||typeof s=="function")for(let i of u(s))!m.call(a,i)&&i!==e&&l(a,i,{get:()=>s[i],enumerable:!(t=p(s,i))||t.enumerable});return a};var b=a=>h(l({},"__esModule",{value:!0}),a);var f={};g(f,{TrustLabsBadge:()=>n});var n=class a extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance()}attributeChangedCallback(e,t,i){t!==i&&(this.updateAttributes(),e==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}registerInstance(){if(!this.email){this.showFallback();return}a.instanceQueue.push({element:this,email:this.email}),a.processingQueue||setTimeout(()=>{a.processQueue()},0)}static async processQueue(){if(!(a.processingQueue||a.instanceQueue.length===0)){a.processingQueue=!0;try{await a.processInstanceGroup(a.instanceQueue)}catch(e){console.error("Error processing badge queue:",e),a.instanceQueue.forEach(t=>{t.element.showFallback()})}finally{a.instanceQueue=[],a.processingQueue=!1}}}static async processInstanceGroup(e){let t=e.map(i=>i.email).join(",");try{let i=await fetch(`https://api.trustlabs.pro/api/public/trust-status?emails=${encodeURIComponent(t)}`,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!i.ok)throw new Error(`HTTP ${i.status}: ${i.statusText}`);let o=await i.json(),d=new Map;o.results?.forEach(r=>{d.set(r.email,r)}),e.forEach(r=>{let c=d.get(r.email);c?r.element.updateDisplay(c):r.element.showFallback()})}catch(i){console.error("Error fetching trust status:",i),e.forEach(o=>{o.element.showNetworkError()})}}updateDisplay(e){let t=this.shadow.querySelector(".trustlabs-badge"),i=this.shadow.querySelector(".modal");if(!(!t||!i))if(e.verified){t.classList.remove("unverified"),t.classList.add("verified");let o=e.completed_at?new Date(e.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Unknown";i.innerHTML=`
        <div class="modal-title" style="color: #2e7d32; margin-bottom: 8px;">
          <strong>Verified</strong>
        </div>
        <div class="modal-row" style="margin-bottom: 8px;">
          <strong>Verified since:</strong> ${o}
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
          <a href="https://trustlabs.pro" 
             style="color: #0066cc; text-decoration: none; display: block;">
            Learn more about Trust Verification
          </a>
        </div>
      `}else{t.classList.add("unverified"),t.classList.remove("verified");let o=e.completed_at?new Date(e.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"N/A";i.innerHTML=`
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
      `}}showFallback(){let e=this.shadow.querySelector(".trustlabs-badge"),t=this.shadow.querySelector(".modal");!e||!t||(e.classList.add("unverified"),e.classList.remove("verified"),t.innerHTML=`
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
    `)}showNetworkError(){let e=this.shadow.querySelector(".trustlabs-badge"),t=this.shadow.querySelector(".modal");!e||!t||(e.classList.add("unverified"),e.classList.remove("verified"),t.innerHTML=`
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
          position: absolute;
          visibility: hidden;
          opacity: 0;
          background-color: #ffffff !important;
          background: #ffffff !important;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
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
        }

        .trustlabs-badge:hover .modal {
          visibility: visible !important;
          opacity: 1 !important;
          background-color: #ffffff !important;
          background: #ffffff !important;
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
    `}};customElements.define("trustlabs-badge",n);return b(f);})();
