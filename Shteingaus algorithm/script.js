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
    console.log(Math.ceil((length - 1) / 2) + move);
    return (Math.ceil((length - 1) / 2) + move);
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

function getCurrentIndex(currentDirection){
    var currentComp = 0;
    if (indexes.length == 0){
        currentComp = getMiddleIndex(res.length, 0);
    } else {
        var lastIndex = indexes[indexes.length-1];
        if (!currentDirection) {
            // bad- bad
            if (indexes.length == 1 || !lastIndex.comp) {
                currentComp = getMiddleIndex((res.length) - lastIndex.index, lastIndex.index);
            } else {
                // bad - good
                currentComp = getMiddleIndex(Math.abs(lastIndex.index - indexes[indexes.length-2].index), 
                Math.min(lastIndex.index, indexes[indexes.length-2].index));
            }
        } else {
            // good - good
            if (indexes.length == 1 || lastIndex.comp) {
                currentComp = getMiddleIndex(lastIndex.index, 0);
            } else {
                // good - bad
                currentComp = getMiddleIndex(Math.abs(lastIndex.index - indexes[indexes.length-2].index), 
                Math.min(lastIndex.index, indexes[indexes.length-2].index));
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
        currentComp.index = getCurrentIndex(isBetter);
        currentComp.comp = isBetter;

        if (indexes.length == 0){
            //place 
            indexes.push(currentComp);
            currentComp.index = getCurrentIndex(isBetter);
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
                res.splice(currentComp.index + 1, 0, numeratedAltArray[0]);
            } else {
                res.splice(currentComp.index + 1, 0, numeratedAltArray[0]);
            }
            numeratedAltArray.splice(0, 1);
            indexes.length = 0;
            currentStep += 1;
            if (numeratedAltArray.length != 0){
                currentComp.index = getCurrentIndex(isBetter);
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
            currentComp.index = getCurrentIndex(isBetter);
            updateAltsWindow(numeratedAltArray[0] ,res[currentComp.index], currentStep, (res.length + numeratedAltArray.length) - 1);
        }

        console.log(res);
        console.log(indexes);

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
    } if (a === 0) {
        return 0;
    } else{
        return Math.abs(-Math.trunc(a/b) + 1 * b + a)
    }
}   