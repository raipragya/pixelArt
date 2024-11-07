import { find } from '../models/User';

export async function getLeaderboard(_, res) {
   const leaderboard = await find({}).sort({ points: -1 }).limit(10).select('username points');
   res.json(leaderboard);
}
