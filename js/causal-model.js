// ===== Causal Model interactions =====

const componentExplanationData={
  "Messaging activity":{
    source:"Passive sensing",
    what:"Number and frequency of outgoing smartphone messages during the observation window.",
    why:"More frequent messaging may indicate periods when the patient is actively communicating and socially engaged with other people."
  },
  "Social media usage duration":{
    source:"Passive sensing",
    what:"Total time spent using social media applications during the observation window.",
    why:"Time spent on social platforms may capture digitally mediated social engagement that contributes to the broader Social Connection construct."
  },
  "Call duration":{
    source:"Passive sensing",
    what:"Total duration of outgoing and incoming phone calls during the observation window.",
    why:"Longer calls may indicate sustained direct communication with other people and therefore provide a behavioral signal of social interaction."
  },
  "Perceived social connection":{
    source:"EMA",
    what:"The patient's self-reported sense of feeling connected to other people at the time of the EMA.",
    why:"Self-reported connection captures the subjective experience of social connection that cannot be inferred reliably from smartphone activity alone."
  },
  "In-person social connection":{
    source:"EMA",
    what:"The patient's self-report of whether and to what extent they were interacting with other people in person.",
    why:"This component captures face-to-face social engagement, complementing digitally observed communication behaviors."
  },
  "Negative mood":{
    source:"EMA",
    what:"The patient's self-reported level of negative mood during the EMA assessment.",
    why:"Negative mood directly reflects the emotional state represented by the Negative Affect construct."
  },
  "Stress":{
    source:"EMA",
    what:"The patient's self-reported level of stress during the EMA assessment.",
    why:"Stress is a common negative emotional experience and helps capture variation in momentary Negative Affect."
  },
  "Desire to drink":{
    source:"EMA",
    what:"The patient's self-reported desire or urge to consume alcohol at the time of the EMA.",
    why:"Desire to drink directly reflects the motivational state represented by the Drinking Motivation construct."
  },
  "Intention to drink":{
    source:"EMA",
    what:"The patient's self-reported intention or plan to drink alcohol in the near future.",
    why:"Intention captures a more action-oriented aspect of motivation to drink and complements momentary desire or craving."
  },
  "Place type":{
    source:"Context",
    what:"The type of location where the patient was observed, such as home, restaurant, or bar.",
    why:"Some locations provide greater access to alcohol or make drinking more feasible, making place type relevant to Drinking Opportunity."
  },
  "Time of day":{
    source:"Context",
    what:"The time period in which the observation occurred.",
    why:"Opportunities to drink are often constrained by daily routines and social schedules, so time of day helps represent when drinking is more feasible."
  },
  "Alcohol availability":{
    source:"EMA",
    what:"The patient's report of whether alcohol was readily available in the current setting.",
    why:"Availability directly represents whether the immediate environment provides an opportunity to drink."
  },
  "Binge drinking status":{
    source:"EMA",
    what:"Binary indicator of whether binge drinking occurred during the defined outcome period (0 = no, 1 = yes).",
    why:"This is the binary outcome used in the causal analysis."
  },
  "Bluetooth proximity":{
    source:"Passive sensing",
    what:"Nearby Bluetooth devices detected by the smartphone during the observation window.",
    why:"Nearby devices can provide an indirect signal that other people may be physically present."
  },
  "Nearby device count":{
    source:"Passive sensing",
    what:"Number of nearby detectable devices during the observation window.",
    why:"A higher nearby-device count may provide a rough proxy for being in a socially populated environment."
  },
  "Social setting":{
    source:"EMA",
    what:"The patient's self-reported social setting, such as being alone, with friends, with family, or with coworkers.",
    why:"Social setting adds contextual information about who the patient is with, which passive communication measures cannot determine."
  },
  "Step count":{
    source:"Passive sensing",
    what:"Number of steps detected by the smartphone during the observation window.",
    why:"Step count provides a simple behavioral indicator of how physically active the patient was during the pre-drinking period."
  },
  "Active minutes":{
    source:"Passive sensing",
    what:"Estimated minutes of sustained physical activity during the observation window.",
    why:"Active minutes capture the duration of movement beyond isolated steps and help represent overall activity intensity."
  },
  "Movement intensity":{
    source:"Passive sensing",
    what:"Accelerometer-derived intensity of body movement during the observation window.",
    why:"Movement intensity complements step-based measures by capturing non-walking physical activity and overall movement level."
  }
};

