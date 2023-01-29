
/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
    this.START_ID = 1;
    this.CAN_NOT_REACH_TARGET = -1;
    this.POINT_WITHOUT_SNAKE_OR_LADDER = -1;

    return breadthFirstSearchForShortestPath(board);
};

/**
 * @param {number[][]} board
 * @return {number}
 */
function breadthFirstSearchForShortestPath(board) {

    //const { Queue } = require('@datastructures-js/queue');
    const queueID = new Queue();
    queueID.enqueue(this.START_ID);

    const visited = new Array(board.length * board.length).fill(false);
    visited[this.START_ID - 1] = true;

    const targetID = board.length * board.length;
    let numberOfStepsFromStart = 0;

    while (!queueID.isEmpty()) {

        let numberOfPointsFromWhichToMakeNextStep = queueID.size();

        while (numberOfPointsFromWhichToMakeNextStep-- > 0) {

            let currentID = queueID.dequeue();
            if (currentID === targetID) {
                return numberOfStepsFromStart;
            }

            let nextStepMinID = currentID + 1;
            let nextStepMaxID = Math.min(currentID + 6, targetID);

            for (let stepID = nextStepMinID; stepID <= nextStepMaxID; ++stepID) {

                let nextRow = (board.length - 1) - Math.floor((stepID - 1) / board.length);
                let nextColumn = (nextRow % 2 !== board.length % 2) ? (stepID - 1) % board.length : (board.length - 1) - (stepID - 1) % board.length;

                if (!visited[stepID - 1]) {
                    visited[stepID - 1] = true;
                    let nextStepID = board[nextRow][nextColumn] === this.POINT_WITHOUT_SNAKE_OR_LADDER ? stepID : board[nextRow][nextColumn];
                    queueID.enqueue(nextStepID);
                }
            }
        }
        ++numberOfStepsFromStart;
    }
    return this.CAN_NOT_REACH_TARGET;
}
