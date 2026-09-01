// Causal Findings drawer
const findingsDrawer=document.getElementById("findings-drawer");
const openFindingsDrawer=document.getElementById("open-findings-drawer");
const closeFindingsDrawer=document.getElementById("close-findings-drawer");

function setFindingsDrawer(open){
  findingsDrawer.classList.toggle("open",open);
  findingsDrawer.setAttribute("aria-hidden",String(!open));
  openFindingsDrawer.setAttribute("aria-expanded",String(open));
  openFindingsDrawer.style.display=open?"none":"";
  if(open && typeof setContextDrawer==="function"){
    setContextDrawer(false);
  }
}
openFindingsDrawer.addEventListener("click",()=>setFindingsDrawer(true));
closeFindingsDrawer.addEventListener("click",()=>setFindingsDrawer(false));

// Keep only one side panel open at a time.
const originalSetContextDrawer=setContextDrawer;
setContextDrawer=function(open){
  originalSetContextDrawer(open);
  if(open && typeof setFindingsDrawer==="function"){
    findingsDrawer.classList.remove("open");
    findingsDrawer.setAttribute("aria-hidden","true");
    openFindingsDrawer.setAttribute("aria-expanded","false");
    openFindingsDrawer.style.display="";
  }
};


// Interventions phase tabs
document.querySelectorAll(".intervention-phase-tab").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".intervention-phase-tab").forEach(b=>b.classList.toggle("active", b===btn));
    const design=document.getElementById("intervention-design-phase");
    const outcomes=document.getElementById("intervention-outcomes-phase");
    design.style.display=btn.dataset.phase==="design" ? "" : "none";
    outcomes.style.display=btn.dataset.phase==="outcomes" ? "" : "none";
  });
});

document.querySelectorAll(".refine-option").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".refine-option").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
});




