import {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import './IntroSpace.css';

type IntroProps={onComplete:()=>void};

const dialogue=[
  'Hey. You lost, or just looking for company?',
  "Something interesting about those rockets? You've been staring for a while.",
  'To space?…',
  'I’ve always wanted to see the moon…',
  "You're new around here, right? Come on. I'll show you around."
];

export default function Intro({onComplete}:IntroProps){
  const[line,setLine]=useState(0);
  const[leaving,setLeaving]=useState(false);
  const first=line===0;
  const last=line===dialogue.length-1;

  const next=()=>{
    if(last){
      setLeaving(true);
      window.setTimeout(onComplete,760);
    }else{
      setLine(v=>v+1);
    }
  };

  const back=()=>{
    if(line>0)setLine(v=>v-1);
  };

  return <main className={`space-prologue ${leaving?'space-prologue--leaving':''}`}>
    <div className="space-prologue__background"/>
    <div className="space-prologue__shade"/>

    <section className={`lucy-panel ${first?'lucy-panel--glitching':''}`} aria-live="polite">
      <div className="lucy-panel__rail lucy-panel__rail--top"/>
      <div className="lucy-panel__rail lucy-panel__rail--bottom"/>
      <div className="lucy-panel__notch"/>
      <div className="lucy-panel__scan"/>

      {first&&<>
        <img className="lucy-panel__echo echo-1" src="/assets/lucy-clean.png" alt=""/>
        <img className="lucy-panel__echo echo-2" src="/assets/lucy-clean.png" alt=""/>
        <img className="lucy-panel__echo echo-3" src="/assets/lucy-clean.png" alt=""/>
        <img className="lucy-panel__echo echo-4" src="/assets/lucy-clean.png" alt=""/>
      </>}

      <img className="lucy-panel__portrait" src="/assets/lucy-clean.png" alt="Pixel-art portrait of Lucy"/>

      <div className="lucy-panel__copy">
        <header>
          <strong>LUCY</strong>
          <small>CONTACT // LOCAL</small>
        </header>
        <p>{dialogue[line]}</p>
        <span>{String(line+1).padStart(2,'0')} / {String(dialogue.length).padStart(2,'0')}</span>
      </div>
    </section>

    <div className="space-prologue__controls">
      {line>0&&<button className="scene-button scene-button--back" onClick={back}>
        <ChevronLeft size={17}/>BACK
      </button>}
      <button className="scene-button scene-button--continue" onClick={next}>
        {last?'FOLLOW LUCY':'CONFIRM & CONTINUE'}<ChevronRight size={17}/>
      </button>
    </div>

    <div className="space-prologue__fade"/>
  </main>;
}
