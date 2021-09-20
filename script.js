var game = (function () {
    'use strict';
    let fieldsPlayed = 0;

    function startGameboard(player1, player2) {
        basicEvents(player1, player2);


    }

    function basicEvents(player1, player2) {

        const marks = Array.from({ length: 9 }, (_, idx) =>
            ({ isMarked: false, mark: idx }));
        const fields = document.querySelectorAll('.field');
        const resetbtn = document.getElementById("restart-button");

        fields.forEach((field) => {
            mouseOver(field);
            mouseOut(field);
            onClick(field, marks, player1, player2);
        })

        resetbtn.addEventListener("click", () => {
            console.log("clickeaste");
            restartGame(marks, fields);
        });

        function restartGame(marks, fields) {
            marks.forEach((mark, index) => {
                mark.isMarked = false;
                mark.mark = index;
            })
            fields.forEach((field) => {
                field.textContent = "";
            })
            game.fieldsPlayed = 0;
        }
    }

    function mouseOver(field) {
        field.addEventListener('mouseover', () => {
            field.classList.add('hovered');
        });
    }

    function mouseOut(field) {
        field.addEventListener('mouseout', () => {
            field.classList.remove('hovered');
        });
    }

    function onClick(field, marks, player1, player2) {

        //functionality for the fields
        field.addEventListener("click", () => {

            let idx = parseInt(field.dataset.index);
            if (!marks[idx].isMarked && player1.isReady) {
                marks[idx].isMarked = true;
                marks[idx].mark = "x";
                player1.setReady();
                player2.setReady();
                field.textContent = "X";
                game.fieldsPlayed++;
                console.log("FIELDS PLAYED: " + game.fieldsPlayed);
            }
            if (!marks[idx].isMarked && player2.isReady) {
                marks[idx].isMarked = true;
                marks[idx].mark = "o";
                player2.setReady();
                player1.setReady();
                field.textContent = "O";
                game.fieldsPlayed++;
                console.log("FIELDS PLAYED: " + game.fieldsPlayed);
            }

            checkForWinner(marks);

            marks.forEach((mark) => {
                console.log(mark);
            })
        });



    }

    function checkForWinner(marks) {
        let winnerMark = "";
        //vertical ones
        if (marks[0].mark == marks[3].mark && marks[3].mark == marks[6].mark) {
            winnerMark = marks[0].mark;

        };
        if (marks[1].mark === marks[4].mark && marks[4].mark === marks[7].mark) {
            winnerMark = marks[1].mark;
        }
        if (marks[2].mark === marks[5].mark && marks[5].mark === marks[8].mark) {
            winnerMark = marks[2].mark;
        }
        //horizontal 
        if (marks[0].mark === marks[1].mark && marks[1].mark === marks[2].mark) {
            winnerMark = marks[0].mark;
        }
        if (marks[3].mark === marks[4].mark && marks[4].mark === marks[5].mark) {
            winnerMark = marks[3].mark;
        }
        if (marks[6].mark === marks[7].mark && marks[7].mark === marks[8].mark) {
            winnerMark = marks[6].mark;
        }
        //diagonal
        if (marks[0].mark === marks[4].mark && marks[4].mark === marks[8].mark) {
            winnerMark = marks[0].mark;
        }
        if (marks[6].mark === marks[4].mark && marks[4].mark === marks[2].mark) {
            winnerMark = marks[6].mark;
        }


        if (winnerMark !== "") {
            if (winnerMark == "x") {
                document.getElementById("title").textContent = player1.name + ' won!';
                return true;
            }
            alert("The winner is: " + player2.name)
            document.getElementById("title").textContent = player2.name + ' won';
            return true;
        }

        if (game.fieldsPlayed == 9) {
            document.getElementById("title").textContent = 'Its a Draw!';
            return true;
        }
        return false;
    }


    function createPlayer(pMark, cd) {
        let name = prompt("Hi! What's your name?");
        let mark = pMark;
        let isReady = cd;
        return {
            name: name,
            mark: mark,
            isReady: isReady,
            sayHi: function () {
                console.log("name:" + name + " mark: " + mark)
            },
            setReady: function () { this.isReady = !this.isReady },
        }
    }



    return {
        fieldsPlayed: fieldsPlayed,
        startGameboard: startGameboard,
        createPlayer: createPlayer,
    };

})();
const p1mark = "x";
const p2mark = "o";
let player1 = game.createPlayer(p1mark, true);
let player2 = game.createPlayer(p2mark, false);
player1.sayHi();
player2.sayHi();
game.startGameboard(player1, player2);