const modelNodeData={
  social:{
    title:"Social Connection",definition:"The degree of perceived and observed social engagement with others.",sources:"Passive sensing + EMA",finding:"Increases binge drinking",findingClass:"increase",estimate:"+6 percentage points per 1-point increase",ci:"+2.7 to +8.8<br>percentage points",adjusted:"Negative Affect,<br>Drinking Motivation",
    components:`<div class="model-component-group"><div class="model-component-source">Passive sensing</div>
      <button class="model-component-card" data-component-detail="Messaging activity|Passive sensing|Indicator of ongoing interpersonal communication activity.|Literature-based"><span>Messaging activity</span></button>
      <button class="model-component-card" data-component-detail="Social media usage duration|Passive sensing|Indicator of digitally mediated social engagement.|Expert-defined"><span>Social media usage duration</span></button>
      <button class="model-component-card" data-component-detail="Call duration|Passive sensing|Indicator of direct interpersonal communication activity.|Literature-based"><span>Call duration</span></button></div>
      <div class="model-component-group"><div class="model-component-source">EMA</div>
      <button class="model-component-card" data-component-detail="Perceived social connection|EMA|Captures the participant's perceived degree of social connection at the time of report.|Theory-based"><span>Perceived social connection</span></button>
      <button class="model-component-card" data-component-detail="In-person social connection|EMA|Captures perceived connection to people encountered in person.|Theory-based"><span>In-person social connection</span></button></div>`
  },
  negative:{
    title:"Negative Affect",definition:"The degree of momentary negative emotional experience during the observation period.",sources:"EMA",finding:"Increases binge drinking",findingClass:"increase",estimate:"+4 percentage points per 1-point increase",ci:"+1.1 to +6.9<br>percentage points",adjusted:"None shown",
    components:`<div class="model-component-group"><div class="model-component-source">EMA</div>
      <button class="model-component-card" data-component-detail="Negative mood|EMA|Captures momentary negative emotional state.|Theory-based"><span>Negative mood</span></button>
      <button class="model-component-card" data-component-detail="Stress|EMA|Captures self-reported stress intensity.|Theory-based"><span>Stress</span></button></div>`
  },
  motivation:{
    title:"Drinking Motivation",definition:"The current motivation, urge, or intention to drink alcohol.",sources:"EMA",finding:"No clear causal effect",findingClass:"neutral",estimate:"+1 percentage point per 1-point increase",ci:"−1.8 to +3.7<br>percentage points",adjusted:"Negative Affect",
    components:`<div class="model-component-group"><div class="model-component-source">EMA</div>
      <button class="model-component-card" data-component-detail="Desire to drink|EMA|Captures current desire or urge to consume alcohol.|Theory-based"><span>Desire to drink</span></button>
      <button class="model-component-card" data-component-detail="Intention to drink|EMA|Captures current intention or plan to drink.|Theory-based"><span>Intention to drink</span></button></div>`
  },
  opportunity:{
    title:"Drinking Opportunity",definition:"The degree to which the current social and environmental context provides an opportunity to drink.",sources:"EMA + context",finding:"No clear causal effect",findingClass:"neutral",estimate:"+1 percentage point per 1-point increase",ci:"−2.0 to +3.6<br>percentage points",adjusted:"Social Connection",
    components:`<div class="model-component-group"><div class="model-component-source">Context</div>
      <button class="model-component-card" data-component-detail="Place type|Context|Captures whether Jane is in a setting where drinking is more feasible.|Expert-defined"><span>Place type</span></button>
      <button class="model-component-card" data-component-detail="Time of day|Context|Captures temporal periods associated with drinking opportunity.|Expert-defined"><span>Time of day</span></button></div>
      <div class="model-component-group"><div class="model-component-source">EMA</div>
      <button class="model-component-card" data-component-detail="Alcohol availability|EMA|Captures whether alcohol is readily available in the current environment.|Theory-based"><span>Alcohol availability</span></button></div>`
  },
  activity:{
    title:"Physical Activity",definition:"The degree of physical movement and activity observed during the pre-drinking window.",sources:"Passive sensing",finding:"Decreases binge drinking",findingClass:"decrease",estimate:"−3 percentage points per 1-point increase",ci:"−5.4 to −0.8<br>percentage points",adjusted:"Negative Affect,<br>Social Connection",
    components:`<div class="model-component-group"><div class="model-component-source">Passive sensing</div>
      <button class="model-component-card"><span>Step count</span></button>
      <button class="model-component-card"><span>Active minutes</span></button>
      <button class="model-component-card"><span>Movement intensity</span></button></div>`
  },
  binge:{
    title:"Binge Drinking",definition:"Whether binge drinking occurred during the defined outcome period.",sources:"EMA",finding:"Outcome",findingClass:"outcome",estimate:"—",ci:"—",adjusted:"—",
    components:`<div class="model-component-group"><div class="model-component-source">EMA</div>
      <button class="model-component-card" data-component-detail="Binge drinking status|EMA|Indicates whether binge drinking occurred during the outcome period.|Outcome definition"><span>Binge drinking status</span></button></div>`
  }
};

const modelEffectOverviewData={
  initial:[
    {key:"social",label:"Social Connection",effect:6,ciLow:2.7,ciHigh:8.8,status:"increase"},
    {key:"negative",label:"Negative Affect",effect:4,ciLow:1.1,ciHigh:6.9,status:"increase"},
    {key:"motivation",label:"Drinking Motivation",effect:1,ciLow:-1.8,ciHigh:3.7,status:"neutral"}
  ],
  revised:[
    {key:"social",label:"Social Connection",effect:5,ciLow:2.1,ciHigh:7.6,status:"increase"},
    {key:"negative",label:"Negative Affect",effect:3,ciLow:.8,ciHigh:5.4,status:"increase"},
    {key:"activity",label:"Physical Activity",effect:-3,ciLow:-5.4,ciHigh:-.8,status:"decrease"},
    {key:"motivation",label:"Drinking Motivation",effect:1,ciLow:-2.0,ciHigh:3.4,status:"neutral"}
  ]
};

function formatSignedPp(value){
  if(value===0) return "0 pp";
  const abs=Math.abs(value);
  const n=Number.isInteger(abs) ? abs.toFixed(0) : abs.toFixed(1);
  return `${value>0?"+":"−"}${n} pp`;
}

function formatSignedNoUnit(value){
  if(value===0) return "0";
  const abs=Math.abs(value);
  const n=Number.isInteger(abs) ? abs.toFixed(0) : abs.toFixed(1);
  return `${value>0?"+":"−"}${n}`;
}

function renderModelEffectOverview(){
  const list=document.getElementById("model-effect-overview-list");
  if(!list) return;
  const state=window.insightAnalysisState==="revised" ? "revised" : "initial";
  const rows=[...modelEffectOverviewData[state]].sort((a,b)=>Math.abs(b.effect)-Math.abs(a.effect));
  const min=-6,max=8;
  const pct=v=>Math.max(0,Math.min(100,((v-min)/(max-min))*100));
  list.innerHTML=rows.map(d=>{
    const lo=pct(d.ciLow), hi=pct(d.ciHigh), point=pct(d.effect);
    const statusLabel=d.status==="neutral" ? "No clear effect" : formatSignedPp(d.effect);
    return `
      <div class="effect-overview-row" data-construct="${d.key}">
        <div class="effect-overview-name">${d.label}</div>
        <div class="effect-overview-plot" aria-label="${d.label}: ${formatSignedPp(d.effect)}, 95% CI ${formatSignedPp(d.ciLow)} to ${formatSignedPp(d.ciHigh)}">
          <div class="effect-overview-track"></div>
          <div class="effect-overview-zero"></div>
          <div class="effect-overview-ci ${d.status}" style="left:${lo}%;width:${Math.max(1,hi-lo)}%"></div>
          <div class="effect-overview-dot ${d.status}" style="left:${point}%"></div>
        </div>
        <div class="effect-overview-values">
          <strong>${statusLabel}</strong>
          <span>95% CI: [${formatSignedNoUnit(d.ciLow)}, ${formatSignedNoUnit(d.ciHigh)}]</span>
        </div>
      </div>`;
  }).join("");
}

