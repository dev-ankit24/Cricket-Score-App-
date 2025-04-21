const Match = require('../models/Match');

exports.createMatch = async (req, res) => {
  const { teamA, teamB } = req.body;
  const match = new Match({ teamA, teamB, deliveries: [], totalScore: 0, wickets: 0, overs: 0 });
  await match.save();
  res.json(match);
};

exports.addDelivery = async (req, res) => {
  const { matchId } = req.params;
  const delivery = req.body;
  console.log(req.body);
  
  const match = await Match.findById(matchId);
  match.deliveries.push(delivery);
  const totalExtras = Object.values(delivery.extras).reduce((acc, val) => acc + (val || 0), 0);
  match.totalScore += delivery.runs + totalExtras;
  if (delivery.wicket) match.wickets += 1;

 

  const legalDeliveries = match.deliveries.length;
  const fullOvers = Math.floor(legalDeliveries / 6);
  const remainingBalls = legalDeliveries % 6;
  match.overs = `${fullOvers}.${remainingBalls}`;

  await match.save();
  res.json(match);
};

exports.getScore = async (req, res) => {
  const match = await Match.findById(req.params.matchId);
  res.json(match);
};