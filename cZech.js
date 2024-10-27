/***************************/
/*  Author:  Jimmy Styles  */
/*  Support: Bludoid       */
/*  Date:    Sept 22/24    */
/***************************/

import printBoard from './design.js';
const squareArr=  [ true,
                    "br", "bn", "bb", "bq", "bk", "bb", "bn", "br",
                    "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp",
                            "", "", "", "", "", "", "", "",
                            "", "", "", "", "", "", "", "",
                            "", "", "", "", "", "", "", "",
                            "", "", "", "", "", "", "", "",
                    "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp",
                    "wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr" ];
export default squareArr;

const columns = 8;
const r = document.querySelector(':root');
const rs = getComputedStyle(r);

function Lionel()           { console.log("Hello! Is it me you're looking for?");}
function getId(ele)         { return document.getElementById(ele);}
function setWidth(pxls)     { r.style.setProperty('--sqWidth', pxls)}       // changes CSS variable in :root 
function setColumns(c)      { r.style.setProperty('--columns', c)}          // changes CSS variable in :root

// ************ Executable Code **************** //
// ********************************************* //

Lionel();
setWidth("60px");
setColumns(columns);
printBoard(columns);
console.log("Player: " + getId("board").dataset.player);