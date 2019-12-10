function saveText(hour) {
    var text = $("#" + hour + " textarea").val()
    window.localStorage.setItem(hour, text);
}

function updateBackgrounds() {
    $("#todayIs").html(moment().format('MMMM D YYYY'))
    for (var i = 9; i < 18; i++) {
        var thisHour = moment().hour(i).minute(0).second(0);
        var thisHourStr = thisHour.format('hA')
        var nextHour = moment().hour(i + 1).minute(0).second(0);
        var now = moment()

        var beginIsPast = now > thisHour
        var endIsPast = now > nextHour
        if (beginIsPast && endIsPast) {
            // This hour is in the past. Color it gray.
            $("#" + thisHourStr + " textarea").addClass("bg-secondary text-light").removeClass("bg-danger bg-success text-dark")
        } else if (beginIsPast && !endIsPast) {
            // Current hour. Color it red.
            $("#" + thisHourStr + " textarea").addClass("bg-danger text-light").removeClass("bg-secondary bg-success text-dark")
        } else {
            // Future. Color it green.
            $("#" + thisHourStr + " textarea").addClass("bg-success text-dark").removeClass("bg-secondary bg-danger text-light")
        }
    }
}
// First, set for the first time
updateBackgrounds()

// Update backgrounds regularly
setInterval(updateBackgrounds, 100)

// Now, load saved text
for (var i = 9; i < 18; i++) {
    var thisHour = moment().hour(i).minute(0).second(0);
    var thisHourStr = thisHour.format('hA')
    var text = window.localStorage.getItem(thisHourStr)
    $("#" + thisHourStr + " textarea").val(text)
}