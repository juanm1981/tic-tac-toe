var game = (function () {
    'use strict';
    function startGameboard() {
        const marks = Array.from({ length: 9 }, (_) =>
            ({ isMarked: false, mark: "" }));
        const fields = document.querySelectorAll('.field');
        fields.forEach((field) => {
            field.addEventListener('mouseover', () => {
                console.log("hover is working");
                field.classList.add('hovered');
            });
            field.addEventListener('mouseout', () => {
                console.log("mouseout");
                field.classList.remove('hovered');
            });
            field.addEventListener("click", () => {
                let idx = parseInt(field.dataset.index);
                marks[idx].isMarked = true;
                marks[idx].mark = "x";
                marks.forEach((mark) => {
                    console.log(mark);
                })
            });
        });


    }

    function createPlayer() {
        let name = prompt("Hi! What's your name?");
        let mark = 'X';
        return {
            name: name,
            mark: mark,
            sayHi: function () {
                console.log("Hi! My name is: " + name)
            },
        }
    }

    return {
        startGameboard: startGameboard,
        createPlayer: createPlayer,
    };

})();

////////////////////////////////////////*execution*/////////////////////////////////////////////
//const player = game.createPlayer();
game.startGameboard();
//console.log(player.mark);