const interventionStrategyData = {"social": {"default": "refusal", "strategies": [{"key": "refusal", "name": "Drinking-refusal skills", "description": "Practice ways to decline or limit additional drinks while remaining socially engaged.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Pause before agreeing to evening drinking plans and set a drink limit first", "situation": "When John calls or messages about drinking plans after 5 PM", "action": "Pause before agreeing and decide how to decline additional drinks", "boundary": "Set a limit of no more than 3 drinks", "timeframe": "For the next 8 weeks", "messages": ["Before going out tonight, decide how you will respond if someone offers you another drink.", "Think of one way to stay socially involved without accepting an additional drink.", "Before replying to a drinking invitation, take a moment to decide the limit you want to keep tonight."]}, {"key": "protective", "name": "Protective behavioral strategies", "description": "Use concrete limits and pacing strategies to reduce risk during social drinking situations.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Use a pacing and drink-limit strategy during social drinking", "situation": "When drinking with John or close friends", "action": "Set a drink limit in advance and alternate alcoholic drinks with non-alcoholic drinks", "boundary": "No more than 3 alcoholic drinks in the evening", "timeframe": "For the next 8 weeks", "messages": ["Before meeting friends, choose your drink limit and how you will pace drinks tonight.", "If you drink tonight, alternate alcoholic drinks with water or another non-alcoholic drink.", "Check your plan before the evening starts: what limit do you want to keep tonight?"]}, {"key": "network", "name": "Peer-network restructuring", "description": "Reduce exposure to social situations or relationships that repeatedly lead to heavier drinking.", "source": "Clinician-authored (illustrative)", "planName": "Reduce spontaneous heavy-drinking plans with higher-risk peers", "situation": "When a spontaneous drinking invitation comes from someone often linked to heavier drinking", "action": "Delay the decision and suggest a shorter or lower-risk alternative plan", "boundary": "Avoid unplanned late-night drinking on work nights", "timeframe": "For the next 8 weeks", "messages": ["If a spontaneous drinking plan comes up tonight, consider whether a shorter or lower-risk alternative would work.", "Before accepting an unplanned drinking invitation, check whether this is one of the situations that often becomes heavier than intended.", "Consider suggesting a different plan if tonight's invitation is likely to lead to heavier drinking."]}, {"key": "alternative", "name": "Alternative social activities", "description": "Maintain social connection through activities that do not center on alcohol.", "source": "Clinician-authored (illustrative)", "planName": "Plan one non-drinking activity with the same friend", "situation": "When making plans with John or close friends this week", "action": "Suggest a social activity that does not involve drinking", "boundary": "Schedule at least one non-drinking social activity", "timeframe": "For the next 8 weeks", "messages": ["Consider one way to spend time with the same friend this week that does not involve drinking.", "When making plans, suggest an activity where alcohol is not the main focus.", "Think of one social plan this week that lets you stay connected without drinking."]}, {"key": "supportive", "name": "Supportive-peer engagement", "description": "Recruit a trusted peer to support the patient's drinking goals in social situations.", "source": "Clinician-authored (illustrative)", "planName": "Ask a supportive friend to help reinforce the drinking plan", "situation": "Before a social event where drinking is likely", "action": "Tell a trusted friend the drinking limit and ask them to support it", "boundary": "Identify one supportive person before the event", "timeframe": "For the next 8 weeks", "messages": ["Before tonight's social plan, consider telling one trusted person the limit you want to keep.", "Who could support your drinking goal if the evening becomes harder than expected?", "Ask one supportive friend to help you stick with the plan you set for tonight."]}]}, "negative": {"default": "emotion", "strategies": [{"key": "emotion", "name": "Emotion-regulation skills", "description": "Use a brief skill to respond to difficult emotions before making a drinking decision.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Use an emotion-regulation skill before deciding to drink", "situation": "When negative mood is especially strong after a difficult day", "action": "Name the emotion and use a brief coping skill before deciding whether to drink", "boundary": "Wait at least 30 minutes before making a drinking decision", "timeframe": "For the next 8 weeks", "messages": ["If your mood feels especially difficult right now, name what you are feeling before deciding whether to drink.", "Try one brief emotion-regulation skill before making a drinking decision tonight.", "Give yourself a short pause to respond to the feeling before using alcohol to change it."]}, {"key": "stress", "name": "Stress-management strategies", "description": "Reduce acute stress before the period when drinking is most likely.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Use a short stress-reset routine after work", "situation": "After a high-stress workday or unresolved conflict", "action": "Complete a 15-minute stress-reset routine before making evening plans", "boundary": "Finish the routine before the first drink", "timeframe": "For the next 8 weeks", "messages": ["Before making evening drinking plans, take 15 minutes for your stress-reset routine.", "If work stress is still high, try your planned reset before deciding whether to drink.", "Create a short transition between the workday and tonight's drinking decision."]}, {"key": "alternativeCoping", "name": "Alternative coping activities", "description": "Replace drinking-as-coping with another activity that can change mood or reduce tension.", "source": "Clinician-authored (illustrative)", "planName": "Try one non-drinking coping activity before drinking", "situation": "When Jane notices an urge to drink because of stress or low mood", "action": "Choose one non-drinking coping activity such as a walk, shower, music, or calling someone", "boundary": "Try the alternative activity for at least 20 minutes first", "timeframe": "For the next 8 weeks", "messages": ["Before drinking to change how you feel, try one of your non-drinking coping activities first.", "Choose one 20-minute activity that could help with the stress you are feeling now.", "If drinking feels like the quickest way to cope, try your alternative coping option before deciding."]}, {"key": "problemSolving", "name": "Problem-solving skills", "description": "Identify a manageable next step when a specific unresolved problem is driving distress.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Take one small problem-solving step before using alcohol to cope", "situation": "When a specific work or relationship problem is driving strong stress", "action": "Write down the problem and choose one manageable action for the next day", "boundary": "Identify one concrete next step before drinking", "timeframe": "For the next 8 weeks", "messages": ["If one specific problem is driving the stress tonight, write down one step you can take tomorrow.", "Before drinking to get away from the problem, identify one small action that could make it more manageable.", "Separate what can be acted on from what has to wait, then revisit the drinking decision."]}, {"key": "relaxation", "name": "Relaxation and distress-management skills", "description": "Use a brief relaxation or grounding exercise during periods of high emotional arousal.", "source": "Clinician-authored (illustrative)", "planName": "Use a grounding exercise when distress is high", "situation": "When stress, irritability, or discouragement feels difficult to tolerate", "action": "Use a brief breathing or grounding exercise before making a drinking decision", "boundary": "Complete at least 5 minutes of the exercise first", "timeframe": "For the next 8 weeks", "messages": ["If distress feels high right now, try five minutes of your grounding exercise before deciding whether to drink.", "Pause for a brief breathing exercise before acting on the urge to drink.", "Use your planned distress-management skill first, then check how strong the urge to drink still feels."]}]}, "activity": {"default": "scheduling", "strategies": [{"key": "scheduling", "name": "Activity scheduling", "description": "Plan activity before the time of day when inactivity and drinking risk may increase.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Schedule an after-work activity before the usual drinking period", "situation": "On days when Jane expects to be inactive after work", "action": "Complete a planned walk or other moderate activity before the usual drinking period", "boundary": "Aim for at least 30 minutes of activity", "timeframe": "For the next 8 weeks", "messages": ["Before your usual evening drinking time, start the activity you planned for today.", "If the evening is unstructured, use your scheduled walk or activity as the first plan.", "Check today's activity plan before settling into the usual evening routine."]}, {"key": "activation", "name": "Behavioral activation", "description": "Increase engagement in rewarding, purposeful activities during otherwise inactive periods.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Choose one rewarding activity for low-activity evenings", "situation": "When the evening would otherwise be mostly inactive or unstructured", "action": "Choose one enjoyable or meaningful activity and start it before the usual drinking period", "boundary": "Complete at least one planned activity", "timeframe": "For the next 8 weeks", "messages": ["Choose one rewarding activity to start before the usual drinking period tonight.", "If the evening feels empty or inactive, begin one of the activities you identified in advance.", "Use one planned activity to give tonight some structure before deciding whether to drink."]}, {"key": "routine", "name": "Routine-building strategies", "description": "Create a repeatable after-work routine that supports activity and reduces unstructured time.", "source": "Clinician-authored (illustrative)", "planName": "Build a consistent active after-work routine", "situation": "Immediately after finishing work on weekdays", "action": "Follow the same short sequence: change clothes, walk, then start dinner or another planned task", "boundary": "Use the routine on at least 3 weekdays each week", "timeframe": "For the next 8 weeks", "messages": ["Start your after-work routine before the evening becomes unstructured.", "Follow the first step of your active routine as soon as work ends today.", "Keep the sequence simple tonight: change, move, then continue with the evening."]}, {"key": "goal", "name": "Goal setting and self-monitoring", "description": "Set a manageable activity goal and track whether it is completed.", "source": "Evidence-based intervention literature (illustrative)", "planName": "Set and track a daily activity goal", "situation": "At the start of each day", "action": "Choose a realistic movement goal and check progress before the evening", "boundary": "Record whether the goal was completed each day", "timeframe": "For the next 8 weeks", "messages": ["Check the activity goal you set for today before the evening starts.", "How close are you to today's movement goal? Choose one small step to finish it.", "Record today's activity goal before moving into your usual evening routine."]}, {"key": "socialActivity", "name": "Socially supported activity", "description": "Use another person or a shared plan to make physical activity easier to initiate and maintain.", "source": "Clinician-authored (illustrative)", "planName": "Plan an active check-in with another person", "situation": "On an evening when Jane expects low activity", "action": "Arrange a walk or another active plan with a supportive friend or family member", "boundary": "Schedule at least one shared activity each week", "timeframe": "For the next 8 weeks", "messages": ["If activity is hard to start alone tonight, consider asking someone to join you.", "Check whether your planned walk or active meet-up is still possible today.", "Use a shared activity plan to add structure before the usual evening drinking period."]}]}};

