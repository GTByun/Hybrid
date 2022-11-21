const myKey =
{
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38
};

var pos = ["2.34375vmin", "21.6796875vmin", "41.015625vmin", "60.3515625vmin"];

var map =
[[1, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

const {createApp} = Vue;
createApp({
    data(){
        return {
            bigPlates: 16,
        }
    }
}).mount("#base");

function keyInput(e)
{
    var block = document.getElementsByClassName("top")[0];
    switch(e.keyCode)
    {
        case myKey.LEFT:
            block.style.left = pos[0];
            break;
        case myKey.RIGHT:
            block.style.left = pos[3];
            break;
        case myKey.DOWN:
            block.style.top = pos[3];
            break;
        case myKey.UP:
            block.style.top = pos[0];
            break;
    }
};

window.onkeydown = keyInput;