renderModelEffectOverview();


function showComponentExplanation(btn){
  const name=btn.querySelector("span")?.textContent.trim();
  const info=componentExplanationData[name];
  if(!info) return;

  document.querySelectorAll("#inspector-components .model-component-card").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");

  document.getElementById("component-explanation-name").textContent=name;
  document.getElementById("component-explanation-source").textContent=info.source;
  document.getElementById("component-explanation-what").textContent=info.what;
  document.getElementById("component-explanation-why").textContent=info.why;
  document.getElementById("component-explanation").style.display="";
}

function bindModelComponentCards(selectFirst=true){
  const cards=[...document.querySelectorAll("#inspector-components .model-component-card")];
  cards.forEach(btn=>{
    btn.setAttribute("type","button");
    btn.addEventListener("click",()=>showComponentExplanation(btn));
  });
  if(selectFirst && cards.length){
    showComponentExplanation(cards[0]);
  }else if(!cards.length){
    document.getElementById("component-explanation").style.display="none";
  }
}

function selectModelNode(key){
  const d=modelNodeData[key];
  if(!d) return;
  if(typeof setDynamicGraphSelection==="function") setDynamicGraphSelection("node",key);
  document.getElementById("node-inspector").style.display="";
  document.getElementById("inspector-node-title").textContent=d.title;
  document.getElementById("inspector-node-definition").textContent=d.definition;
  document.getElementById("inspector-node-sources").textContent=d.sources;

  const status=document.getElementById("model-finding-status");
  status.textContent=d.finding;
  status.className="model-finding-status "+d.findingClass;

  document.getElementById("model-effect-estimate").textContent=d.estimate;
  document.getElementById("model-effect-ci").innerHTML=d.ci;
  document.getElementById("model-adjusted-for").innerHTML=d.adjusted;
  document.getElementById("model-causal-effect-section").style.display=key==="binge"?"none":"";

  document.getElementById("inspector-components").innerHTML=d.components;
  document.getElementById("customize-construct-title").textContent=d.title;
  document.getElementById("customize-definition").value=d.definition;
  window.currentModelNodeKey=key;
  if(key!=="binge") window.selectedCausalConstruct=key;
  bindModelComponentCards();
}




document.getElementById("component-explanation-close").addEventListener("click",()=>{
  document.getElementById("component-explanation").style.display="none";
  document.querySelectorAll("#inspector-components .model-component-card").forEach(x=>x.classList.remove("active"));
});

let customizeComponentState=[];

function parseCurrentComponents(){
  const key=window.currentModelNodeKey || "social";
  const d=modelNodeData[key];
  const wrapper=document.createElement("div");
  wrapper.innerHTML=d.components;
  const groups=[...wrapper.querySelectorAll(".model-component-group")];
  const out=[];
  groups.forEach(group=>{
    const source=group.querySelector(".model-component-source")?.textContent.trim() || "Other";
    group.querySelectorAll(".model-component-card span").forEach(span=>{
      out.push({name:span.textContent.trim(),source,enabled:true});
    });
  });
  return out;
}

function renderCustomizeComponents(){
  const list=document.getElementById("customize-component-list");
  list.innerHTML=customizeComponentState.map((c,i)=>`
    <label class="customize-component-row">
      <input type="checkbox" data-index="${i}" ${c.enabled?"checked":""}>
      <span class="customize-component-name">${c.name}</span>
      <span class="customize-component-source">${c.source}</span>
    </label>
  `).join("");
  list.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
    cb.addEventListener("change",()=>{
      customizeComponentState[Number(cb.dataset.index)].enabled=cb.checked;
    });
  });
}

function openConstructCustomize(){
  const key=window.currentModelNodeKey || "social";
  const d=modelNodeData[key];
  document.getElementById("customize-construct-title").textContent=d.title;
  document.getElementById("customize-definition").value=d.definition;
  customizeComponentState=parseCurrentComponents();
  renderCustomizeComponents();
  document.getElementById("available-components-panel").style.display="none";

  // Close Manage constructs if open.
  if(typeof setModelEditMode==="function") setModelEditMode(false);

  const drawer=document.getElementById("construct-customize-panel");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
}
function closeConstructCustomize(){
  const drawer=document.getElementById("construct-customize-panel");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
}

document.getElementById("customize-construct-btn").addEventListener("click",openConstructCustomize);
document.getElementById("close-customize-construct").addEventListener("click",closeConstructCustomize);
document.getElementById("cancel-customize-construct").addEventListener("click",closeConstructCustomize);
document.getElementById("add-component-btn").addEventListener("click",()=>{
  const p=document.getElementById("available-components-panel");
  p.style.display=p.style.display==="none"?"":"none";
});
document.querySelectorAll(".available-component").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const exists=customizeComponentState.some(c=>c.name===btn.dataset.name);
    if(!exists){
      customizeComponentState.push({name:btn.dataset.name,source:btn.dataset.source,enabled:true});
      renderCustomizeComponents();
    }
  });
});
document.getElementById("save-customize-construct").addEventListener("click",()=>{
  const key=window.currentModelNodeKey || "social";
  const d=modelNodeData[key];
  d.definition=document.getElementById("customize-definition").value.trim() || d.definition;

  const enabled=customizeComponentState.filter(c=>c.enabled);
  const grouped={};
  enabled.forEach(c=>(grouped[c.source]??=[]).push(c.name));
  d.components=Object.entries(grouped).map(([source,names])=>`
    <div class="model-component-group">
      <div class="model-component-source">${source}</div>
      ${names.map(name=>`<button class="model-component-card"><span>${name}</span></button>`).join("")}
    </div>
  `).join("");

  selectModelNode(key);

  const empty=document.querySelector(".pending-change-empty");
  if(empty) empty.textContent="Construct definition or component mapping changed. Re-run analysis to update the causal model.";
});



