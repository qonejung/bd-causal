window.selectedCausalConstruct="social";

// Main navigation
const views = {
  overview: document.getElementById("view-overview"),
  model: document.getElementById("view-model"),
  insights: document.getElementById("view-insights"),
  interventions: document.getElementById("view-interventions")
};

document.querySelectorAll(".tab[data-tab]").forEach(tab=>{
  tab.addEventListener("click",()=>{
    const name = tab.dataset.tab;
    document.querySelectorAll(".tab[data-tab]").forEach(t=>t.classList.toggle("active", t===tab));
    Object.entries(views).forEach(([key,el])=>{
      if(el) el.style.display = key===name ? "" : "none";
    });

    const selected=window.selectedCausalConstruct || "social";
    if(name==="insights" && typeof selectInsightFinding==="function"){
      selectInsightFinding(selected);
    }
    if(name==="interventions" && typeof selectInterventionTargetByKey==="function"){
      selectInterventionTargetByKey(selected);
    }
    if(name==="model" && typeof selectModelNode==="function" && modelNodeData[selected]){
      selectModelNode(selected);
    }

    window.scrollTo({top:0, behavior:"instant"});
  });
});

// Construct-specific Causal Insights data and renderer.
// Each construct keeps its score-pattern data and its causal-comparison data together.
// Re-analysis changes the comparison state without changing the observed score-bin summaries.
const findingContent = {
  social:{
    title:"Social Connection → Binge Drinking",
    main:"Higher Social Connection was estimated to increase the probability of binge drinking.",
    explainer:"When the Social Connection score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking increases by about 6 percentage points.",
    estimate:"+6 percentage points per 1-point increase",
    ci:"+2.7 to +8.8 percentage points",
    adjusted:"Negative Affect, Drinking Motivation"
  },
  negative:{
    title:"Negative Affect → Binge Drinking",
    main:"Higher Negative Affect was estimated to increase the probability of binge drinking.",
    explainer:"When the Negative Affect score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking increases by about 4 percentage points.",
    estimate:"+4 percentage points per 1-point increase",
    ci:"+1.1 to +6.9 percentage points",
    adjusted:"None shown"
  },
  activity:{
    title:"Physical Activity → Binge Drinking",
    main:"Higher Physical Activity was estimated to decrease the probability of binge drinking.",
    explainer:"When the Physical Activity score increases by 1 point on the 0–5 scale, the estimated probability of binge drinking decreases by about 3 percentage points.",
    estimate:"−3 percentage points per 1-point increase",
    ci:"−5.5 to −0.7 percentage points",
    adjusted:"Negative Affect, Social Connection"
  },
  motivation:{
    title:"Drinking Motivation → Binge Drinking",
    main:"No clear causal effect of Drinking Motivation on binge drinking was identified for this participant.",
    explainer:"Changes in the Drinking Motivation score were not associated with a meaningful estimated change in binge-drinking probability.",
    estimate:"+1 percentage point per 1-point increase",
    ci:"−1.8 to +3.7 percentage points",
    adjusted:"Negative Affect"
  }
};


function updateObservedFrequencySubtitle(key){
  const el=document.getElementById("score-observed-subtitle");
  if(!el) return;
  const d=(typeof causalInsightsData!=="undefined" && causalInsightsData[key]) ? causalInsightsData[key] : null;
  const label=d ? (d.label || d.name || key) : key;
  el.textContent=`Observed binge-drinking frequency across ${label} scores`;
}

