(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function c(){const o=new URLSearchParams(window.location.search).get("text")??"Hello World";document.querySelector("#app").innerHTML=`
    ${o.split("-").map(i=>`<div class="text">
        ${i.split("").map(r=>`<div class="character">${r}</div>`).join("")}
        </div>`).join("")}
`,document.querySelectorAll(".character").forEach(i=>{i.addEventListener("mouseover",function(r){r.target.classList.contains("glowing")?r.target.classList.remove("glowing"):r.target.classList.add("glowing")})})}c();