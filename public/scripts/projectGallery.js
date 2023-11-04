projectPositions = {};
currentProjectPositions = {};
const projectGallery = document.getElementsByClassName("projectGallery");
const projects = document.getElementsByClassName("highlightProject");
const projectAmt = 5;
const widthScale = 250;
const heightScale = 50;
isRotating = true;
isTurning = false;
activeProject = 0;



function setup(){
    for (let i = 0; i < projectAmt; i++)
        projectPositions[i] = angleFind(1, 0, 2*Math.PI/projectAmt*i);
    update();
}

function angleFind(x1, x2, angle){
    y1 = x1 * Math.cos(angle) - x2 * Math.sin(angle); // CCW rotation
    y2 = x1 * Math.sin(angle) + x2 * Math.cos(angle)
    vectorAnswer = {};
    vectorAnswer[0] = y1;
    vectorAnswer[1] = y2;
    return vectorAnswer;
}

function rightSwitchFull(){
    if(!isTurning){
        isTurning = true;
        multiStepSwitch(2 * Math.PI/projectAmt, 7);
        activeProject+= -1 + projectAmt;
        activeProject%=projectAmt;
    }
}

function leftSwitchFull(){
    if(!isTurning){
        isTurning = true;
        multiStepSwitch(-2*Math.PI/projectAmt, 7);
        activeProject+= 1 + projectAmt;
        activeProject%=projectAmt;
    }
}

function multiStepSwitch(angle, steps){
    if(steps > 0){
        turnSwitch(angle/steps);
        setTimeout(function(){multiStepSwitch(angle - angle/steps, steps-1)}, 250)
    }
    else{
        isTurning = false;
    }
}

function turnSwitch(angle){
    for (let i = 0; i < projectAmt; i++) {
        projectPositions[i] = angleFind(projectPositions[i][0], projectPositions[i][1], angle);
    }
    update();
}

function convertOnscreenCoord(x1, x2){
    canvasWidth = projectGallery[0].clientWidth;
    y1 = x1 * projectGallery[0].clientHeight/20;
    y2 = x2 * canvasWidth/3;
    vectorAnswer = {};
    vectorAnswer[0] = y1;
    vectorAnswer[1] = y2;
    return vectorAnswer;
}

function update(){
    middleAdjust = projectGallery[0].clientWidth/2 - projects[0].clientWidth/2;
    for (let i = 0; i < projects.length; i++) {
        const element = projects[i];
        x = convertOnscreenCoord(projectPositions[i][0], projectPositions[i][1]);
        trans = "translate(" + (x[1] + middleAdjust) + "px, " + x[0] +"px)";
        projects[i].style.transform = trans;
        projects[i].style.zIndex = "" + Math.round(x[0]+50);
    }
}

function tappedProject(e, isTapped){
    if(!isTurning){
    clickedElement = Array.prototype.indexOf.call(projects, e);
    if(clickedElement == activeProject && isTapped)
        isRotating = !isRotating;
    else if(clickedElement != activeProject){
        forwardDistance = (clickedElement-activeProject + projectAmt)%projectAmt;
        if(forwardDistance < projectAmt-forwardDistance)
            leftSwitchFull();
        else
            rightSwitchFull();
        isRotating = false;
        setTimeout(function(){tappedProject(e),false}, 250*7);
    }
    }
}

function keepRotating(){
    if(isRotating)
        leftSwitchFull();
    setTimeout(keepRotating, 5000);
}