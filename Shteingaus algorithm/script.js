/* */

// containers
var outputBox = document.getElementById("resultBox");
var altContainer = document.getElementById("alternativesPanel");
var questWindow = document.getElementById("questionWindow");

// places in windows
var altOne = document.getElementById("a1");
var altTwo = document.getElementById("a2");
var stepCurrentPlace = document.getElementById("stepCurrent");
var stepTotalPlace = document.getElementById("stepTotal");

//buttons
var addBtn = document.getElementById("btnAddAlt");
var rangeBtn = document.getElementById("btnSolve");
var betterBtn = document.getElementById("btnBetter");
var notBetterBtn = document.getElementById("bntNotBetter");

var altPanelsArray = [];
var altArray = [];
var numeratedAltArray = [];
var res = []; // from numeratedAltArray
var indexes = []; //array of compared elements indexes

var currentStep = 1;

//add alternative panel, done
function getAltPanel(id, text){
    var elem = document.createElement("div");
    
    var elemInput = document.createElement("input");
    elemInput.setAttribute("type", "text");
    elemInput.setAttribute("size", "150");
    elemInput.setAttribute("value", text);

    var closeBtn = document.createElement("a");
    closeBtn.setAttribute("href", "#");
    closeBtn.appendChild(document.createTextNode("X"));
    
    var labelPanel = document.createElement("span");
    labelPanel.appendChild(document.createTextNode("a" + (+id + 1)));

    elem.appendChild(labelPanel);
    elem.appendChild(elemInput);
    elem.appendChild(closeBtn);

    altRow = {};
    altRow.number = id;
    altRow.input = elemInput;
    altRow.element = elem;

    altPanelsArray.push(altRow);

    closeBtn.onclick = function() {
        removeAltHandler(id, elem);
    }
    return elem;
}

//done
function removeAlternative(id, element){
    altContainer.removeChild(element);
    //remove alt from panels array
    for (var key in altPanelsArray){
        if (altPanelsArray[key].number == id){
            altPanelsArray.splice(key, 1);
            break;
        }
    }
}

//done
function removeAltHandler(id, element){
    removeAlternative(id, element);
    refreshAltPanel();
}

//done
function refreshAltPanel(){
    altArray.length = 0;
    altArray = getAltTextList(altPanelsArray);
    console.log(altArray);

    while (altContainer.firstChild) {
        altContainer.removeChild(altContainer.firstChild);
    }
    altPanelsArray.length = 0;

    for (var key in altArray){
        altContainer.appendChild(getAltPanel(key, altArray[key]));
    }
    console.log(altPanelsArray);
}

//done
function addAlternative(){
    var simpleNumber = altPanelsArray.length;
    altContainer.appendChild(getAltPanel(simpleNumber, ""));
}

//done
function getAltTextList(pannels){
    var array = [];
    for (var key in pannels){
        array.push(pannels[key].input.value);
    }
    return array;
}

// drowAlts done
function updateAltsWindow(a1, a2, step, stepsCount){
    //clean old elements
    while (altOne.firstChild) {
        altOne.removeChild(altOne.firstChild);
    }
    while (altTwo.firstChild) {
        altTwo.removeChild(altTwo.firstChild);
    }
    while (stepCurrentPlace.firstChild) {
        stepCurrentPlace.removeChild(stepCurrentPlace.firstChild);
    }
    while (stepTotalPlace.firstChild) {
        stepTotalPlace.removeChild(stepTotalPlace.firstChild);
    }

    var a1pan = document.createElement("span");
    a1pan.appendChild(document.createTextNode('a' + (+a1.num + 1) + ") " + a1.text))
    altOne.appendChild(a1pan);
    var a2pan = document.createElement("span");
    a2pan.appendChild(document.createTextNode('a' + (+a2.num + 1) + ") " + a2.text))
    altTwo.appendChild(a2pan);

    stepCurrentPlace.appendChild(document.createTextNode(step));
    stepTotalPlace.appendChild(document.createTextNode(stepsCount));
}

//ready
function getMiddleIndex(length, move){
    //indexes start with zero
    return (Math.ceil(length / 2) + move);
}

function doRange(){
    altArray.length = 0;
    altArray = getAltTextList(altPanelsArray);
    if (altArray.length <= 2){
        alert("Необходимо указать минимум 3 альтернативы!");
        return;
    }
    for (var key in altArray){
        if (altArray[key] == ""){
            alert("Одна или несколько альтернатив пусты.");
            return;
        }
    }

    //prepare initial data to compare
    numeratedAltArray.length = 0;
    for (var key in altArray){
        var alt = {};
        alt.num = key;
        alt.text = altArray[key];
        numeratedAltArray.push(alt);
    }
    res.length = 0;
    res.push(numeratedAltArray[0]);
    numeratedAltArray.splice(0, 1);
    //show window here
    questWindow.classList.remove("hide");
    //run range()
    indexes.length = 0;
    currentStep = 1;
    updateAltsWindow(numeratedAltArray[0] ,res[0], currentStep, (res.length + numeratedAltArray.length) - 1);

    //clean output box
    while (outputBox.firstChild) {
        outputBox.removeChild(outputBox.firstChild);
    }
}

function compBetter(){
    //call range() func
    range(true);
}

function compNotBetter(){
    //call range() func
    range(false);
}

