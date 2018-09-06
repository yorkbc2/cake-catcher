declare var context: CanvasRenderingContext2D;
interface IGameCore {
   scores: number;
   hearts: number;
   
}
class GameCore implements IGameCore{
    scores: number = 0;
    hearts: number = 3;
    loop: any = null;

    decrementHearts() {
        this.hearts -= 1;
        if (this.hearts === 0) {
            this.endGame();
        } 
    }

    incrementScores() {
        this.scores += 1;
        return this;
    }

    drawScores() {
        context.fillStyle = "#fff";
        context.font = "normal 24px Calibri";
        context.fillText('Scores: ' + this.scores, 10, 40);
    }

    endGame() {}

    setLoop(loop: any) {
        this.loop = loop;
    } 
}