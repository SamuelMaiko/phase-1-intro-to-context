// Your code here
// function createEmployeeRecord(array){
// const details={}
// details.firstName = array[0]
// details.familyName = array[1]
// details.title = array[2]
// details.payPerHour = array[3]
// details.timeInEvents =[]
// details.timeOutEvents =[]
// return details
// }

// function createEmployeeRecords(arraysContainer){
 
//     const employeeRecords=arraysContainer.map(array => {
//     createEmployeeRecord(array);
//     })
//     return employeeRecords
// }

// function createTimeInEvent(recordObject,dateStamp){
// const ourRecord=createEmployeeRecord(recordObject);
// ourRecord.timeInEvents[0]={
//     type:"TimeIn",
//     hour:dateStamp.slice(11),
//     date:dateStamp.slice(0,10)
// }
// return ourRecord
// }

// function createTimeOutEvent(recordObject,dateStamp){
//     const ourRecord2=createTimeInEvent(recordObject,dateStamp)
// ourRecord2.timeOutEvents[0]={
//     type:"TimeOut",
//     hour:dateStamp.slice(11),
//     date:dateStamp.slice(0,10)
// }
// return ourRecord2
// }

// function hoursWorkedOnDate(recordObject,dateStamp){

// }

function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
  }

  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const hoursWorked = (timeOutHour - timeInHour) / 100;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
  
    return totalPayroll;
  }
  
  