function getCurrentIndex(){
    var currentComp = 0;
    if (indexes.length == 0){
        currentComp = getMiddleIndex(res.length, 0);
    } else {
        var lastIndex = indexes[indexes.length-1];
        if (!lastIndex.comp) {
            // bad- bad
            if (indexes.length == 1 || !indexes[indexes.length-2].comp) {
                currentComp = getMiddleIndex((res.length - 1) - lastIndex.index, lastIndex.index - 1);
            } else {
                // bad - good
                currentComp = getMiddleIndex(Math.abs(lastIndex.index - indexes[indexes.length-2].index), 
                Math.min(lastIndex.index, indexes[indexes.length-2].index) - 1);
            }
        } else {
            // good - good
            if (indexes.length == 1 || indexes[indexes.length-2].comp) {
                currentComp = getMiddleIndex(lastIndex.index - 1, 0);
            } else {
                // good - bad
                currentComp = getMiddleIndex(Math.abs(lastIndex.index - indexes[indexes.length-2].index), 
                Math.min(lastIndex.index, indexes[indexes.length-2].index) - 1);
            }
        }
    }
    return currentComp;
}

//call this func from compare buttons handlers
// true - current alt is better than alt in res array
function range(isBetter){
    if (numeratedAltArray.length != 0) {
        var currentComp = {};
        currentComp.index = getCurrentIndex();
        currentComp.comp = isBetter;

        if (indexes.length == 0){
            //place 
            indexes.push(currentComp);
            currentComp.index = getCurrentIndex();
            if (res.length == 1){
                if (currentComp.comp) {
                    res.splice(currentComp.index, 0, numeratedAltArray[0]);
                } else {
                    res.splice(currentComp.index + 1, 0, numeratedAltArray[0]);
                }
                numeratedAltArray.splice(0, 1);
                indexes.length = 0;
                currentStep += 1;
            }
            updateAltsWindow(numeratedAltArray[0] ,res[currentComp.index], currentStep, (res.length + numeratedAltArray.length) - 1);
        } else if ((currentComp.index == 0 && currentComp.comp) ||
                    (currentComp.index == (res.length - 1) && !currentComp.comp) ||
                    ((Math.abs(currentComp.index - indexes[indexes.length-1].index) == 1) &&
                    ((!currentComp.comp && indexes[indexes.length-1].comp) || 
                    (currentComp.comp && !indexes[indexes.length-1].comp) ) )) {
            //end of step
            // res.push(numeratedAltArray[0]);
            if (currentComp.comp) {
                res.splice(currentComp.index, 0, numeratedAltArray[0]);
            } else {
                res.splice(currentComp.index + 1, 0, numeratedAltArray[0]);
            }
            numeratedAltArray.splice(0, 1);
            indexes.length = 0;
            currentStep += 1;
            if (numeratedAltArray.length != 0){
                currentComp.index = getCurrentIndex();
                updateAltsWindow(numeratedAltArray[0] ,res[currentComp.index], currentStep, (res.length + numeratedAltArray.length) - 1);
            } else {
                //close compare
                questWindow.classList.add("hide");
                // output
                var resultString = "";
                for (var key in res){
                    resultString = resultString + "a" + (+res[key].num + 1);
                    if (!(key == res.length - 1)) {
                        resultString = resultString + " > ";
                    }
                }
                outputBox.appendChild(document.createTextNode(resultString));

            }
        } else {
            indexes.push(currentComp);
            currentComp.index = getCurrentIndex();
            updateAltsWindow(numeratedAltArray[0] ,res[currentComp.index], currentStep, (res.length + numeratedAltArray.length) - 1);
        }


        //check end of compare step
            //if yes and numeratedAltArray is not empty
                //go to next step
            //if yes and numeratedAltArray is empty
                //close window and show result
            //if no
                //continue compare

        // 
        // currentStep += 1;

    } else {
        questWindow.classList.add("hide");
    }
}


// -----------------------------------------------------------------------------------------
function modp(a, b) {
    if (a > 0) {
        return a % b
    } else {
        return Math.abs(-Math.trunc(a/b) + 1 * b + a)
    }
}
// Алгоритм Меркла-Хеллмана 

// var w = [1, 2, 4, 9, 18, 35];
// var q = 80;
// var r = 29;
// var x = [55, 97, 21, 79, 100, 155];

// var a = [];
// for (var key in w){
//     a.push(modp(r*w[key], q));
// }
// console.log(a);
// //допустим, r обратное = q-r
// var rRev = 69;
// // var rRev = q-r;
// console.log(rRev);

// var sMark = [];
// //получаем S`
// for (var key in x){
//     sMark.push(modp(x[key]*rRev, q));
// }
// console.log(sMark);

// var m = [];

// for (var iKey in sMark) {
//     elem = [];
//     tmpS = sMark[iKey];
//     console.log("current S`: " + tmpS);
//     for (var jKey in w) {
//         mi = w[((w.length - 1) - jKey)] > tmpS ? 0 : 1;
//         elem.unshift(mi);
//         tmpS = tmpS - w[((w.length - 1) - jKey)]*mi;
//         console.log("m(i): " + mi + " | w(i): " + w[((w.length - 1) - jKey)] + " | S` after change: " + tmpS);
//     }
//     m.push(elem);
//     console.log("---------------------------------------------------");
// }
// console.log(m);