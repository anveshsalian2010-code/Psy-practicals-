/* ---------- Study view ---------- */
const U=[...INTROS,...EXPS];
const PER=["personality","pf16","epq","neo","bell"];
const col=u=>PER.includes(u.id)?["var(--per)","var(--per-soft)"]:["var(--cog)","var(--cog-soft)"];
const setAcc=([a,s])=>{document.documentElement.style.setProperty("--accent",a);document.documentElement.style.setProperty("--accent-soft",s)};
let done=new Set(store.get("pl-done",[])),view="intro";
const cur=store.get("pl-cur",{intro:"cognition",exp:"cueing"});
if(!INTROS.some(u=>u.id===cur.intro))cur.intro="cognition";
if(!EXPS.some(u=>u.id===cur.exp))cur.exp="cueing";
const SECS=[["intro","Introduction"],["aim","Aim & plan"],["mat","Materials & variables"],["proc","Procedure"],["prec","Precautions"],["score","Scoring & norms"],["res","Results & discussion"],["rap","Rapport"],["lab","Try it"]];

function prog(){$("#prog").textContent=`${done.size}/${U.length} topics done`}
function rail(){
 const list=view==="intro"?INTROS:EXPS;
 $("#rail").innerHTML=`<div class="grp">${view==="intro"?"Viva voce intros":"Experiments"}</div>`+list.map(u=>`<button data-id="${u.id}" style="--c:${col(u)[0]}" aria-current="${u.id===cur[view]}"><span class="n">${u.kind==="exp"?"Exp "+u.n:u.n}</span><span>${u.name}</span>${done.has(u.id)?'<span class="tick">✓</span>':'<span></span>'}</button>`).join("");
}
const li=a=>`<ul class="pts">${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
const sec=(id,k,title,html)=>`<section class="sec" id="s-${id}"><div class="eyebrow">Section ${k}</div><h3>${title}</h3>${html}</section>`;
function rapportList(e){return `<div class="rlist">${e.rapport.map((r,k)=>`<div class="rq"><span class="rn">${k+1}</span><div><span class="chip">${r[0]}</span><p class="say">${r[1]}</p><p class="hint">Links to: ${r[2]}</p></div></div>`).join("")}</div><div class="tip"><b>Careful.</b> ${e.rapportNote}</div>`}

function page(){
 const list=view==="intro"?INTROS:EXPS,i=list.findIndex(u=>u.id===cur[view]),u=list[i];
 setAcc(col(u));runId++;
 let h=`<div class="eyebrow">${u.kind==="exp"?`Experiment ${u.n} · ${PER.includes(u.id)?"Personality":"Cognition"}`:"Viva voce introduction"}</div><h2>${u.name}</h2>
 <div class="plate">${ART[u.art]()}<div class="cap"><span>${u.cap}</span>${u.id==="cognition"?`<span class="seg" role="group" aria-label="Attention model"><button aria-pressed="true" data-m="">Broadbent</button><button aria-pressed="false" data-m="treisman">Treisman</button><button aria-pressed="false" data-m="late">Deutsch-Norman</button></span>`:""}</div></div>`;
 if(u.kind==="intro"){
  h+=`<div class="reading">${u.body}</div>`;
  if(u.lab)h+=`<div class="lab"><h3>Try it yourself</h3><div id="labbox"></div></div>`;
 }else{
  h+=`<div class="secbar" role="navigation" aria-label="Sections">${SECS.map(([id,t],k)=>`<button data-s="${id}">${k+1}. ${t}</button>`).join("")}</div>`;
  h+=sec("intro",1,"Introduction",`<div class="reading">${u.intro}</div>`);
  h+=sec("aim",2,"Aim, hypothesis & plan",`<dl class="terms"><dt>Aim</dt><dd>${u.aim}</dd>${u.hyp?`<dt>Hypothesis</dt><dd>${u.hyp}</dd>`:""}<dt>Plan</dt><dd>${u.plan}</dd></dl>`);
  h+=sec("mat",3,u.vars?"Materials & variables":"Materials required",`<h4>Materials required</h4>${li(u.materials)}${u.vars?`<h4>Variables</h4><dl class="terms"><dt>Independent variable</dt><dd>${u.vars.iv}</dd><dt>Dependent variable</dt><dd>${u.vars.dv}</dd></dl><h4>Intervening variables / controls</h4>${li(u.vars.ctrl)}`:""}`);
  h+=sec("proc",4,"Procedure",`<h4>Instructions to the subject</h4><blockquote>${u.instr}</blockquote><h4>Steps</h4><ol class="steps">${u.proc.map(x=>`<li>${x}</li>`).join("")}</ol>`);
  h+=sec("prec",5,"Precautions",li(u.prec));
  h+=sec("score",6,"Scoring & norms",u.scoring);
  h+=sec("res",7,"Results & discussion",u.results);
  h+=sec("rap",8,"Rapport-building questions",`<p class="reading">Imaginary and situational questions tied to what this experiment measures. Pick 2–3 before you start.</p>${rapportList(u)}`);
  h+=sec("lab",9,"Try it yourself",`<div class="lab" style="margin:0"><div id="labbox"></div></div>`);
 }
 if(u.tip)h+=`<div class="tip"><b>Exam tip.</b> ${u.tip}</div>`;
 h+=`<div class="done-row"><button class="btn ${done.has(u.id)?"":"primary"}" id="mark">${done.has(u.id)?"Done ✓":"Mark as done"}</button><button class="btn" id="drill">Flashcards for this</button>${list[i+1]?`<button class="btn" id="next">Next: ${list[i+1].name} →</button>`:""}</div>`;
 $("#unit").innerHTML=h;
 if(u.lab)LABS[u.lab]($("#labbox"));
 if(u.id==="cognition")$("#unit .plate .seg").onclick=e=>{const b=e.target.closest("button");if(!b)return;$("#attsvg").setAttribute("class","art att "+b.dataset.m);$("#unit .plate .seg").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b))};
 const sb=$("#unit .secbar");if(sb)sb.onclick=e=>{const b=e.target.closest("button");if(b)$("#s-"+b.dataset.s).scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})};
 if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.querySelectorAll("#unit svg").forEach(s=>s.pauseAnimations&&s.pauseAnimations());
 $("#mark").onclick=()=>{done.has(u.id)?done.delete(u.id):done.add(u.id);store.set("pl-done",[...done]);rail();page();prog()};
 $("#drill").onclick=()=>{filt=u.id;buildDeck();mode("cards")};
 if(list[i+1])$("#next").onclick=()=>{go(list[i+1].id);scrollTo(0,0)};
}
function go(id){cur[view]=id;store.set("pl-cur",cur);rail();page()}
$("#rail").onclick=e=>{const b=e.target.closest("button");if(b){go(b.dataset.id);scrollTo(0,0)}};
