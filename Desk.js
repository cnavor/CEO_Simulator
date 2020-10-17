class Desk {
  constructor(xpos, ypos, img) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.singleDeskImg = loadImage('assets/singleDesk.png');
    this.managerDeskImg = loadImage('assets/managerDeskImg.png');
    this.defaultButtonImg = loadImage('assets/purpleButton.png');
    this.oldButtonImg = loadImage ('assets/buttonImg.png');
    this.leftMenuArrowImg = loadImage('assets/leftMenuArrow.png');
    this.rightMenuArrowImg = loadImage('assets/rightMenuArrow.png');
    this.showMenu = false;
    this.employee = null;
    this.w = 96;
    this.h = 64;

    this.desk = new Button(xpos, ypos, this.w, this.h, this.singleDeskImg, 9999);
    this.desk.setHoverText("Click to hire employees");

    //Help Buttons
    this.helpButtonImg = loadImage("assets/questionButton.png");
    this.resumeHelpButton = new Button(650, 440, 40, 40, this.helpButtonImg, 9999);
    this.resumeHelpButton.setHoverText("More experienced, educated employees will solve harder problems faster.");
    this.educationHelpButton = new Button(595, 188, 31, 31, this.helpButtonImg, 9999);
    this.educationHelpButton.setHoverText("More educated employees will solve harder problems faster");
    this.experienceHelpButton = new Button(600, 248, 31, 31, this.helpButtonImg, 9999);
    this.experienceHelpButton.setHoverText("More experienced employees will solve harder problems faster");
    this.productivityHelpButton = new Button(562, 307, 31, 31, this.helpButtonImg, 9999);
    this.productivityHelpButton.setHoverText("Productivity drops the longer an employee works, productivity above 90% gives a boost to work speed");
    this.moraleHelpButton = new Button(480, 366, 31, 31, this.helpButtonImg, 9999);
    this.moraleHelpButton.setHoverText("Morale drops the longer an employee works, morale above 90% gives a boost to work speed");
    this.workProgressHelpButton = new Button(600, 425, 31, 31, this.helpButtonImg, 9999); 
    this.workProgressHelpButton.setHoverText("work per second = (productivity x morale x experience x education)/172");
    //Hire Menu Buttons
    this.hireButton = new Button(width/2 - 175/2, 34*4 + 55 + 225, 175, 50, this.defaultButtonImg, 1000);
    this.hireButton.setText("Hire");
    this.hireButton.setHoverText("Hired Employees will earn you money passively");
    this.leftMenuArrow = new Button(105, 250, 55, 100, this.leftMenuArrowImg, 1001);
    this.rightMenuArrow = new Button(110 + 440 + 55*2 - 20, 250, 55, 100, this.rightMenuArrowImg, 1002);

    //Employee Menu Buttons
    this.employeeActionsButton = new Button(120, 415, 175, 40, this.oldButtonImg, 1003);
    this.employeeActionsButton.setText("Actions");
    this.employeeActionsButton.textSize -= 14;

    this.employeeMoreActionsButton = new Button(120, 415, 175, 40, this.oldButtonImg, 1005);
    this.employeeMoreActionsButton.setText("More");
    this.employeeMoreActionsButton.shrinkText(14);

    //Employee Action Buttons
    this.employeeStatsButton = new Button(120, 415, 175, 40, this.oldButtonImg, 1004);
    this.employeeStatsButton.setText("Stats");
    this.employeeStatsButton.shrinkText(14);


    //Array of all buttons
    this.buttons = [[], 
      [this.hireButton, this.leftMenuArrow, this.rightMenuArrow, this.resumeHelpButton], 
      [this.employeeActionsButton, this.educationHelpButton, this.experienceHelpButton, this.productivityHelpButton, this.moraleHelpButton, this.workProgressHelpButton], 
      [this.employeeMoreActionsButton], 
      [this.employeeStatsButton]];
    this.currentOverlay = 0;

    //Hiring Stuff
    //this.recruiter = new EmployeeFactory();
    this.applicants = recruiter.findApplicants();
    this.applicantView = 0;

    //Message Stuff
    this.message = "";
    this.messageTTL = 0;
  }

  drawDesk() {
    imageMode(CORNERS);
    this.drawEmployee();
    this.desk.drawButton();
    //image(this.singleDeskImg, this.xpos, this.ypos, this.xpos + this.w, this.ypos + this.h);
    this.messageTTL--; //decr here bc you want it to decr even when menu is closed.
  }
  drawOverlay() {
    if (this.employee == null) {
      this.currentOverlay = 1;
      this.drawHireMenu();
    } else if (this.currentOverlay == 1|| this.currentOverlay == 2) {
      this.currentOverlay = 2;
      this.employee.drawEmployeeMenu();
    } else if (this.currentOverlay == 3) {
      this.employee.drawEmployeeActionMenu();
    } else if (this.currentOverlay == 4) {
      this.employee.drawEmployeeMoreActionMenu();
    }
    this.drawButtons();
    this.drawMessage();
  }
  drawEmployee() {
    if (this.employee != null) {
      image(this.employee.img, this.xpos + 15, this.ypos - 30, this.xpos + this.w, this.ypos + this.h);
      //this.employee.work();
    }
  }

  drawHireMenu() {
    fill('#b6cbe0');
    strokeWeight(4);
    stroke('#81665f');
    rect(90, 34*4, width - 180, height - 250, 10, 10, 10, 10);
    fill('#dbe6f0');
    rect(36 + 160 - 20, 34*4 + 40, 175, 225, 4, 4, 4, 4);
    //triangle(180 - 20, 250, 125 - 20, 300, 180 - 20, 350);
    //triangle(180 + 440 + 20, 250, 125+ 440 + 55*2 + 20, 300, 180 + 440 + 20, 350);

    this.drawApplicants();
    this.drawHireMenuText();
  }
  drawApplicants() {
    if (this.applicants.length == 0) {
      this.applicants = recruiter.findApplicants();
    }
    let applicant = this.applicants[this.applicantView];
    imageMode(CORNER);
    image(applicant.img, 50 + 160 - 20, 34*4 + 28 + 16, 147, 216);
    this.drawApplicantResume(applicant);
  }
  drawHireMenuText() {
    textAlign(CENTER);
    strokeWeight(3.5);
    textSize(32);
    text("Resume", width/2, 155);
    textAlign(LEFT);
    textSize(22);
    text("Name: ", 230 + 160 - 20, 200);
    text("Experience: ", 230 + 160 - 20, 200 + 55*1);
    text("Education: ", 230 + 160 - 20, 200 + 55*2);
    text("Salary: $", 230 + 160 - 20, 200 + 55*3);
  }
  drawApplicantResume(applicant) {
    textAlign(LEFT);
    strokeWeight(3.5);
    textSize(22);
    text(applicant.name, 300 + 165 - 20, 200);
    text(applicant.experience + "(" +  applicant.experiencePoints + ")", 370 + 170 - 20, 200 + 55*1);
    text(applicant.education + "(" +  applicant.educationPoints + ")", 360 + 170 - 20, 200 + 55*2);
    text(applicant.salary, 340 + 170 - 20, 200 + 55*3);
  }
  hireApplicant() {
    if (player.getMoneyAmount() >= this.applicants[this.applicantView].getSalary()) {
      this.employee = this.applicants[this.applicantView];
      this.applicants.splice(this.applicantView, 1);
      this.showMenu = false;
      player.pay(this.employee.getSalary());
      this.desk.setHoverText("Click to manage employees");
    } else {
      this.setMessage("Invalid Funds.");
    }
  }
  fireEmployee() {
    this.employee = null;
    this.showMenu = false;
    this.currentOverlay = 0;
    this.desk.setImg(this.singleDeskImg);
    player.loseReputation(10);
    this.desk.setHoverText("Click to hire employees");
  }
  hireManager() {
    this.employeeIsManager = true;
    this.desk.setImg(this.managerDeskImg);
  }
  hasManager() {
    return this.employeeIsManager;
  }
  work() {
    if (this.employee != null) {
      this.employee.work();
    }
  }
  drawButtons() {
    for (let i = 0; i < this.buttons[this.currentOverlay].length; i++) {
      let button = this.buttons[this.currentOverlay][i];
      button.drawButton();
    }
    this.drawButtonText();
    //So Hover Text will be drawn over any buttons.
    for (let i = 0; i < this.buttons[this.currentOverlay].length; i++) {
      let button = this.buttons[this.currentOverlay][i];
      button.drawHoverText();
    }
  }

  drawButtonText() {
    textSize(46);
    textAlign(CENTER);
    //text("Hire", width/2, 34*4 + 55 + 244);
  }
  updateButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[this.currentOverlay][i];
      button.update();
    }
  }
  updateApplicants() {
    this.applicants = recruiter.findApplicants();
  }
  eventCode() {
    return this.eventCode;
  }
  setMessage(txt) {
    this.message = txt;
    this.messageTTL = 30*2;
  }
  drawMessage() {
    textAlign(CENTER);
    if (this.messageTTL > 0) {
      textSize(20);
      textAlign(CENTER, CENTER);
      strokeWeight(3.5);
      text(this.message, width/2, 60);
    }
  }
  update() {
    for (let i = 0; i < this.buttons[this.currentOverlay].length; i++) {
      var button = this.buttons[this.currentOverlay][i];
      if (this.showMenu && button.isPressed() == true) {
        switch(button.getEventCode()) {
        case 1000: //Hire Button
          this.hireApplicant();
          return;
        case 1001: //Left Menu Button
          this.applicantView = (++this.applicantView == this.applicants.length) ? 0: this.applicantView;
          break;
        case 1002: //Right Menu Button
          this.applicantView = (this.applicantView-- == 0) ? this.applicants.length - 1: this.applicantView;
          break;
        case 1003: //Employee Actions Button
          this.currentOverlay = 3;
          break;
        case 1004: //Employee Stats Button
          this.currentOverlay = 2;
          break;
        case 1005: //Employee More Actions
          this.currentOverlay = 4;
        }
        if (this.employee != null) {
          this.employee.cancelConfirmation();
        }
      }
    }
    if (this.employee != null && this.currentOverlay != 2 && this.showMenu) {
      this.employee.update();
    } else {
      this.currentOverlay = 2;
    }
    if (!this.showMenu) {
      this.showMenu = mouseX >= this.xpos && mouseX <= this.xpos + this.w && mouseY >= this.ypos && mouseY <= this.ypos + this.h;
    } else {
      this.showMenu = mouseX >= 112  - 20 && mouseX <= width - 90 && mouseY >= 34*4 && mouseY <= 34*4 + height-250;
    }

    if (this.employee != null && this.employee.wasFired()) {
      this.buttons[3] = [this.employeeMoreActionsButton];
      this.fireEmployee();
    }
    if (this.employee != null && !this.employeeIsManager && this.employee.wasPromoted()) {
      this.buttons[3] = [this.employeeStatsButton];
      this.currentOverlay = 2;
      this.showMenu = false;
      this.hireManager();
    }
    if (this.employee != null && this.employee.wasConfirmed() && !this.employee.wasFired()) {
      this.showMenu = false;
      this.currentOverlay = 2;
    }
  }
}
