(()=>{"use strict";const e={durationMS:750},t={size:4},n={widthPerUnitPx:100};function*i(e,t,n){for(let i=0;i<n;i++)yield[e[i][t],t,i];return null}function*l(e,n,i){for(let l=t.size-1;l>t.size-i;l--)yield[e[l][n],n,l];return null}function*o(e,t,n){for(let i=0;i<n;i++)yield[e[t][i],i,t];return null}function*s(e,n,i){for(let l=t.size-1;l>t.size-i;l--)yield[e[n][l],l,n];return null}function r(e,t,i,l){e.style.top=l*n.widthPerUnitPx+"px",e.style.left=i*n.widthPerUnitPx+"px"}class u{x;y;positionElement;colorElement;textElement;value;hasMerged;constructor(e,t,i){var l;this.x=e,this.y=t,this.positionElement=document.createElement("div"),this.colorElement=document.createElement("div"),this.textElement=document.createElement("div"),(l=this.positionElement).style.position="absolute",l.style.width=`${n.widthPerUnitPx}px`,l.style.height=`${n.widthPerUnitPx}px`,l.style.display="flex",r(this.positionElement,0,e,t),function(e){e.style.backgroundColor="white",e.style.width="90%",e.style.height="90%",e.style.display="flex",e.style.margin="auto",e.style.borderRadius="10%"}(this.colorElement),function(e){e.style.display="flex",e.style.margin="auto",e.style.fontSize=n.widthPerUnitPx/3+"px"}(this.textElement),this.setValue(2),i.appendChild(this.positionElement),this.positionElement.appendChild(this.colorElement),this.colorElement.appendChild(this.textElement),this.hasMerged=!1}setValue(e){switch(this.value=e,this.textElement.textContent=String(e),e){case 2:this.colorElement.style.backgroundColor="#FCD0A1";break;case 4:this.colorElement.style.backgroundColor="#B1B695";break;case 8:this.colorElement.style.backgroundColor="#A690A4";break;case 16:this.colorElement.style.backgroundColor="#5E4B56";break;case 32:this.colorElement.style.backgroundColor="#AFD2E9";break;case 64:this.colorElement.style.backgroundColor="#F42272";break;case 128:this.colorElement.style.backgroundColor="#F397D6";break;case 256:this.colorElement.style.backgroundColor="#D7B8F3";break;case 512:this.colorElement.style.backgroundColor="#B8B8F3";break;case 2048:this.colorElement.style.backgroundColor="#deb841";break;default:this.colorElement.style.backgroundColor="white"}}getValue(){return this.value}getX(){return this.x}getY(){return this.y}getHasMerged(){return this.hasMerged}setHasMerged(e){this.hasMerged=e}remove(){this.positionElement.remove()}setAnimation(t,i,l,o){const s=this.positionElement.animate([{left:this.x*n.widthPerUnitPx+"px",top:this.y*n.widthPerUnitPx+"px"},{left:t*n.widthPerUnitPx+"px",top:i*n.widthPerUnitPx+"px"}],{duration:e.durationMS,iterations:1});this.x=t,this.y=i,s.onfinish=()=>{s.cancel(),o?.remove(),this.setValue(l),r(this.positionElement,0,this.x,this.y)}}}const a=document.getElementById("root");function d(){a.style.transform=`scale(${Math.min(window.innerWidth,window.innerHeight)/(t.size*n.widthPerUnitPx)})`}window.onload=()=>{d(),window.onresize=d},a.style.width=t.size*n.widthPerUnitPx+"px",a.style.height=t.size*n.widthPerUnitPx+"px",a.style.position="relative",a.style.transformOrigin="0% 0% 0px";let h=!1;const c=[];for(let e=0;e<4;e++){c.push([]);for(let t=0;t<4;t++)c[e][t]=null}function f(){const e=[];for(let t=0;t<c.length;t++)for(let n=0;n<c[t].length;n++)null===c[t][n]&&e.push([n,t]);if(0===e.length)return!1;const[t,n]=e[Math.floor(Math.random()*e.length)];return c[n][t]=new u(t,n,a),!0}function g(n){for(const e of n)for(let n=0;n<t.size;n++){const t=e();let n=t.next().value;if(null===n)continue;let[i,l,o]=n,s=i;for(const[e,n,r]of t)if(null!==e)if(null!==i){{let t=e.getValue();if(null!==s&&s.getValue()===t&&!s.getHasMerged()){e.setAnimation(s.getX(),s.getY(),2*t,s),c[s.getY()][s.getX()]=e,c[r][n]=null,e.setHasMerged(!0),s.setHasMerged(!0);continue}}i=e,s=e}else{let t=e.getValue();if(null!==s&&s.getValue()===t&&!s.getHasMerged()){e.setAnimation(s.getX(),s.getY(),2*t,s),c[s.getY()][s.getX()]=e,c[r][n]=null,e.setHasMerged(!0),s.setHasMerged(!0);continue}e.setAnimation(l,o,t,null),c[o][l]=e,c[r][n]=null}else{if(null===i)continue;l=n,o=r,i=e}}!function(){for(const e of c)for(const t of e)null!==t&&t.setHasMerged(!1)}(),setTimeout((()=>{f(),h=!1}),e.durationMS)}document.addEventListener("keydown",(e=>{if(!h)switch(h=!0,e.code){case"ArrowUp":return void g(function*(e){for(let n=0;n<t.size;n++)for(let l=0;l<t.size+1;l++)yield()=>i(e,n,l);return null}(c));case"ArrowDown":return void g(function*(e){for(let n=0;n<t.size;n++)for(let i=1;i<t.size+2;i++)yield()=>l(e,n,i);return null}(c));case"ArrowLeft":return void g(function*(e){for(let n=0;n<e.length;n++)for(let i=1;i<t.size+1;i++)yield()=>o(e,n,i);return null}(c));case"ArrowRight":return void g(function*(e){for(let n=0;n<t.size;n++)for(let i=1;i<t.size+2;i++)yield()=>s(e,n,i);return null}(c));default:return void(h=!1)}})),f(),f(),a.hidden=!1})();