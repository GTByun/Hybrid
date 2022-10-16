var year = new Date().getFullYear();
var month = new Date().getMonth();
var rest = [[10, 3], [10, 9]]


function ResetCalendar()
{
    var current = new Date(year, month);
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

        if (type == 0)
        {
            pos.innerHTML += "<br>&nbsp개천절";
        }
        if (type == 1)
        {
            pos.innerHTML += "<br>&nbsp한글날";
        }

        if (type != rest.length)
        {
            if (pos.className != "sund")
                pos.className = "sund";
            else
                nextRest += 1;
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