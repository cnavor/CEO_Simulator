class Employee {
  constructor(img, name) {
    //Hiring stats
    this.img = img;
    this.name = name;
    this.experiencePoints = this.generateExperience();
    this.educationPoints = this.generateEducation(); 
    this.experience = this.calculateExperience();
    this.education = this.calculateEducation();
    this.salary = this.calculateSalary();
    //Working Stats
    this.morale = floor(90 + random(11));
    this.productivity = floor(90 + random(11));

    this.workDifficulty = this.calculateWorkDifficulty();
    this.workDone = 0;
    this.problemsSolved = 0;

    //Action Buttons
    this.buttonImg = loadImage('assets/buttonImg.png');
    this.dayOffButton = new Button(325, 175, 325, 60, this.buttonImg, 1000);
    this.dayOffButton.setText("Give Day Off");
    this.dayOffButton.shrinkText(10);
    this.bonusButton = new Button(325, 175 + 70*1, 325, 60, this.buttonImg, 1001);
    this.bonusButton.setText("Give Bonus");
    this.bonusButton.shrinkText(10);
    this.scholarshipButton = new Button(325, 175 + 70*2, 325, 60, this.buttonImg, 1002);
    this.scholarshipButton.setText("Pay for School");
    this.scholarshipButton.shrinkText(10);
    this.fireButton = new Button(325, 175 + 70*3, 325, 60, this.buttonImg, 1003);
    this.fireButton.setText("Fire Employee");    
    this.fireButton.shrinkText(14);

    //More Actions
    this.promoteButton = new Button(325, 175, 325, 60, this.buttonImg, 1006);
    this.promoteButton.setText("Give Promotion");
    this.promoteButton.shrinkText(10);

    this.actionButtons = [this.dayOffButton, this.bonusButton, this.scholarshipButton, this.fireButton];
    this.moreActionButtons = [this.promoteButton];

    this.cancelButton = new Button(325, 250 + 70*2, 320/2, 60, this.buttonImg, 1005);
    this.cancelButton.setText("Cancel");
    this.cancelButton.shrinkText(10);
    this.confirmButton = new Button(325 + 325/2 + 10, 250 + 70*2, 320/2, 60, this.buttonImg, 1004);
    this.confirmButton.setText("Confirm");
    this.confirmButton.shrinkText(10);
    this.confirmationButtons = [this.cancelButton, this.confirmButton];

    this.buttons = [this.actionButtons, this.moreActionButtons];
    this.buttonIdx = 0;

    //Status variables
    this.onVacation = -1;
    this.lastPressed = 0;
    this.fired = false;
    this.confirmed = false;
    //Message Stuff
    this.message = "";
    this.messageTTL = 0;
  }
  calculateReputationBonus() {
    let reputation = player.getReputation();
    let bonus = 0;
    while (reputation > 0) {
      bonus = (reputation - (1 + bonus)*10 > 0) ? bonus + 1: bonus;
      reputation -= (1 + bonus)*10;
    }
    console.log(bonus);
    return bonus;
  }
  generateEducation() {
    let educationPoints = 0;
    let reputationBonus = this.calculateReputationBonus();
    //each level of education is (Low, Med, High, Extraordinary) is 5x more rare than the one below it
    for (let i = 0; i < 4 && educationPoints % 4 == 0; i++) {
      educationPoints +=  round(random(4));
    }
    return educationPoints + reputationBonus;
  }

  generateExperience() {
    let experiencePoints = 0;
    let reputationBonus = this.calculateReputationBonus();
    //each level of education is (Low, Med, High, Extraordinary) is 5x more rare than the one below it
    for (let i = 0; i < 4 && experiencePoints % 4 == 0; i++) {
      experiencePoints +=  round(random(4));
    }
    return experiencePoints + reputationBonus;
  }

  calculateSalary() {
    let salary = 300*this.educationPoints + 500*this.experiencePoints;
    return salary;
  }
  calculateExperience() {
    let experience = floor(this.experiencePoints/4);
    let experienceStr = "";
    switch(experience) {
    case 0:
      experienceStr = "Low";
      break;
    case 1:
      experienceStr = "Medium";
      break;
    case 2:
      experienceStr = "High";
      break;
    default:
      experienceStr = "Ultra";
      break;
    }
    return experienceStr;
  }
  calculateEducation() {
    let education = round(this.educationPoints/4);
    let educationStr = "";
    switch(education) {
    case 0:
      educationStr = "Low";
      break;
    case 1:
      educationStr = "Medium";
      break;
    case 2:
      educationStr = "High";
      break;
    default:
      educationStr = "Ultra";
      break;
    }
    return educationStr;
  }
  drawGUI() {
    fill('#b6cbe0');
    strokeWeight(4);
    stroke('#81665f');
    rect(90, 34*4, width - 180, height - 250, 10, 10, 10, 10);
    fill('#dbe6f0');
    rect(120, 170, 175, 225, 4, 4, 4, 4);
    imageMode(CORNER);
    image(this.img, 120 + 14, 170 + 4, 147, 216);
    this.drawMessage();
  }
  drawEmployeeActionMenu() {
    this.drawGUI();
    this.drawActions();
  }
  drawEmployeeMoreActionMenu() {
    this.drawGUI();
    this.drawMoreActions();
  }
  drawEmployeeMenu() {
    this.drawGUI();
    this.drawEmployeeStats();
  }
  drawEmployeeStats() {
    strokeWeight(3.5);
    textSize(32);
    textAlign(CENTER);
    text(this.name, 500, 160);
    textSize(22);
    textAlign(LEFT);
    text("Education: " + str(this.education) + "(" + str(this.educationPoints) + ")", 325, 200);
    text("Experience: " + str(this.experience) + "(" + str(this.experiencePoints) + ")", 325, 200 + 60);
    text("Productivity: " + str(floor(this.productivity)) + "%", 325, 200 + 60*2);
    text("Morale: " + str(floor(this.morale)) + "%", 325, 200 + 60*3);
    text("Work Progress " + str(floor(this.workDone/60*100, 2)) + "/100", 325, 200 + 60*4);
  }
  drawActions() {
    this.buttonIdx = 0;
    if (this.lastPressed == 0) {
      for (let i = 0; i < this.actionButtons.length; i++) {
        let button = this.actionButtons[i];
        button.drawButton();
      }
    } else {
      let txt = "";
      switch(this.lastPressed) {
      case 1000: //Give Day Off
        txt = "Giving the day off to " + this.name + " will replenish their morale and productivity levels, however they will do no work for the next 120 seconds.";
        break;
      case 1001: //Give Bonus
        txt = "Giving a $500 bonus to " + this.name + " will boost their morale by 50 points instantly.";
        break;
      case 1002: //Pay For School
        txt = "Paying for " + this.name + " to go back to school will cost $1000, and will increase their education level by 2 points.";
        break;
      case 1003:
        txt = "Are you sure you want to fire " + this.name + "? You will not be able to undo this action, and will incur a loss of 10 reputation.";
        break;
      }
      textAlign(LEFT, TOP);
      textSize(25);
      text(txt, 325, 170, 380, 250);
      this.drawConfirmationButtons();
    }
  }
  drawMoreActions() {
    this.buttonIdx = 1;
    if (this.lastPressed == 0) {
      for (let i = 0; i < this.moreActionButtons.length; i++) {
        let button = this.moreActionButtons[i];
        button.drawButton();
      }
    } else {
      let txt = "";
      switch(this.lastPressed) {
      case 1006: //Give Day Off
        txt = "Promoting " + this.name + " to manager costs $5000, and will allow the workers to continue working even when you are on a different floor.";
        break;
      }
      textAlign(LEFT, TOP);
      textSize(25);
      text(txt, 325, 170, 380, 250);
      this.drawConfirmationButtons();
    }
  }
  drawConfirmationButtons() {
    for (let i = 0; i < this.confirmationButtons.length; i++) {
      let button = this.confirmationButtons[i];
      button.drawButton();
    }
  }
  calculateWorkDifficulty() {
    return floor((this.experiencePoints + this.educationPoints)/(2*4));
  }
  work() {
    if (this.onVacation-- >= 0) {
      this.productivity = (this.onVacation < 1) ? 101: 0;
      this.morale = min(100, this.morale + 0.1);
    } else {
      if (this.workDone >= 60) {
        this.turnInWork();
        this.workDone = 0;
      } else {
        this.workDone += (this.productivity/90)*(this.morale/90)*(this.experiencePoints/8)*(this.educationPoints/8)/(1+this.workDifficulty*0.1);
        if (this.workDifficulty > (this.experiencePoints + this.educationPoints)/(2*4)) {
          this.morale -= 0.5;
        }
      }
      this.updateMorale();
      this.updateProductivity();
    }
  }
  updateMorale() {
    if (this.workDone == 0) {
      this.morale -= 1/(this.calculateWorkDifficulty() + 1);
    }
  }
  updateProductivity() {
    if (this.workDone == 0) {
      this.productivity = min(100, this.productivity + 0.00001*this.productivity);
    } else {
      this.productivity = max(this.productivity - 0.00002*this.productivity, 40);
    }
  }
  cancelConfirmation() {
    this.updateLastPressed(0);
  }
  turnInWork() {
    switch(this.workDifficulty) {
    case 0:
      player.collect(10);
      break;
    case 1:
      player.collect(25);
      break;
    case 2:
      player.collect(50);
      break;
    default:
      player.collect(100);
      break;
    }
    this.problemSolved++;
    if (this.problemSolved % 10 == 0) {
      this.experiencePoints++;
    }
  }
  giveVacation() {
    this.onVacation = 30*60*2; // 2 min
  }
  giveBonus() {
    if (player.getMoneyAmount() >= 500) {
      player.pay(500);
      this.morale += 50;
    } else {
      this.setMessage("Insufficient Funds.");
    }
  }
  giveScholarship() {
    if (player.getMoneyAmount() >= 1000) {
      player.pay(1000);
      this.educationPoints += 2;
    } else {
      this.setMessage("Insufficient Funds.");
    }
  }
  getSalary() {
    return this.salary;
  }
  fireEmployee() {
    this.fired = true;
  }
  promoteEmployee() {
    if (player.getMoneyAmount() >= 5000) {
      player.pay(5000);
      this.promoted = true;
    } else {
      this.setMessage("Insufficient Funds.");
    }
  }
  wasFired() {
    return this.fired;
  }
  wasPromoted() {
    return this.promoted;
  }
  wasConfirmed() {
    let ret = this.confirmed;
    this.confirmed = false;
    return ret;
  }
  setMessage(txt) {
    this.message = txt;
    this.messageTTL = 30*2;
  }
  drawMessage() {
    textAlign(CENTER);
    if (this.messageTTL-- > 0) {
      //fill("#000000");
      textSize(20);
      textAlign(CENTER);
      text(this.message, width/2, 60);
    }
  }
  updateLastPressed(lastPressed) {
    this.lastPressed = lastPressed;
  }
  update() {
    let buttons = (this.lastPressed != 0) ? this.confirmationButtons: this.buttons[this.buttonIdx];
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      if (button.isPressed()) {
        switch(button.getEventCode()) {
        case 1004: //Confirm
          switch(this.lastPressed) {
          case 1000:
            this.giveVacation();
            break;
          case 1001:
            this.giveBonus();
            break;
          case 1002:
            this.giveScholarship();
            break;
          case 1003:
            this.fireEmployee();
            break;
          case 1006:
            this.promoteEmployee();
            break;
          }
          this.confirmed = true;
          this.updateLastPressed(0);
          break;
        case 1005: //Cancel
          this.updateLastPressed(0);
          break;
        default:
          this.confirmed = false;
          this.updateLastPressed(button.getEventCode());
        }
      }
    }
  }
}
