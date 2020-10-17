class PlayerData {
  //Player Data
  constructor() {
    //Company Info
    this.playerName = "";
    this.playerAvatar = null;
    this.companyName = "";
    this.typeOfBusiness = "";

    //Stats
    this.money = 100;
    this.moneyPerSec = 0;
    this.reputation = 0;
    this.internCount = 0;
    this.employeeCount = 0;
    this.managerCount = 0;
    this.upgrades = 0;    
    this.bonusMultiplier = 0;

    //For Stats Page
    this.totalEmployees = 0;
    this.totalMoneyEarned = 100;
    this.totalMoneySpent = 0;
    this.totalProblemsSolved = 0;
    this.highestReputation = 0;
  }
  loadData(data) {
    this.moneyPerSec = data.moneyPerSec;
    this.reputation = data.reputation;
    this.internCount = data.internCount;
    this.employeeCount = data.employeeCount;
    this.managerCount = data.managerCount;
    this.upgrades = data.upgrades;

    //For Stats Page
    this.totalEmployees = data.totalEmployees;
    this.totalMoneyEarned = data.totalMoneyEarned;
    this.totalMoneySpent = data.totalMoneySpent;
    this.totalProblemsSolved = data.totalProblemsSolved;
    this.highestReputation = data.highestReputation;
  }
  exportData() {
    //To be added at a later date.
  }
  setPlayerName(name) {
    this.playerName = name;
  }
  setCompanyName(name) {
    this.companyName = name;
  }
  setCompanyType(type) {
    this.companyType = type;
  }
  setPlayerAvatar(img) {
    this.playerAvatar = img;
  }
  getCompanyName() {
    return this.companyName;
  }
  increaseReputation(difficulty) {
    this.reputation += difficulty;
    this.highestReputation = max(this.highestReputation, this.reputation);
    if (this.reputation != 0 && this.reputation % 20 == 0) {
      building.updateApplicants();
    }
  }
  reward(amount) {
    this.totalProblemsSolved++;
    let moneyEarned = (1 + (this.reputation/100))*amount;
    this.money += moneyEarned;
    this.totalMoneyEarned += moneyEarned;
  }
  punishment() {
    this.reputation = (--this.reputation <= -50) ? -50: this.reputation;
  }
  //Reward for employees' work
  collect(amount) {
    let moneyEarned = amount*(1 + this.bonusMultiplier);
    this.money += moneyEarned;
    this.totalMoneyEarned += moneyEarned;
  }
  getMoneyAmount() {
    return this.money;
  }
  getMoneyPerSec() {
    return this.moneyPerSec;
  }
  getReputation() {
    return this.reputation;
  }
  getTotalEmployees() {
    return this.totalEmployees;
  }
  getTotalMoneyEarned() {
    return this.totalMoneyEarned;
  }
  getTotalMoneySpent() {
    return this.totalMoneySpent;
  }
  getTotalProblemsSolved() {
    return this.totalProblemsSolved;
  }
  getHighestReputation() {
    return this.highestReputation;
  }
  has(amount) {
    return this.money >= amount;
  }
  pay(amount) {
    this.money -= amount;
  }
  loseReputation(amount) {
    this.reputation -= amount;
  }
}
