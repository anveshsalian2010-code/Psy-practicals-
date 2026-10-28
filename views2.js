/* ---------- Rapport bank ---------- */
let rapFilter="all";
function rapport(){
 setAcc(["var(--per)","var(--per-soft)"]);
 const list=EXPS.filter(e=>rapFilter==="all"||e.id===rapFilter);
 $("#rapport").innerHTML=`<div class="rapport-head"><div><div class="eyebrow">Before every practical</div><h2>Rapport question bank</h2><p class="reading">${EXPS.reduce((n,e)=>n+e.rapport.length,0)} imaginary and situational questions, 8–9 per experiment, each tied to the trait, factor or process that experiment measures.</p></div>
 <div class="row"><select id="rsel" aria-label="Experiment"><option value="all">All experiments</option>${EXPS.map(e=>`<option value="${e.id}" ${rapFilter===e.id?"selected":""}>Exp ${e.n} · ${e.name}</option>`).join("")}</select><button class="btn primary" id="spin">Random question</button></div></div>
 <div class="rcard" id="pick" hidden></div>
 ${list.map(e=>`<section class="sec"><div class="eyebrow">Experiment ${e.n}</div><h3>${e.name}</h3>${rapportList(e)}</section>`).join("")}`;
 $("#rsel").onchange=ev=>{rapFilter=ev.target.value;rapport()};
 $("#spin").onclick=()=>{const pool=list.flatMap(e=>e.rapport.map(r=>[e,r])),[e,r]=pool[Math.random()*pool.length|0];const p=$("#pick");p.hidden=false;p.classList.add("on");p.innerHTML=`<span class="chip" style="align-self:start">Exp ${e.n} · ${r[0]}</span><p class="say">${r[1]}</p><p class="hint">Links to: ${r[2]}</p>`};
}

/* ---------- Modes ---------- */
function mode(m){
 document.querySelectorAll("nav button").forEach(b=>b.setAttribute("aria-selected",b.dataset.mode===m));
 const study=m==="intro"||m==="exp";
 $("#study").hidden=!study;["cards","quiz","rapport"].forEach(id=>$("#"+id).hidden=id!==m);
 if(study){view=m;rail();page()}else runId++;
 if(m==="rapport")rapport();
 if(m==="cards")drawCard();
 if(m==="quiz")setAcc(["var(--cog)","var(--cog-soft)"]);
 scrollTo(0,0);
}
document.querySelector("nav").onclick=e=>{const b=e.target.closest("button");if(b)mode(b.dataset.mode)};
const hh=()=>document.documentElement.style.setProperty("--hh",document.querySelector("header").offsetHeight+"px");
addEventListener("resize",hh);hh();
prog();buildDeck();startQuiz();mode("intro");
