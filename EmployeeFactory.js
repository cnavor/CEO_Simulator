class EmployeeFactory {
  constructor() {
    /* Employee Types
     0 - Intern
     1 - Employee
     2 - Experienced Employee
     3 - Manager
     */
    this.recruiterImg = loadImage("assets/employees/vicedean_base0.png");
    this.employeeType = 0;
    this.employeeImgs = [loadImage("assets/employees/britta_base0.png"), loadImage("assets/employees/shirley_base0.png"), 
      loadImage("assets/employees/annie_base0.png"), loadImage("assets/employees/vicki_base0.png"), 
      loadImage("assets/employees/abed_base0.png"), loadImage("assets/employees/buddy_base0.png"), 
      loadImage("assets/employees/chang_base0.png"), loadImage("assets/employees/dean_base0.png"), 
      loadImage("assets/employees/duncan_base0.png"), loadImage("assets/employees/garett_base0.png"), 
      loadImage("assets/employees/gilbert_base0.png"), loadImage("assets/employees/jeff_base0.png"), 
      loadImage("assets/employees/leonard_base0.png"), loadImage("assets/employees/neil_base0.png"), 
      loadImage("assets/employees/pierce_base0.png"), loadImage("assets/employees/rich_base0.png"), 
      loadImage("assets/employees/troy_base0.png")];
    this.applicants = [];
    this.maleNames = test1;
    this.femaleNames = test2;
  }

  findApplicants() {
    let applicants = [];
    for (let i = 0; i < 5; i++) {
      let employeeImg = floor(random(this.employeeImgs.length));
      let gender = (employeeImg in [0, 1, 2, 3]) ? 1:0;
      let applicant = new Employee(this.employeeImgs[employeeImg], this.generateApplicantName(gender));
      applicants.push(applicant);
    }
    return applicants;
  }
  generateApplicantName(gender) {
    if (gender == 0) {
      let firstName = this.maleNames[floor(random(this.maleNames.length))];
      let lastName = char(65 + floor(random(26)));
      return str(firstName) + " " + lastName + ".";
    } else {
      let firstName = this.femaleNames[floor(random(this.femaleNames.length))];
      let lastName = char(65 + floor(random(26)));
      return str(firstName) + " " + lastName + ".";
    }
  }
}
