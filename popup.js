let bg = chrome.extension.getBackgroundPage();
let container = document.getElementsByClassName("pop_container")[0];
let sunOrMoon = document.getElementById("sun_or_moon");
let watering_can = document.getElementById("watering_can");
let leaves = document.getElementById("leaves");
let fall = document.getElementById("fall");
let isDay = bg.isDay;
let leaves_canvas = document.getElementById("leaves_canvas").getContext('2d');
let fall_canvas = document.getElementById("fall_canvas").getContext('2d');
//the colors for the leaves
let leaves_colors = ["#7cc576","#c4df9b","#39b54a","#3cb878"];
let fall_colors = ["#f7941d","#ece484"];
let leaves_count;
let fall_count;
let info_text = document.getElementById("info_text");
let low_text = document.getElementById("low_text")

refresh();


sunOrMoon.addEventListener("click",()=>{
    bg.switchDay();
    refresh();
});

watering_can.addEventListener("click",()=>{
    if(bg.getIsDay()){
    bg.waterTheTree();
    refresh();
    info_text.innerHTML = "THE TREE GOT WATER<br/>^_^"
    }
});

//re-performing the layout each time when data changed
function refresh(){
    //clear the canvas
    leaves_canvas.clearRect(0,0,160,120);
    fall_canvas.clearRect(0,0,200,60);
    //justify if it's day time
    isDay = bg.getIsDay();
    //get the number of leaves on tree and the fall on ground 
    leaves_count = bg.getLeaves();
    fall_count = bg.getFall();
    //switch the background according to 'isDay'
    if(!isDay){
        container.classList.add("night");
        sunOrMoon.classList.add("moon");
        info_text.classList.add("night");
        watering_can.classList.add("night");
        info_text.innerHTML="MINT TREE IS SLEEPING. . . NO WATER NEEDED ! !"
    }else{
        container.classList.remove("night");
        info_text.classList.remove("night");
        sunOrMoon.classList.remove("moon");
        watering_can.classList.remove("night");
        info_text.innerHTML=bg.getText1();
    }
    //draw the leaves on the tree
    for(i=0;i<leaves_count;i++){
        leaves_canvas.fillStyle = leaves_colors[Math.floor((Math.random()*4+1)-1)];
        leaves_canvas.beginPath();
        let x = Math.floor(Math.random()*160);
        let y = Math.floor(Math.random()*120);
        let r = Math.floor(Math.random()*5);
        leaves_canvas.arc(x,y,r,0,2*Math.PI);
        leaves_canvas.fill();
    }
    //draw the fall on the ground 
    for(j=0;j<fall_count;j++){
        fall_canvas.fillStyle = fall_colors[Math.floor((Math.random()*2+1)-1)];
        fall_canvas.beginPath();
        let x = Math.floor(Math.random()*200);
        let y = Math.floor(Math.random()*60);
        let r = Math.floor(Math.random()*5);
        fall_canvas.arc(x,y,r,0,2*Math.PI);
        fall_canvas.fill();
    }
    return;
}