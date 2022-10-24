var year = new Date().getFullYear();
var month = new Date().getMonth();
var tenYear = year - year % 10;
var rest = [[10, 3], [10, 9], [1, 1], [3, 1], [5, 5], [6, 6], [8, 15], [12, 25]];
var isNext = [true, true, false, true, true, false, true, false];
var monthNames = ["January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"];
var listName = ["list", "eList", "tList", "teList"];

function ResetCalendar()
{
    var restCurrent = rest;
    for (var i = 0; i < 6; i++)
    {
        for (var j = 0; j < 7; j++)
        {
            var pos = document.getElementById(i.toString() + j.toString());
            switch (j)
            {
                case 0:
                    pos.className = "sund";
                    break;
                case 6:
                    pos.className = "satd";
                    break;
                default:
                    pos.className = "day";
                    break;
            }
        }
    }
    var current = new Date(year, month);
    var monthDiv = document.getElementById("title");
    monthDiv.innerHTML = "<b>" + monthNames[current.getMonth()] + " " + year.toString() + "</b>";
    var firstDay = current.getDay();
    var coord = [0, firstDay];
    var day = 1;
    var nextRest = 0;

    while (current.getMonth() == month)
    {
        var pos = document.getElementById(coord[0].toString() + coord[1].toString());
        pos.innerHTML = "&nbsp" + day.toString();
        
        var type;

        for (type = 0; restCurrent.length > type; type++)
        {
            var checkDay = restCurrent[type];
            if (current.getMonth() + 1 == checkDay[0] && current.getDate() == checkDay[1])
                break;
        }

        switch (type)
        {
            case 0:
                pos.innerHTML += "<br>&nbsp개천절";
                break;
            case 1:
                pos.innerHTML += "<br>&nbsp한글날";
                break;
            case 2:
                pos.innerHTML += "<br>&nbsp신정";
                break;
            case 3:
                pos.innerHTML += "<br>&nbsp3·1절";
                break;
            case 4:
                pos.innerHTML += "<br>&nbsp어린이날";
                break;
            case 5:
                pos.innerHTML += "<br>&nbsp현충일";
                break;
            case 6:
                pos.innerHTML += "<br>&nbsp광복절";
                break;
            case 7:
                pos.innerHTML += "<br>&nbsp기독탄신일";
                break;
        }

        if (isNext[type])
        {
            if (pos.className != "sund")
            {
                if (pos.className == "satd")
                    pos.className = "sundAlt";
                else
                    pos.className = "sund";
            }
            else
                nextRest += 1;
        }
        else if (type < restCurrent.length)
        {
            if (pos.className == "satd")
                pos.className = "sundAlt";
            else
                pos.className = "sund";
        }

        if (nextRest != 0 && pos.className != "sund")
        {
            nextRest -= 1;
            if (year >= 2014)
            {
                pos.className = "sund";
                pos.innerHTML += "<br>&nbsp대체공휴일";
            }
        }
        
        if (coord[1] == 6)
        {
            coord[1] = 0;
            coord[0]++;
        }
        else
            coord[1]++;
        current = new Date(year, month, ++day);
    }
}

function ShowMonthList()
{
    var body = document.getElementById("body");
    body.innerHTML = '<div id="root2"></div>';
    var root = document.getElementById("root2");
    root.innerHTML = '<div id="title2" onclick="ShowYearList()"><b>' + year.toString() + '</b></div>';
    
    for (var i = 0; i < 12; i++)
    {
        var classN;
        if (i < 3)
            classN = "tList";
        else if (i == 3)
            classN = "teList";
        else if (i % 4 == 3)
            classN = "eList";
        else
            classN = "list";
        root.innerHTML += '<div class="' + classN + '" onclick="TabMonth' + i + '()"><b class="mid">' + monthNames[i].substring(0, 3) + '</b></div>';
    }
}

function TabMonth0()
{
    month = 0;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth1()
{
    month = 1;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth2()
{
    month = 2;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth3()
{
    month = 3;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth4()
{
    month = 4;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth5()
{
    month = 5;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth6()
{
    month = 6;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth7()
{
    month = 7;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth8()
{
    month = 8;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth9()
{
    month = 9;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth10()
{
    month = 10;
    ShowCalendar();
    ResetCalendar();
}

function TabMonth11()
{
    month = 11;
    ShowCalendar();
    ResetCalendar();
}

function ShowCalendar()
{
    var body = document.getElementById("body");
    body.innerHTML = '<div id="root"></div>';
    var root = document.getElementById("root");
    root.innerHTML = '<div id="title" onclick="ShowMonthList()"><b>January 2022</b></div>';
    root.innerHTML += '<div id="start"><div class="week" id="sun">Sun</div><div class="week">Mon</div><div class="week">Tue</div><div class="week">Wed</div><div class="week">Thu</div><div class="week">Fri</div><div class="week" id="sat">Sat</div></div>';
    for (var i = 0; i < 6; i++)
    {
        root.innerHTML += "<div>";
        for (var j = 0; j < 7; j++)
        {
            root.innerHTML += '<div id="' + i.toString() + j.toString() + '" class="day"></div>';
        }
        root.innerHTML += "</div>";
    }
}

function ShowYearList()
{
    var body = document.getElementById("body");
    body.innerHTML = '<div id="root2"></div>';
    var root = document.getElementById("root2");
    root.innerHTML = '<div id="title2"><b>' + tenYear.toString() + " ~ " + (tenYear + 9).toString() + '</b></div>';
    
    for (var i = 0; i < 12; i++)
    {
        var classN;
        var yearNum = i;
        if (i < 3)
            classN = "tList";
        else if (i == 3)
            classN = "teList";
        else if(i == 8 || i == 11)
            classN = "invList";
        else if (i % 4 == 3 || i == 10)
            classN = "eList";
        else
            classN = "list";
        if (i == 8 || i == 11)
            yearNum = -1;
        else if (i > 8)
            yearNum--;
        root.innerHTML += '<div class="' + classN + '"' + (yearNum != -1 ? 'onclick="TabYear' + yearNum.toString() + '()"' : "") + '><b class="mid">' + (yearNum != -1 ? (tenYear + yearNum).toString() : "") + '</b></div>';
    }

    root.innerHTML += '<div id="leftButton" onclick="TabLeft()"><b class="buttonMid"><<</b></div>';
    root.innerHTML += '<div id="rightButton" onclick="TabRight()"><b class="buttonMid">>></b></div>';
}

function TabYear0()
{
    year = tenYear + 0;
    ShowMonthList();
}

function TabYear1()
{
    year = tenYear + 1;
    ShowMonthList();
}

function TabYear2()
{
    year = tenYear + 2;
    ShowMonthList();
}

function TabYear3()
{
    year = tenYear + 3;
    ShowMonthList();
}

function TabYear4()
{
    year = tenYear + 4;
    ShowMonthList();
}

function TabYear5()
{
    year = tenYear + 5;
    ShowMonthList();
}

function TabYear6()
{
    year = tenYear + 6;
    ShowMonthList();
}

function TabYear7()
{
    year = tenYear + 7;
    ShowMonthList();
}

function TabYear8()
{
    year = tenYear + 8;
    ShowMonthList();
}

function TabYear9()
{
    year = tenYear + 9;
    ShowMonthList();
}

function TabLeft()
{
    tenYear -= 10;
    ShowYearList();
}

function TabRight()
{
    tenYear += 10;
    ShowYearList();
}

ResetCalendar();