// Add Context drawer
const contextDrawer=document.getElementById("context-drawer");
const openContextDrawer=document.getElementById("open-context-drawer");
const closeContextDrawer=document.getElementById("close-context-drawer");
function setContextDrawer(open){
  contextDrawer.classList.toggle("open",open);
  contextDrawer.setAttribute("aria-hidden",String(!open));
  openContextDrawer.setAttribute("aria-expanded",String(open));
  openContextDrawer.style.display=open?"none":"";
}
openContextDrawer.addEventListener("click",()=>setContextDrawer(true));
closeContextDrawer.addEventListener("click",()=>setContextDrawer(false));

const guide=document.getElementById("discussion-guide");
const emptyGuide=document.getElementById("empty-guide");

const addContextData={
  social:{
    label:"Social Connection",
    subtitle:"Social Connection → Binge Drinking",
    insight:"Higher Social Connection was estimated to increase Jane's probability of binge drinking.",
    pattern:"Higher Social Connection score ranges included more messaging activity, longer call duration, and higher perceived social connection.",
    helper:"Exploring who Jane was interacting with and what these interactions meant may help clarify when Social Connection is related to binge drinking.",
    questions:[
      "Who were you usually messaging or calling during these periods?",
      "Were these interactions related to plans to drink?",
      "Were these people you typically drink with?"
    ],
    components:[
      ["messaging","Messaging activity"],
      ["call","Call duration"],
      ["socialmedia","Social media usage duration"],
      ["perceived","Perceived social connection"],
      ["inperson","In-person social connection"]
    ],
    currentEma:[
      ["How socially connected do you feel right now?","1 — Not at all   5 — Very much"],
      ["How connected do you feel to people you interacted with in person?","1 — Not at all   5 — Very much"]
    ],
    suggestedEma:[
      "Who have you been communicating with recently?",
      "Are any of these interactions related to plans to drink?",
      "Who are you currently with?"
    ]
  },
  negative:{
    label:"Negative Affect",
    subtitle:"Negative Affect → Binge Drinking",
    insight:"Higher Negative Affect was estimated to increase Jane's probability of binge drinking.",
    pattern:"Higher Negative Affect score ranges included higher negative mood and stress ratings.",
    helper:"Exploring what was happening when Jane experienced stronger negative mood or stress may help clarify the situations behind this finding.",
    questions:[
      "What was usually happening when you felt especially stressed or upset during these periods?",
      "Were there particular situations, people, or thoughts that tended to worsen your mood?",
      "When you felt this way, did drinking come to mind as a way to cope or change how you felt?"
    ],
    components:[
      ["negativeMood","Negative mood"],
      ["stress","Stress"]
    ],
    currentEma:[
      ["How negative or unpleasant is your mood right now?","1 — Not at all   5 — Extremely"],
      ["How stressed do you feel right now?","1 — Not at all   5 — Extremely"]
    ],
    suggestedEma:[
      "What is the main reason you feel stressed or upset right now?",
      "Did anything happen recently that changed your mood?",
      "How much do you want to change how you feel right now?"
    ]
  },
  motivation:{
    label:"Drinking Motivation",
    subtitle:"Drinking Motivation → Binge Drinking",
    insight:"No clear causal effect of Drinking Motivation on binge drinking was identified for Jane.",
    pattern:"Desire to drink and intention to drink increased across higher Drinking Motivation score ranges, but binge-drinking probability did not show a clear corresponding pattern.",
    helper:"Exploring what Jane means when she reports wanting or intending to drink may help explain why higher Drinking Motivation scores do not consistently translate into binge drinking.",
    questions:[
      "When you wanted to drink, what were you hoping drinking would do for you?",
      "How often did wanting to drink turn into an actual plan to drink?",
      "What usually made you decide to drink less than you initially intended, or not drink at all?"
    ],
    components:[
      ["desire","Desire to drink"],
      ["intention","Intention to drink"]
    ],
    currentEma:[
      ["How strong is your desire to drink alcohol right now?","1 — Not at all   5 — Extremely"],
      ["How likely are you to drink alcohol later today?","1 — Very unlikely   5 — Very likely"]
    ],
    suggestedEma:[
      "What is the main reason you want to drink right now?",
      "Do you already have a plan to drink later today?",
      "Is there anything that might make you change your drinking plan?"
    ]
  },
  activity:{
    label:"Physical Activity",
    subtitle:"Physical Activity → Binge Drinking",
    insight:"Higher Physical Activity was estimated to decrease Jane's probability of binge drinking.",
    pattern:"Higher Physical Activity score ranges included more steps, more active minutes, and greater movement intensity.",
    helper:"Exploring what Jane was doing on more active days may help clarify which routines or situations are associated with this potentially protective pattern.",
    questions:[
      "What kinds of activities were you usually doing on days when you were more physically active?",
      "Were these more active days different in your schedule, location, or who you spent time with?",
      "Did being active change your drinking plans or how much you wanted to drink later that day?"
    ],
    components:[
      ["steps","Step count"],
      ["activeMinutes","Active minutes"],
      ["movementIntensity","Movement intensity"]
    ],
    currentEma:[
      ["How physically active have you been since the last check-in?","1 — Not at all   5 — Very active"]
    ],
    suggestedEma:[
      "What type of physical activity have you done today?",
      "Was this activity planned or part of your usual routine?",
      "Did being active affect your plans to drink later today?"
    ]
  }
};

