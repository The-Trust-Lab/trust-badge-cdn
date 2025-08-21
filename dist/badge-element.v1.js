"use strict";var TrustLabsBadge=(()=>{var l=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var m=(s,i)=>{for(var t in i)l(s,t,{get:i[t],enumerable:!0})},b=(s,i,t,e)=>{if(i&&typeof i=="object"||typeof i=="function")for(let a of p(i))!h.call(s,a)&&a!==t&&l(s,a,{get:()=>i[a],enumerable:!(e=c(i,a))||e.enumerable});return s};var g=s=>b(l({},"__esModule",{value:!0}),s);var v={};m(v,{TrustLabsBadge:()=>o});var o=class s extends HTMLElement{constructor(){super();this.email="";this.size="md";this.theme="auto";this.trustStatus=null;this.shadow=this.attachShadow({mode:"open"}),this.render()}static{this.instanceQueue=[]}static{this.processingQueue=!1}static get observedAttributes(){return["email","data-size","data-theme"]}connectedCallback(){this.updateAttributes(),this.registerInstance(),this.setupEventListeners()}attributeChangedCallback(t,e,a){e!==a&&(this.updateAttributes(),t==="email"&&this.email&&this.registerInstance())}updateAttributes(){this.email=this.getAttribute("email")||"",this.size=this.getAttribute("data-size")||"md",this.theme=this.getAttribute("data-theme")||"auto"}setupEventListeners(){let t=this.shadow.querySelector(".trustlabs-badge"),e=this.shadow.querySelector(".trustlabs-modal");!t||!e||(t.addEventListener("mouseenter",()=>this.showModal()),t.addEventListener("mouseleave",()=>this.hideModal()),e.addEventListener("mouseenter",()=>this.showModal()),e.addEventListener("mouseleave",()=>this.hideModal()))}showModal(){let t=this.shadow.querySelector(".trustlabs-modal");t&&(t.style.display="block")}hideModal(){let t=this.shadow.querySelector(".trustlabs-modal");t&&(t.style.display="none")}registerInstance(){if(!this.email){this.showFallback();return}s.instanceQueue.push({element:this,email:this.email}),s.processingQueue||setTimeout(()=>{s.processQueue()},0)}static async processQueue(){if(!(s.processingQueue||s.instanceQueue.length===0)){s.processingQueue=!0;try{await s.processInstanceGroup(s.instanceQueue)}catch(t){console.error("Error processing badge queue:",t),s.instanceQueue.forEach(e=>{e.element.showFallback()})}finally{s.instanceQueue=[],s.processingQueue=!1}}}static async processInstanceGroup(t){let e=t.map(a=>a.email).join(",");try{let a=await fetch(`https://api.trustlabs.pro/api/public/trust-status?emails=${encodeURIComponent(e)}`,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors"});if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);let n=await a.json(),d=new Map;n.results?.forEach(r=>{d.set(r.email,r)}),t.forEach(r=>{let u=d.get(r.email);u?r.element.updateDisplay(u):r.element.showFallback()})}catch(a){console.error("Error fetching trust status:",a),t.forEach(n=>{n.element.showNetworkError()})}}updateDisplay(t){this.trustStatus=t;let e=this.shadow.querySelector(".trustlabs-badge");e&&(t.verified?(e.classList.remove("unverified"),e.classList.add("verified")):(e.classList.add("unverified"),e.classList.remove("verified")),this.updateModalContent())}updateModalContent(){let t=this.shadow.querySelector(".modal-content");if(t)if(this.trustStatus&&this.trustStatus.verified){let e=this.trustStatus.completed_at?new Date(this.trustStatus.completed_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"N/A";t.innerHTML=`
        <div style="margin-bottom: 8px;">
          <strong style="color: #2e7d32">Verified</strong>
        </div>
        <div style="margin-bottom: 4px;">
          <strong>Verified since:</strong> ${e}
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
          <a href="https://trustlabs.pro" target="_blank" rel="noopener noreferrer" 
             style="color: #0066cc; text-decoration: none; display: block;">
            Learn about Trust Verification
          </a>
        </div>
      `}else this.trustStatus&&this.trustStatus.verified,t.innerHTML=`
        <div style="margin-bottom: 8px;">
          <strong style="color: #757575">Not Verified</strong>
        </div>
        <div style="margin-bottom: 4px;">
          This user has not been verified by TrustLabs.
        </div>
        <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
          <a href="https://trustlabs.pro" target="_blank" rel="noopener noreferrer" 
             style="color: #0066cc; text-decoration: none; display: block;">
            Learn about Trust Verification
          </a>
        </div>
      `}showFallback(){this.trustStatus=null;let t=this.shadow.querySelector(".trustlabs-badge");t&&(t.classList.add("unverified"),t.classList.remove("verified"),this.updateModalContent())}showNetworkError(){this.trustStatus=null;let t=this.shadow.querySelector(".trustlabs-badge");t&&(t.classList.add("unverified"),t.classList.remove("verified"),this.updateModalContent())}render(){this.shadow.innerHTML=`
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
          display: none;
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 10000;
          width: 300px;
          left: calc(100% + 2px);
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #333;
        }

        .modal-content {
          margin: 0;
        }

        .modal-content div {
          margin-bottom: 8px;
        }

        .modal-content div:last-child {
          margin-bottom: 0;
        }

        .modal-content strong {
          font-weight: 600;
        }

        .modal-content a {
          color: #0066cc;
          text-decoration: none;
          display: block;
          margin-bottom: 4px;
        }

        .modal-content a:last-child {
          margin-bottom: 0;
        }

        .modal-content a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="trustlabs-badge">
        <img src="https://nlpchevsebljzvqznvzw.supabase.co/storage/v1/object/sign/Trust%20Badge/trustscorebadge.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82N2ViYzdjNy1iYmVhLTRmNTEtOWIxMS05ZjEzZWIzMDU2YjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUcnVzdCBCYWRnZS90cnVzdHNjb3JlYmFkZ2UucG5nIiwiaWF0IjoxNzU1NjI5NTcxLCJleHAiOjE3ODcxNjU1NzF9.28_bwInSW1aJrqcuuDzEhS_JdbK2t2hik5qA9rl8QvM" class="trustlabs-badge-img" alt="TrustLabs Verification Badge" />
        <div class="trustlabs-modal">
          <div class="modal-content">
            <!-- Content will be populated after API response -->
          </div>
        </div>
      </div>
    `}};customElements.define("trustlabs-badge",o);return g(v);})();