const causalInsightsData = {
  social:{
    label:"Social Connection",
    scoreRates:[6,9,14,28,24],
    defaultBin:"4-5",
    bins:{
      "0-1":{n:7,components:[["Messaging activity","8 min",18],["Call duration","2 min",10],["Social media usage duration","16 min",31],["Perceived social connection","1.4 / 5",28],["In-person social connection","1.8 / 5",36]],days:[]},
      "1-2":{n:16,components:[["Messaging activity","14 min",27],["Call duration","4 min",18],["Social media usage duration","22 min",42],["Perceived social connection","2.0 / 5",40],["In-person social connection","2.2 / 5",44]],days:[["May 18","1.8 / 5","5 drinks · Home · Alone"]]},
      "2-3":{n:33,components:[["Messaging activity","22 min",43],["Call duration","8 min",32],["Social media usage duration","29 min",55],["Perceived social connection","2.8 / 5",56],["In-person social connection","2.8 / 5",56]],days:[["Jun 3","2.7 / 5","5 drinks · Restaurant · Coworkers"]]},
      "3-4":{n:27,components:[["Messaging activity","37 min",68],["Call duration","15 min",55],["Social media usage duration","34 min",62],["Perceived social connection","3.7 / 5",74],["In-person social connection","3.1 / 5",62]],days:[["Jun 28","3.8 / 5","6 drinks · Bar · Friends"],["Jul 11","3.6 / 5","5 drinks · Restaurant · Friends"]]},
      "4-5":{n:9,components:[["Messaging activity","52 min",92],["Call duration","24 min",78],["Social media usage duration","37 min",66],["Perceived social connection","4.4 / 5",88],["In-person social connection","2.7 / 5",54]],days:[["Jul 24","4.7 / 5","7 drinks · Bar · Friends"],["Jul 2","4.4 / 5","5 drinks · Friend's home · Friends"],["Jun 14","4.2 / 5","6 drinks · Bar · Friends"]]}
    },
    comparisons:{
      initial:{
        janeEffect:6,timeRange:[0,10],timeTicks:[10,5,0],timeValues:[2,3,7],timeNote:"Social Connection appears to have an increasingly stronger effect on binge drinking over time, with the largest estimated effect in July.",
        groups:{
          all:{mean:2.1,bars:[0,0,0,3,7,13,21,34,48,42,55,73,88,70,76,61,43,20,7,0]},
          frequency:{mean:4.6,bars:[0,0,0,0,1,2,4,6,10,14,20,28,40,58,80,96,86,54,22,6]},
          age:{mean:1.6,bars:[0,0,2,5,10,18,29,41,37,46,68,91,84,63,51,57,39,16,4,0]},
          women:{mean:3.7,bars:[0,0,0,0,1,3,7,12,20,28,38,50,64,78,90,88,72,48,20,5]}
        },
        note:"Estimated Social Connection effects are predominantly positive across these reference cohorts. Jane's estimated effect (+6 pp) is above the mean for each reference cohort shown here. The similar binge-drinking frequency cohort has the most positively shifted distribution (mean +4.6 pp), while the same-gender cohort has a mean of +3.7 pp."
      },
      revised:{
        janeEffect:5,timeRange:[0,10],timeTicks:[10,5,0],timeValues:[1.5,2.5,6],timeNote:"Social Connection remains positively associated with binge drinking across the monitoring period, with the largest estimated effect in July.",
        groups:{
          all:{mean:1.7,bars:[0,0,1,4,8,15,25,38,50,46,61,80,91,76,69,52,34,15,4,0]},
          frequency:{mean:4.0,bars:[0,0,0,0,1,3,5,8,12,18,25,35,49,68,89,94,73,41,14,3]},
          age:{mean:1.3,bars:[0,1,3,7,13,22,34,46,42,54,75,94,81,59,47,49,30,11,2,0]},
          women:{mean:3.1,bars:[0,0,0,1,2,5,9,16,25,34,45,58,72,86,93,79,59,35,12,2]}
        },
        note:"Estimated Social Connection effects are predominantly positive across these reference cohorts. Jane's estimated effect (+5 pp) is above the mean for each reference cohort shown here. The similar binge-drinking frequency cohort has the most positively shifted distribution (mean +4.0 pp), while the same-gender cohort has a mean of +3.1 pp."
      }
    }
  },
  negative:{
    label:"Negative Affect",
    scoreRates:[7,11,17,25,34],
    defaultBin:"4-5",
    bins:{
      "0-1":{n:13,components:[["Negative mood","1.2 / 5",24],["Stress","1.3 / 5",26]],days:[]},
      "1-2":{n:21,components:[["Negative mood","1.8 / 5",36],["Stress","1.9 / 5",38]],days:[["May 30","1.7 / 5","5 drinks · Friend's home · Friends"]]},
      "2-3":{n:28,components:[["Negative mood","2.6 / 5",52],["Stress","2.8 / 5",56]],days:[["Jun 28","2.9 / 5","5 drinks · Restaurant / bar · Friends"]]},
      "3-4":{n:20,components:[["Negative mood","3.5 / 5",70],["Stress","3.7 / 5",74]],days:[["Jun 14","3.8 / 5","6 drinks · Bar · Friends"],["Jul 2","3.6 / 5","5 drinks · Friend's home · Friends"]]},
      "4-5":{n:10,components:[["Negative mood","4.4 / 5",88],["Stress","4.2 / 5",84]],days:[["Jul 24","4.6 / 5","7 drinks · Bar · Friends"]]}
    },
    comparisons:{
      initial:{
        janeEffect:4,timeRange:[0,8],timeTicks:[8,4,0],timeValues:[2,4,6],timeNote:"The estimated effect of Negative Affect becomes stronger across the monitoring period, with the largest effect in July.",
        groups:{
          all:{mean:1.8,bars:[0,0,1,2,5,9,15,24,36,48,61,76,90,83,68,52,34,17,6,1]},
          frequency:{mean:2.6,bars:[0,0,0,1,3,6,11,18,28,39,53,68,82,94,88,70,47,25,9,2]},
          age:{mean:1.5,bars:[0,0,1,3,7,12,20,31,44,56,71,89,85,69,55,40,24,11,3,0]},
          women:{mean:2.2,bars:[0,0,0,2,4,8,14,22,34,46,59,74,88,91,76,58,37,19,7,1]}
        },
        note:"Positive Estimated Negative Affect effects are predominantly positive across these reference cohorts. Jane's estimated effect (+4 pp) is above the mean for each reference cohort shown here, with the most positively shifted distribution in the similar binge-drinking frequency cohort."
      },
      revised:{
        janeEffect:3,timeRange:[0,8],timeTicks:[8,4,0],timeValues:[1.5,3,4.8],timeNote:"Negative Affect remains positively associated with binge drinking across the monitoring period, with the largest estimated effect in July.",
        groups:{
          all:{mean:1.4,bars:[0,1,2,4,8,14,22,33,45,58,72,88,91,75,58,41,25,12,3,0]},
          frequency:{mean:2.1,bars:[0,0,1,2,5,9,15,24,35,48,62,78,91,89,72,53,35,18,6,1]},
          age:{mean:1.2,bars:[0,1,2,5,9,15,24,36,48,61,76,92,86,68,51,36,21,9,2,0]},
          women:{mean:1.8,bars:[0,0,1,3,6,11,18,28,40,53,67,82,93,84,66,48,31,15,5,1]}
        },
        note:"Estimated Negative Affect effects are predominantly positive across these reference cohorts. Jane's estimated effect (+3 pp) remains above the mean for each reference cohort shown here."
      }
    }
  },
  motivation:{
    label:"Drinking Motivation",
    scoreRates:[13,15,14,17,16],
    defaultBin:"4-5",
    bins:{
      "0-1":{n:11,components:[["Desire to drink","1.2 / 5",24],["Intention to drink","1.1 / 5",22]],days:[["May 16","1.4 / 5","6 drinks · Bar · Friends"]]},
      "1-2":{n:19,components:[["Desire to drink","1.9 / 5",38],["Intention to drink","1.7 / 5",34]],days:[["Jun 14","1.8 / 5","6 drinks · Bar · Friends"]]},
      "2-3":{n:31,components:[["Desire to drink","2.7 / 5",54],["Intention to drink","2.5 / 5",50]],days:[["Jun 28","2.6 / 5","5 drinks · Restaurant / bar · Friends"]]},
      "3-4":{n:22,components:[["Desire to drink","3.6 / 5",72],["Intention to drink","3.4 / 5",68]],days:[["Jul 2","3.7 / 5","5 drinks · Friend's home · Friends"]]},
      "4-5":{n:9,components:[["Desire to drink","4.5 / 5",90],["Intention to drink","4.2 / 5",84]],days:[["Jul 24","4.6 / 5","7 drinks · Bar · Friends"]]}
    },
    comparisons:{
      initial:{
        janeEffect:1,timeRange:[0,4],timeTicks:[4,2,0],timeValues:[0.6,1.2,0.9],timeNote:"Estimated Drinking Motivation effects remain small and relatively stable over time, with no clear directional pattern.",
        groups:{
          all:{mean:0.4,bars:[0,1,2,5,9,15,23,34,49,66,82,94,80,61,43,28,16,8,3,1]},
          frequency:{mean:0.7,bars:[0,0,1,3,6,11,18,28,42,58,76,92,88,70,50,33,20,10,4,1]},
          age:{mean:0.3,bars:[0,1,3,6,11,18,27,39,55,73,91,86,68,51,37,25,14,7,2,0]},
          women:{mean:0.5,bars:[0,0,2,4,8,14,22,33,47,64,81,93,82,63,45,30,18,9,3,1]}
        },
        note:"Estimated Drinking Motivation effects cluster close to zero across these reference cohorts. Jane's estimated effect (+1 pp) falls within the central portion of the reference-cohort distributions rather than standing out as unusually large."
      },
      revised:{
        janeEffect:1,timeRange:[0,4],timeTicks:[4,2,0],timeValues:[0.5,1.1,0.8],timeNote:"Estimated Drinking Motivation effects remain small and relatively stable over time, with no clear directional pattern.",
        groups:{
          all:{mean:0.3,bars:[0,1,3,6,10,16,25,37,52,69,85,93,77,58,41,27,15,7,2,0]},
          frequency:{mean:0.6,bars:[0,0,1,4,7,12,20,31,45,61,79,92,85,67,48,31,18,9,3,1]},
          age:{mean:0.2,bars:[0,1,3,7,12,19,29,42,58,76,92,84,66,49,35,23,13,6,2,0]},
          women:{mean:0.4,bars:[0,1,2,5,9,15,23,35,49,66,83,92,80,61,44,29,17,8,3,0]}
        },
        note:"Estimated Drinking Motivation effects cluster close to zero across these reference cohorts. Jane's estimated effect (+1 pp) remains within the central portion of the reference-cohort distributions."
      }
    }
  },
  activity:{
    label:"Physical Activity",
    scoreRates:[33,27,21,15,10],
    defaultBin:"4-5",
    bins:{
      "0-1":{n:8,components:[["Step count","1,450 steps",18],["Active minutes","14 min",18],["Movement intensity","1.4 / 5",28]],days:[["Jul 24","0.8 / 5","7 drinks · Bar · Friends"],["Jun 14","0.9 / 5","6 drinks · Bar · Friends"]]},
      "1-2":{n:17,components:[["Step count","2,900 steps",32],["Active minutes","27 min",34],["Movement intensity","1.9 / 5",38]],days:[["Jul 2","1.7 / 5","5 drinks · Friend's home · Friends"]]},
      "2-3":{n:30,components:[["Step count","4,850 steps",51],["Active minutes","42 min",53],["Movement intensity","2.7 / 5",54]],days:[["Jun 28","2.4 / 5","5 drinks · Restaurant / bar · Friends"]]},
      "3-4":{n:25,components:[["Step count","7,100 steps",72],["Active minutes","58 min",73],["Movement intensity","3.5 / 5",70]],days:[["May 30","3.3 / 5","5 drinks · Friend's home · Friends"]]},
      "4-5":{n:12,components:[["Step count","9,600 steps",92],["Active minutes","76 min",95],["Movement intensity","4.3 / 5",86]],days:[]}
    },
    comparisons:{
      revised:{
        janeEffect:-3,timeRange:[-6,0],timeTicks:[0,-3,-6],timeValues:[-1.5,-2.8,-4.0],timeNote:"Physical Activity shows an increasingly protective estimated effect over time, with the most negative effect in July.",
        groups:{
          all:{mean:-1.4,bars:[0,2,6,14,27,45,68,90,84,66,48,34,22,13,7,3,1,0,0,0]},
          frequency:{mean:-1.9,bars:[1,4,10,22,41,66,89,94,72,51,35,23,14,8,4,2,0,0,0,0]},
          age:{mean:-1.2,bars:[0,1,5,12,24,42,65,87,91,70,52,37,24,15,8,4,1,0,0,0]},
          women:{mean:-1.6,bars:[0,3,8,18,34,57,81,93,78,58,41,28,18,10,5,2,1,0,0,0]}
        },
        note:"Negative Estimated Physical Activity effects are predominantly negative across these reference cohorts, indicating a generally protective pattern. Jane's estimated effect (−3 pp) is more negative than the mean for each reference cohort shown here."
      }
    }
  }
};