const interventionConstructData = {
  social:{
    label:"Social Connection",
    components:[
      ["messaging","Messaging activity","Higher Social Connection score ranges included more messaging activity."],
      ["socialmedia","Social media usage duration","Higher Social Connection score ranges included somewhat more social media usage."],
      ["call","Call duration","Higher Social Connection score ranges included longer call duration."],
      ["perceived","Perceived social connection","Higher Social Connection score ranges included higher perceived social connection ratings."],
      ["inperson","In-person social connection","Higher Social Connection score ranges did not consistently include higher in-person social connection ratings."]
    ],
    focus:"Evening calls or messages with John that lead to spontaneous drinking plans.",
    examples:[
      "Evening calls or messages with John that lead to spontaneous drinking plans.",
      "Social plans with close friends that are frequently followed by heavier drinking."
    ],
    planName:"Pause before agreeing to evening drinking plans and set a drink limit first",
    situation:"When John calls or messages about drinking plans after 5 PM",
    action:"Pause before agreeing and decide a drink limit first",
    boundary:"Set a limit of no more than 3 drinks",
    timeframe:"For the next 2 weeks",
    reminder:"If you're making drinking plans tonight, take a moment to decide your drink limit before responding."
  },
  negative:{
    label:"Negative Affect",
    components:[
      ["negativeMood","Negative mood","Higher Negative Affect score ranges included higher negative mood ratings."],
      ["stress","Stress","Higher Negative Affect score ranges included higher stress ratings."]
    ],
    focus:"Periods of strong stress or negative mood after difficult workdays that may precede heavier drinking.",
    examples:[
      "High stress after work deadlines or unresolved conflicts.",
      "Evenings when irritability or discouragement is followed by drinking to change how she feels."
    ],
    planName:"Use a brief coping routine before drinking when stress or negative mood is high",
    situation:"When stress or negative mood feels especially high after work",
    action:"Pause and use a non-drinking coping strategy before deciding whether to drink",
    boundary:"Wait at least 30 minutes before making a drinking decision",
    timeframe:"For the next 2 weeks",
    reminder:"If stress or your mood feels especially difficult right now, try your coping strategy before deciding whether to drink."
  },
  activity:{
    label:"Physical Activity",
    components:[
      ["steps","Step count","Higher Physical Activity score ranges included more steps."],
      ["activeMinutes","Active minutes","Higher Physical Activity score ranges included more active minutes."],
      ["movementIntensity","Movement intensity","Higher Physical Activity score ranges included greater movement intensity."]
    ],
    focus:"Planned daytime activity or walking routines that may help maintain lower-risk evenings.",
    examples:[
      "Keeping an after-work walking or errand routine on days when drinking risk may be higher.",
      "Scheduling a planned activity before the usual evening drinking period."
    ],
    planName:"Keep an after-work activity routine before the usual drinking period",
    situation:"On days when Jane expects to be inactive after work or has no evening plans",
    action:"Complete a planned walk or other moderate activity before the usual drinking period",
    boundary:"Aim for at least 30 minutes of activity",
    timeframe:"For the next 2 weeks",
    reminder:"Before your usual evening drinking time, consider doing your planned walk or activity first."
  }
};

