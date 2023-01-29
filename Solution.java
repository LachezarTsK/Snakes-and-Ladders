
import java.util.Queue;
import java.util.LinkedList;

public class Solution {

    private static final int START_ID = 1;
    private static final int CAN_NOT_REACH_TARGET = -1;
    private static final int POINT_WITHOUT_SNAKE_OR_LADDER = -1;

    public int snakesAndLadders(int[][] board) {
        return breadthFirstSearchForShortestPath(board);
    }

    private int breadthFirstSearchForShortestPath(int[][] board) {

        Queue<Integer> queueID = new LinkedList<>();
        queueID.add(START_ID);

        boolean[] visited = new boolean[board.length * board.length];
        visited[START_ID - 1] = true;

        int targetID = board.length * board.length;
        int numberOfStepsFromStart = 0;

        while (!queueID.isEmpty()) {

            int numberOfPointsFromWhichToMakeNextStep = queueID.size();

            while (numberOfPointsFromWhichToMakeNextStep-- > 0) {

                int currentID = queueID.poll();
                if (currentID == targetID) {
                    return numberOfStepsFromStart;
                }

                int nextStepMinID = currentID + 1;
                int nextStepMaxID = Math.min(currentID + 6, targetID);

                for (int stepID = nextStepMinID; stepID <= nextStepMaxID; ++stepID) {

                    int nextRow = (board.length - 1) - (stepID - 1) / board.length;
                    int nextColumn = (nextRow % 2 != board.length % 2) ? (stepID - 1) % board.length : (board.length - 1) - (stepID - 1) % board.length;

                    if (!visited[stepID - 1]) {
                        visited[stepID - 1] = true;
                        int nextStepID = board[nextRow][nextColumn] == POINT_WITHOUT_SNAKE_OR_LADDER ? stepID : board[nextRow][nextColumn];
                        queueID.add(nextStepID);
                    }
                }
            }
            ++numberOfStepsFromStart;
        }
        return CAN_NOT_REACH_TARGET;
    }
}