window.insightAnalysisState="initial";

function formatEffectValue(value){
  if(value>0) return `+${value}`;
  if(value<0) return `−${Math.abs(value)}`;
  return "0";
}

function currentInsightState(key){
  const d=causalInsightsData[key];
  if(!d) return "initial";
  if(window.insightAnalysisState==="revised" && d.comparisons.revised) return "revised";
  return d.comparisons.initial ? "initial" : "revised";
}

function renderScorePattern(key){
  const d=causalInsightsData[key];
  if(!d) return;
  document.getElementById("relationship-panel-title").textContent=`Binge Drinking Across ${d.label} Scores`;
  const observedSubtitle=document.getElementById("score-observed-subtitle");
  if(observedSubtitle) observedSubtitle.textContent=`Observed binge-drinking frequency across ${d.label} scores`;

  const labels=document.querySelectorAll('.value-label-row span');
  const bars=document.querySelectorAll('.score-bin-bar');
  d.scoreRates.forEach((rate,i)=>{
    if(labels[i]) labels[i].textContent=`${rate}%`;
    if(bars[i]) bars[i].style.height=`${Math.max(2, rate/40*100)}%`;
  });

  const desired=d.defaultBin || "4-5";
  document.querySelectorAll('.score-bin').forEach(btn=>btn.classList.toggle('active',btn.dataset.bin===desired));
  renderBinForConstruct(key,desired);
}