function renderInterventionComponents(key){
  const data=interventionConstructData[key] || interventionConstructData.social;
  const list=document.querySelector("#view-interventions .component-list");
  if(!list) return;
  list.innerHTML=data.components.map((c,i)=>`<button class="component-review-item${i===0?" active":""}" data-component="${c[0]}"><span>${c[1]}</span></button>`).join("");
  list.querySelectorAll(".component-review-item").forEach(btn=>{
    btn.addEventListener("click",()=>{
      list.querySelectorAll(".component-review-item").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      renderInterventionComponentDetails(key,btn.dataset.component);
    });
  });
  if(data.components.length) renderInterventionComponentDetails(key,data.components[0][0]);
}

function renderInterventionComponentDetails(key, componentKey){
  const data=interventionConstructData[key] || interventionConstructData.social;
  const component=data.components.find(c=>c[0]===componentKey);
  const panel=document.getElementById("linked-context-panel");
  if(!panel) return;
  const pattern=component ? component[2] : "";
  const records=(savedContextRecordsByConstruct[key]||[]).filter(r=>r.components.includes(componentKey));
  panel.innerHTML=`
    <div class="intervention-context-subsection">
      <div class="patient-context-label">Observed pattern</div>
      <div class="linked-context-item"><p>${pattern}</p></div>
    </div>
    <div class="intervention-context-subsection">
      <div class="patient-context-label">Participant-provided context</div>
      ${records.length ? records.map(rec=>`<div class="linked-context-item"><p>${rec.text}</p></div>`).join("") : '<div class="linked-context-empty">No participant-provided context has been saved for this component.</div>'}
    </div>`;
}


function getInterventionStrategy(key, strategyKey){
  const group=interventionStrategyData[key] || interventionStrategyData.social;
  return group.strategies.find(s=>s.key===strategyKey) || group.strategies[0];
}