let constructPendingChanges=[];

function updateConstructPendingSummary(){
  const el=document.getElementById("manage-pending-summary");
  if(!constructPendingChanges.length){
    el.textContent="No pending changes.";
    el.classList.remove("has-changes");
    return;
  }
  el.textContent=`${constructPendingChanges.length} pending change${constructPendingChanges.length===1?"":"s"}. These changes require the causal analysis to be re-estimated.`;
  el.classList.add("has-changes");
}

function addConstructPendingChange(text){
  if(!constructPendingChanges.includes(text)) constructPendingChanges.push(text);
  updateConstructPendingSummary();
}

document.querySelectorAll(".exclude-construct-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const row=btn.closest(".manage-construct-row");
    const label=row.querySelector("strong").textContent;
    const excluded=btn.dataset.state==="excluded";
    if(!excluded){
      btn.dataset.state="excluded";
      btn.textContent="Undo";
      row.classList.add("pending-exclude");
      addConstructPendingChange(`Exclude ${label} from the model`);
    }else{
      btn.dataset.state="";
      btn.textContent="Exclude";
      row.classList.remove("pending-exclude");
      constructPendingChanges=constructPendingChanges.filter(x=>x!==`Exclude ${label} from the model`);
      updateConstructPendingSummary();
    }
  });
});

document.querySelectorAll(".add-construct-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const row=btn.closest(".manage-construct-row");
    const label=btn.dataset.label;
    const added=btn.dataset.state==="added";
    if(!added){
      btn.dataset.state="added";
      btn.textContent="Added";
      row.classList.add("pending-add");
      addConstructPendingChange(`Add ${label} to the model`);
    }
  });
});

document.getElementById("create-construct-btn").addEventListener("click",()=>{
  document.getElementById("create-construct-panel").style.display="";
  document.getElementById("new-construct-name").focus();
});
document.getElementById("cancel-create-construct").addEventListener("click",()=>{
  document.getElementById("create-construct-panel").style.display="none";
  document.getElementById("new-construct-name").value="";
  document.getElementById("new-construct-definition").value="";
});
document.getElementById("save-new-construct").addEventListener("click",()=>{
  const name=document.getElementById("new-construct-name").value.trim();
  const def=document.getElementById("new-construct-definition").value.trim();
  if(!name) return;

  const list=document.getElementById("included-construct-list");
  const row=document.createElement("div");
  row.className="manage-construct-row pending-add";
  row.innerHTML=`<div><strong>${name}</strong><span>${def || "New construct"}</span></div><span class="new-construct-badge">New</span>`;
  list.appendChild(row);

  addConstructPendingChange(`Create new construct: ${name}`);
  document.getElementById("create-construct-panel").style.display="none";
  document.getElementById("new-construct-name").value="";
  document.getElementById("new-construct-definition").value="";
});

let revisedAnalysisApplied=false;

function addPhysicalActivityToGraph(){
  if(dynamicNodeSpec.activity) return;

  dynamicNodeSpec.negative.x=70; dynamicNodeSpec.negative.y=290;
  dynamicNodeSpec.motivation.x=195; dynamicNodeSpec.motivation.y=92;
  dynamicNodeSpec.social.x=330; dynamicNodeSpec.social.y=178;
  dynamicNodeSpec.opportunity.x=255; dynamicNodeSpec.opportunity.y=338;
  dynamicNodeSpec.binge.x=515; dynamicNodeSpec.binge.y=275;

  dynamicNodeSpec.activity={label:["Physical","Activity"],x:445,y:82,type:"construct"};

  [
    ["negative","activity","negative-activity"],
    ["social","activity","social-activity"],
    ["activity","binge","activity-binge"]
  ].forEach(([a,b,key])=>{
    dynamicEdgeSpec.push([a,b,key]);
    const visible=document.createElementNS(modelNS,"line");
    visible.classList.add("model-dyn-edge");
    visible.dataset.edge=key;
    visible.setAttribute("marker-end","url(#probe2-model-arrow)");
    dynamicEdgeLayer.appendChild(visible);
    dynamicEdgeEls[key]={visible,a,b};
  });

  const n=dynamicNodeSpec.activity;
  const g=document.createElementNS(modelNS,"g");
  g.classList.add("model-dyn-node","effect-decrease","newly-added");
  g.dataset.node="activity";

  const ring=document.createElementNS(modelNS,"circle");
  ring.classList.add("node-ring");
  ring.setAttribute("r","23");
  const core=document.createElementNS(modelNS,"circle");
  core.classList.add("node-core");
  core.setAttribute("r","17");
  g.appendChild(ring);
  g.appendChild(core);

  const label1=document.createElementNS(modelNS,"text");
  label1.setAttribute("text-anchor","middle");
  label1.setAttribute("y","38");
  label1.textContent="Physical";
  g.appendChild(label1);

  const label2=document.createElementNS(modelNS,"text");
  label2.classList.add("node-subline");
  label2.setAttribute("text-anchor","middle");
  label2.setAttribute("y","56");
  label2.textContent="Activity";
  g.appendChild(label2);

  g.addEventListener("click",e=>{
    e.stopPropagation();
    selectModelNode("activity");
  });

  let dragging=false;
  g.addEventListener("pointerdown",e=>{
    dragging=true;
    g.setPointerCapture(e.pointerId);
  });
  g.addEventListener("pointermove",e=>{
    if(!dragging) return;
    const pt=modelGraphSvg.createSVGPoint();
    pt.x=e.clientX; pt.y=e.clientY;
    const p=pt.matrixTransform(modelGraphSvg.getScreenCTM().inverse());
    n.x=Math.max(45,Math.min(modelGraphW-45,p.x));
    n.y=Math.max(45,Math.min(modelGraphH-65,p.y));
    drawDynamicModelGraph();
  });
  g.addEventListener("pointerup",()=>dragging=false);
  g.addEventListener("pointercancel",()=>dragging=false);

  dynamicNodeLayer.appendChild(g);
  dynamicNodeEls.activity=g;
  modelFindingVisual.activity={kind:"decrease",adjust:["negative","social"]};
  drawDynamicModelGraph();
  window.setTimeout(()=>g.classList.remove("newly-added"),2400);
}