function renderBinForConstruct(key,bin){
  const d=causalInsightsData[key];
  const b=d?.bins?.[bin];
  if(!d || !b) return;
  document.getElementById("selected-range-label").textContent=`${d.label} score ${bin.replace('-', '–')} (n = ${b.n})`;
  document.getElementById("component-list").innerHTML=b.components.map(c=>`
    <div class="component-block">
      <div class="component-title">${c[0]}</div>
      <div class="single-component-row"><div class="hbar"><i style="width:${c[2]}%"></i></div><b>${c[1]}</b></div>
    </div>`).join("");

  const days=document.getElementById("relevant-days");
  if(!b.days.length){
    days.innerHTML=`<div class="empty-events">No binge-drinking events were observed in this score range.</div>`;
  }else{
    days.innerHTML=b.days.map(day=>`
      <div class="example-card">
        <span class="example-type binge">Binge drinking</span>
        <strong>${day[0]}</strong>
        <span>${d.label} ${day[1]}</span>
        <small>${day[2]}</small>
      </div>`).join("");
  }
}

function renderTimeComparison(key,state){
  const cfg=causalInsightsData[key].comparisons[state];
  const [min,max]=cfg.timeRange;
  const ticks=document.querySelector('.time-y-axis');
  ticks.innerHTML=cfg.timeTicks.map(v=>`<span>${formatEffectValue(v)}</span>`).join('');

  const xs=[15,50,85];
  const yPx=cfg.timeValues.map(v=>((max-v)/(max-min))*210);
  const svg=document.querySelector('.tall-time-chart svg');
  svg.innerHTML="";

  document.querySelectorAll('.tall-time-chart .time-dot').forEach(x=>x.remove());
  const plot=document.querySelector('.tall-time-chart .time-plot');
  const labels=plot.querySelector('.time-value-labels');
  cfg.timeValues.forEach((v,i)=>{
    const dot=document.createElement('div');
    dot.className='time-dot';
    dot.style.left=`${xs[i]}%`;
    dot.style.top=`${yPx[i]}px`;
    plot.insertBefore(dot,labels);
  });
  labels.innerHTML=cfg.timeValues.map((v,i)=>`<span style="left:${xs[i]}%; top:${Math.max(0,yPx[i]-28)}px;">${formatEffectValue(v)}</span>`).join('');
  document.getElementById('time-variation-note').textContent=cfg.timeNote;
}