function renderStrategyMessageLibrary(key, strategyKey, preserveMessage=false){
  const strategy=getInterventionStrategy(key,strategyKey);
  const wrap=document.getElementById("message-library-options");
  const source=document.getElementById("message-library-source");
  if(source) source.textContent=`Source: ${strategy.source}`;
  if(!wrap) return;
  wrap.innerHTML=strategy.messages.map((msg,i)=>`<button type="button" class="message-suggestion${i===0?" active":""}" data-message-index="${i}">${msg}</button>`).join("");
  wrap.querySelectorAll(".message-suggestion").forEach(btn=>{
    btn.addEventListener("click",()=>{
      wrap.querySelectorAll(".message-suggestion").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const msg=strategy.messages[Number(btn.dataset.messageIndex)] || "";
      const box=document.getElementById("support-message");
      if(box) box.value=msg;
      const summary=document.getElementById("summary-message");
      if(summary) summary.textContent=msg || "—";
      const reviewMessage=document.getElementById("review-message");
      if(reviewMessage) reviewMessage.textContent=msg || "—";
    });
  });
  if(!preserveMessage){
    const msg=strategy.messages[0] || "";
    const box=document.getElementById("support-message");
    if(box) box.value=msg;
    const summary=document.getElementById("summary-message");
    if(summary) summary.textContent=msg || "—";
    const reviewMessage=document.getElementById("review-message");
    if(reviewMessage) reviewMessage.textContent=msg || "—";
  }
}

function applyInterventionStrategy(key, strategyKey, updatePlan=true){
  const strategy=getInterventionStrategy(key,strategyKey);
  window.selectedInterventionStrategy=strategy.key;

  const name=document.getElementById("selected-strategy-name");
  if(name) name.textContent=strategy.name;
  const source=document.getElementById("selected-strategy-source");
  if(source) source.textContent=`Source: ${strategy.source}`;
  const summary=document.getElementById("summary-strategy");
  if(summary) summary.textContent=strategy.name;
  const review=document.getElementById("review-strategy");
  if(review) review.textContent=strategy.name;

  document.querySelectorAll("#strategy-grid .strategy-card").forEach(card=>{
    card.classList.toggle("active",card.dataset.strategyKey===strategy.key);
    card.setAttribute("aria-checked",String(card.dataset.strategyKey===strategy.key));
  });

  if(updatePlan){
    const values={
      "coping-plan-name":strategy.planName,
      "goal-situation":strategy.situation,
      "goal-action":strategy.action,
      "goal-boundary":strategy.boundary,
      "goal-timeframe":strategy.timeframe
    };
    Object.entries(values).forEach(([id,val])=>{
      const el=document.getElementById(id);
      if(el) el.value=val;
    });
    const summaryName=document.getElementById("summary-plan-name");
    if(summaryName) summaryName.textContent=strategy.planName;
    const reviewName=document.getElementById("review-plan-name");
    if(reviewName) reviewName.textContent=strategy.planName;
    const reviewSituation=document.getElementById("review-situation");
    if(reviewSituation) reviewSituation.textContent=strategy.situation;
    const reviewAction=document.getElementById("review-action");
    if(reviewAction) reviewAction.textContent=strategy.action;
    const reviewBoundary=document.getElementById("review-boundary");
    if(reviewBoundary) reviewBoundary.textContent=strategy.boundary;
    if(typeof updateBehaviorGoal==="function") updateBehaviorGoal();
  }

  renderStrategyMessageLibrary(key,strategy.key,false);
}

function renderInterventionStrategies(key){
  const group=interventionStrategyData[key] || interventionStrategyData.social;
  const grid=document.getElementById("strategy-grid");
  if(!grid) return;
  grid.innerHTML=group.strategies.map(strategy=>`
    <button type="button" class="strategy-card" role="radio" aria-checked="false" data-strategy-key="${strategy.key}">
      <div class="strategy-card-name">${strategy.name}</div>
      <div class="strategy-card-desc">${strategy.description}</div>
      <div class="strategy-source">Source: ${strategy.source}</div>
    </button>`).join("");

  grid.querySelectorAll(".strategy-card").forEach(card=>{
    card.addEventListener("click",()=>applyInterventionStrategy(key,card.dataset.strategyKey,true));
  });

  applyInterventionStrategy(key,group.default,true);
}


