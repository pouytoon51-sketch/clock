'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon, Play, Pause, RotateCcw, Clock3, CalendarDays, Timer, Globe2, Settings, Home } from 'lucide-react';

function formatTime(date: Date) { return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); }
function WorldClock({city,zone}:{city:string;zone:string}) { const [time,setTime]=useState('--:--'); useEffect(()=>{const update=()=>setTime(new Intl.DateTimeFormat('en-US',{hour:'2-digit',minute:'2-digit',hour12:true,timeZone:zone}).format(new Date()));update();const id=setInterval(update,1000);return()=>clearInterval(id)},[zone]);return <div className="worldrow"><span>{city}</span><strong>{time}</strong></div>; }
export default function HomePage(){
 const [now,setNow]=useState(new Date()); const [dark,setDark]=useState(true); const [elapsed,setElapsed]=useState(0); const [running,setRunning]=useState(false);
 useEffect(()=>{const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id)},[]);
 useEffect(()=>{if(!running)return;const id=setInterval(()=>setElapsed(v=>v+10),10);return()=>clearInterval(id)},[running]);
 const month=now.toLocaleString('en-US',{month:'long'}), day=now.getDate(), weekday=now.toLocaleDateString('en-US',{weekday:'long'});
 const sw=`${Math.floor(elapsed/60000).toString().padStart(2,'0')}:${Math.floor((elapsed%60000)/1000).toString().padStart(2,'0')}.${Math.floor(elapsed%1000/10).toString().padStart(2,'0')}`;
 return <main className={dark?'app dark':'app light'}>
  <header className="header"><div className="brand"><div className="brandicon"><Clock3 size={18}/></div><span>Clock</span></div><button className="theme" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</button></header>
  <section className="hero"><p className="eyebrow">YOUR LOCAL TIME</p><h1>{formatTime(now)}</h1><div className="date-line">{weekday}, {month} {day}</div><div className="timezone-pill">◉ &nbsp; Bangkok · GMT+7</div></section>
  <section className="card analog-card"><div className="card-title"><span>ANALOG CLOCK</span><span className="live"><i/> LIVE</span></div><div className="analog"><div className="tick-ring">{Array.from({length:12},(_,i)=><span key={i} style={{transform:`rotate(${i*30}deg) translateY(-118px)`}}>{i===0?12:i}</span>)}</div><div className="hand hour" style={{transform:`rotate(${(now.getHours()%12)*30+now.getMinutes()/2}deg)`}}/><div className="hand minute" style={{transform:`rotate(${now.getMinutes()*6}deg)`}}/><div className="hand second" style={{transform:`rotate(${now.getSeconds()*6}deg)`}}/><div className="hub"/></div></section>
  <section className="card world-card"><div className="card-title"><span>WORLD CLOCKS</span><Globe2 size={16}/></div><WorldClock city="Tokyo" zone="Asia/Tokyo"/><WorldClock city="London" zone="Europe/London"/><WorldClock city="New York" zone="America/New_York"/></section>
  <section className="card stopwatch-card"><div className="card-title"><span>STOPWATCH</span><Timer size={16}/></div><div className="stopwatch">{sw}</div><div className="controls"><button className="start" onClick={()=>setRunning(!running)}>{running?<Pause size={17}/>:<Play size={17}/>}<span>{running?'Pause':'Start'}</span></button><button className="reset" onClick={()=>{setRunning(false);setElapsed(0)}}><RotateCcw size={17}/><span>Reset</span></button></div></section>
  <section className="card calendar-card"><div className="card-title"><span>CALENDAR</span><CalendarDays size={16}/></div><div className="calendar-head"><strong>{month} {now.getFullYear()}</strong></div><div className="days">{['S','M','T','W','T','F','S'].map((d,i)=><span className="day-label" key={i}>{d}</span>)}{Array.from({length:new Date(now.getFullYear(),now.getMonth(),1).getDay()},(_,i)=><span key={'blank'+i}/>)}{Array.from({length:new Date(now.getFullYear(),now.getMonth()+1,0).getDate()},(_,i)=><span key={i+1} className={i+1===day?'today':''}>{i+1}</span>)}</div></section>
  <section className="card quote-card"><div className="card-title"><span>DAILY THOUGHT</span></div><p>“Time is what we want most, but what we use worst.”</p><small>— William Penn</small></section>
  <nav className="bottomnav"><a className="active"><Home size={18}/><span>Home</span></a><a><Clock3 size={18}/><span>Clock</span></a><a><Settings size={18}/><span>Settings</span></a></nav>
 </main>
}
