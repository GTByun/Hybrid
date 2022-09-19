var links = ["https://upload.wikimedia.org/wikipedia/commons/d/d6/M8876_640_480.jpg",
"https://upload.wikimedia.org/wikipedia/commons/3/3d/Melnikovo_Vuoksa1_640_480.jpg?20070618171529",
"https://upload.wikimedia.org/wikipedia/commons/5/52/Sinsinawa_640_480.jpg",
"https://upload.wikimedia.org/wikipedia/commons/5/52/Melnikovo_bridge_640_480.jpg?20070616110121",
"https://mblogthumb-phinf.pstatic.net/20120910_274/blleague_13472432397382Yzk5_JPEG/tumblr_ma3pqsfKzA1qfsxcyo1_500.jpg?type=w2",
"https://mblogthumb-phinf.pstatic.net/20120910_1/blleague_13472432375279jXgI_JPEG/tumblr_m9s9qjKQlg1qdaoj5o1_500.jpg?type=w2",
"https://mblogthumb-phinf.pstatic.net/20120910_284/blleague_134724323767807aG7_JPEG/tumblr_m9vdeu3Hkj1qk948io1_500.jpg?type=w2"];

var num = 0;

function next()
{
    if (num != links.length - 1)
    {
        num++;
        document.getElementById("myPhoto").src = links[num];
    }
}

function back()
{
    if (num != 0)
    {
        num--;
        document.getElementById("myPhoto").src = links[num];
    }
}