import {useState} from 'react';
import {ChevronRight, Sparkles} from 'lucide-react';
import './IntroRocket.css';

type IntroProps = { onComplete: () => void };

const lucyDialogue = [
  'Hey. You lost, or just looking for company?',
  "Something interesting about those rockets? You've been staring for a while.",
  'To space?…',
  'I’ve always wanted to see the moon…',
  "You're new around here, right? Come on. I'll show you around."
];

export default function Intro({onComplete}: IntroProps) {
  const [line, setLine] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const firstLine = line === 0;
  const finalLine = line === lucyDialogue.length - 1;

  function continueDialogue() {
    if (!finalLine) {
      setLine(current => current + 1);
      return;
    }
    setLeaving(true);
    window.setTimeout(onComplete, 700);
  }

  return (
    <main className={`rocket-prologue ${leaving ? 'rocket-prologue--leaving' : ''}`}>
      <div className="rocket-prologue__background" />
      <div className="rocket-prologue__shade" />
      <div className="rocket-prologue__grid" />

      <div className="rocket-prologue__readout">
        <span>MISSION ARCHITECT // PROLOGUE</span>
        <span>LAUNCH COMPLEX // HANGAR 03</span>
      </div>

      <section
        className={`lucy-hud ${firstLine ? 'lucy-hud--arriving' : ''}`}
        aria-live="polite"
      >
        <div className="lucy-hud__corner lucy-hud__corner--tl" />
        <div className="lucy-hud__corner lucy-hud__corner--tr" />
        <div className="lucy-hud__corner lucy-hud__corner--bl" />
        <div className="lucy-hud__corner lucy-hud__corner--br" />
        <div className="lucy-hud__scan" />

        <div className="lucy-hud__copy lucy-hud__copy--one" aria-hidden="true">
          <img src="/assets/lucy.png" alt="" />
        </div>
        <div className="lucy-hud__copy lucy-hud__copy--two" aria-hidden="true">
          <img src="/assets/lucy.png" alt="" />
        </div>
        <div className="lucy-hud__copy lucy-hud__copy--three" aria-hidden="true">
          <img src="/assets/lucy.png" alt="" />
        </div>
        <img className="lucy-hud__portrait" src="/assets/lucy.png" alt="Pixel-art portrait of Lucy" />

        <div className="lucy-hud__content">
          <header className="lucy-hud__header">
            <span><Sparkles size={12} /> LUCY</span>
            <small>GUIDANCE LINK // ACTIVE</small>
          </header>
          <p>{lucyDialogue[line]}</p>
          <div className="lucy-hud__progress" aria-hidden="true">
            {lucyDialogue.map((_, index) => (
              <i key={index} className={index === line ? 'current' : index < line ? 'complete' : ''} />
            ))}
          </div>
        </div>
      </section>

      <button className="rocket-prologue__continue" onClick={continueDialogue}>
        {finalLine ? 'FOLLOW LUCY' : 'CONFIRM & CONTINUE'}
        <ChevronRight size={17} />
      </button>

      <div className="rocket-prologue__fade" />
    </main>
  );
}
