"use strict";var TrustLabsBadge=(()=>{var n=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var b=(t,r)=>{for(var e in r)n(t,e,{get:r[e],enumerable:!0})},m=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let s of p(r))!h.call(t,s)&&s!==e&&n(t,s,{get:()=>r[s],enumerable:!(a=c(r,s))||a.enumerable});return t};var f=t=>m(n({},"__esModule",{value:!0}),t);var g={};b(g,{TrustLabsBadge:()=>o});var o=class t extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.trustStatus=null;this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance(),this.setupEventListeners()}attributeChangedCallback(e,a,s){a!==s&&(this.updateAttributes(),e==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}setupEventListeners(){let e=this.shadow.querySelector(".trustlabs-badge");e&&(e.addEventListener("mouseenter",()=>this.showModal()),e.addEventListener("mouseleave",()=>this.hideModal()))}showModal(){let e=this.shadow.querySelector(".trustlabs-modal");e&&(e.style.display="block")}hideModal(){let e=this.shadow.querySelector(".trustlabs-modal");e&&(e.style.display="none")}registerInstance(){if(!this.email){this.showFallback();return}t.instanceQueue.push({element:this,email:this.email}),t.processingQueue||setTimeout(()=>{t.processQueue()},0)}static async processQueue(){if(!(t.processingQueue||t.instanceQueue.length===0)){t.processingQueue=!0;try{await t.processInstanceGroup(t.instanceQueue)}catch(e){console.error("Error processing badge queue:",e),t.instanceQueue.forEach(a=>{a.element.showFallback()})}finally{t.instanceQueue=[],t.processingQueue=!1}}}static async processInstanceGroup(e){let a=e.map(s=>s.email).join(",");try{let s=await fetch(`https://api.trustlabs.pro/api/public/trust-status?emails=${encodeURIComponent(a)}`,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);let d=await s.json(),l=new Map;d.results?.forEach(i=>{l.set(i.email,i)}),e.forEach(i=>{let u=l.get(i.email);u?i.element.updateDisplay(u):i.element.showFallback()})}catch(s){console.error("Error fetching trust status:",s),e.forEach(d=>{d.element.showNetworkError()})}}updateDisplay(e){this.trustStatus=e;let a=this.shadow.querySelector(".trustlabs-badge");a&&(e.verified?(a.classList.remove("unverified"),a.classList.add("verified")):(a.classList.add("unverified"),a.classList.remove("verified")),this.updateModalContent())}updateModalContent(){let e=this.shadow.querySelector(".modal-content");if(!(!e||!this.trustStatus))if(this.trustStatus.verified){let a=this.trustStatus.completed_at?new Date(this.trustStatus.completed_at).toLocaleDateString():"Unknown date";e.innerHTML=`
        <div class="modal-header verified">
          <h3>Verified</h3>
        </div>
        <div class="modal-body">
          <p><strong>Verified on:</strong> ${a}</p>
        </div>
        <div class="modal-footer">
          <a href="https://trustlabs.pro" target="_blank" rel="noopener noreferrer">Visit TrustLabs</a>
        </div>
      `}else e.innerHTML=`
        <div class="modal-header unverified">
          <h3>Unverified</h3>
        </div>
        <div class="modal-body">
          <p>This user has not been verified by TrustLabs.</p>
        </div>
        <div class="modal-footer">
          <a href="https://trustlabs.pro" target="_blank" rel="noopener noreferrer">Get Verified</a>
        </div>
      `}showFallback(){this.trustStatus=null;let e=this.shadow.querySelector(".trustlabs-badge");e&&(e.classList.add("unverified"),e.classList.remove("verified"),this.updateModalContent())}showNetworkError(){this.trustStatus=null;let e=this.shadow.querySelector(".trustlabs-badge");e&&(e.classList.add("unverified"),e.classList.remove("verified"),this.updateModalContent())}render(){this.shadow.innerHTML=`
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
          cursor: pointer;
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

        .trustlabs-modal {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          padding: 0;
          min-width: 280px;
          max-width: 320px;
          z-index: 1000;
          display: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          line-height: 1.4;
        }

        .modal-header {
          padding: 16px 16px 12px;
          border-bottom: 1px solid #f0f0f0;
          border-radius: 8px 8px 0 0;
        }

        .modal-header.verified {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .modal-header.unverified {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          color: white;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .modal-body {
          padding: 16px;
          background: white;
        }

        .modal-body p {
          margin: 0 0 8px 0;
          color: #374151;
        }

        .modal-body p:last-child {
          margin-bottom: 0;
        }

        .modal-footer {
          padding: 12px 16px 16px;
          border-top: 1px solid #f0f0f0;
          background: #f9fafb;
          border-radius: 0 0 8px 8px;
        }

        .modal-footer a {
          display: inline-block;
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .modal-footer a:hover {
          background: #2563eb;
        }

        /* Arrow pointing up */
        .trustlabs-modal::before {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 8px solid transparent;
          border-bottom-color: #e0e0e0;
        }

        .trustlabs-modal::after {
          content: '';
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-bottom-color: white;
          margin-bottom: 1px;
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          .trustlabs-modal {
            background: #1f2937;
            border-color: #374151;
            color: #f9fafb;
          }

          .modal-body {
            background: #1f2937;
            color: #f9fafb;
          }

          .modal-body p {
            color: #d1d5db;
          }

          .modal-footer {
            background: #111827;
            border-top-color: #374151;
          }

          .trustlabs-modal::after {
            border-bottom-color: #1f2937;
          }
        }
      </style>
      <div class="trustlabs-badge">
        <img src="https://nlpchevsebljzvqznvzw.supabase.co/storage/v1/object/sign/Trust%20Badge/trustscorebadge.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82N2ViYzdjNy1iYmVhLTRmNTEtOWIxMS05ZjEzZWIzMDU2YjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUcnVzdCBCYWRnZS90cnVzdHNjb3JlYmFkZ2UucG5nIiwiaWF0IjoxNzU1NjI5NTcxLCJleHAiOjE3ODcxNjU1NzF9.28_bwInSW1aJrqcuuDzEhS_JdbK2t2hik5qA9rl8QvM" class="trustlabs-badge-img" alt="TrustLabs Verification Badge" />
        <div class="trustlabs-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Loading...</h3>
            </div>
            <div class="modal-body">
              <p>Checking verification status...</p>
            </div>
            <div class="modal-footer">
              <a href="https://trustlabs.pro" target="_blank" rel="noopener noreferrer">Visit TrustLabs</a>
            </div>
          </div>
        </div>
      </div>
    `}};customElements.define("trustlabs-badge",o);return f(g);})();
