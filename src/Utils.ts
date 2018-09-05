const ARROW_RIGHT: number = 39;
const ARROW_LEFT: number = 37;
const ARROW_UP: number = 38;
const ARROW_DOWN: number = 40;

const collisionDetectionBottom = <T extends GameObject>(elementOne:T, elementTwo:T) => {
    if (
        (elementOne.x + elementOne.w >= elementTwo.x && elementOne.x <= elementTwo.x + elementTwo.w) &&
        (elementOne.y + elementOne.h >= elementTwo.y && elementOne.y <= elementTwo.y + elementTwo.h)
    ) {
        return true;
    } else {
        return false;
    }
}