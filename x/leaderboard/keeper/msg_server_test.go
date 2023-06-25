package keeper_test

import (
	"context"
	"testing"

	keepertest "checkers-leaderboard/testutil/keeper"
	"checkers-leaderboard/x/leaderboard/keeper"
	"checkers-leaderboard/x/leaderboard/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.LeaderboardKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
