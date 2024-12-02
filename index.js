import{a as v,i as P,S as O}from"./assets/vendor-DeexXyb9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const $="47316716-03762433f8b0cf1d8516e073f",I="https://pixabay.com/api/";async function p(o,e=1,s=15){var t;const n={key:$,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:s};try{return(await v.get(I,{params:n})).data}catch(r){throw new Error(`HTTP Error: ${((t=r.response)==null?void 0:t.status)||r.message}`)}}function T(o){o.innerHTML=""}function h(o,e){const s=o.map(({largeImageURL:r,webformatURL:i,tags:w,likes:S,views:q,comments:E,downloads:L})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${r}">
            <img 
              class="gallery-image" 
              src="${i}" 
              alt="${w}" 
            />
            <div class="info">
              <p><b>Likes:</b> ${S}</p>
              <p><b>Views:</b> ${q}</p>
              <p><b>Comments:</b> ${E}</p>
              <p><b>Downloads:</b> ${L}</p>
            </div>
          </a>
        </li>`).join("");return e.insertAdjacentHTML("beforeend",s),e.querySelector(".gallery-item").getBoundingClientRect().height}function l(o){P.error({message:o,position:"topRight"})}const y=document.querySelector(".form"),m=document.querySelector(".gallery"),g=document.querySelector(".loader"),f=document.querySelector(".load-more");let c,u=1,d=15;const b="query-to-pixabay";function a(o,e){o.style.display=e?"block":"none"}function x(){u=1}a(f,!1);y.addEventListener("submit",async o=>{o.preventDefault();const e=y.elements["image-name"].value.trim();if(localStorage.setItem(b,JSON.stringify(e)),!e){l("Please enter a search query!");return}x(),T(m),a(g,!0);try{const s=await p(e);if(s.hits.length===0){l("Sorry, there are no images matching your search query. Please try again!");return}h(s.hits,m),c?c.refresh():c=new O(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),s.totalHits>u*d?a(f,!0):a(f,!1)}catch(s){console.error("Error fetching images:",s),l("Something went wrong. Please try again later.")}a(g,!1),y.reset()});f.addEventListener("click",async()=>{const o=JSON.parse(localStorage.getItem(b));a(g,!0);try{u+=1;const e=await p(o,u,d),s=h(e.hits,m);c&&c.refresh(),u*d>=e.totalHits&&(a(f,!1),l("We're sorry, but you've reached the end of search results.")),window.scrollBy({top:s*2,behavior:"smooth"})}catch(e){console.error("Error fetching images:",e),l("Something went wrong. Please try again later.")}a(g,!1)});
//# sourceMappingURL=index.js.map
