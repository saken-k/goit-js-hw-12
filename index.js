import{i as p,S as h}from"./assets/vendor-5ObWk2rO.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const g="47316716-03762433f8b0cf1d8516e073f",b="https://pixabay.com/api/";function L(o){const n=new URLSearchParams({key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${b}?${n}`).then(t=>{if(!t.ok)throw new Error(`HTTP Error: ${t.status}`);return t.json()})}function w(o){o.innerHTML=""}function P(o,n){const t=o.map(({largeImageURL:a,webformatURL:e,tags:r,likes:i,views:m,comments:d,downloads:y})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img 
              class="gallery-image" 
              src="${e}" 
              alt="${r}" 
            />
            <div class="info">
              <p><b>Likes:</b> ${i}</p>
              <p><b>Views:</b> ${m}</p>
              <p><b>Comments:</b> ${d}</p>
              <p><b>Downloads:</b> ${y}</p>
            </div>
          </a>
        </li>`).join("");n.insertAdjacentHTML("beforeend",t)}function s(o){p.error({message:o,position:"topRight"})}const l=document.querySelector(".form"),u=document.querySelector(".gallery"),f=document.querySelector(".loader");let c;function S(){f.style.display="block"}function $(){f.style.display="none"}l.addEventListener("submit",o=>{o.preventDefault();const n=l.elements["image-name"].value.trim();if(!n){s("Please enter a search query!");return}w(u),S(),L(n).then(t=>{if(t.hits.length===0){s("Sorry, there are no images matching your search query. Please try again!");return}P(t.hits,u),c?c.refresh():c=new h(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8})}).catch(t=>{console.error("Error fetching images:",t),s("Something went wrong. Please try again later.")}).finally(()=>{$(),l.reset()})});
//# sourceMappingURL=index.js.map
