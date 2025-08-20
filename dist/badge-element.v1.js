"use strict";var TrustLabsBadge=(()=>{var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var g=(i,o)=>{for(var t in o)l(i,t,{get:o[t],enumerable:!0})},h=(i,o,t,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of m(o))!u.call(i,a)&&a!==t&&l(i,a,{get:()=>o[a],enumerable:!(e=p(o,a))||e.enumerable});return i};var b=i=>h(l({},"__esModule",{value:!0}),i);var v={};g(v,{TrustLabsBadge:()=>n});var n=class i extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance()}attributeChangedCallback(t,e,a){e!==a&&(this.updateAttributes(),t==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}registerInstance(){if(!this.email){this.showFallback();return}i.instanceQueue.push({element:this,email:this.email}),i.processingQueue||setTimeout(()=>{i.processQueue()},0)}static async processQueue(){if(!(i.processingQueue||i.instanceQueue.length===0)){i.processingQueue=!0;try{await i.processInstanceGroup(i.instanceQueue)}catch(t){console.error("Error processing badge queue:",t),i.instanceQueue.forEach(e=>{e.element.showFallback()})}finally{i.instanceQueue=[],i.processingQueue=!1}}}static async processInstanceGroup(t){let e=t.map(a=>a.email).join(",");try{let a=await fetch(`https://api.trustlabs.pro/api/public/trust-status?emails=${encodeURIComponent(e)}`,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);let s=await a.json(),d=new Map;s.results?.forEach(r=>{d.set(r.email,r)}),t.forEach(r=>{let c=d.get(r.email);c?r.element.updateDisplay(c):r.element.showFallback()})}catch(a){console.error("Error fetching trust status:",a),t.forEach(s=>{s.element.showNetworkError()})}}updateDisplay(t){let e=this.shadow.querySelector(".trustlabs-badge"),a=this.shadow.querySelector(".modal");if(!(!e||!a))if(t.verified){e.classList.remove("unverified"),e.classList.add("verified");let s=t.completed_at?new Date(t.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Unknown";a.innerHTML=`
        <div class="modal-title" style="color: #2e7d32; margin-bottom: 8px;">
          <strong>Verified</strong>
        </div>
        <div class="modal-row" style="margin-bottom: 8px;">
          <strong>Verified since:</strong> ${s}
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
          <a href="https://trustlabs.pro" 
             style="color: #0066cc; text-decoration: none; display: block;">
            Learn more about Trust Verification
          </a>
        </div>
      `}else{e.classList.add("unverified"),e.classList.remove("verified");let s=t.completed_at?new Date(t.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"N/A";a.innerHTML=`
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
          /* Positioning & Initial State */
          position: absolute !important;
          display: none !important;
          z-index: 2147483647 !important; /* Max z-index */
          width: 300px !important;
          left: calc(100% + 10px) !important;
          top: 50% !important;
          transform: translateY(-50%) !important;

          /* Absolutely SOLID Background */
          background-color: white !important;
          background: white !important;
          opacity: 1 !important;
          
          /* Border & Spacing */
          border: 1px solid #c0c0c0 !important;
          border-radius: 8px !important;
          padding: 12px !important;

          /* Font Styles */
          font-size: 14px !important;
          color: black !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;

          /* Remove ALL potential transparency sources */
          box-shadow: none !important;
          filter: none !important;
          backdrop-filter: none !important;
          transition: none !important;
        }

        .trustlabs-badge:hover .modal {
          display: block !important;
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
    `}};customElements.define("trustlabs-badge",n);return b(v);})();
