/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 1 */
/* Zmienne + Zapis + Wczytywanie */
/*==================================================*/

"use strict";

/*==================================================*/
/* USTAWIENIA */
/*==================================================*/

const GAME_NAME = "KeyboardEscape2D";

const MAX_LEVEL = 100;

const EXIT_PASSWORD = "wgacek";

const ADMIN_PASSWORD = "admin123"; // później zmienimy

/*==================================================*/
/* DANE GRACZA */
/*==================================================*/

let player = {

    level: 0,

    xp: 0,

    wins: 0,

    speedMultiplier: 1,

    currentLevel: 0,

    godMode: false,

    noclip: false

};

/*==================================================*/
/* ELEMENTY HTML */
/*==================================================*/

const menu = document.getElementById("menu");

const game = document.getElementById("game");

const menuLevel = document.getElementById("menuLevel");

const menuXP = document.getElementById("menuXP");

const menuWins = document.getElementById("menuWins");

const levelText = document.getElementById("level");

const xpText = document.getElementById("xp");

const winsText = document.getElementById("wins");

const nextXPText = document.getElementById("nextXP");

/*==================================================*/
/* XP DO NASTĘPNEGO LEVELU */
/*==================================================*/

function getXPRequired(level){

    return 100 + (level * 50);

}

/*==================================================*/
/* ODSWIEŻ HUD */
/*==================================================*/

function updateHUD(){

    menuLevel.textContent = player.level;

    menuXP.textContent = player.xp;

    menuWins.textContent = player.wins;

    levelText.textContent = player.level;

    xpText.textContent = player.xp;

    winsText.textContent = player.wins;

    nextXPText.textContent =
        getXPRequired(player.level) + " XP";

}

/*==================================================*/
/* ZAPIS */
/*==================================================*/

function saveGame(){

    localStorage.setItem(

        GAME_NAME,

        JSON.stringify(player)

    );

}

/*==================================================*/
/* WCZYTYWANIE */
/*==================================================*/

function loadGame(){

    const save = localStorage.getItem(GAME_NAME);

    if(save){

        player = JSON.parse(save);

    }

    updateHUD();

}

/*==================================================*/
/* RESET */
/*==================================================*/

function resetGame(){

    localStorage.removeItem(GAME_NAME);

    player = {

        level:0,

        xp:0,

        wins:0,

        speedMultiplier:1,

        currentLevel:0,

        godMode:false,

        noclip:false

    };

    saveGame();

    updateHUD();

}

/*==================================================*/
/* START */
/*==================================================*/

loadGame();

