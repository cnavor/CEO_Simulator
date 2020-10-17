class Floor {
  constructor() {
    //Load Assets
    this.floorTileImg = loadImage('assets/floorTile.png'); 
    this.defaultButtonImg = loadImage('assets/purpleButton.png');
    this.workButtonImg = loadImage('assets/workButton.png');
    this.singleDeskImg = loadImage('assets/singleDesk.png');
    this.windowImg = loadImage('assets/window.png');
    this.coinImg = loadImage('assets/coin.png');
    this.heartImg = loadImage('assets/heart.png');
    this.helpButtonImg = loadImage('assets/questionButton.png');

    //Create Buttons
    this.menuButton = new Button(width/2 - 100, 275 + 64*4, 200, 50, this.defaultButtonImg, 0);
    this.menuButton.setHoverText("Press to return to main menu");
    this.menuButton.setText("Menu");
    this.menuButton.setTextSize(50);
    //this.workButton = new Button(64, 20, 96, 96, this.workButtonImg, 1005);

    this.workButton = new Button(64, 240 + 64*4, 96 + 12, 96, this.workButtonImg, 1005);
    this.workButton.setHoverText("Clicking this button will allow you to earn money by solving math problems.");
    this.workButton.setText("Work");
    this.workButton.setTextSize(24);
    this.workButton.setTextOffsetY(25);
    this.workButton.setStrokeWeight(1.5);
    this.workButton.setTextFill('#FFFFFF');
    this.workButton.setStrokeFill('#000000');

    //GUI icon buttons
    this.coinButton = new Button(725, 20, 40, 40, this.coinImg);
    this.coinButton.setHoverText('This is the amount of money you have to spend');
    this.heartButton = new Button(725, 70, 40, 40, this.heartImg);
    this.heartButton.setHoverText('This is the amount of reputation you have earned');
    
    //Array of all buttons
    this.buttons = [this.menuButton, this.workButton];

    //Create Desks
    this.desk0 = new Desk(64, 288);
    this.desk1 = new Desk(64 + 64*3, 288);
    this.desk2 = new Desk(64 + 64*6, 288);
    this.desk3 = new Desk(64 + 64*9, 288);
    this.desk4 = new Desk(64 + 64*3, 288 + 64*2);
    this.desk5 = new Desk(64, 288 + 64*2);
    this.desk6 = new Desk(64 + 64*6, 288 + 64*2);
    this.desk7 = new Desk(64 + 64*9, 288 + 64*2);

    //Array of all Desks
    this.desks = [this.desk0, this.desk1, this.desk2, this.desk3, this.desk4, this.desk5, this.desk6, this.desk7];

    //Other stuff
    this.currentOverlay = null;
  }

  drawScreen() {
    this.drawBackground();
    this.drawForeground();
    this.drawButtons();
    this.drawText();
  }
  drawBackground() {
    imageMode(CORNER);
    image(this.windowImg, 0, 0, width, 256);
    this.drawFloor();
    //image(this.defaultImg, 0, 0, width, height);
    this.drawDesks();
  }
  drawFloor() {
    let tileDimension = 32;
    for (let i = 0; i*tileDimension < width; i++) {
      for (let j = 8; j*tileDimension < height; j++) {
        image(this.floorTileImg, i*tileDimension, j*tileDimension, tileDimension, tileDimension);
      }
    }
  }
  drawDesks() {
    for (let i = 0; i < this.desks.length; i++) {
      let desk = this.desks[i];
      desk.drawDesk();
    }
    for (let i = 0; i < this.desks.length; i++) {
      let desk = this.desks[i];
      desk.desk.drawHoverText();
    }
  }
  drawForeground() {
    fill('#b6cbe0');
    strokeWeight(4);
    stroke('#81665f');
    rect(12, 12, width - 24, 32*3 + 10, 10, 10, 10, 10);
    textSize(32);
    fill('#ffffff');
    textAlign(RIGHT, CENTER);
    //text("Money: " + str(player.money), 20, 22);
    //text("Reputation: " + str(player.reputation), 20, 42);
    text(player.getMoneyAmount(), 715, 37);
    text(player.getReputation(), 715, 37 + 48);
    textAlign(LEFT, CENTER);
    text(player.getCompanyName(), 27, 37);
    text("Floor " + str(building.currentFloorNumber + 1), 29, 37 + 45);
    textAlign(CENTER);
    this.coinButton.drawButton();
    this.heartButton.drawButton();
    this.coinButton.drawHoverText();
    this.heartButton.drawHoverText();
    this.drawOverlay();
  }
  drawButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawButton();
    }
    //So Hover Text will display over other buttons
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawHoverText();
    }
  }
  drawText() {
    fill('#C1107C');
    this.drawButtonText();
  }
  drawOverlay() {
    if (this.currentOverlay != null) {
      this.currentOverlay.drawOverlay();
    }
  }
  drawTitle() {
  }
  drawButtonText() {
    textAlign(CENTER, CENTER);
    fill('#FFFFFF');
    stroke('#000000');
    textSize(50);
    // text("Menu", width/2, 549);
    textSize(24);
    strokeWeight(1);
    fill('#FFFFFF');
    stroke('#000000');
    //text("Work", 64 + 48, 245 + 64*5);
    textSize(20);
    //text("Manage", 640 + 48, 245 + 64*5);
  }
  hasManager() {
    for (let i = 0; i < this.desks.length; i++) {
      let desk = this.desks[i];
      if (desk.hasManager()) {
        return true;
      }
    }
    return false;
  }
  updateApplicants() {
    for (let i = 0; i < this.desks.length; i++) {
      let desk = this.desks[i];
      desk.updateApplicants();
    }
  }
  work() {
    for (let i = 0; i < this.desks.length; i++) {
      let desk = this.desks[i];
      desk.work();
    }
  }
  update() {
    if (this.currentOverlay == null) {
      for (let i = 0; i < this.desks.length && this.currentOverlay == null; i++) {
        let desk = this.desks[i];
        desk.update();
        this.currentOverlay = (desk.showMenu) ? desk: null;
      }
    } else {
      this.currentOverlay.update();
      this.currentOverlay = (this.currentOverlay.showMenu) ? this.currentOverlay: null;
    }
    for (let i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (button.isPressed() == true) {
        if (button.getEventCode() < 1000) {
          updateScreenNumber(button.getEventCode());
          return;
        } else {
          switch(button.getEventCode()) {
          case 1000: //Back Button
            updateScreenNumber(lastScreenNumber);
            return;  
          case 1005: // Work Button
            this.currentOverlay = work;
          }
        }
      }
    }
  }
  keyEvent(keypressed) {
    if (this.currentOverlay == work) {
      work.keyEvent(keypressed);
    }
  }
}