function removePhysicalActivityFromGraph(){
  if(!dynamicNodeSpec.activity) return;

  if(dynamicNodeEls.activity){
    dynamicNodeEls.activity.remove();
    delete dynamicNodeEls.activity;
  }
  ["negative-activity","social-activity","activity-binge"].forEach(key=>{
    if(dynamicEdgeEls[key]){
      dynamicEdgeEls[key].visible.remove();
      delete dynamicEdgeEls[key];
    }
    const edgeIndex=dynamicEdgeSpec.findIndex(e=>e[2]===key);
    if(edgeIndex>=0) dynamicEdgeSpec.splice(edgeIndex,1);
  });

  delete dynamicNodeSpec.activity;
  delete modelFindingVisual.activity;

  dynamicNodeSpec.negative.x=80; dynamicNodeSpec.negative.y=285;
  dynamicNodeSpec.motivation.x=220; dynamicNodeSpec.motivation.y=95;
  dynamicNodeSpec.social.x=355; dynamicNodeSpec.social.y=185;
  dynamicNodeSpec.opportunity.x=275; dynamicNodeSpec.opportunity.y=335;
  dynamicNodeSpec.binge.x=505; dynamicNodeSpec.binge.y=275;

  dynamicConfounderLayer.innerHTML="";
  drawDynamicModelGraph();
}

function bindActivityExcludeButton(btn){
  if(!btn || btn.dataset.bound==="true") return;
  btn.dataset.bound="true";
  btn.addEventListener("click",()=>{
    const row=btn.closest(".manage-construct-row");
    const excluded=btn.dataset.state==="excluded";
    const changeText="Exclude Physical Activity from the model";

    if(!excluded){
      btn.dataset.state="excluded";
      btn.textContent="Undo";
      row.classList.add("pending-exclude");
      addConstructPendingChange(changeText);
    }else{
      btn.dataset.state="";
      btn.textContent="Exclude";
      row.classList.remove("pending-exclude");
      constructPendingChanges=constructPendingChanges.filter(x=>x!==changeText);
      updateConstructPendingSummary();
    }
  });
}

const initialActivityExcludeBtn=document.querySelector('#included-construct-list [data-construct="activity"] .activity-exclude-btn');
bindActivityExcludeButton(initialActivityExcludeBtn);

function restoreInitialAnalysis(){
  revisedAnalysisApplied=false;
  window.insightAnalysisState="initial";
  renderModelEffectOverview();

  modelNodeData.social.estimate="+6 percentage points per 1-point increase";
  modelNodeData.social.ci="+2.7 to +8.8<br>percentage points";
  modelNodeData.social.adjusted="Negative Affect,<br>Drinking Motivation";

  modelNodeData.negative.estimate="+4 percentage points per 1-point increase";
  modelNodeData.negative.ci="+1.1 to +6.9<br>percentage points";
  modelNodeData.negative.adjusted="None shown";

  modelNodeData.motivation.estimate="+1 percentage point per 1-point increase";
  modelNodeData.motivation.ci="−1.8 to +3.7<br>percentage points";
  modelNodeData.motivation.adjusted="Negative Affect";

  modelNodeData.opportunity.estimate="+1 percentage point per 1-point increase";
  modelNodeData.opportunity.ci="−2.0 to +3.6<br>percentage points";
  modelNodeData.opportunity.adjusted="Social Connection";

  findingContent.social.explainer="When the Social Connection score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking increases by about 6 percentage points.";
  findingContent.social.estimate="+6 percentage points per 1-point increase";
  findingContent.social.ci="+2.7 to +8.8 percentage points";
  findingContent.social.adjusted="Negative Affect, Drinking Motivation";

  findingContent.negative.explainer="When the Negative Affect score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking increases by about 4 percentage points.";
  findingContent.negative.estimate="+4 percentage points per 1-point increase";
  findingContent.negative.ci="+1.1 to +6.9 percentage points";
  findingContent.negative.adjusted="None shown";
  findingContent.motivation.explainer="Changes in the Drinking Motivation score were not associated with a meaningful estimated change in binge-drinking probability.";
  findingContent.motivation.estimate="+1 percentage point per 1-point increase";
  findingContent.motivation.ci="−1.8 to +3.7 percentage points";
  findingContent.motivation.adjusted="Negative Affect";

  removePhysicalActivityFromGraph();

  // Causal Insights back to initial analysis.
  document.getElementById("activity-finding-group").style.display="none";
  document.getElementById("finding-effect-social").textContent="+6 pp";
  document.getElementById("finding-effect-negative").textContent="+4 pp";

  window.insightAnalysisState="initial";
  renderCausalInsightDetails("social");

  // Interventions back to initial analysis.
  document.getElementById("activity-target-card").style.display="none";
  document.getElementById("target-effect-social").textContent="+6 pp";
  document.getElementById("target-effect-negative").textContent="+4 pp";

  // Model analysis-state label.
  // Move Physical Activity back to Available constructs.
  const activityIncluded=document.querySelector('#included-construct-list [data-construct="activity"]');
  if(activityIncluded){
    activityIncluded.style.display="none";
    activityIncluded.classList.remove("pending-exclude");
    const excludeBtn=activityIncluded.querySelector(".activity-exclude-btn");
    if(excludeBtn){
      excludeBtn.textContent="Exclude";
      excludeBtn.dataset.state="";
    }
  }

  const activityAvailable=document.querySelector('[data-available="activity"]');
  if(activityAvailable){
    activityAvailable.style.display="";
    activityAvailable.classList.remove("pending-add");
    const addBtn=activityAvailable.querySelector(".add-construct-btn");
    if(addBtn){
      addBtn.dataset.state="";
      addBtn.textContent="+ Add";
    }
  }

  window.selectedCausalConstruct="social";
  selectModelNode("social");
  if(document.getElementById("view-insights").style.display!=="none") selectInsightFinding("social");
  if(document.getElementById("view-interventions").style.display!=="none") selectInterventionTargetByKey("social");
}

