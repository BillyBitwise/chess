import squareArr from './cZech.js'
export default function printBoard(cols){

// build board element with 64 child square elements
// initialize player and round in board element
// declare a 'click event' for each square element
    const board=getId("board");
    board.setAttribute('data-player', 'white');
    let i=1;
    let row=1;

    board.innerHTML="";
    while(i <= cols**2){
        const square = document.createElement("div");
        square.classList="square";
        square.id=i;
        if(row%2){  // odd ranks start white then black
            if(i%2) { bgColour(square, "white");}
            else    { bgColour(square, "black");}
        }
        else{       // even ranks start black then white
            if(i%2) { bgColour(square, "black");}
            else    { bgColour(square, "white");}
        }

        square.addEventListener("click", clickEvent)
        board.appendChild(square);
        
        if (!(i%cols)){       // increment row and add break between ranks
            row++;
            board.appendChild(document.createElement("br"));
        }
        i++;  // next square
    }
    for(let i=1; i<=squareArr.length-1; i++)
        { printSquare(i, squareArr[i]);}
    setMousePointer(getId("board").dataset.player);
}

function clickEvent(){

    let found = 0;      // use as value and boolean
    const currentPlayer = getId('board').dataset.player.charAt(0);
    const playerOnThisSquare = squareArr[this.id].charAt(0);

    let squares= document.querySelectorAll(".square");
    for(let i=0; i < squares.length; i++){
        if(squares[i].classList.contains("clicked")) { found= i+1;}
    }

    // choosing a square that does not contain your own piece - causes an exit from EventListener
    if((playerOnThisSquare != currentPlayer))
        if(!found)     // your first click was not your own piece
            {return;}
        else{           // your second click was not your own piece
            move(found, this.id, squareArr[found]);
            return;            
        }           

    if(!found || this.id == found)      // either first click OR second click is same as first
        { this.classList.toggle("clicked");}
    if(found && this.id != found){      // second click is not same as first click
        getId(found).classList.toggle("clicked");
        this.classList.toggle("clicked");
    }
}

function move(from, to, piece){
    
    printSquare(from, "");
    printSquare(to, piece);

    getId('board').dataset.player= getId('board').dataset.player=== 'white'? 'black': 'white';
    setMousePointer(getId('board').dataset.player);

    console.table(squareArr);
    console.log(`Player: ${getId('board').dataset.player}`);
    console.log(`Piece moved to Rank: ${rank(to)} File: ${file(to)}`);
}

// num parameter = element id   // piece parameter = image file name 
export function printSquare(num, piece){

    // remove element attributes, classes and innerHTML before reassigning them to squares containing a piece
    delete getId(num).dataset.pieceColour;
    delete getId(num).dataset.pieceType;
    getId(num).classList.remove("clicked");
    getId(num).innerHTML = "";    

    if(piece==""){
        squareArr[num]= "";
        return;
    }
    
    // add image to squares containing a piece
    const pieceImg= document.createElement("img");
    pieceImg.src= "assets/" + piece + ".png";
    getId(num).appendChild(pieceImg);
    
    // add attributes to square and update array of squares     // formatting not necessary?????????? just store a single character
    const colour= formatColour(piece.charAt(0));
    const type= formatType(piece.charAt(1));
    getId(num).dataset.pieceColour= colour;
    getId(num).dataset.pieceType= type;
    squareArr[num]=piece;
}

function formatColour(colour){
    const colours= {'w': 'white', 'b': 'black'};
    return colours[colour] || '';
}

function formatType(type){
    const types= {
        'p': 'pawn',
        'r': 'rook',
        'n': 'knight',
        'b': 'bishop',
        'q': 'queen',
        'k': 'king'
    };
    return types[type] || '';
}

export function setMousePointer(colour){
    const squares= document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mouseenter', () =>{
            if(square.getAttribute('data-piece-colour') == colour)
                {square.classList.add('current-player-pointer');}
            else{ square.classList.remove('current-player-pointer');}
        });
        square.addEventListener('mouseleave', () => {
            square.classList.remove('current-player-pointer');
        });
    });
}

function bgColour(ele, colour) { ele.style= (colour=="white") ?"background:white" :"background:grey"; }
function getId(ele) { return document.getElementById(ele); }
function rank(num)  { return 9-(Math.ceil(num/8)); }
function file(num)  { return num%8? num%8: 1; }