
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    
    inline static const int START_ID = 1;
    inline static const int CAN_NOT_REACH_TARGET = -1;
    inline static const int POINT_WITHOUT_SNAKE_OR_LADDER = -1;

public:
    int snakesAndLadders(const vector<vector<int>>& board) const {
        return breadthFirstSearchForShortestPath(board);
    }

private:
    int breadthFirstSearchForShortestPath(const vector<vector<int>>& board) const {

        queue<int> queueID;
        queueID.push(START_ID);

        vector<bool> visited(board.size() * board.size());
        visited[START_ID - 1] = true;

        int targetID = board.size() * board.size();
        int numberOfStepsFromStart = 0;

        while (!queueID.empty()) {

            int numberOfPointsFromWhichToMakeNextStep = queueID.size();

            while (numberOfPointsFromWhichToMakeNextStep-- > 0) {

                int currentID = queueID.front();
                queueID.pop();
                if (currentID == targetID) {
                    return numberOfStepsFromStart;
                }

                int nextStepMinID = currentID + 1;
                int nextStepMaxID = min(currentID + 6, targetID);

                for (int stepID = nextStepMinID; stepID <= nextStepMaxID; ++stepID) {

                    int nextRow = (board.size() - 1) - (stepID - 1) / board.size();
                    int nextColumn = (nextRow % 2 != board.size() % 2) ? (stepID - 1) % board.size() : (board.size() - 1) - (stepID - 1) % board.size();

                    if (!visited[stepID - 1]) {
                        visited[stepID - 1] = true;
                        int nextStepID = board[nextRow][nextColumn] == POINT_WITHOUT_SNAKE_OR_LADDER ? stepID : board[nextRow][nextColumn];
                        queueID.push(nextStepID);
                    }
                }
            }
            ++numberOfStepsFromStart;
        }
        return CAN_NOT_REACH_TARGET;
    }
};