function renderInterventionFocusAndPlan(key){
  const data=interventionConstructData[key] || interventionConstructData.social;
  const focus=document.getElementById("focus-input");
  if(focus){
    focus.value=data.focus;
    const summary=document.getElementById("summary-focus");
    if(summary) summary.textContent=data.focus;
  }
  const exampleList=document.querySelector("#view-interventions .focus-example ul");
  if(exampleList) exampleList.innerHTML=data.examples.map(x=>`<li>${x}</li>`).join("");
}

function renderInterventionTriggerFeatures(key){
  const data=interventionConstructData[key] || interventionConstructData.social;
  const wrap=document.querySelector("#construct-trigger-settings .feature-trigger-options");
  if(wrap) wrap.innerHTML=data.components.map(c=>`<label class="feature-trigger-option"><input type="checkbox" value="${c[1]}"><span>${c[1]}</span></label>`).join("");

  const constructRadio=document.querySelector('input[name="support-trigger"][value="When target construct is high"], input[name="support-trigger"][value="When target construct is low"]');
  if(constructRadio){
    const low=key==="activity";
    constructRadio.value=low?"When target construct is low":"When target construct is high";
    const strong=constructRadio.closest(".support-choice")?.querySelector("strong");
    if(strong) strong.textContent=constructRadio.value;
    const fieldLabel=document.querySelector("#construct-trigger-settings .intervention-field-label");
    if(fieldLabel) fieldLabel.textContent=low?"Feature used to identify a low target construct":"Feature used to identify a high target construct";
    if(constructRadio.checked){
      document.getElementById("summary-support").textContent=constructRadio.value;
    }
    if(typeof updateSupportTriggerUI==="function") updateSupportTriggerUI();
  }
}

function selectInterventionTargetByKey(key){
  const btn=document.querySelector(`.target-construct-card[data-construct-key="${key}"]`);
  if(!btn || btn.style.display==="none" || !interventionConstructData[key]) return;
  document.querySelectorAll(".target-construct-card").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("summary-factor").textContent=btn.dataset.factor;
  window.selectedCausalConstruct=key;
  window.selectedInterventionConstruct=key;
  renderInterventionComponents(key);
  renderInterventionFocusAndPlan(key);
  renderInterventionStrategies(key);
  renderInterventionTriggerFeatures(key);
}
document.querySelectorAll(".target-construct-card").forEach(btn=>{
  btn.addEventListener("click",()=>selectInterventionTargetByKey(btn.dataset.constructKey));
});

renderInterventionStrategies("social");


const focusInput=document.getElementById("focus-input");
focusInput.addEventListener("input",()=>{
  document.getElementById("summary-focus").textContent=focusInput.value || "—";
});

const goalFields=["goal-situation","goal-action","goal-boundary","goal-timeframe"];
function updateBehaviorGoal(){
  const situation=document.getElementById("goal-situation").value.trim();
  const action=document.getElementById("goal-action").value.trim();
  const boundary=document.getElementById("goal-boundary").value.trim();
  const timeframe=document.getElementById("goal-timeframe").value.trim();

  let sentence="";
  if(situation) sentence+=situation;
  if(action) sentence+=(sentence?", Jane will ":"Jane will ")+action.charAt(0).toLowerCase()+action.slice(1);
  if(boundary) sentence+=(sentence?", with ":"")+boundary.charAt(0).toLowerCase()+boundary.slice(1);
  if(timeframe) sentence+=(sentence?", ":"")+timeframe.charAt(0).toLowerCase()+timeframe.slice(1);
  if(sentence && !/[.!?]$/.test(sentence)) sentence+=".";

  document.getElementById("goal-preview").textContent=sentence || "—";
  document.getElementById("summary-goal").textContent=sentence || "—";
  const reviewSituation=document.getElementById("review-situation");
  if(reviewSituation) reviewSituation.textContent=situation || "—";
  const reviewAction=document.getElementById("review-action");
  if(reviewAction) reviewAction.textContent=action || "—";
  const reviewBoundary=document.getElementById("review-boundary");
  if(reviewBoundary) reviewBoundary.textContent=boundary || "—";
}
goalFields.forEach(id=>document.getElementById(id).addEventListener("input",updateBehaviorGoal));