function configureReanalysisModal(mode){
  const change=document.getElementById("reanalysis-model-change");
  const results=document.querySelector(".reanalysis-results");
  const propagation=document.querySelector(".reanalysis-propagation span");
  const heading=document.querySelector(".reanalysis-modal-head h2");

  if(mode==="reverted"){
    heading.textContent="Original causal analysis restored";
    change.textContent="Physical Activity was excluded from the causal analysis.";
    results.innerHTML=`
      <div class="reanalysis-result-row">
        <span>Social Connection</span>
        <div><del>+5 pp</del><strong>+6 pp</strong></div>
      </div>
      <div class="reanalysis-result-row">
        <span>Negative Affect</span>
        <div><del>+3 pp</del><strong>+4 pp</strong></div>
      </div>
      <div class="reanalysis-result-row removed-result">
        <span>Physical Activity</span>
        <div><del>−3 pp</del><strong>Removed</strong></div>
      </div>`;
    propagation.textContent="Causal Model, Causal Insights, and Interventions now reflect the original analysis without Physical Activity. Overview remains unchanged because it summarizes observed participant data.";
  }else{
    heading.textContent="Revised causal analysis";
    change.textContent="Physical Activity was added to the causal analysis.";
    results.innerHTML=`
      <div class="reanalysis-result-row">
        <span>Social Connection</span>
        <div><del>+6 pp</del><strong>+5 pp</strong></div>
      </div>
      <div class="reanalysis-result-row">
        <span>Negative Affect</span>
        <div><del>+4 pp</del><strong>+3 pp</strong></div>
      </div>
      <div class="reanalysis-result-row new-result">
        <span>Physical Activity</span>
        <div><strong>−3 pp</strong><em>New finding</em></div>
      </div>`;
    propagation.textContent="Causal Model, Causal Insights, and Interventions now use the revised analysis. Overview remains unchanged because it summarizes observed participant data.";
  }
}

function applyRevisedAnalysis(){
  revisedAnalysisApplied=true;
  window.insightAnalysisState="revised";
  renderModelEffectOverview();

  // Re-estimated construct-level effects under the revised model.
  modelNodeData.social.estimate="+5 percentage points per 1-point increase";
  modelNodeData.social.ci="+2.1 to +7.6<br>percentage points";
  modelNodeData.social.adjusted="Negative Affect,<br>Drinking Motivation";

  modelNodeData.negative.estimate="+3 percentage points per 1-point increase";
  modelNodeData.negative.ci="+0.8 to +5.4<br>percentage points";
  modelNodeData.negative.adjusted="None shown";

  modelNodeData.motivation.estimate="+1 percentage point per 1-point increase";
  modelNodeData.motivation.ci="−2.0 to +3.4<br>percentage points";
  modelNodeData.motivation.adjusted="Negative Affect";

  modelNodeData.opportunity.estimate="+1 percentage point per 1-point increase";
  modelNodeData.opportunity.ci="−1.9 to +3.2<br>percentage points";
  modelNodeData.opportunity.adjusted="Social Connection";

  findingContent.social.explainer="When the Social Connection score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking increases by about 5 percentage points.";
  findingContent.social.estimate="+5 percentage points per 1-point increase";
  findingContent.social.ci="+2.1 to +7.6 percentage points";
  findingContent.social.adjusted="Negative Affect, Drinking Motivation";
  findingContent.negative.explainer="When the Negative Affect score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking increases by about 3 percentage points.";
  findingContent.negative.estimate="+3 percentage points per 1-point increase";
  findingContent.negative.ci="+0.8 to +5.4 percentage points";
  findingContent.negative.adjusted="None shown";
  findingContent.motivation.explainer="Changes in the Drinking Motivation score were not associated with a meaningful estimated change in binge-drinking probability.";
  findingContent.motivation.estimate="+1 percentage point per 1-point increase";
  findingContent.motivation.ci="−2.0 to +3.4 percentage points";
  findingContent.motivation.adjusted="Negative Affect";
  findingContent.activity.adjusted="Negative Affect, Social Connection";

  addPhysicalActivityToGraph();

  // Causal Insights
  document.getElementById("activity-finding-group").style.display="";
  document.getElementById("finding-effect-social").textContent="+5 pp";
  document.getElementById("finding-effect-negative").textContent="+3 pp";

  // Re-analysis also propagates to construct-specific Causal Insights details.
  window.insightAnalysisState="revised";
  renderCausalInsightDetails(window.selectedCausalConstruct || "social");

  // Interventions
  document.getElementById("activity-target-card").style.display="";
  document.getElementById("target-effect-social").textContent="+5 pp";
  document.getElementById("target-effect-negative").textContent="+3 pp";

  // Model state
  // Move Physical Activity into Included in model while keeping it visible in Manage constructs.
  const activityAvailable=document.querySelector('[data-available="activity"]');
  if(activityAvailable){
    const row=document.querySelector('#included-construct-list [data-construct="activity"]');
    if(row){
      row.style.display="";
      row.classList.remove("pending-exclude");
      const btn=row.querySelector(".activity-exclude-btn");
      if(btn){
        btn.textContent="Exclude";
        btn.dataset.state="";
        bindActivityExcludeButton(btn);
      }
    }

    const addBtn=activityAvailable.querySelector(".add-construct-btn");
    if(addBtn){
      addBtn.dataset.state="";
      addBtn.textContent="+ Add";
    }
    activityAvailable.classList.remove("pending-add");
    activityAvailable.style.display="none";
  }

  // Refresh the currently visible selection.
  const selected=window.selectedCausalConstruct || "social";
  if(modelNodeData[selected]) selectModelNode(selected);
  if(document.getElementById("view-insights").style.display!=="none"){
    selectInsightFinding(selected==="activity" ? "activity" : selected);
  }
  if(document.getElementById("view-interventions").style.display!=="none"){
    selectInterventionTargetByKey(selected);
  }
}

