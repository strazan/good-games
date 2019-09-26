var input = document.getElementById("tetris-green-room__room-input");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        location.replace('tetris.html#' + input.value);
    }
});