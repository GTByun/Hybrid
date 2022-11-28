const myKey =
{
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38
};

var pos = ["2.34375vmin", "21.6796875vmin", "41.015625vmin", "60.3515625vmin"];

var map =
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

var gameover = false;

function Update()
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
        gameover = true;
        window.onkeydown = null;
        return;
    }
    var coord = none[Math.floor(Math.random() * none.length)];
    map[coord[1]][coord[0]] = 1;
    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 4; x++)
        {
            if (map[y][x] % 2 != 0 && map[y][x] != 1)
            {
                map[y][x]--;
            }
            var block = document.getElementById((x + 1).toString() + (y + 1).toString());
            block.style.left = pos[x];
            block.style.top = pos[y];
            var isNotZero = map[y][x] != 0;
            block.firstChild.innerHTML = isNotZero ? map[y][x] : "";
            block.style.backgroundColor = isNotZero ? "crimson" : "transparent";
        }
    }
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

Update();
window.onkeydown = KeyInput;

