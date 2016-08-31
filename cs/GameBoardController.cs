public class GameBoardController 
{

    FormationCollection formationCollection = new FormationCollection();
    GameHistory gameHistory = new GameHistory();
    protected int[][][] gameBoard = 
	{
		new[] {
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1}
		}, 
		new[] {
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1}
		}, 
		new[] {
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1}
		}, 
		new[] {
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1},
			new int[] {-1, -1, -1, -1}
		}
	};
    public int[][][] GameBoard {
		get { return gameBoard; }
	}
    
    public GameBoardController() 
    {
    
    }

    public int findPlayerForPoint(FormationPointModel point) 
    {
        int level = point.level;
        int row = point.row;
        int column = point.column;

        return gameBoard[level][row][column];
    }

    private bool isPointAvailable(FormationPointModel point) 
    {
        return this.findPlayerForPoint(point) === null;
    }

    private bool isValidMove(FormationPointModel point) 
    {
        if (point.level === 0) {
            return isPointAvailable(point);
        }

        int level = point.level - 1;
        FormationPointModel comparePoint = new FormationPointModel(level, point.row, point.column);

        return isPointAvailable(point) && findPlayerForPoint(comparePoint) !== null;
    }

    private bool addPlayerAtPoint(int player, FormationPointModel point) 
    {
        if (!isValidMove(point)) {
            return false;
        }

        this._gameBoard[point.level][point.row][point.column] = player;

        return true;
    }

    private void addToHistory(int player, FormationPointModel point) 
    {
        this.gameHistory.addPlayerMoveToHistory(player, point);
    }

    private Object findWinningFormation(int player, FormationPointModel point) 
    {
        if (gameHistory.Count > 7) 
        {
            List<FormationModel> formations = formationCollection.filterFormationsForPoint(point);

            for (var i = 0; i < formations.Count; i++) 
            {
                if (isWinningFormation(player, formations[i].points)) 
                {
                    return formation;
                }
            }
        }

        return null;
    }

    private bool isWinningFormation(int player, FormationModel formationPoints) 
    {
        for (var i = 0; i < formationPoints.length; i++) 
        {
            FormationPointModel point = formationPoints[i];

            if (findPlayerForPoint(point) !== player) 
            {
                return false;
            }
        }

        return true;
    }
}