const supportEnabled=document.getElementById("support-enabled");
const supportSettings=document.getElementById("support-settings");
function updateSupportEnabled(){
  supportSettings.style.display=supportEnabled.checked?"":"none";
  if(!supportEnabled.checked){
    document.getElementById("summary-support").textContent="None";
    document.getElementById("summary-delivery").textContent="—";
    document.getElementById("summary-message").textContent="—";
  }else{
    const selected=document.querySelector('input[name="support-trigger"]:checked');
    document.getElementById("summary-support").textContent=selected?selected.value:"—";
    document.getElementById("summary-delivery").textContent=document.getElementById("support-delivery").value;
    document.getElementById("summary-message").textContent=document.getElementById("support-message").value || "—";
  }
  if(typeof updateReviewTimelySupport==="function") updateReviewTimelySupport();
  const reviewMessage=document.getElementById("review-message");
  if(reviewMessage) reviewMessage.textContent=supportEnabled.checked ? (document.getElementById("support-message").value || "—") : "—";
}
supportEnabled.addEventListener("change",updateSupportEnabled);

function updateReviewTimelySupport(){
  const review=document.getElementById("review-support");
  if(!review) return;
  if(!supportEnabled.checked){
    review.textContent="Not enabled";
    return;
  }
  const selected=document.querySelector('input[name="support-trigger"]:checked');
  let trigger=selected ? selected.value : "—";
  if(trigger==="Custom scheduled time"){
    const time=document.getElementById("custom-support-time").value;
    trigger=time ? `Custom scheduled time · ${time}` : "Custom scheduled time";
  }
  const delivery=document.getElementById("support-delivery")?.value;
  review.textContent=delivery ? `${trigger} · ${delivery}` : trigger;
}

function updateSupportTriggerUI(){
  const selected=document.querySelector('input[name="support-trigger"]:checked');
  document.querySelectorAll(".support-choice").forEach(label=>{
    const radio=label.querySelector('input[name="support-trigger"]');
    label.classList.toggle("selected",!!radio && radio.checked);
  });

  const constructSettings=document.getElementById("construct-trigger-settings");
  const customTimeSettings=document.getElementById("custom-time-settings");
  const value=selected ? selected.value : "";

  if(constructSettings){
    constructSettings.style.display=(value==="When target construct is high" || value==="When target construct is low") ? "" : "none";
  }
  if(customTimeSettings){
    customTimeSettings.style.display=value==="Custom scheduled time" ? "" : "none";
  }

  const summarySupport=document.getElementById("summary-support");
  if(summarySupport && supportEnabled.checked){
    if(value==="Custom scheduled time"){
      const time=document.getElementById("custom-support-time").value;
      summarySupport.textContent=time ? `Custom scheduled time · ${time}` : "Custom scheduled time";
    }else{
      summarySupport.textContent=value || "—";
    }
  }
  updateReviewTimelySupport();
}

document.querySelectorAll('input[name="support-trigger"]').forEach(input=>{
  input.addEventListener("change",updateSupportTriggerUI);
});
updateSupportTriggerUI();

document.getElementById("custom-support-time").addEventListener("change",e=>{
  const selected=document.querySelector('input[name="support-trigger"]:checked');
  if(selected && selected.value==="Custom scheduled time"){
    document.getElementById("summary-support").textContent=e.target.value ? `Custom scheduled time · ${e.target.value}` : "Custom scheduled time";
    updateReviewTimelySupport();
  }
});

document.getElementById("support-delivery").addEventListener("change",e=>{
  document.getElementById("summary-delivery").textContent=e.target.value;
  updateReviewTimelySupport();
});
document.getElementById("support-message").addEventListener("input",e=>{
  document.getElementById("summary-message").textContent=e.target.value || "—";
  const reviewMessage=document.getElementById("review-message");
  if(reviewMessage) reviewMessage.textContent=e.target.value || "—";
});

document.getElementById("save-intervention-plan").addEventListener("click",e=>{
  e.target.textContent="Saved";
  const status=document.querySelector(".plan-status");
  if(status) status.textContent="Saved draft";
});


// Keep coping plan name synchronized across Plan and Review
const copingPlanNameInput=document.getElementById("coping-plan-name");
if(copingPlanNameInput){
  copingPlanNameInput.addEventListener("input",()=>{
    const value=copingPlanNameInput.value.trim() || "Untitled coping plan";
    const summaryName=document.getElementById("summary-plan-name");
    const reviewName=document.getElementById("review-plan-name");
    if(summaryName) summaryName.textContent=value;
    if(reviewName) reviewName.textContent=value;
  });
}


