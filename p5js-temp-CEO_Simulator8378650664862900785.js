/* @pjs preload="assets/buildingImg.png"; */
/* @pjs preload="assets/buttonImg.png"; */
/* @pjs preload="assets/defaultPage.png"; */
/* @pjs font="assets/buttonFont.ttf"; */
/* @pjs font="assets/textFont.ttf"; */

var screenNumber;
var lastScreenNumber;
let start, companyCustomization, help, stats, officeOverview, work, building;
var jukebox;
let recruiter;
var screens;
var player = new PlayerData();
var test1, test2;
let showMouseXY = false;
let showGrid = false;
let userInput = "";

function setup() {
  createCanvas(800, 600);
  noFill();
  frameRate(30);
  background('#09707C');

  //preload();
  screenNumber = 0;
  recruiter = new EmployeeFactory();
  //Create Screens
  start = new StartScreen();
  characterCustomization = new CharacterCustomization();
  companyCustomization = new CompanyCustomization(); //new CompanyCustomizationScreen();
  help = new Screen(); //new HelpScreen();
  stats = new StatScreen();
  officeOverview = new Screen(); //new OfficeOverviewScreen();
  work = new WorkScreen(); //new WorkScreen();
  skills = new Screen(); //new UpgradeScreen();
  building = new Building();
  jukebox = new MusicManager();
  //Other stuff
  /* Screen Codes:
   0 - start
   1 - companyCustomization
   2 - help
   3 - stats
   4 - officeOverview
   5 - work
   6 - skills
   7 - defaultGameScreen
   */
  screens = [start, characterCustomization, help, stats, officeOverview, work, skills, building, companyCustomization];
}
function preloadImages() { //May Not Need ?
  //test = loadImage('assets/defaultPage.png');
  //test = loadImage('assets/buildingImg.png');
  //test = loadImage('assets/buttonImg.png');
}
function preload() {
  test1 = loadStrings("assets/employees/boyNames.txt");
  test2 = loadStrings("assets/employees/girlNames.txt");
  //
}
function draw() {
  currentScreen = screens[screenNumber];
  currentScreen.drawScreen();
  //screens[screenNumber].drawScreen();
  building.work();
  displayGrid();
  displayMouse();
}
function displayGrid() {
  if (showGrid) {
    strokeWeight(1);
    for (let i = 0; i < width/50; i++) {
      rect(i*50, 0, 3, height);
    }
    for (let j = 0; j < height/50; j++) {
      rect(0, j*50, width, 3);
    }
  }
}
function mouseClicked() {
  currentScreen = screens[screenNumber];
  currentScreen.update();
}

function updateScreenNumber(newScreenNumber) {
  lastScreenNumber = screenNumber;
  screenNumber = newScreenNumber;
}

//Event Handlers
function mouseClicked() {
  currentScreen = screens[screenNumber];
  currentScreen.update();
}

function keyPressed() {
  currentScreen = screens[screenNumber];
  currentScreen.keyEvent(key);

  switch(key) {
  case 'Q':
    showMouseXY = !showMouseXY;
    break;
  case 'G':
    showGrid = !showGrid;
    break;
  case 'Enter':
    if (userInput == "vassar") {
      player.money += 100000;
    } else if (userInput == 'rep1') {
      player.increaseReputation(20);
    } else if (userInput == 'rep2') {
      player.increaseReputation(100);
    }
    console.log(userInput);
    userInput = "";
    break;
  }
  userInput = (key != 'Enter') ? userInput + key: userInput;
  if(screenNumber != 1 && screenNumber != 8){
    jukebox.keyEvent(key);
  }
}

function displayMouse() {
  if (showMouseXY) {
    fill("#000000");
    rect(0, 0, 120, 50);
    fill("#FFFFFF");
    textSize(20);
    textAlign(CORNER);
    text(str(mouseX) + ", " + str(mouseY), 5, 25);
  }
}
