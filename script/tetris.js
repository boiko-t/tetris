/**
 * Created by tayab on 21.05.2017.
 */
function Tetris() {
    if (Tetris.instance)
        return Tetris.instance;
    Tetris.instance = this;

    var gameBoard = createTwoDArray(DEFAULT_SETTINGS.rowsCount, DEFAULT_SETTINGS.columnsCount);
    var context;
    var scoreManager = new TetrisScoreManager();
    var backgroundImage = new Image();
    var gameOverImage = new Image();
    var currentBlock = Block.generateRandom();
    var lastActionTime = 0;
    var isGameOver = false;
    var isPaused = false;


    this.init = function () {
        var canvas = document.createElement('canvas');
        canvas.id = 'gameBoard';
        canvas.height = DEFAULT_SETTINGS.rowsCount * DEFAULT_SETTINGS.cellSeize;
        canvas.width = (gameBoard[0].length + 8)*DEFAULT_SETTINGS.cellSeize;
        context = canvas.getContext('2d');
        document.body.appendChild(canvas);
        backgroundImage.onload = updateGame;
        backgroundImage.src = DEFAULT_SETTINGS.backgroundImageUrl;
        gameOverImage.src = DEFAULT_SETTINGS.gameOverImageUrl;
        document.addEventListener('keydown', movementManager);
        displayScore();
    };

    function updateGame() {
        var currentTime = new Date().getTime();
        if (currentTime - lastActionTime > scoreManager.speed) {
            if (!currentBlock.moveBlock(gameBoard, 0, 1))
                landCurrentBlock();

            lastActionTime = currentTime;
        }
        drawBoard();
        currentBlock.draw(context, backgroundImage, gameBoard);
        if (isGameOver)
            finishGame();
        else if(!isPaused)
            requestAnimationFrame(updateGame);
    }

    function drawBoard() {
        var position;
        for (var i = 0; i < DEFAULT_SETTINGS.rowsCount; i++)
            for (var j = 0; j < DEFAULT_SETTINGS.columnsCount; j++) {
                position = gameBoard[i][j];
                context.drawImage(backgroundImage,
                    position * DEFAULT_SETTINGS.cellSeize, 0,
                    DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize,
                    j * DEFAULT_SETTINGS.cellSeize, i * DEFAULT_SETTINGS.cellSeize,
                    DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize);
            }
    }

    function landCurrentBlock() {
        for (var i = 0; i < currentBlock.shape.length && currentBlock.checkRowForCollision(gameBoard, i); i++)
            for (var j = 0; j < currentBlock.shape[0].length; j++) {
                if (currentBlock.shape[i][j])
                    gameBoard[i + currentBlock.posision.row][j + currentBlock.posision.col] =
                        currentBlock.shape[i][j];
            }

        isGameOver = currentBlock.posision.row == 0;
        if (!isGameOver) {
            checkLines();
            currentBlock = Block.generateRandom();
        }
    }

    function movementManager(e) {
        switch (e.keyCode) {
            case 32:
                isPaused = !isPaused;
                updateGame();
                break;
            case 37:
                currentBlock.moveBlock(gameBoard, -1, 0);
                break;
            case 38:
                currentBlock.rotate(gameBoard);
                break;
            case 39:
                currentBlock.moveBlock(gameBoard, 1, 0);
                break;
            case 40:
                currentBlock.moveBlock(gameBoard, 0, 1);
                break;
        }
    }

    function checkLines() {
        var isLineFill = true;
        var clearedLines = 0;
        for (var i = 0; i < gameBoard.length; i++) {
            isLineFill = true;
            for (var j = 0; j < gameBoard[i].length; j++) {
                if (!gameBoard[i][j]) {
                    isLineFill = false;
                    break;
                }
            }
            if (isLineFill) {
                clearedLines++;
                cleanLine(i);
            }
        }

        scoreManager.changeScore(clearedLines);
        displayScore();
    }

    function cleanLine(rowIndex) {
        var colIndex = 0;
        while (rowIndex >= 0) {
            while (colIndex < gameBoard[0].length) {
                if (rowIndex)
                    gameBoard[rowIndex][colIndex] = gameBoard[rowIndex - 1][colIndex];
                else
                    gameBoard[rowIndex][colIndex] = 0;
                colIndex++;
            }
            rowIndex--;
            colIndex = 0;
        }
    }
    
    function displayScore() {
        context.font = "30px Arial";
        context.fillStyle = '#101010';
        context.clearRect((gameBoard[0].length+1)*DEFAULT_SETTINGS.cellSeize, 0, 300, 100);
        context.fillText('Level ' + scoreManager.level,
            (gameBoard[0].length+1)*DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize);
        context.fillText('Lines ' + scoreManager.linesFilled,
            (gameBoard[0].length+1)*DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize*2);
        context.fillText('Score ' + scoreManager.score,
            (gameBoard[0].length+1)*DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize*3);
    }

    function finishGame() {
        context.drawImage(gameOverImage, 0, 0, 250, 90, 10, 210, 250, 90);
    }
}

