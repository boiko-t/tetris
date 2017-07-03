/**
 * Created by tayab on 21.05.2017.
 */
function Block(blockTypeIndex) {
    this.blockType = blockTypeIndex || Math.randomInRange(0, 6);
    this.shapeSet = BLOCK_SHAPES[this.blockType];
    this.currentShapeIndex = 0;
    this.shape = this.shapeSet[this.currentShapeIndex];
    this.posision = {
        row: 0,
        col: Math.floor(DEFAULT_SETTINGS.columnsCount / 2) - 1
    };
}

Block.generateRandom = function () {
    return new Block(Math.randomInRange(0, 6));
};

Block.prototype.rotate = function (board) {
    var previousShapeIndex = this.currentShapeIndex;
    var previousPosition = this.posision;
    if (++this.currentShapeIndex == this.shapeSet.length)
        this.currentShapeIndex = 0;
    this.shape = this.shapeSet[this.currentShapeIndex];

    if(this.posision.col+ this.shape.length > board[0].length)
        this.moveBlock(board, board[0].length - this.shape.length - this.posision.col, 0);
    if(this.posision.col < 0)
        this.moveBlock(board, this.posision.col*-1, 0);

    if (!this.checkBlockForCollision(board)) {
        this.posision = previousPosition;
        this.shape = this.shapeSet[previousShapeIndex];
    }
};

Block.prototype.draw = function (drawingContext, image, board) {
    for (var i = 0; i < this.shape.length && this.checkRowForCollision(board, i); i++)
        for (var j = 0; j < this.shape[i].length; j++) {
            var brick = this.shape[i][j];
            if (brick && !board[this.posision.row + i][this.posision.col + j]) {
                drawingContext.drawImage(image,
                    brick * DEFAULT_SETTINGS.cellSeize, 0,
                    DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize,
                    (j + this.posision.col) * DEFAULT_SETTINGS.cellSeize, (i + this.posision.row) * DEFAULT_SETTINGS.cellSeize,
                    DEFAULT_SETTINGS.cellSeize, DEFAULT_SETTINGS.cellSeize);
            }
        }
};

Block.prototype.checkRowForCollision = function (board, i) {
    for (var j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j]) {
            if (board.length <= this.posision.row
                || this.posision.col + j < 0
                || this.posision.col + j >= board[0].length
                || board[this.posision.row + i][this.posision.col + j])
                return false;
        }
    }

    return true;
};

Block.prototype.checkBlockForCollision = function (board) {
    for (var i = 0; i < this.shape.length; i++) {
        for (var j = 0; j < this.shape[i].length; j++) {
            if (this.shape[i][j]) {
                if (board.length <= this.posision.row + i
                    || this.posision.col + j < 0
                    || this.posision.col + j >= board[0].length
                    || board[this.posision.row + i][this.posision.col + j])
                    return false;
            }
        }
    }

    return true;
};

Block.prototype.moveBlock = function (board, x, y) {
    this.posision.col += x;
    this.posision.row += y;
    if (!this.checkBlockForCollision(board)) {
        this.posision.col -= x;
        this.posision.row -= y;
        return false;
    }

    return true;
};