document.getElementById("apply-construct-changes").addEventListener("click",()=>{
  if(!constructPendingChanges.length) return;

  const addingPhysical=constructPendingChanges.some(x=>x==="Add Physical Activity to the model");
  if(addingPhysical && !revisedAnalysisApplied){
    applyRevisedAnalysis();
    configureReanalysisModal("added");
    document.getElementById("manage-pending-summary").textContent="Re-analysis complete. The revised model and downstream results are now active.";
    document.getElementById("manage-pending-summary").classList.remove("has-changes");
    constructPendingChanges=[];
    setModelEditMode(false);
    const modal=document.getElementById("reanalysis-modal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    return;
  }

  const excludingPhysical=constructPendingChanges.some(x=>x==="Exclude Physical Activity from the model");
  if(excludingPhysical && revisedAnalysisApplied){
    restoreInitialAnalysis();
    configureReanalysisModal("reverted");
    document.getElementById("manage-pending-summary").textContent="Re-analysis complete. The original model state has been restored.";
    document.getElementById("manage-pending-summary").classList.remove("has-changes");
    constructPendingChanges=[];
    setModelEditMode(false);
    const modal=document.getElementById("reanalysis-modal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    return;
  }

  document.getElementById("manage-pending-summary").textContent="Changes applied. Causal analysis re-estimated for this prototype.";
  document.getElementById("manage-pending-summary").classList.remove("has-changes");
  constructPendingChanges=[];
});



renderCausalInsightDetails("social");

const reanalysisModal=document.getElementById("reanalysis-modal");
function closeReanalysisModal(){
  reanalysisModal.classList.remove("open");
  reanalysisModal.setAttribute("aria-hidden","true");
}
document.getElementById("close-reanalysis-modal").addEventListener("click",closeReanalysisModal);
document.getElementById("review-updated-model").addEventListener("click",()=>{
  closeReanalysisModal();
  setModelEditMode(false);
  const modelTab=document.querySelector('.tab[data-tab="model"]');
  if(modelTab) modelTab.click();
  selectModelNode(revisedAnalysisApplied ? "activity" : "social");
});
reanalysisModal.addEventListener("click",e=>{
  if(e.target===reanalysisModal) closeReanalysisModal();
});

const modelChangesDrawer=document.getElementById("model-changes-drawer");
const modelEditToggle=document.getElementById("model-edit-toggle");
function setModelEditMode(open){
  if(open && typeof closeConstructCustomize==="function"){
    closeConstructCustomize();
  }
  modelChangesDrawer.classList.toggle("open",open);
  modelChangesDrawer.setAttribute("aria-hidden",String(!open));
  document.querySelectorAll(".model-edit-only").forEach(x=>x.style.display=open?"":"none");
  modelEditToggle.textContent="Manage constructs";
}
modelEditToggle.addEventListener("click",()=>setModelEditMode(!modelChangesDrawer.classList.contains("open")));
document.getElementById("model-changes-close").addEventListener("click",()=>setModelEditMode(false));

// Probe 2-style draggable causal graph
const dynamicGraphHost=document.getElementById("model-dynamic-graph");
const modelNS="http://www.w3.org/2000/svg";
const modelGraphSvg=document.createElementNS(modelNS,"svg");
const modelGraphW=580, modelGraphH=410;
modelGraphSvg.setAttribute("viewBox",`0 0 ${modelGraphW} ${modelGraphH}`);
dynamicGraphHost.appendChild(modelGraphSvg);

const modelDefs=document.createElementNS(modelNS,"defs");
modelGraphSvg.appendChild(modelDefs);
function createModelMarker(id,color){
  const marker=document.createElementNS(modelNS,"marker");
  marker.setAttribute("id",id);
  marker.setAttribute("viewBox","0 -5 10 10");
  marker.setAttribute("refX","23");
  marker.setAttribute("refY","0");
  marker.setAttribute("markerWidth","6");
  marker.setAttribute("markerHeight","6");
  marker.setAttribute("orient","auto");
  const path=document.createElementNS(modelNS,"path");
  path.setAttribute("d","M0,-5L10,0L0,5");
  path.setAttribute("fill",color);
  marker.appendChild(path);
  modelDefs.appendChild(marker);
}
createModelMarker("probe2-model-arrow","#bfc6c2");
createModelMarker("probe2-model-arrow-red","#a84439");
createModelMarker("probe2-model-arrow-green","#39745b");
createModelMarker("probe2-model-arrow-neutral","#aab3b8");
createModelMarker("probe2-model-arrow-gold","#c9a227");
createModelMarker("probe2-model-arrow-blue","#315cc9");

const dynamicNodeSpec={
  negative:{label:["Negative","Affect"],x:80,y:285,type:"construct"},
  motivation:{label:["Drinking","Motivation"],x:220,y:95,type:"construct"},
  social:{label:["Social","Connection"],x:355,y:185,type:"construct"},
  opportunity:{label:["Drinking","Opportunity"],x:275,y:335,type:"construct"},
  binge:{label:["Binge","Drinking"],x:505,y:275,type:"outcome"}
};
const dynamicEdgeSpec=[
  ["negative","motivation","negative-motivation"],
  ["motivation","social","motivation-social"],
  ["social","opportunity","social-opportunity"],
  ["social","binge","social-binge"],
  ["negative","binge","negative-binge"]
];

const dynamicEdgeLayer=document.createElementNS(modelNS,"g");
const dynamicConfounderLayer=document.createElementNS(modelNS,"g");
const dynamicNodeLayer=document.createElementNS(modelNS,"g");
modelGraphSvg.appendChild(dynamicEdgeLayer);
modelGraphSvg.appendChild(dynamicConfounderLayer);
modelGraphSvg.appendChild(dynamicNodeLayer);

const dynamicEdgeEls={};
dynamicEdgeSpec.forEach(([a,b,key])=>{
  const visible=document.createElementNS(modelNS,"line");
  visible.classList.add("model-dyn-edge");
  visible.dataset.edge=key;
  visible.setAttribute("marker-end","url(#probe2-model-arrow)");

  dynamicEdgeLayer.appendChild(visible);
  dynamicEdgeEls[key]={visible,a,b};
});

const dynamicNodeEls={};
Object.entries(dynamicNodeSpec).forEach(([key,n])=>{
  const g=document.createElementNS(modelNS,"g");
  g.classList.add("model-dyn-node");
  const nodeFindingClass=(modelNodeData[key] && modelNodeData[key].findingClass) || (n.type==="outcome" ? "outcome" : "neutral");
  g.classList.add("effect-"+nodeFindingClass);
  if(n.type==="outcome") g.classList.add("outcome");
  g.dataset.node=key;

  const ring=document.createElementNS(modelNS,"circle");
  ring.classList.add("node-ring");
  ring.setAttribute("r","23");

  const core=document.createElementNS(modelNS,"circle");
  core.classList.add("node-core");
  core.setAttribute("r","17");

  g.appendChild(ring);
  g.appendChild(core);

  const label1=document.createElementNS(modelNS,"text");
  label1.setAttribute("text-anchor","middle");
  label1.setAttribute("y","38");
  label1.textContent=n.label[0];
  g.appendChild(label1);

  if(n.label[1]){
    const label2=document.createElementNS(modelNS,"text");
    label2.classList.add("node-subline");
    label2.setAttribute("text-anchor","middle");
    label2.setAttribute("y","56");
    label2.textContent=n.label[1];
    g.appendChild(label2);
  }

  g.addEventListener("click",e=>{
    e.stopPropagation();
    selectModelNode(key);
  });

  let dragging=false;
  g.addEventListener("pointerdown",e=>{
    dragging=true;
    g.setPointerCapture(e.pointerId);
  });
  g.addEventListener("pointermove",e=>{
    if(!dragging) return;
    const pt=modelGraphSvg.createSVGPoint();
    pt.x=e.clientX;
    pt.y=e.clientY;
    const p=pt.matrixTransform(modelGraphSvg.getScreenCTM().inverse());
    n.x=Math.max(45,Math.min(modelGraphW-45,p.x));
    n.y=Math.max(45,Math.min(modelGraphH-65,p.y));
    drawDynamicModelGraph();
  });
  g.addEventListener("pointerup",()=>dragging=false);
  g.addEventListener("pointercancel",()=>dragging=false);

  dynamicNodeLayer.appendChild(g);
  dynamicNodeEls[key]=g;
});

function drawDynamicModelGraph(){
  Object.values(dynamicEdgeEls).forEach(({visible,a,b})=>{
    const na=dynamicNodeSpec[a], nb=dynamicNodeSpec[b];
    visible.setAttribute("x1",na.x);
    visible.setAttribute("y1",na.y);
    visible.setAttribute("x2",nb.x);
    visible.setAttribute("y2",nb.y);
  });
  Object.entries(dynamicNodeSpec).forEach(([key,n])=>{
    dynamicNodeEls[key].setAttribute("transform",`translate(${n.x},${n.y})`);
  });
  dynamicConfounderLayer.querySelectorAll("line").forEach(line=>{
    const a=dynamicNodeSpec[line.dataset.a], b=dynamicNodeSpec[line.dataset.b];
    if(a && b){
      line.setAttribute("x1",a.x);
      line.setAttribute("y1",a.y);
      line.setAttribute("x2",b.x);
      line.setAttribute("y2",b.y);
    }
  });
}

const modelFindingVisual={
  social:{kind:"increase",adjust:["negative","motivation"]},
  negative:{kind:"increase",adjust:[]},
  motivation:{kind:"neutral",adjust:["negative"]},
  opportunity:{kind:"neutral",adjust:["social"]},
  binge:{kind:"outcome",adjust:[]}
};

function dynamicEdgesOnPathsToBinge(start){
  const outgoing={};
  dynamicEdgeSpec.forEach(([a,b,key])=>(outgoing[a]??=[]).push({b,key}));

  const edgesOnValidPaths=new Set();

  function dfs(node,pathEdges,visitedNodes){
    if(node==="binge"){
      pathEdges.forEach(edgeKey=>edgesOnValidPaths.add(edgeKey));
      return;
    }
    if(visitedNodes.has(node)) return;

    const nextVisited=new Set(visitedNodes);
    nextVisited.add(node);

    (outgoing[node]||[]).forEach(({b,key})=>{
      dfs(b,[...pathEdges,key],nextVisited);
    });
  }

  dfs(start,[],new Set());
  return edgesOnValidPaths;
}

function addConfounderOverlay(confounder,target){
  if(!dynamicNodeSpec[confounder] || !dynamicNodeSpec[target]) return;
  [[confounder,target],[confounder,"binge"]].forEach(([a,b])=>{
    if(a===b || !dynamicNodeSpec[a] || !dynamicNodeSpec[b]) return;
    const line=document.createElementNS(modelNS,"line");
    line.classList.add("model-confounder-edge");
    line.dataset.a=a;
    line.dataset.b=b;
    line.setAttribute("marker-end","url(#probe2-model-arrow-gold)");
    dynamicConfounderLayer.appendChild(line);
  });
}

function setDynamicGraphSelection(type,key){
  const visual=modelFindingVisual[key] || {kind:"neutral",adjust:[]};
  const adjustedNodes=new Set(visual.adjust||[]);
Object.entries(dynamicNodeEls).forEach(([nodeKey,el])=>{
    el.classList.toggle("active",type==="node" && nodeKey===key);
    el.classList.toggle("adjusted",type==="node" && adjustedNodes.has(nodeKey));
  });

  // Adjustment variables are highlighted at the node level.
  // All edges in the DAG remain ordinary solid causal arrows.
  dynamicConfounderLayer.innerHTML="";

  const activeEdges=dynamicEdgesOnPathsToBinge(key);
  const marker = "url(#probe2-model-arrow-blue)";

  Object.entries(dynamicEdgeEls).forEach(([edgeKey,obj])=>{
    const active=activeEdges.has(edgeKey);
    obj.visible.classList.toggle("active",active);
    obj.visible.classList.toggle("dim",!active);
    obj.visible.classList.toggle("increase",active && visual.kind==="increase");
    obj.visible.classList.toggle("decrease",active && visual.kind==="decrease");
    obj.visible.classList.toggle("neutral",active && visual.kind!=="increase" && visual.kind!=="decrease");
    obj.visible.setAttribute("marker-end",active?marker:"url(#probe2-model-arrow)");
  });

  drawDynamicModelGraph();
}

drawDynamicModelGraph();


selectModelNode("social");
