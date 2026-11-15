import { useEffect, useMemo, useRef, useState } from 'react';

export type ArcadeResult = {
  id: string;
  success: boolean;
  fuelSpent: number;
  score: number;
  status: string;
};

type Props = {
  mission: string;
  architecture: string;
  orbit: string;
  platform: string;
  launcher: string;
  ops: string;
  results: ArcadeResult[];
  onResult: (result: ArcadeResult) => void;
};

type Game = {
  id: string;
  title: string;
  brief: string;
  why: string;
};

const all: Record<string, Game> = {
  lander: {
    id: 'lander',
    title: 'Lunar landing',
    brief: 'Burn, tilt and touch down softly.',
    why: 'Lunar lander architectures must close terminal descent and landing risk.',
  },
  orbit: {
    id: 'orbit',
    title: 'Orbit insertion',
    brief: 'Raise and circularise onto the target ring.',
    why: 'Orbital missions depend on accurate insertion with finite propellant.',
  },
  dock: {
    id: 'dock',
    title: 'Rendezvous and docking',
    brief: 'Enter the port slowly and cleanly.',
    why: 'Distributed and hosted architectures require controlled proximity operations.',
  },
  entry: {
    id: 'entry',
    title: 'Re-entry corridor',
    brief: 'Balance lift, heating and g-load.',
    why: 'Earth-return technology demonstrations must survive a narrow entry corridor.',
  },
  sling: {
    id: 'sling',
    title: 'Gravity assist',
    brief: 'Bend the trajectory around a moving body.',
    why: 'High-energy science and lunar transfers can trade flight time against propellant.',
  },
  dodge: {
    id: 'dodge',
    title: 'Debris avoidance',
    brief: 'Use limited fuel to avoid collision tracks.',
    why: 'Long-duration and distributed missions accumulate conjunction and manoeuvre cost.',
  },
};

function relevant(
  mission: string,
  architecture: string,
  orbit: string,
): Game[] {
  const ids: string[] = ['orbit'];

  if (
    mission === 'lunar' &&
    (architecture === 'lander' || architecture === 'orbiter')
  ) {
    ids.push('lander');
  }

  if (
    architecture === 'constellation' ||
    architecture === 'orbiter'
  ) {
    ids.push('dock');
  }

  if (
    mission === 'tech' &&
    architecture === 'lander'
  ) {
    ids.push('entry');
  }

  if (
    mission === 'science' ||
    orbit === 'lunar'
  ) {
    ids.push('sling');
  }

  if (
    architecture === 'constellation' ||
    mission === 'science'
  ) {
    ids.push('dodge');
  }

  return [...new Set(ids)]
    .map(id => all[id])
    .filter((game): game is Game => Boolean(game));
}

export default function ArcadePhase(props: Props) {
  const games = useMemo(
    () => relevant(
      props.mission,
      props.architecture,
      props.orbit,
    ),
    [
      props.mission,
      props.architecture,
      props.orbit,
    ],
  );

  const [activeId, setActiveId] = useState(null);

  const activeGame = activeId ? all[activeId] : null;

  useEffect(() => {
    if (
      activeId &&
      !games.some(game => game.id === activeId)
    ) {
      setActiveId(null);
    }
  }, [activeId, games]);

  function openGame(gameId: string) {
    if (!all[gameId]) {
      console.error('Unknown arcade game ID:', gameId);
      return;
    }

    setActiveId(gameId);
  }

  const currentResults = props.results.filter(result =>
    games.some(game => game.id === result.id),
  );

  const passedCount = currentResults.filter(
    result => result.success,
  ).length;

  const fuelConsumed = currentResults.reduce(
    (total, result) => total + result.fuelSpent,
    0,
  );

  return (
    
      
        MISSION VALIDATION // CONDITIONAL

        Flight operations simulation

        
          Only scenarios created by the selected mission architecture
          are available. Performance changes mission status and
          remaining manoeuvre margin.
        
      

      
        
<b>
  {passedCount}/{games.length} TESTS PASSED
</b>

<span>
  Fuel consumed: {fuelConsumed}%
</span>
</div>

{activeGame ? (
  <GameCanvas
    key={activeGame.id}
    game={activeGame}
    onExit={() => setActiveId(null)}
    onFinish={(result: ArcadeResult) => {
      props.onResult(result);
      setActiveId(null);
    }}
  />
) : (
  <div className="arcade-grid">
    {games.map((game: Game, index: number) => {
      const result = props.results.find(
        (savedResult: ArcadeResult) => savedResult.id === game.id
      );

      return (
        <button
          type="button"
          key={game.id}
          data-game-id={game.id}
          className={
            result?.success
              ? 'passed'
              : result
                ? 'failed'
                : ''
          }
          onClick={() => openGame(game.id)}
        >
          <em>{String(index + 1).padStart(2, '0')}</em>

          <strong>{game.title}</strong>

          <span>{game.brief}</span>

          <small>{game.why}</small>

          <i>
            {result
              ? result.success
                ? `PASSED · ${result.fuelSpent}% FUEL`
                : 'FAILED · MISSION RISK ADDED'
              : 'READY'}
          </i>
        </button>
      );
    })}
  </div>
)}
</div>
);
}

                {game.brief}

                {game.why}

                
                  {result
                    ? result.success
                      ? `PASSED · ${result.fuelSpent}% FUEL`
                      : 'FAILED · MISSION RISK ADDED'
                    : 'READY'}
                
              
            );
          })}
        
      )}
    
  );
}

function GameCanvas({
  game,
  onExit,
  onFinish,
}: {
  game: Game;
  onExit: () => void;
  onFinish: (result: ArcadeResult) => void;
}) {
  const canvasRef = useRef(null);
  const keys = useRef<Record<string, boolean>>({});

  const hint = 'ARROWS / WASD · ENTER TO COMMIT';

  useEffect(() =>
