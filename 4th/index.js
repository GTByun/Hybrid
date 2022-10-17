var year = new Date().getFullYear();
var month = new Date().getMonth();
var rest = [[10, 3], [10, 9], [1, 1], [3, 1], [5, 5], [6, 6], [8, 15], [12, 25]];
var isNext = [true, true, false, true, true, false, true, false];
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


function ResetCalendar()
{
    var current = new Date(year, month);
    var monthDiv = document.getElementById("month");
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

        for (type = 0; rest.length > type; type++)
        {
            var checkDay = rest[type];
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
        else if (type < rest.length)
        {
            if (pos.className == "satd")
                pos.className = "sundAlt";
            else
                pos.className = "sund";
        }

        if (nextRest != 0 && pos.className != "sund")
        {
            nextRest -= 1;
            pos.className = "sund";
            pos.innerHTML += "<br>&nbsp대체공휴일";
        }
        
        if (coord[1] == 6)
        {
            coord[1] = 0;
            coord[0]++;
        }
        else
            coord[1]++;
        day++;
        current = new Date(year, month, day);
    }
}

ResetCalendar();