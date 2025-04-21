import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [matchId, setMatchId] = useState(null);
  const [runs, setRuns] = useState(0);
  const [score, setScore] = useState(null);
  const [extras, setExtras] = useState({
    wide: 0,
    noBall: 0,
    bye: 0,
    legBye: 0,
    overthrow: 0
  });

  const createMatch = async () => {
    const res = await axios.post('http://localhost:3001/api/match/create', {
      teamA: "Team A",
      teamB: "Team B"
    });
    setMatchId(res.data._id);
  };

  const sendDelivery = async () => {
    await axios.post(`http://localhost:3001/api/match/${matchId}/delivery`, {
      batsman: "Player 1",
      nonStriker: "Player 2",
      bowler: "Bowler 1",
      runs,
      extras,
      wicket: false,
      description: "Custom delivery"
    });
    fetchScore();
  };

  const fetchScore = async () => {
    const res = await axios.get(`http://localhost:3001/api/match/${matchId}`);
    setScore(res.data);
    console.log(res.data.deliveries[0].runs)
    
  };

  useEffect(() => {
    createMatch();
  }, []);

  return (
    <div className="container">
      <h1>Cricket Scoring Admin Panel</h1>
      <div className="score-inputs">
        <label>Runs: <input type="number" value={runs} onChange={(e) => setRuns(+e.target.value)} /></label>
        {Object.keys(extras).map(key => (
          <label key={key}>{key}: <input type="number" className='text-lower' value={extras[key]} onChange={(e) => setExtras({ ...extras, [key]: +e.target.value })} /></label>
        ))}
      </div>
      <button onClick={sendDelivery}>Add </button>

      {score && (
        <div className="scoreboard">
         <div className='score-div'>
          <h2>Score: {score.totalScore}/{score.wickets}</h2>
          </div>
          <div className='over-div'>
          <p>Overs: {score.overs}</p>
          </div>
          <h3>Last 3 Deliveries</h3>
          <ul>

         
            
            {score.deliveries.slice(-1).reverse().map((d, idx) => (
          
           
              <>
              {/* <li key={idx}>{d.description} - {d.runs} runs + Extras {JSON.stringify(d.extras)}</li> */}
          
            
                  
              
     <div class="main-extra-div">
  
  <div class="extra-child-div">
  <h3 className='extra'>Extra Run: ( {d.runs|| 0})</h3>
    <div class="box">
      <h5>Wide:( {d.extras?.wide || 0})</h5>
    </div>
    <div class="box">
      <h5>NoBall : ( {d.extras?.noBall || 0})</h5>
    </div>
    <div class="box">
      <h5>Bye : ( {d.extras?.bye || 0})</h5>
    </div>
    <div class="box">
      <h5>LegBye: ( {d.extras?.legBye || 0})</h5>
    </div>
    <div class="box">
      <h5>Overthrow: ( {d.extras?.overthrow || 0})</h5>
    </div>
  </div>
</div> 


               </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;