function formatSignedPp(value){
  if(value>0) return `+${value.toFixed(1)} pp`;
  if(value<0) return `−${Math.abs(value).toFixed(1)} pp`;
  return `0.0 pp`;
}
function comparisonMeanLeft(mean){ return ((mean+10)/20)*100; }
function janeBinIndex(effect){ return Math.max(0,Math.min(19,Math.floor(effect+10))); }

function renderPatientDistributions(key,state){
  const d=causalInsightsData[key];
  const cfg=d.comparisons[state];
  Object.entries(cfg.groups).forEach(([groupKey,group])=>{
    const card=document.querySelector(`.patient-distribution-card[data-comparison-group="${groupKey}"]`);
    if(!card) return;
    const bars=[...card.querySelectorAll('.histogram-bars i')];
    bars.forEach((bar,index)=>{
      bar.style.height=`${group.bars[index]||0}%`;
      bar.classList.toggle('jane-bin',index===janeBinIndex(cfg.janeEffect));
    });
    const left=comparisonMeanLeft(group.mean);
    const line=card.querySelector('.histogram-mean-line');
    const label=card.querySelector('.histogram-mean-label');
    if(line) line.style.left=`${left}%`;
    if(label){label.style.left=`${left}%`;label.textContent=`Mean ${formatSignedPp(group.mean)}`;}
  });
  const effectLabel=`${cfg.janeEffect>0?'+':cfg.janeEffect<0?'−':''}${Math.abs(cfg.janeEffect)} pp`;
  document.getElementById('jane-distribution-note').innerHTML=`<span class="jane-bin-swatch"></span>The highlighted bin contains Jane's estimated effect (${effectLabel}).`;
  document.getElementById('group-comparison-note').textContent=cfg.note;
}

