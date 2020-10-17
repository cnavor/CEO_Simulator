class Building {
  constructor() {
    this.floors = [new Floor()];
    this.maxFloors = 5;
    this.currentFloorNumber = 0;


    this.defaultButtonImg = loadImage('assets/buttonImg.png');
    this.workButtonImg = loadImage('assets/workButton.png');
    this.elevatorFloorPurchasedImg = loadImage('assets/buttonImg.png');
    this.elevatorFloorForSaleImg = loadImage('assets/buttonImg.png');

    this.elevatorButtons = this.createElevator();
    this.changeFloor(0);
    this.confirmNeeded = false;
    this.confirmButton = new Button(width/2 - 145, 450, 140, 60, this.defaultButtonImg, 9999);
    this.confirmButton.setText("Confirm");
    this.confirmButton.shrinkText(16);
    this.cancelButton = new Button(width/2 + 5, 450, 140, 60, this.defaultButtonImg, 9998);
    this.cancelButton.setText("Cancel");
    this.cancelButton.shrinkText(16);

    this.elevatorButton = new Button(64 + 64*9 - 12, 240 + 64*4, 96 + 12, 96, this.workButtonImg, 1);
    this.elevatorButton.setText("Floors");
    this.elevatorButton.setHoverText('Click here to change floors');
    this.elevatorButton.setTextSize(24);
    this.elevatorButton.setTextOffsetY(25);
    this.elevatorButton.setStrokeWeight(1.5);
    this.elevatorButton.setTextFill('#FFFFFF');
    this.elevatorButton.setStrokeFill('#000000');

    this.buttons = [this.confirmButton, this.elevatorButton, this.cancelButton];
    this.showElevator = false;
    //Alerts
    this.message = "";
    this.messageTTL = 0;
  }
  work() {
    for (let i = 0; i < this.floors.length; i++) {
      let floor = this.floors[i];
      if (floor.hasManager()||i == this.currentFloorNumber) {
        floor.work();
      }
    }
  }
  calculateFloorPrice() {
    let originalPrice = 10000;
    let newPrice = originalPrice;
    for (let i = 1; i < this.floors.length; i++) { //Start at one bc first floor is free
      newPrice *= 1.2; //Floors get 20% more expensive each time
    }
    return newPrice;
  }
  buyFloor() {
    let floorCost = this.calculateFloorPrice();
    if (player.has(floorCost)) {
      this.elevatorButtons[this.floors.length].setImg(this.elevatorFloorPurchasedImg);
      this.floors.push(new Floor());
      player.pay(floorCost);
      this.changeFloor(this.floors.length - 1);
      this.elevatorButtons[this.elevatorButtons.length - 1].setHoverText('Click to move to this floor');
    } else {
      this.setMessage("Insufficient funds to purchase floor.");
    }
    this.confirmNeeded = false;
  }
  changeFloor(floorNumber) {
    let oldElevatorButton = this.elevatorButtons[this.maxFloors - this.currentFloorNumber - 1];
    oldElevatorButton.setTextFill('#FFFFFF');
    this.currentFloorNumber = floorNumber;
    let currentElevatorButton = this.elevatorButtons[this.maxFloors - this.currentFloorNumber - 1];
    currentElevatorButton.setTextFill('#7FFF00');
    currentElevatorButton.setHoverFillColor('#FFFFFF');
  }
  createElevator() {
    let elevatorButtons = [];
    for (let i = 0; i < this.maxFloors; i++) {
      let floorButton = new Button(width/2 - 175/2, 200 + i*75, 175, 50, this.elevatorFloorForSaleImg, 1000 + (this.maxFloors - i - 1));
      floorButton.setText("Floor " + str(this.maxFloors - i));
      floorButton.shrinkText(8);
      floorButton.setTextFill('#FFFFFF');
      floorButton.setHoverText('Click to purchase floor');
      elevatorButtons.push(floorButton);
    }
    elevatorButtons[elevatorButtons.length - 1].setImg(this.elevatorFloorPurchasedImg);
    elevatorButtons[elevatorButtons.length - 1].setTextFill('#FFFFFF');
    elevatorButtons[elevatorButtons.length - 1].setHoverText('Click to move to this floor');
    return elevatorButtons;
  }
  drawScreen() {
    let currentFloor = this.floors[this.currentFloorNumber];
    currentFloor.drawScreen();
    this.elevatorButton.drawButton();
    this.drawOverlay();
  }
  drawOverlay() {
    if (this.showElevator) {
      this.drawElevator();
    }
  }
  drawElevator() {
    fill('#b6cbe0');
    strokeWeight(4);
    stroke('#81665f');
    rect(240, 130, width - 2*240, height - 150 - 10, 10, 10, 10, 10);
    strokeWeight(3);
    fill('#FFFFFF');
    stroke('#000000');
    textSize(40);
    text("Elevator", width/2, 160);
    if (!this.confirmNeeded) {
      this.drawFloorButtons();
    } else {
      this.drawConfirmationOverlay();
    }
    this.drawMessage();
  }
  drawConfirmationOverlay() {
    textAlign(LEFT, TOP);
    textSize(22);
    strokeWeight(2);
    text("Purchasing this floor will cost $" + this.calculateFloorPrice() + ". Are you sure you want to do this?", 260, 200, 300, 250);
    this.confirmButton.drawButton();
    this.cancelButton.drawButton();
  }
  drawFloorButtons() {
    for (let i = 0; i < this.elevatorButtons.length; i++) {
      let button = this.elevatorButtons[i];
      button.drawButton();
    }
    for (let i = 0; i < this.elevatorButtons.length; i++) {
      let button = this.elevatorButtons[i];
      button.drawHoverText();
    }
  }
  setMessage(txt) {
    this.message = txt;
    this.messageTTL = 30*2;
  }
  drawMessage() {
    fill('#ffffff');
    if (this.messageTTL-- > 0) {
      textSize(20);
      textAlign(CENTER, CENTER);
      strokeWeight(3.5);
      text(this.message, width/2, 60);
    }
  }
  keyEvent(keypressed) {
    let currentFloor = this.floors[this.currentFloorNumber];
    currentFloor.keyEvent(keypressed);
  }
  updateApplicants() {
    for (let i = 0; i < this.floors.length; i++) {
      let floor = this.floors[i];
      floor.updateApplicants();
    }
  }
  update() {
    this.showElevator = this.showElevator && mouseX >= 240 && mouseX <= width - 240 && mouseY >= 130 && mouseY <= height - 30;
    this.messageTTL = (this.showElevator) ? this.messageTTL:0;
    let currentFloor = this.floors[this.currentFloorNumber];
    for (let i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (button.isPressed() == true) {
        if (button.getEventCode() < 1000) {
          switch(button.getEventCode()) {
          case 1: 
            this.showElevator = !this.showElevator;
          }
        } else if (this.confirmNeeded == true) {
          switch(button.getEventCode()) {
          case 9999:
            this.buyFloor();
            return;
          case 9998:
            this.confirmNeeded = false;
            return;
          }
        }
      }
    }
    if (!this.showElevator) {
      currentFloor.update();
    } else if (!this.confirmNeeded) {
      for (let i = 0; i < this.elevatorButtons.length; i++) {
        let button = this.elevatorButtons[i];
        if (button.isPressed() == true) {
          let selectedFloor = button.getEventCode() - 1000;
          if (selectedFloor < this.floors.length) {
            this.changeFloor(selectedFloor);
          } else if (selectedFloor == this.floors.length) {
            this.confirmNeeded = true;
          } else {
            this.setMessage("You must own all floors below this before purchasing.");
          }
        }
      }
    }
  }
}
