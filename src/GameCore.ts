declare var context: CanvasRenderingContext2D;
interface IGameCore {
   scores: number;
   hearts: number;
   
}
class GameCore implements IGameCore{
    scores: number = 0;
    hearts: number = 3;
    loop: any = null;
    onincscores: Function|null = null;

    onIncrementScores(cb:Function) {
        this.onincscores = typeof cb === 'function'? cb: null;
        return this;
    }

    decrementHearts() {
        this.hearts -= 1;
        if (this.hearts === 0) {
            this.endGame();
        } 
    }

    incrementScores() {
        this.scores += 1;
        if (typeof this.onincscores === 'function') this.onincscores(this.scores);
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