function renderCausalInsightDetails(key){
  const d=causalInsightsData[key];
  if(!d) return;
  const state=currentInsightState(key);
  renderScorePattern(key);
  renderTimeComparison(key,state);
  renderPatientDistributions(key,state);
}

function selectInsightFinding(key){
  const item=document.querySelector(`.finding-item[data-finding="${key}"]`);
  const f=findingContent[key];
  if(!item || !f || item.closest('[style*="display:none"]')) return;
  document.querySelectorAll(".finding-item").forEach(x=>x.classList.remove("active"));
  item.classList.add("active");
  document.getElementById("insight-title").textContent=f.title;
  document.getElementById("effect-main").textContent=f.main;
  document.getElementById("effect-explainer").textContent=f.explainer;
  document.getElementById("insight-effect-estimate").textContent=f.estimate;
  document.getElementById("insight-effect-ci").textContent=f.ci;
  document.getElementById("insight-effect-adjusted").textContent=f.adjusted || "—";
  window.selectedCausalConstruct=key;
  renderCausalInsightDetails(key);
  if(typeof renderAddContextForConstruct==="function") renderAddContextForConstruct(key);
}

document.querySelectorAll(".finding-item").forEach(item=>{
  item.addEventListener("click",()=>selectInsightFinding(item.dataset.finding));
});

document.querySelectorAll(".score-bin").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".score-bin").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderBinForConstruct(window.selectedCausalConstruct || "social",btn.dataset.bin);
  });
});