const savedContextRecordsByConstruct={
  social:[
    {text:"Jane said she messages coworkers and close friends frequently throughout the day. Most messaging is routine coordination, although some evening conversations involve making plans with friends.",components:["messaging"]},
    {text:"Jane mainly uses social media in the evening for entertainment and keeping up with friends. She did not describe social media use itself as closely tied to drinking plans.",components:["socialmedia"]},
    {text:"Jane frequently calls her mother, but they do not typically drink together. She also talks often with her boyfriend, John, and reported that interactions with John can sometimes contribute to heavier drinking.",components:["call"]},
    {text:"Jane often reports feeling socially connected after work and on weekends. She noted that feeling connected does not always involve drinking and often reflects ordinary time with people she trusts.",components:["perceived"]},
    {text:"Jane regularly spends time in person with coworkers, family, and close friends. She described heavier drinking as more common in a smaller subset of social situations rather than across all in-person interactions.",components:["inperson"]}
  ],
  negative:[
    {text:"Jane said that work deadlines and unresolved conflicts were common sources of stress on days when her Negative Affect scores were higher.",components:["stress"]},
    {text:"Jane described feeling more irritable and discouraged during some evenings before heavier drinking, especially after difficult workdays.",components:["negativeMood"]}
  ],
  motivation:[
    {text:"Jane said that wanting a drink often reflected an expectation that alcohol would help her unwind, but she did not always act on that desire.",components:["desire"]},
    {text:"Jane reported that stronger intentions to drink were more likely when plans had already been discussed with friends, whereas vague intentions often changed later in the day.",components:["intention"]}
  ],
  activity:[
    {text:"Jane said that her more active days often involved walking to errands or spending time outside after work rather than staying home.",components:["steps"]},
    {text:"Jane reported that longer periods of activity were often part of planned daytime routines and were less likely to occur on evenings centered around drinking plans.",components:["activeMinutes"]},
    {text:"Jane described higher-intensity activity as mostly coming from exercise sessions rather than social activities involving alcohol.",components:["movementIntensity"]}
  ]
};

const componentLabelsByConstruct={};
Object.entries(addContextData).forEach(([key,d])=>{componentLabelsByConstruct[key]=Object.fromEntries(d.components);});
const componentLabels=componentLabelsByConstruct.social;
const savedContextRecords=savedContextRecordsByConstruct.social; // retained for the Social Connection intervention workflow

function addGuideQuestion(text){
  if(emptyGuide) emptyGuide.style.display="none";
  const item=document.createElement("div");
  item.className="guide-item";
  item.innerHTML=`<span>${text}</span><button aria-label="Remove question">×</button>`;
  item.querySelector("button").addEventListener("click",()=>{
    item.remove();
    if(!guide.querySelector(".guide-item") && emptyGuide) emptyGuide.style.display="";
  });
  guide.appendChild(item);
}

function clearDiscussionGuide(){
  guide?.querySelectorAll('.guide-item').forEach(x=>x.remove());
  if(emptyGuide) emptyGuide.style.display="";
}

function bindDynamicContextButtons(){
  document.querySelectorAll("#context-suggested-questions .add-question-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const text=btn.closest(".suggested-question").querySelector(".suggested-question-text").textContent;
      addGuideQuestion(text);
      btn.textContent="Added";btn.disabled=true;
    });
  });
  document.querySelectorAll("#context-suggested-ema .add-ema-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{btn.textContent="Added";btn.disabled=true;});
  });
}

function renderSavedContext(){
  const key=window.selectedCausalConstruct||"social";
  const records=savedContextRecordsByConstruct[key]||[];
  const labels=componentLabelsByConstruct[key]||{};
  const list=document.getElementById("saved-context-list");
  const empty=document.getElementById("saved-context-empty");
  if(!list) return;
  list.querySelectorAll(".saved-context-card").forEach(x=>x.remove());
  if(empty) empty.style.display=records.length?"none":"";
  records.forEach(rec=>{
    const card=document.createElement("div");
    card.className="saved-context-card";
    card.innerHTML=`<p>${rec.text}</p><div class="saved-context-meta">${rec.components.map(c=>`<span>${labels[c]||c}</span>`).join("")}</div>`;
    list.appendChild(card);
  });
}

