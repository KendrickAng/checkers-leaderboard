package keeper

import (
	"checkers-leaderboard/x/leaderboard/types"
)

var _ types.QueryServer = Keeper{}
