import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GAMES } from "../data/games.js";
import { toDateKey } from "../lib/progress.js";
import { Icon } from "./Icon.jsx";

function TapSprint({ dailyAward, best, onComplete, reducedMotion }) {
  const [status, setStatus] = useState("idle");
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 48, y: 48 });
  const [result, setResult] = useState(null);
  const completedRef = useRef(false);

  const moveTarget = useCallback(() => {
    setPosition({ x: 8 + Math.random() * 84, y: 14 + Math.random() * 72 });
  }, []);

  const start = () => {
    completedRef.current = false;
    setStatus("playing");
    setTimeLeft(15);
    setScore(0);
    setResult(null);
    moveTarget();
  };

  const hit = () => {
    if (status !== "playing") return;
    setScore(previous => previous + 1);
    moveTarget();
  };

  useEffect(() => {
    if (status !== "playing") return undefined;
    const timer = window.setInterval(() => setTimeLeft(previous => Math.max(0, previous - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status === "playing" && timeLeft === 0) setStatus("done");
  }, [status, timeLeft]);

  useEffect(() => {
    if (status !== "done" || completedRef.current) return;
    completedRef.current = true;
    const xp = Math.min(70, 10 + score * 5);
    const outcome = onComplete("tap", xp, score);
    setResult({ ...outcome, score });
  }, [status, score, onComplete]);

  return (
    <div className="game-panel" id="tapSprint">
      <div className="game-head">
        <div><p className="game-kicker">Game 1 · Reflex</p><h2>Tap Sprint</h2><p>Tap the target as many times as you can in 15 seconds.</p></div>
        <span className="game-xp">Up to +70 XP</span>
      </div>
      <div className="game-stats">
        <span><Icon name="clock" size={15} /> <strong>{timeLeft}s</strong> left</span>
        <span><Icon name="target" size={15} /> <strong>{score}</strong> taps</span>
        <span><Icon name="trophy" size={15} /> Best <strong>{best || 0}</strong></span>
      </div>
      <div className={`tap-arena ${status === "playing" ? "playing" : ""}`} aria-label="Tap Sprint play area">
        {status === "playing" && (
          <button className="tap-target" type="button" style={{ left: `${position.x}%`, top: `${position.y}%` }} onClick={hit} aria-label="Tap the target">
            <Icon name="bolt" size={22} />
          </button>
        )}
        {status === "idle" && <div className="arena-message"><Icon name="bolt" size={28} /><strong>Ready for a quick reset?</strong><span>Start the 15-second challenge.</span></div>}
        {status === "done" && <div className="arena-message"><Icon name="check" size={28} /><strong>{score} taps!</strong><span>{result?.bonus ? `+${result.bonus} XP added` : "Today’s XP bonus was already claimed."}</span></div>}
      </div>
      <div className="game-actions">
        <button className="btn btn-primary" type="button" onClick={start}>{status === "idle" ? "Start Tap Sprint" : "Play again"}</button>
        <span className="game-note">{dailyAward ? `${dailyAward} XP claimed today` : "XP bonus available today"}</span>
      </div>
      {!reducedMotion && <p className="game-accessibility">Keyboard users can focus the target and press Enter or Space.</p>}
    </div>
  );
}

const MEMORY_SYMBOLS = ["▲", "●", "■", "◆", "★", "✦"];

function makeMemoryDeck() {
  return [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]
    .map((symbol, index) => ({ id: `${symbol}-${index}`, symbol }))
    .sort(() => Math.random() - 0.5);
}

function MemoryMatch({ dailyAward, best, onComplete, reducedMotion }) {
  const [deck, setDeck] = useState(() => makeMemoryDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const mismatchTimer = useRef(null);
  const completedRef = useRef(false);

  const reset = () => {
    window.clearTimeout(mismatchTimer.current);
    completedRef.current = false;
    setDeck(makeMemoryDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStatus("idle");
    setResult(null);
  };

  const chooseCard = card => {
    if (status === "done" || flipped.some(item => item.id === card.id) || matched.includes(card.symbol)) return;
    if (status === "idle") setStatus("playing");
    const nextFlipped = [...flipped, card];
    setFlipped(nextFlipped);
    if (nextFlipped.length < 2) return;

    setMoves(previous => previous + 1);
    const [first, second] = nextFlipped;
    if (first.symbol === second.symbol) {
      setMatched(previous => [...previous, first.symbol]);
      setFlipped([]);
    } else {
      mismatchTimer.current = window.setTimeout(() => setFlipped([]), reducedMotion ? 180 : 720);
    }
  };

  useEffect(() => () => window.clearTimeout(mismatchTimer.current), []);

  useEffect(() => {
    if (matched.length !== MEMORY_SYMBOLS.length || completedRef.current) return;
    completedRef.current = true;
    setStatus("done");
    const xp = Math.max(30, 90 - Math.max(0, moves - 6) * 3);
    const outcome = onComplete("memory", xp, moves);
    setResult({ ...outcome, moves });
  }, [matched.length, moves, onComplete]);

  return (
    <div className="game-panel" id="memoryMatch">
      <div className="game-head">
        <div><p className="game-kicker">Game 2 · Memory</p><h2>Memory Match</h2><p>Find all six pairs. Fewer moves earn more XP.</p></div>
        <span className="game-xp">Up to +90 XP</span>
      </div>
      <div className="game-stats">
        <span><Icon name="target" size={15} /> <strong>{moves}</strong> moves</span>
        <span><Icon name="check" size={15} /> <strong>{matched.length}/6</strong> pairs</span>
        <span><Icon name="trophy" size={15} /> Best <strong>{best ? `${best} moves` : "—"}</strong></span>
      </div>
      <div className="memory-grid" aria-label="Memory card board">
        {deck.map((card, index) => {
          const isOpen = flipped.some(item => item.id === card.id) || matched.includes(card.symbol);
          const isMatched = matched.includes(card.symbol);
          return (
            <button
              className={`memory-card ${isOpen ? "open" : ""} ${isMatched ? "matched" : ""}`}
              type="button"
              key={card.id}
              onClick={() => chooseCard(card)}
              aria-label={`Card ${index + 1}: ${isOpen ? `${card.symbol}${isMatched ? ", matched" : ""}` : "hidden"}`}
              aria-pressed={isOpen}
            >
              <span>{isOpen ? card.symbol : "?"}</span>
            </button>
          );
        })}
      </div>
      <div className="game-actions">
        <button className="btn btn-primary" type="button" onClick={reset}>{status === "idle" ? "Restart board" : "Play again"}</button>
        <span className="game-note">{dailyAward ? `${dailyAward} XP claimed today` : "XP bonus available today"}</span>
      </div>
      {result && <div className="game-result" role="status"><Icon name="check" size={16} /> Cleared in {result.moves} moves. {result.bonus ? `+${result.bonus} XP added.` : "Bonus already claimed today."}</div>}
    </div>
  );
}

const SPIN_REWARDS = [20, 30, 40, 50, 25, 35, 45, 60];

function DailySpin({ dailyAward, best, onComplete, reducedMotion }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const spinTimer = useRef(null);

  const spin = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * SPIN_REWARDS.length);
    const reward = SPIN_REWARDS[index];
    const targetRotation = 360 * 6 + (360 - index * 45 - 22.5);
    setSpinning(true);
    setResult(null);
    setRotation(previous => previous + targetRotation);
    spinTimer.current = window.setTimeout(() => {
      setSpinning(false);
      const outcome = onComplete("spin", reward, reward);
      setResult({ ...outcome, reward });
    }, reducedMotion ? 120 : 2200);
  };

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

  return (
    <div className="game-panel" id="dailySpin">
      <div className="game-head">
        <div><p className="game-kicker">Game 3 · Daily reward</p><h2>Daily Spin</h2><p>Spin once for a small XP boost, then return to your learning path.</p></div>
        <span className="game-xp">Up to +60 XP</span>
      </div>
      <div className="game-stats">
        <span><Icon name="spark" size={15} /> Best <strong>{best ? `+${best}` : "—"}</strong></span>
        <span><Icon name="shield" size={15} /> <strong>{dailyAward ? "Claimed" : "Available"}</strong> today</span>
      </div>
      <div className="spin-area">
        <div className="spin-pointer" aria-hidden="true" />
        <div className="spin-wheel" style={{ transform: `rotate(${rotation}deg)`, transitionDuration: reducedMotion ? "0ms" : "2200ms" }}>
          <span className="wheel-center" style={{ transform: `rotate(${-rotation}deg)` }}>LUMEN</span>
        </div>
      </div>
      <div className="game-actions">
        <button className="btn btn-primary" type="button" onClick={spin} disabled={spinning}>{spinning ? "Spinning…" : "Spin the wheel"}</button>
        <span className="game-note">{dailyAward ? `${dailyAward} XP claimed today` : "One XP bonus per day"}</span>
      </div>
      {result && <div className="game-result" role="status"><Icon name="spark" size={16} /> You landed +{result.reward} XP. {result.bonus ? `+${result.bonus} XP added.` : "Bonus already claimed today."}</div>}
    </div>
  );
}

export function Arcade({ state, stats, initialGame = "tap", onAwardGame, onBack, reducedMotion }) {
  const [activeGame, setActiveGame] = useState(initialGame);
  const today = toDateKey();
  const dailyAwards = state.gameStats?.dailyAwards?.[today] || {};
  const bestScores = state.gameStats?.bestScores || {};
  const todayXp = useMemo(() => Object.values(dailyAwards).reduce((sum, value) => sum + value, 0), [dailyAwards]);

  useEffect(() => { setActiveGame(initialGame); }, [initialGame]);

  const handleComplete = useCallback((gameId, xp, score) => {
    const already = dailyAwards[gameId] || 0;
    const bonus = already > 0 ? 0 : xp;
    onAwardGame(gameId, xp, score);
    return { xp, bonus, score };
  }, [dailyAwards, onAwardGame]);

  const active = GAMES.find(game => game.id === activeGame) || GAMES[0];

  return (
    <section className="arcade-page shell" id="arcade" aria-labelledby="arcadeTitle">
      <div className="arcade-header">
        <div>
          <p className="eyebrow"><Icon name="spark" size={14} /> Reward arcade</p>
          <h1 id="arcadeTitle">Short games. Small wins. Back to learning.</h1>
          <p className="lede">Three quick arcade games give learners a motivating reset. Each game can add XP once per day, so the rewards stay meaningful instead of becoming a grind.</p>
        </div>
        <button className="btn" type="button" onClick={onBack}><Icon name="focus" size={16} /> Back to my focus path</button>
      </div>

      <div className="arcade-summary" aria-label="Arcade summary">
        <div className="summary-card"><span>Game XP today</span><strong>+{todayXp}</strong></div>
        <div className="summary-card"><span>Total game XP</span><strong>{stats.gameXp}</strong></div>
        <div className="summary-card"><span>Games played</span><strong>{stats.gamePlays}</strong></div>
        <div className="summary-card"><span>Learning progress</span><strong>{stats.percent}%</strong></div>
      </div>

      <div className="arcade-layout">
        <nav className="game-tabs" aria-label="Choose a reward game">
          <p className="game-tabs-title">Choose a game</p>
          {GAMES.map(game => (
            <button className={`game-tab ${activeGame === game.id ? "active" : ""}`} type="button" key={game.id} onClick={() => setActiveGame(game.id)} aria-pressed={activeGame === game.id}>
              <span className="game-tab-icon"><Icon name={game.icon} size={19} /></span>
              <span><strong>{game.title}</strong><small>{game.short}</small></span>
              <span className={`game-tab-bonus ${dailyAwards[game.id] ? "claimed" : ""}`}>{dailyAwards[game.id] ? `+${dailyAwards[game.id]}` : `+${game.maxXp}`}</span>
            </button>
          ))}
          <div className="arcade-tip"><Icon name="info" size={16} /><span>Games are optional. Your roadmap progress is always the main quest.</span></div>
        </nav>

        <div className="game-stage">
          <div className="game-stage-head"><div><span>{active.short}</span><h2>{active.title}</h2></div><span className="game-stage-badge">{dailyAwards[active.id] ? "Bonus claimed" : "Bonus available"}</span></div>
          <p className="game-stage-copy">{active.description}</p>
          {activeGame === "tap" && <TapSprint dailyAward={dailyAwards.tap} best={bestScores.tap} onComplete={handleComplete} reducedMotion={reducedMotion} />}
          {activeGame === "memory" && <MemoryMatch dailyAward={dailyAwards.memory} best={bestScores.memory} onComplete={handleComplete} reducedMotion={reducedMotion} />}
          {activeGame === "spin" && <DailySpin dailyAward={dailyAwards.spin} best={bestScores.spin} onComplete={handleComplete} reducedMotion={reducedMotion} />}
        </div>
      </div>
    </section>
  );
}
