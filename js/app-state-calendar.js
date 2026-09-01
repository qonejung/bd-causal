const eventData = {
  // May 2026
  "2026-05-03": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Alone", consequence:"None reported"},
  "2026-05-07": {type:"drink", start:"7:20 PM", drinks:2, location:"Restaurant", social:"Coworkers", consequence:"None reported"},
  "2026-05-12": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Partner", consequence:"None reported"},
  "2026-05-16": {type:"binge", start:"8:05 PM", drinks:6, location:"Bar", social:"Friends", consequence:"Hangover"},
  "2026-05-21": {type:"drink", start:"6:50 PM", drinks:3, location:"Home", social:"Friend", consequence:"None reported"},
  "2026-05-27": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Alone", consequence:"None reported"},
  "2026-05-30": {type:"binge", start:"7:45 PM", drinks:5, location:"Friend's home", social:"Friends", consequence:"Poor sleep"},

  // June 2026
  "2026-06-02": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Partner", consequence:"None reported"},
  "2026-06-06": {type:"drink", start:"7:05 PM", drinks:2, location:"Restaurant", social:"Friends", consequence:"None reported"},
  "2026-06-10": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Alone", consequence:"None reported"},
  "2026-06-14": {type:"binge", start:"8:15 PM", drinks:6, location:"Bar", social:"Friends", consequence:"Hangover; poor sleep"},
  "2026-06-19": {type:"drink", start:"6:40 PM", drinks:3, location:"Home", social:"Coworkers", consequence:"None reported"},
  "2026-06-23": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Partner", consequence:"None reported"},
  "2026-06-28": {type:"binge", start:"7:55 PM", drinks:5, location:"Restaurant / bar", social:"Friends", consequence:"Headache"},

  // July 2026
  "2026-07-02": {type:"binge", start:"7:30 PM", drinks:5, location:"Friend's home", social:"Friends", consequence:"Poor sleep"},
  "2026-07-05": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Partner", consequence:"None reported"},
  "2026-07-08": {type:"drink", start:"7:10 PM", drinks:2, location:"Restaurant", social:"Coworkers", consequence:"None reported"},
  "2026-07-12": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Alone", consequence:"None reported"},
  "2026-07-16": {type:"drink", start:"6:50 PM", drinks:3, location:"Home", social:"Friend", consequence:"None reported"},
  "2026-07-19": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Partner", consequence:"None reported"},
  "2026-07-24": {type:"binge", start:"6:45 PM", drinks:7, location:"Bar", social:"Friends", consequence:"Hangover; memory impairment"},
  "2026-07-28": {type:"drink", start:"7:40 PM", drinks:2, location:"Restaurant", social:"Friends", consequence:"None reported"},
  "2026-07-31": {type:"nodrink", start:"—", drinks:0, location:"Home", social:"Alone", consequence:"None reported"}
};

const availableMonths = [
  {year:2026, month:4, label:"May 2026"},
  {year:2026, month:5, label:"June 2026"},
  {year:2026, month:6, label:"July 2026"}
];
let currentMonthIndex = 2;
let activeFilter = null;
let selectedKey = "2026-07-24";

function pad(n){return String(n).padStart(2,"0")}

function renderCalendar(){
  const cfg = availableMonths[currentMonthIndex];
  document.getElementById("month-title").textContent = cfg.label;
  document.getElementById("prev-month").disabled = currentMonthIndex === 0;
  document.getElementById("next-month").disabled = currentMonthIndex === availableMonths.length - 1;

  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = "";

  const first = new Date(cfg.year, cfg.month, 1).getDay();
  const count = new Date(cfg.year, cfg.month + 1, 0).getDate();

  for(let i=0;i<first;i++){
    const blank=document.createElement("div");
    blank.className="day empty";
    daysContainer.appendChild(blank);
  }

  for(let d=1;d<=count;d++){
    const key=`${cfg.year}-${pad(cfg.month+1)}-${pad(d)}`;
    const btn=document.createElement("button");
    btn.className="day";

    const span=document.createElement("span");
    span.textContent=d;
    btn.appendChild(span);

    if(eventData[key]){
      btn.classList.add("event-day", eventData[key].type);
      btn.dataset.date=key;

      if(key === selectedKey) btn.classList.add("selected");
      if(activeFilter && eventData[key].type !== activeFilter) btn.classList.add("dimmed");

      btn.addEventListener("click",()=>selectDate(key));
    }
    daysContainer.appendChild(btn);
  }
}

