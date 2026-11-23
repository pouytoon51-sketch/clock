 "use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Github, Settings2 } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

function ClockFace() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const seconds = now.getSeconds(), minutes = now.getMinutes(), hours = now.getHours();
  return <div className="analog">
    <div className="ticks">{Array.from({length:12},(_,i)=><span key={i} style={{transform:`rotate(${i*30}deg)`}}>{i===0?12:i}</span>)}</div>
    <div className="hand hour" style={{transform:`translate(-50%,0) rotate(${hours%12*30+minutes*.5}deg)`}} />
    <div className="hand minute" style={{transform:`translate(-50%,0) rotate(${minutes*6}deg)`}} />
    <div className="hand second" style={{transform:`translate(-50%,0) rotate(${seconds*6}deg)`}} />
    <div className="center-dot" />
  </div>;
}

function DateWidget() {
 const [now,setNow]=useState(new Date());
 useEffect(()=>{const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id)},[]);
 return <div className="date-card"><div className="weekday">{now.toLocaleDateString("en-US",{weekday:"short"})}</div><div className="month">{now.toLocaleDateString("en-US",{month:"short"})}</div><div className="date-number">{pad(now.getDate())}</div><div className="date-bottom">{now.toLocaleDateString("en-US",{year:"numeric"})}</div></div>
}

function Stopwatch() {
 const [elapsed,setElapsed]=useState(0), [running,setRunning]=useState(false);
 useEffect(()=>{if(!running)return;const id=setInterval(()=>setElapsed(v=>v+1),1000);return()=>clearInterval(id)},[running]);
 return <div className="stopwatch">
  <div className="watch-face"><div className="watch-ticks">{Array.from({length:12},(_,i)=><span key={i} style={{transform:`rotate(${i*30}deg)`}}>{i===0?12:i}</span>)}</div><div className="watch-hand" style={{transform:`translate(-50%,0) rotate(${elapsed*6}deg)`}}/><div className="watch-center"/><div className="watch-time">{pad(Math.floor(elapsed/60))}.{pad(elapsed%60)}</div></div>
  <div className="watch-controls"><button onClick={()=>setRunning(v=>!v)} aria-label={running?"Pause":"Start"}>{running?<Pause size={15}/>:<Play size={15}/>}</button><button onClick={()=>{setElapsed(0);setRunning(false)}} aria-label="Reset"><RotateCcw size={15}/></button></div>
 </div>;
}

function MonthCalendar() {
 const [date,setDate]=useState(new Date());
 const y=date.getFullYear(), m=date.getMonth();
 const first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
 const cells=[...Array(first).fill(null),...Array.from({length:days},(_,i)=>i+1)];
 return <div className="calendar-widget"><div className="cal-head"><button onClick={()=>setDate(new Date(y,m-1,1))}><ChevronLeft size={15}/></button><strong>{date.toLocaleDateString("en-US",{month:"short",year:"numeric"})}</strong><button onClick={()=>setDate(new Date(y,m+1,1))}><ChevronRight size={15}/></button></div><div className="cal-grid">{["S","M","T","W","T","F","S"].map((d,i)=><span className="cal-day" key={i}>{d}</span>)}{cells.map((d,i)=><span className={d===new Date().getDate()&&m===new Date().getMonth()&&y===new Date().getFullYear()?"today":""} key={i}>{d||""}</span>)}</div></div>;
}

function WorldClock({
  city,
  zone,
  icon,
}: {
  city: string;
  zone: string;
  icon: string;
}) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: zone,
      }).format(new Date());

      setTime(formatted);
    };

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, [zone]);

  return (
    <div className="world-clock">
      <div className="city">
        {city}
        <span>{icon}</span>
      </div>
      <strong>{time}</strong>
    </div>
  );
}

export default function Home() {
 const [dark,setDark]=useState(true);
 const [clock,setClock]=useState(new Date());
 useEffect(()=>{const id=setInterval(()=>setClock(new Date()),1000);return()=>clearInterval(id)},[]);
 const currentTime=clock.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",second:"2-digit"});
 return <main className={dark?"page dark":"page light"}>
  <header className="topbar"><div className="brand"><span className="brand-mark"/><strong>Clock UI</strong></div><nav>Widgets</nav><div className="top-actions"><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={15}/> Give us a Star</a><button className="icon-button" onClick={()=>setDark(v=>!v)} aria-label="Toggle theme">{dark?<Sun size={17}/>:<Moon size={17}/>}</button></div></header>
  <section className="hero"><h1>The time, beautifully <span>organized.</span></h1><p>A collection of minimal time widgets for your everyday dashboard.</p><div className="hero-actions"><a className="primary" href="#widgets">Get Started</a><a className="secondary" href="#widgets">View Widgets</a></div></section>
  <section className="widgets" id="widgets">
   <article className="widget date-widget"><DateWidget/></article>
   <article className="widget live-clock"><div className="live-label"><span className="live-dot"/> Live</div><div className="digital-time">{currentTime}</div><div className="time-zone">Local time · {Intl.DateTimeFormat().resolvedOptions().timeZone}</div><div className="live-footer">Updated every second</div></article>
   <article className="widget analog-widget"><div className="widget-label">Analog clock</div><ClockFace/></article>
   <article className="widget big-digital"><div className="widget-label">Digital clock</div><div className="digits">{clock.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false})}</div><div className="seconds">{pad(clock.getSeconds())} <span>SECONDS</span></div><div className="digital-footer">{clock.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div></article>
   <article className="widget world-widget"><div className="widget-label">World clocks</div><WorldClock city="Tokyo" zone="Asia/Tokyo" icon="☀"/><WorldClock city="London" zone="Europe/London" icon="◐"/><WorldClock city="New York" zone="America/New_York" icon="☾"/></article>
   <article className="widget stopwatch-widget"><div className="widget-label">Stopwatch</div><Stopwatch/></article>
   <article className="widget calendar-widget-card"><div className="widget-label">Calendar</div><MonthCalendar/></article>
   <article className="widget focus-widget"><div className="widget-label">Focus timer</div><div className="focus-display">25<span>:</span>00</div><p>Ready for a focused session?</p><button className="focus-start" onClick={()=>alert("Focus timer UI demo — customize duration in your next iteration.")}>Start focus</button></article>
   <article className="widget timezone-widget"><div className="widget-label">Timezone</div><div className="timezone-row"><span>UTC</span><strong>{new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"UTC"})}</strong></div><div className="timezone-row"><span>Bangkok</span><strong>{new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"Asia/Bangkok"})}</strong></div><div className="timezone-row"><span>Los Angeles</span><strong>{new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:"America/Los_Angeles"})}</strong></div></article>
   <article className="widget quote-widget"><div className="widget-label">Time reminder</div><div className="quote">“Time is what we want most, but what we use worst.”</div><div className="quote-author">— William Penn</div></article>
   <article className="widget date-detail"><div className="widget-label">Today</div><div className="day-name">{clock.toLocaleDateString("en-US",{weekday:"long"})}</div><div className="date-long">{clock.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div><div className="date-mini">{clock.toLocaleDateString("en-US",{weekday:"short"})} · {clock.getDay()+1}/7 days</div></article>
   <article className="widget seconds-widget"><div className="widget-label">Seconds of the minute</div><div className="seconds-count">{clock.getSeconds().toString().padStart(2,"0")}<small>/ 60</small></div><div className="progress"><span style={{width:`${clock.getSeconds()/60*100}%`}}/></div><div className="progress-caption">Live progress</div></article>
  </section>
  <footer>Made for the moments that matter <span>✦</span></footer>
 </main>
}
