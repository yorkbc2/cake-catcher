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

    endGame() {}

    setLoop(loop: any) {
        this.loop = loop;
    } 
}