function typeLabel(type){
  return type==="binge" ? "Binge drinking" : type==="drink" ? "Drinking" : "No drinking";
}
function dateTitle(key){
  const d=new Date(key+"T12:00:00");
  const main=d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  const dow=d.toLocaleDateString("en-US",{weekday:"short"});
  return `${main} (${dow})`;
}
function toMinutes(timeStr){
  if(timeStr==="—") return null;
  const [time,ap]=timeStr.split(" ");
  let [h,m]=time.split(":").map(Number);
  if(ap==="PM" && h!==12) h+=12;
  if(ap==="AM" && h===12) h=0;
  return h*60+m;
}
function fmtMinutes(total){
  total=(total+24*60)%(24*60);
  let h=Math.floor(total/60), m=total%60;
  const ap=h>=12?"PM":"AM";
  let hh=h%12; if(hh===0) hh=12;
  return `${hh}:${pad(m)} ${ap}`;
}
function selectDate(key){
  selectedKey = key;
  const d=eventData[key];

  document.querySelectorAll(".event-day").forEach(el=>el.classList.toggle("selected",el.dataset.date===key));

  const type=document.getElementById("detail-type");
  type.textContent=typeLabel(d.type);
  type.className=`detail-label ${d.type}`;
  document.getElementById("detail-title").textContent=dateTitle(key);
  document.getElementById("detail-drinks").textContent=`${d.drinks} drinks`;
  document.getElementById("detail-start").textContent=d.start;
  document.getElementById("detail-location").textContent=d.location;
  document.getElementById("detail-social").textContent=d.social;
  document.getElementById("detail-consequence").textContent=d.consequence;

  const startMin=toMinutes(d.start);
  if(startMin!==null){
    const wStart=fmtMinutes(startMin-15*60);
    const wEnd=fmtMinutes(startMin-3*60);
    document.getElementById("modal-copy").textContent=`For the ${dateTitle(key)} event, the analysis uses observations from ${wStart} to ${wEnd}, 3–15 hours before drinking started.`;
    document.getElementById("window-start").textContent=wStart;
    document.getElementById("window-end").textContent=wEnd;
    document.getElementById("window-event").textContent=d.start;
  }else{
    document.getElementById("modal-copy").textContent="No drinking start time was recorded for this day.";
    document.getElementById("window-start").textContent="";
    document.getElementById("window-end").textContent="";
    document.getElementById("window-event").textContent="";
  }
}

document.getElementById("prev-month").addEventListener("click",()=>{
  if(currentMonthIndex>0){
    currentMonthIndex--;
    renderCalendar();
  }
});
document.getElementById("next-month").addEventListener("click",()=>{
  if(currentMonthIndex<availableMonths.length-1){
    currentMonthIndex++;
    renderCalendar();
  }
});

document.querySelectorAll(".legend-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const type=btn.dataset.filter;
    activeFilter=activeFilter===type?null:type;
    document.querySelectorAll(".legend-btn").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));
    renderCalendar();
  });
});

renderCalendar();

const modal=document.getElementById("window-modal");
document.getElementById("open-window")?.addEventListener("click",()=>modal.classList.add("open"));
document.getElementById("close-window").addEventListener("click",()=>modal.classList.remove("open"));
modal.addEventListener("click",(e)=>{if(e.target===modal)modal.classList.remove("open")});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape")modal.classList.remove("open")});

