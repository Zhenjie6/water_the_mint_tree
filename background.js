const MAX_LEAVES = 1300;
//flag that specify if it's day time 
let isDay = true;
//the amount of leaves
let leaves = 30;
let fall = 0;
let notificationId = 0;
//the reverse-amount of water
let water = 0;
let min_count = 0;
//the text in right_top corner
let text_1 = "^_^";
//the text in the bottom 
let text_2;
let noti_timer = 5;

function timer() {
    if (!isDay) {
        return;
    }
    if (min_count >= 6) {
        text_1 = "NEED WATER<br/>@_@";
        if (leaves >= 6) {
            leaves -= water - 6;
            fall += water - 6;
        }
        chrome.browserAction.setBadgeText({ text: "DRY" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#f7941d" });
        if (noti_timer % 5 == 0) {
            sendNotification()
        }
        noti_timer++;

    }
    if (min_count < 6) {
        chrome.browserAction.setBadgeText({ text: min_count + "" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#7cc576" });
        if (min_count < 6 && min_count > 4) {
            text_1 = "*_*";
        } else if (min_count <= 4 && min_count > 2) {
            text_1 = "-_-";
        } else {
            text_1 = "^_^";
        }
    }
    min_count++;
    water++;
    return;
}

function sendNotification() {
    chrome.notifications.clear("1",
        (id) => {

        });
    chrome.notifications.create("1", {
        type: 'basic',
        iconUrl: './images/mint_icon128.png',
        title: 'NEED WATER',
        message: 'water the mint tree, and get yourself a cup of water'
    });
}



function waterTheTree() {
    min_count = 0;
    water = 0;
    fall = 0;
    leaves += 30;
    timer();
    min_count--;
    water--;
    if (leaves > MAX_LEAVES) {
        leaves = 0;
        text_1 = "THE TREE HAS BEEN RESETTED";
    }
}

/**
 * belows are the getter and setter
 */
function getText1() {
    return text_1;
}

function setText1(txt) {
    text_1 = txt;
}

function getText2() {
    return text_2;
}

function setText2(txt) {
    text_2 = txt;
}

function getIsDay() {
    return isDay;
}

function getLeaves() {
    return leaves;
}

function getFall() {
    return fall;
}

function switchDay() {
    isDay = !isDay;
}

timer();
setInterval(timer, 60000);