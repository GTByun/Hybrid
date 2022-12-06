const myKey =
{
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38
};

var pos = [2.34375, 21.6796875, 41.015625, 60.3515625];
var yOffset = 9.969957;
var map =
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

var AnimationMap = 
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

var score = 0;
var initialize = false;

class MoveNMerge {
    constructor(coord, isMerge, isDestroy, isCreate) {
        this.coord = coord;
        this.isMerge = isMerge;
        this.isDestroy = isDestroy;
        this.isCreate = isCreate;
    }
}

function RandomNumber(range)
{
    var rtn = Math.pow(2, Math.floor(Math.random() * range));
    if (rtn == 1)
    {
        rtn -= 1
    }
    return rtn;
}

function RandomCreate(num)
{
    var none = [];
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 4; x++)
        {
            if (map[y][x] == 0)
            {
                none.push([x, y]);
            }
        }
    }
    if (none.length == 0)
    {
        var plate = document.getElementById("clearPlate");
        plate.style.display = "table";
        plate.style.backgroundColor = "Red";
        plate.firstChild.innerHTML = "Game Over!";
        window.onkeydown = null;
        return;
    }
    var coord = none[Math.floor(Math.random() * none.length)];
    map[coord[1]][coord[0]] = num;
    score += num;
}

function Update()
{
    if (initialize)
    {
        RandomCreate(2);
    }
    else
    {
        initialize = true;
    }
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 4; x++)
        {
            if (map[y][x] % 2 != 0 && map[y][x] != 1)
            {
                map[y][x]--;
            }
            if (map[y][x] == 2048)
            {
                document.getElementById("clearPlate").style.display = "table";
                window.onkeydown = null;
            }
            var block = document.getElementById((x + 1).toString() + (y + 1).toString());
            if (map[y][x] != 0)
            {
                block.style.left = pos[x] + "vmin";
                block.style.top = pos[y] + yOffset + "vmin";
                block.firstChild.innerHTML = map[y][x];
                block.style.display = "table";
            }
            else
            {
                block.style.display = "none";
            }
        }
    }
    document.getElementById("score").innerHTML = "Score : " + score;
}

const {createApp} = Vue;
createApp({
    data(){
        return {
            bigPlates: 16,
        }
    }
}).mount("#base");

function KeyInput(e)
{
    switch(e.keyCode)
    {
        case myKey.LEFT:
            InputLeft();
            break;
        case myKey.RIGHT:
            InputRight();
            break;
        case myKey.DOWN:
            InputDown();
            break;
        case myKey.UP:
            InputUp();
            break;
    }
};

function Move(a, b)
{
    var rtn = map[b[1]][b[0]] == 0;
    if (rtn)
    {
        map[b[1]][b[0]] = map[a[1]][a[0]];
        map[a[1]][a[0]] = 0;
    }
    return rtn;
}

function Merge(a, b)
{
    var rtn = map[b[1]][b[0]] == map[a[1]][a[0]]
    if (rtn)
    {
        map[b[1]][b[0]] *= 2;
        map[b[1]][b[0]]++;
        map[a[1]][a[0]] = 0;
    }
    return rtn;
}

function InputLeft()
{
    for (var y = 0; y < 4; y++)
    {
        for (var k = 0; k < 3; k++)
        {
            var x = k + 1;
            if (map[y][x] != 0)
            {
                var j, merging = false;
                for (j = 0; j < k + 1; j++)
                {
                    var n = k - j;
                    if (!Move([n + 1, y], [n, y]))
                    {
                        merging = true;
                        j = n;
                        break;
                    }
                }
                if (merging)
                {
                    Merge([j + 1, y], [j, y]);
                }
            }
        }
    }
    Update();
}

function InputUp()
{
    for (var x = 0; x < 4; x++)
    {
        for (var k = 0; k < 3; k++)
        {
            var y = k + 1;
            if (map[y][x] != 0)
            {
                var j, merging = false;
                for (j = 0; j < k + 1; j++)
                {
                    var n = k - j;
                    if (!Move([x, n + 1], [x, n]))
                    {
                        merging = true;
                        j = n;
                        break;
                    }
                }
                if (merging)
                {
                    Merge([x, j + 1], [x, j]);
                }
            }
        }
    }
    Update();
}

function InputRight()
{
    for (var y = 0; y < 4; y++)
    {
        for (var k = 0; k < 3; k++)
        {
            var x = 2 - k;
            if (map[y][x] != 0)
            {
                var j, merging = false;
                for (j = 0; j < k + 1; j++)
                {
                    var n = 3 - k + j;
                    if (!Move([n - 1, y], [n, y]))
                    {
                        merging = true;
                        j = n;
                        break;
                    }
                }
                if (merging)
                {
                    Merge([j - 1, y], [j, y]);
                }
            }
        }
    }
    Update();
}

function InputDown()
{
    for (var x = 0; x < 4; x++)
    {
        for (var k = 0; k < 3; k++)
        {
            var y = 2 - k;
            if (map[y][x] != 0)
            {
                var j, merging = false;
                for (j = 0; j < k + 1; j++)
                {
                    var n = 3 - k + j;
                    if (!Move([x, n - 1], [x, n]))
                    {
                        merging = true;
                        j = n;
                        break;
                    }
                }
                if (merging)
                {
                    Merge([x, j - 1], [x, j]);
                }
            }
        }
    }
    Update();
}

function Initializing()
{
    var myData = [];
    myData.push(RandomNumber(3));
    if (myData[0] == 0)
    {
        myData.push(Math.pow(2, Math.floor(Math.random() * 2 + 1)));
    }
    else if (myData[0] == 2)
    {
        myData.push(RandomNumber(3));
    }
    else if (myData[0] == 4)
    {
        myData.push(RandomNumber(2));
    }
    for (i = 0; i < 2; i++)
    {
        RandomCreate(myData[i]);
    }
}

Initializing();
Update();
window.onkeydown = KeyInput;

