/**
 * Created by tayab on 26.05.2017.
 */
function TetrisScoreManager(basicSpeed) {
    this.speed = basicSpeed || DEFAULT_SETTINGS.speed;
    this.score = 0;
    this.level = 0;
    this.linesFilled = 0;
}

TetrisScoreManager.prototype.changeScore = function (clearedLines) {
    this.linesFilled+= clearedLines;
    this.score += 100*clearedLines*clearedLines;
    var prevLevel = this.level;
    this.level = Math.floor(this.linesFilled / 10);
    if(this.level > 10)
        this.level = 10;
    if(prevLevel != this.level)
        if(this.speed > DEFAULT_SETTINGS.minSpeed)
            this.speed-= 50;
};