console.log("Keyboard Escape 2D uruchomiony.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 2 */
/* Menu + Przyciski + Ustawienia */
/*==================================================*/

/*==================================================*/
/* ELEMENTY MENU */
/*==================================================*/

const playBtn = document.getElementById("playBtn");

const settingsBtn = document.getElementById("settingsBtn");

const resetBtn = document.getElementById("resetBtn");

const backMenuBtn = document.getElementById("backMenuBtn");

const settingsModal = document.getElementById("settingsModal");

const closeSettingsBtn = document.getElementById("closeSettingsBtn");

const saveSettingsBtn = document.getElementById("saveSettingsBtn");

const resetModal = document.getElementById("resetModal");

const confirmResetBtn = document.getElementById("confirmResetBtn");

const cancelResetBtn = document.getElementById("cancelResetBtn");

const volumeSlider = document.getElementById("volume");

const musicEnabled = document.getElementById("musicEnabled");

const soundEnabled = document.getElementById("soundEnabled");

/*==================================================*/
/* USTAWIENIA */
/*==================================================*/

let settings = {

    volume:100,

    music:true,

    sounds:true

};

/*==================================================*/
/* ZAPIS USTAWIEŃ */
/*==================================================*/

function saveSettings(){

    localStorage.setItem(

        GAME_NAME + "_settings",

        JSON.stringify(settings)

    );

}

/*==================================================*/
/* WCZYTANIE USTAWIEŃ */
/*==================================================*/

function loadSettings(){

    const save = localStorage.getItem(

        GAME_NAME + "_settings"

    );

    if(save){

        settings = JSON.parse(save);

    }

    volumeSlider.value = settings.volume;

    musicEnabled.checked = settings.music;

    soundEnabled.checked = settings.sounds;

}

/*==================================================*/
/* MENU */
/*==================================================*/

function openMenu(){

    menu.style.display = "flex";

    game.style.display = "none";

}

function startGame(){

    menu.style.display = "none";

    game.style.display = "block";

}

/*==================================================*/
/* USTAWIENIA */
/*==================================================*/

function openSettings(){

    settingsModal.style.display = "flex";

}

function closeSettings(){

    settingsModal.style.display = "none";

}

/*==================================================*/
/* ZAPISZ ZMIANY */
/*==================================================*/

saveSettingsBtn.addEventListener("click",()=>{

    settings.volume = Number(volumeSlider.value);

    settings.music = musicEnabled.checked;

    settings.sounds = soundEnabled.checked;

    saveSettings();

    closeSettings();

});

/*==================================================*/
/* RESET POSTĘPU */
/*==================================================*/

resetBtn.addEventListener("click",()=>{

    resetModal.style.display = "flex";

});

cancelResetBtn.addEventListener("click",()=>{

    resetModal.style.display = "none";

});

confirmResetBtn.addEventListener("click",()=>{

    resetGame();

    resetModal.style.display = "none";

});

/*==================================================*/
/* PRZYCISKI */
/*==================================================*/

playBtn.addEventListener("click",startGame);

settingsBtn.addEventListener("click",openSettings);

closeSettingsBtn.addEventListener("click",closeSettings);

backMenuBtn.addEventListener("click",openMenu);

/*==================================================*/
/* ESC */
/*==================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key === "Escape"){

        if(settingsModal.style.display === "flex"){

            closeSettings();

        }

    }

});

/*==================================================*/
/* START */
/*==================================================*/

loadSettings();

openMenu();

console.log("Menu załadowane.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 3 */
/* Tworzenie Mapy + Poziomy */
/*==================================================*/

const map = document.getElementById("map");

const TILE_SIZE = 32;

/*==================================================*/
/* MAPY */
/* 0 = podłoga */
/* 1 = ściana */
/* 2 = spawn */
/* 3 = exit */
/*==================================================*/

const levels = [

/*================ LEVEL 0 ================*/

[
[1,1,1,1,1,1,1,1,1,1],
[1,2,0,0,0,0,0,0,3,1],
[1,0,1,1,1,0,1,1,0,1],
[1,0,0,0,1,0,0,1,0,1],
[1,1,1,0,1,1,0,1,0,1],
[1,0,0,0,0,0,0,1,0,1],
[1,0,1,1,1,1,0,1,0,1],
[1,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1]
],

/*================ LEVEL 1 ================*/

[
[1,1,1,1,1,1,1,1,1,1],
[1,2,0,1,0,0,0,0,3,1],
[1,0,0,1,0,1,1,0,0,1],
[1,0,1,1,0,1,0,0,1,1],
[1,0,0,0,0,1,0,1,0,1],
[1,1,1,1,0,1,0,1,0,1],
[1,0,0,0,0,0,0,1,0,1],
[1,0,1,1,1,1,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1]
]

];

/*==================================================*/
/* DODANIE POZOSTAŁYCH POZIOMÓW */
/*==================================================*/

while(levels.length < MAX_LEVEL){

    levels.push(

        JSON.parse(
            JSON.stringify(levels[1])
        )

    );

}

/*==================================================*/
/* GRACZ */
/*==================================================*/

let playerX = 0;

let playerY = 0;

/*==================================================*/
/* AKTUALNY POZIOM */
/*==================================================*/

let currentMap = [];

/*==================================================*/
/* RYSOWANIE MAPY */
/*==================================================*/

function loadLevel(id){

    map.innerHTML = '<div id="player"></div>';

    currentMap = levels[id];

    const playerElement =
        document.getElementById("player");

    for(let y=0;y<currentMap.length;y++){

        for(let x=0;x<currentMap[y].length;x++){

            const tile =
                document.createElement("div");

            tile.style.left =
                (x*TILE_SIZE)+"px";

            tile.style.top =
                (y*TILE_SIZE)+"px";

            if(currentMap[y][x]===0){

                tile.className="floor";

            }

            if(currentMap[y][x]===1){

                tile.className="wall";

            }

            if(currentMap[y][x]===2){

                tile.className="spawn";

                playerX=x;

                playerY=y;

            }

            if(currentMap[y][x]===3){

                tile.className="exit";

            }

            map.appendChild(tile);

        }

    }

    playerElement.style.left =
        (playerX*TILE_SIZE)+"px";

    playerElement.style.top =
        (playerY*TILE_SIZE)+"px";

    player.currentLevel=id;

    saveGame();

}

/*==================================================*/
/* ZAŁADOWANIE AKTUALNEGO POZIOMU */
/*==================================================*/

loadLevel(player.currentLevel);

console.log("Załadowano poziom",player.currentLevel);
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 4 */
/* Ruch Gracza + Kolizje */
/*==================================================*/

const playerElement = document.getElementById("player");

const keys = {};

const BASE_SPEED = 1;

/*==================================================*/
/* KLAWISZE */
/*==================================================*/

document.addEventListener("keydown",(event)=>{

    keys[event.key.toLowerCase()] = true;

});

document.addEventListener("keyup",(event)=>{

    keys[event.key.toLowerCase()] = false;

});

/*==================================================*/
/* KOLIZJA */
/*==================================================*/

function isWall(x,y){

    if(y < 0) return true;

    if(x < 0) return true;

    if(y >= currentMap.length) return true;

    if(x >= currentMap[0].length) return true;

    return currentMap[y][x] === 1;

}

/*==================================================*/
/* RUCH */
/*==================================================*/

function movePlayer(dx,dy){

    let moveAmount = BASE_SPEED * player.speedMultiplier;

    for(let i=0;i<moveAmount;i++){

        let newX = playerX + dx;

        let newY = playerY + dy;

        if(player.noclip){

            playerX = newX;

            playerY = newY;

        }

        else{

            if(!isWall(newX,newY)){

                playerX = newX;

                playerY = newY;

            }

        }

    }

    playerElement.style.left =
        (playerX * TILE_SIZE) + "px";

    playerElement.style.top =
        (playerY * TILE_SIZE) + "px";

}

/*==================================================*/
/* OBSŁUGA RUCHU */
/*==================================================*/

function handleMovement(){

    if(keys["w"] || keys["arrowup"]){

        movePlayer(0,-1);

    }

    if(keys["s"] || keys["arrowdown"]){

        movePlayer(0,1);

    }

    if(keys["a"] || keys["arrowleft"]){

        movePlayer(-1,0);

    }

    if(keys["d"] || keys["arrowright"]){

        movePlayer(1,0);

    }

}

/*==================================================*/
/* PĘTLA RUCHU */
/*==================================================*/

setInterval(()=>{

    handleMovement();

},120);

/*==================================================*/
/* DEBUG */
/*==================================================*/

console.log("System ruchu i kolizji załadowany.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 5 */
/* Exit + Hasło + Przechodzenie Poziomów */
/*==================================================*/

const exitPassword =
document.getElementById("exitPassword");

const exitButton =
document.getElementById("exitButton");

const exitMessage =
document.getElementById("exitMessage");

/*==================================================*/
/* SZUKANIE EXITU */
/*==================================================*/

function isOnExit(){

    return currentMap[playerY][playerX] === 3;

}

/*==================================================*/
/* SPRAWDZENIE HASŁA */
/*==================================================*/

function checkExit(){

    if(!isOnExit()){

        exitMessage.textContent =
        "Musisz stać na polu EXIT!";

        exitMessage.className = "error";

        return;

    }

    if(exitPassword.value !== EXIT_PASSWORD){

        exitMessage.textContent =
        "Niepoprawne hasło!";

        exitMessage.className = "error";

        return;

    }

    finishLevel();

}

/*==================================================*/
/* UKOŃCZENIE POZIOMU */
/*==================================================*/

function finishLevel(){

    exitMessage.textContent =
    "Poziom ukończony!";

    exitMessage.className = "success";

    player.wins += player.currentLevel + 1;

    player.xp += getXPRequired(player.level);

    while(player.level < MAX_LEVEL &&
          player.xp >= getXPRequired(player.level)){

        player.xp -= getXPRequired(player.level);

        player.level++;

    }

    if(player.currentLevel < MAX_LEVEL - 1){

        player.currentLevel++;

    }

    updateHUD();

    saveGame();

    exitPassword.value = "";

    setTimeout(()=>{

        loadLevel(player.currentLevel);

        exitMessage.textContent = "";

    },800);

}

/*==================================================*/
/* PRZYCISK */
/*==================================================*/

exitButton.addEventListener("click",checkExit);

/*==================================================*/
/* ENTER */
/*==================================================*/

exitPassword.addEventListener("keydown",(event)=>{

    if(event.key === "Enter"){

        checkExit();

    }

});

console.log("System EXIT załadowany.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 6 */
/* XP + Level + Winy */
/*==================================================*/

/*==================================================*/
/* XP WYMAGANE NA LEVEL */
/*==================================================*/

function getXPRequired(level){

    return 100 + (level * 50);

}

/*==================================================*/
/* XP ŁĄCZNE */
/*==================================================*/

function getTotalXP(level){

    let xp = 0;

    for(let i=0;i<level;i++){

        xp += getXPRequired(i);

    }

    return xp;

}

/*==================================================*/
/* DODAWANIE XP */
/*==================================================*/

function addXP(amount){

    player.xp += amount;

    levelCheck();

    updateHUD();

    saveGame();

}

/*==================================================*/
/* DODAWANIE WINÓW */
/*==================================================*/

function addWins(amount){

    player.wins += amount;

    updateHUD();

    saveGame();

}

/*==================================================*/
/* SPRAWDZENIE LEVELU */
/*==================================================*/

function levelCheck(){

    while(player.level < MAX_LEVEL){

        const needed = getXPRequired(player.level);

        if(player.xp >= needed){

            player.xp -= needed;

            player.level++;

            console.log("Nowy level:",player.level);

        }

        else{

            break;

        }

    }

}

/*==================================================*/
/* WINY ZA POZIOM */
/*==================================================*/

function getWinsReward(level){

    return level + 1;

}

/*==================================================*/
/* NAGRODA ZA UKOŃCZENIE */
/*==================================================*/

function giveLevelReward(){

    const xpReward = 50 + (player.currentLevel * 25);

    const winReward = getWinsReward(player.currentLevel);

    addXP(xpReward);

    addWins(winReward);

}

/*==================================================*/
/* AKTUALIZACJA HUD */
/*==================================================*/

function updateHUD(){

    menuLevel.textContent = player.level;

    menuXP.textContent = player.xp;

    menuWins.textContent = player.wins;

    levelText.textContent = player.level;

    xpText.textContent = player.xp;

    winsText.textContent = player.wins;

    nextXPText.textContent =
        player.xp +
        " / " +
        getXPRequired(player.level) +
        " XP";

}

/*==================================================*/
/* PODMIANA FINISHLEVEL */
/*==================================================*/

finishLevel = function(){

    giveLevelReward();

    exitMessage.textContent =
    "Poziom ukończony!";

    exitMessage.className = "success";

    if(player.currentLevel < MAX_LEVEL-1){

        player.currentLevel++;

    }

    saveGame();

    exitPassword.value="";

    setTimeout(()=>{

        loadLevel(player.currentLevel);

        exitMessage.textContent="";

    },800);

};

console.log("System XP i Leveli załadowany.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 7 */
/* Panel Administratora + Logowanie */
/*==================================================*/

/*==================================================*/
/* ELEMENTY */
/*==================================================*/

const adminPanel =
document.getElementById("adminPanel");

const adminPassword =
document.getElementById("adminPassword");

const adminLogin =
document.getElementById("adminLogin");

const adminContent =
document.getElementById("adminContent");

const adminLoginBtn =
document.getElementById("adminLoginBtn");

const adminLoginMessage =
document.getElementById("adminLoginMessage");

const closeAdminBtn =
document.getElementById("closeAdminBtn");

/*==================================================*/
/* ADMIN */
/*==================================================*/

let adminLogged = false;

/*==================================================*/
/* OTWÓRZ PANEL */
/*==================================================*/

function openAdminPanel(){

    adminPanel.style.display = "flex";

    adminPassword.value = "";

    adminLoginMessage.textContent = "";

    if(adminLogged){

        adminLogin.style.display = "none";

        adminContent.style.display = "flex";

    }

    else{

        adminLogin.style.display = "flex";

        adminContent.style.display = "none";

    }

}

/*==================================================*/
/* ZAMKNIJ PANEL */
/*==================================================*/

function closeAdminPanel(){

    adminPanel.style.display = "none";

}

/*==================================================*/
/* LOGOWANIE */
/*==================================================*/

function loginAdmin(){

    if(adminPassword.value === ADMIN_PASSWORD){

        adminLogged = true;

        adminLogin.style.display = "none";

        adminContent.style.display = "flex";

        adminLoginMessage.textContent = "";

        console.log("Administrator zalogowany.");

    }

    else{

        adminLoginMessage.textContent =
        "Niepoprawne hasło!";

        adminLoginMessage.style.color = "red";

    }

}

/*==================================================*/
/* WYLOGOWANIE */
/*==================================================*/

function logoutAdmin(){

    adminLogged = false;

    adminPassword.value = "";

    adminLogin.style.display = "flex";

    adminContent.style.display = "none";

}

/*==================================================*/
/* PRZYCISKI */
/*==================================================*/

adminLoginBtn.addEventListener(

    "click",

    loginAdmin

);

closeAdminBtn.addEventListener(

    "click",

    closeAdminPanel

);

/*==================================================*/
/* ENTER */
/*==================================================*/

adminPassword.addEventListener(

    "keydown",

    (event)=>{

        if(event.key === "Enter"){

            loginAdmin();

        }

    }

);

/*==================================================*/
/* SKRÓT DO PANELU */
/* CTRL + SHIFT + A */
/*==================================================*/

document.addEventListener(

    "keydown",

    (event)=>{

        if(

            event.ctrlKey &&

            event.shiftKey &&

            event.key.toLowerCase() === "a"

        ){

            openAdminPanel();

        }

    }

);

console.log("Panel administratora załadowany.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 8 */
/* Admin Abuse */
/*==================================================*/

/*==================================================*/
/* ELEMENTY */
/*==================================================*/

const speedMultiplier =
document.getElementById("speedMultiplier");

const applySpeedBtn =
document.getElementById("applySpeedBtn");

const addXPInput =
document.getElementById("addXP");

const giveXPBtn =
document.getElementById("giveXPBtn");

const addWinsInput =
document.getElementById("addWins");

const giveWinsBtn =
document.getElementById("giveWinsBtn");

const setLevelInput =
document.getElementById("setLevel");

const setLevelBtn =
document.getElementById("setLevelBtn");

const teleportInput =
document.getElementById("teleportLevel");

const teleportBtn =
document.getElementById("teleportBtn");

const openExitBtn =
document.getElementById("openExitBtn");

const godModeBtn =
document.getElementById("godModeBtn");

const noclipBtn =
document.getElementById("noclipBtn");

/*==================================================*/
/* SPEED */
/*==================================================*/

applySpeedBtn.addEventListener("click",()=>{

    let value = Number(speedMultiplier.value);

    if(value < 1) value = 1;

    if(value > 10000) value = 10000;

    player.speedMultiplier = value;

    saveGame();

    console.log("Speed x"+value);

});

/*==================================================*/
/* DODAJ XP */
/*==================================================*/

giveXPBtn.addEventListener("click",()=>{

    addXP(

        Number(addXPInput.value)

    );

});

/*==================================================*/
/* DODAJ WINY */
/*==================================================*/

giveWinsBtn.addEventListener("click",()=>{

    addWins(

        Number(addWinsInput.value)

    );

});

/*==================================================*/
/* USTAW LEVEL */
/*==================================================*/

setLevelBtn.addEventListener("click",()=>{

    let level = Number(setLevelInput.value);

    if(level < 0) level = 0;

    if(level > MAX_LEVEL)
        level = MAX_LEVEL;

    player.level = level;

    updateHUD();

    saveGame();

});

/*==================================================*/
/* TELEPORT */
/*==================================================*/

teleportBtn.addEventListener("click",()=>{

    let level = Number(

        teleportInput.value

    );

    if(level < 0) level = 0;

    if(level >= MAX_LEVEL)
        level = MAX_LEVEL - 1;

    player.currentLevel = level;

    loadLevel(level);

    saveGame();

});

/*==================================================*/
/* OTWÓRZ EXIT */
/*==================================================*/

openExitBtn.addEventListener("click",()=>{

    exitPassword.value = EXIT_PASSWORD;

    checkExit();

});

/*==================================================*/
/* GOD MODE */
/*==================================================*/

godModeBtn.addEventListener("click",()=>{

    player.godMode =

    !player.godMode;

    godModeBtn.textContent =

    player.godMode ?

    "God Mode: ON"

    :

    "God Mode: OFF";

    saveGame();

});

/*==================================================*/
/* NOCLIP */
/*==================================================*/

noclipBtn.addEventListener("click",()=>{

    player.noclip =

    !player.noclip;

    noclipBtn.textContent =

    player.noclip ?

    "Noclip: ON"

    :

    "Noclip: OFF";

    saveGame();

});

/*==================================================*/
/* RESET */
/*==================================================*/

resetProgressBtn.addEventListener("click",()=>{

    if(confirm(

        "Na pewno usunąć postęp?"

    )){

        resetGame();

    }

});

console.log("Admin Abuse załadowany.");
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 9 */
/* Powiadomienia + Efekty + Dźwięki + Reset */
/*==================================================*/

/*==================================================*/
/* AUDIO */
/*==================================================*/

const clickSound =
document.getElementById("clickSound");

const winSound =
document.getElementById("winSound");

const levelUpSound =
document.getElementById("levelUpSound");

const backgroundMusic =
document.getElementById("backgroundMusic");

/*==================================================*/
/* ODTWARZANIE DŹWIĘKU */
/*==================================================*/

function playSound(sound){

    if(!settings.sounds) return;

    if(!sound) return;

    sound.volume = settings.volume / 100;

    sound.currentTime = 0;

    sound.play().catch(()=>{});

}

/*==================================================*/
/* MUZYKA */
/*==================================================*/

function updateMusic(){

    if(!backgroundMusic) return;

    backgroundMusic.volume =
    (settings.volume / 100) * 0.5;

    if(settings.music){

        backgroundMusic.play().catch(()=>{});

    }

    else{

        backgroundMusic.pause();

    }

}

/*==================================================*/
/* POWIADOMIENIA */
/*==================================================*/

function notify(text,type="success"){

    const notification =
    document.createElement("div");

    notification.className =
    "notification " + type;

    notification.textContent =
    text;

    document.body.appendChild(
        notification
    );

    setTimeout(()=>{

        notification.style.opacity = "0";

        notification.style.transform =
        "translateX(60px)";

        setTimeout(()=>{

            notification.remove();

        },250);

    },2500);

}

/*==================================================*/
/* EFEKT LEVEL UP */
/*==================================================*/

function levelUpEffect(){

    document.body.classList.add(
        "levelUp"
    );

    playSound(levelUpSound);

    notify(
        "🎉 Awansowałeś na Level " +
        player.level + "!",
        "success"
    );

    setTimeout(()=>{

        document.body.classList.remove(
            "levelUp"
        );

    },700);

}

/*==================================================*/
/* EFEKT UKOŃCZENIA */
/*==================================================*/

function levelCompleteEffect(){

    map.classList.add(
        "levelComplete"
    );

    playSound(winSound);

    notify(
        "✅ Poziom ukończony!",
        "success"
    );

    setTimeout(()=>{

        map.classList.remove(
            "levelComplete"
        );

    },800);

}

/*==================================================*/
/* RESET POSTĘPU */
/*==================================================*/

function fullReset(){

    resetGame();

    loadLevel(0);

    openMenu();

    notify(
        "Postęp został usunięty.",
        "warning"
    );

}

/*==================================================*/
/* DŹWIĘK PRZYCISKÓW */
/*==================================================*/

document.querySelectorAll("button")
.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            playSound(clickSound);

        }
    );

});

/*==================================================*/
/* START */
/*==================================================*/

updateMusic();

console.log(
    "Efekty, dźwięki i powiadomienia załadowane."
);
/*==================================================*/
/* KEYBOARD ESCAPE 2D */
/* SCRIPT.JS - CZĘŚĆ 10 */
/* Główna Pętla Gry + Optymalizacja */
/*==================================================*/

/*==================================================*/
/* FPS */
/*==================================================*/

const GAME_FPS = 60;

let gameRunning = true;

let lastFrame = 0;

/*==================================================*/
/* UPDATE */
/*==================================================*/

function update(deltaTime){

    if(!gameRunning) return;

    handleMovement();

}

/*==================================================*/
/* RENDER */
/*==================================================*/

function render(){

    updateHUD();

}

/*==================================================*/
/* GAME LOOP */
/*==================================================*/

function gameLoop(timestamp){

    const deltaTime = timestamp - lastFrame;

    lastFrame = timestamp;

    update(deltaTime);

    render();

    requestAnimationFrame(gameLoop);

}

/*==================================================*/
/* PAUZA */
/*==================================================*/

function pauseGame(){

    gameRunning = false;

    console.log("Gra zapauzowana.");

}

function resumeGame(){

    gameRunning = true;

    console.log("Gra wznowiona.");

}

/*==================================================*/
/* ZAPIS PRZY WYJŚCIU */
/*==================================================*/

window.addEventListener("beforeunload",()=>{

    saveGame();

});

/*==================================================*/
/* ZAPIS CO 10 SEKUND */
/*==================================================*/

setInterval(()=>{

    saveGame();

},10000);

/*==================================================*/
/* DEBUG */
/*==================================================*/

window.game = {

    player,

    levels,

    loadLevel,

    saveGame,

    resetGame,

    addXP,

    addWins,

    openAdminPanel,

    pauseGame,

    resumeGame

};

/*==================================================*/
/* START GRY */
/*==================================================*/

window.addEventListener("load",()=>{

    loadSettings();

    loadGame();

    loadLevel(player.currentLevel);

    updateHUD();

    requestAnimationFrame(gameLoop);

    console.log("=================================");

    console.log("Keyboard Escape 2D");

    console.log("Alpha 0.1");

    console.log("Max Level:",MAX_LEVEL);

    console.log("Game Started!");

    console.log("=================================");

});

/*==================================================*/
/* KONIEC SCRIPT.JS */
/*==================================================*/