function renderAddContextForConstruct(key){
  const d=addContextData[key]||addContextData.social;
  document.getElementById("context-drawer-subtitle").textContent=d.subtitle;
  document.getElementById("context-current-insight").textContent=d.insight;
  document.getElementById("context-current-pattern").textContent=d.pattern;
  document.getElementById("context-discussion-helper").textContent=d.helper;
  document.getElementById("context-current-ema-title").textContent=`Current ${d.label} EMA`;

  document.getElementById("context-suggested-questions").innerHTML=d.questions.map(q=>`<div class="suggested-question"><div class="suggested-question-text">${q}</div><button class="add-question-btn">Add</button></div>`).join("");
  document.getElementById("context-component-tags").innerHTML=d.components.map(([k,label])=>`<label class="context-component-tag"><input type="checkbox" value="${k}"><span>${label}</span></label>`).join("");
  document.getElementById("context-current-ema-list").innerHTML=d.currentEma.map(([q,scale])=>`<div class="current-ema-card"><div class="ema-question-text">${q}</div><div class="ema-scale">${scale}</div></div>`).join("");
  document.getElementById("context-suggested-ema").innerHTML=d.suggestedEma.map(q=>`<div class="suggested-question"><div class="suggested-question-text">${q}</div><button class="add-ema-btn">Add</button></div>`).join("");

  const note=document.getElementById("discussion-notes");
  if(note) note.value="";
  clearDiscussionGuide();
  renderSavedContext();
  bindDynamicContextButtons();
}

document.getElementById("add-own-question").addEventListener("click",()=>{
  const text=window.prompt("Enter a question for discussion:");
  if(text && text.trim()) addGuideQuestion(text.trim());
});

function renderLinkedContext(componentKey, constructKey){
  const panel=document.getElementById("linked-context-panel");
  if(!panel) return;
  const key=constructKey || window.selectedInterventionConstruct || window.selectedCausalConstruct || "social";
  const records=(savedContextRecordsByConstruct[key]||[]).filter(r=>r.components.includes(componentKey));
  if(!records.length){
    panel.innerHTML='<div class="linked-context-empty">No saved participant context is linked to this component yet.</div>';
    return;
  }
  panel.innerHTML=records.map(rec=>`<div class="linked-context-item"><p>${rec.text}</p></div>`).join("");
}

function renderInterventionContextCards(){
  const wrap=document.getElementById("intervention-context-cards");
  if(!wrap) return;
  const records=savedContextRecordsByConstruct.social;
  if(!records.length){
    wrap.innerHTML='<div class="linked-context-empty">No participant context has been saved yet. Add context in Causal Insights first.</div>';
    return;
  }
  wrap.innerHTML=records.map((rec,i)=>`<button class="intervention-context-card" data-context-index="${i}"><strong>${i===0?"Potentially actionable context":"Context from discussion"}</strong><p>${rec.text}</p><small>${rec.components.map(c=>componentLabels[c]).join(" · ")}</small></button>`).join("");
  wrap.querySelectorAll(".intervention-context-card").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const rec=records[Number(btn.dataset.contextIndex)];
      const focus=document.getElementById("focus-input");
      if(focus){
        focus.value=rec.text.replace(/^Jane reported that /," ").trim();
        focus.dispatchEvent(new Event("input",{bubbles:true}));
      }
    });
  });
}

const saveContextBtn=document.getElementById("save-context-note");
if(saveContextBtn){
  saveContextBtn.addEventListener("click",()=>{
    const key=window.selectedCausalConstruct||"social";
    const note=document.getElementById("discussion-notes");
    const text=(note?.value||"").trim();
    const components=[...document.querySelectorAll('#context-component-tags input:checked')].map(x=>x.value);
    if(!text){note?.focus();return;}
    savedContextRecordsByConstruct[key].unshift({text,components});
    if(note) note.value="";
    document.querySelectorAll('#context-component-tags input').forEach(x=>x.checked=false);
    renderSavedContext();
    if((window.selectedInterventionConstruct||"social")===key){
      const active=document.querySelector('#view-interventions .component-review-item.active')?.dataset.component;
      if(active && typeof renderInterventionComponentDetails==="function") renderInterventionComponentDetails(key,active);
    }
  });
}

document.querySelectorAll(".component-review-item").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".component-review-item").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderLinkedContext(btn.dataset.component);
  });
});

renderAddContextForConstruct("social");
window.selectedInterventionConstruct="social";
setTimeout(()=>{if(typeof selectInterventionTargetByKey==="function") selectInterventionTargetByKey("social");},0);

