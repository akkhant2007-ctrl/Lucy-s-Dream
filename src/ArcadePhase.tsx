export default function ArcadePhase(p:Props){
  const games=useMemo(
    ()=>relevant(p.mission,p.architecture,p.orbit),
    [p.mission,p.architecture,p.orbit]
  );

  const[activeId,setActiveId]=useState<string|null>(null);

  const activeGame=activeId ? all[activeId] : null;

  useEffect(()=>{
    if(activeId&&!games.some(game=>game.id===activeId)){
      setActiveId(null);
    }
  },[activeId,games]);

  const openGame=(gameId:string)=>{
    const selectedGame=all[gameId];

    if(!selectedGame){
      console.error('Unknown arcade game ID:',gameId);
      return;
    }

    setActiveId(gameId);
  };

  return(
    <div className="arcade-phase">
      <header className="arcade-heading">
        <small>MISSION VALIDATION // CONDITIONAL</small>
        <h1>Flight operations simulation</h1>
        <p>
          Only scenarios created by the selected mission architecture are
          available. Performance changes mission status and remaining
          manoeuvre margin.
        </p>
      </header>

      <div className="arcade-status">
        <b>
          {p.results.filter(result=>
            games.some(game=>game.id===result.id)&&result.success
          ).length}/{games.length} TESTS PASSED
        </b>

        <span>
          Fuel consumed: {
            p.results
              .filter(result=>games.some(game=>game.id===result.id))
              .reduce((total,result)=>total+result.fuelSpent,0)
          }%
        </span>
      </div>

      {activeGame ? (
        <GameCanvas
          key={activeGame.id}
          game={activeGame}
          onExit={()=>setActiveId(null)}
          onFinish={result=>{
            p.onResult(result);
            setActiveId(null);
          }}
        />
      ) : (
        <div className="arcade-grid">
          {games.map((game,index)=>{
            const result=p.results.find(
              savedResult=>savedResult.id===game.id
            );

            return(
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
                onClick={()=>openGame(game.id)}
              >
                <em>{String(index+1).padStart(2,'0')}</em>
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
