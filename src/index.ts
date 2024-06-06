import { createRestAPIClient } from "masto";
import Snake from "./game.js";
import type { Direction } from "./game.js";

interface PollOption {
    title: Direction,
    votesCount: number | undefined
}

const masto = createRestAPIClient({
  url: String(process.env.URL),
  accessToken: process.env.TOKEN,
});
const game = new Snake;

async function postUpdate() {
    const status = await masto.v1.statuses.create({
        status: game.getGrid(),
        poll: {
            expiresIn: 1800,
            options: game.getPossibleMoves()
        },
    })

    return status;
}

async function getMostVotedMove() {
    const user = await masto.v1.accounts.lookup({ acct: "@snake@botsin.space" })
    const statuses = await masto.v1.accounts.$select(user.id).statuses.list();
    const status = statuses[0];
    
    if(!status.poll || !status.poll.expired) return null;
    let poll = []
    try {
        poll = <PollOption[]> status.poll.options;
    } catch {
        return null;
    }
    poll.sort(function (a, b) {
        if (a.votesCount === undefined || b.votesCount === undefined) {
            return 0;
        }
        return b.votesCount - a.votesCount;
    });
    return poll[0].title;
}

await postUpdate();

setInterval(async () => {
    const newMove = await getMostVotedMove();
    if (!newMove) {
        game.reset();
    } else {
        game.move(newMove);
        await postUpdate();
    }
}, 1800000)
