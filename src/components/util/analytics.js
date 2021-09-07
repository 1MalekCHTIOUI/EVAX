

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function vacc(){
//     return vaccinatedCount;
// }

// function nvacc(){
//     return NonVaccinatedCount;
// }

function countVaccinated(arr){
    let vaccinatedCount = 0;    
    arr.forEach((patient)=> {
        vaccinatedCount++;
    });
    return vaccinatedCount;
}

function countNonVaccinated(arr){
    let NonVaccinatedCount = 11000000;
    arr.forEach((patient)=> {
        NonVaccinatedCount--;
    });
    return NonVaccinatedCount;
}

function countAccepted(arr){
    let acceptedCount = 0;
    arr.forEach((patient)=> {
        if(patient.call_date !== "En attente")
            acceptedCount++;
    });
    return acceptedCount;
}

function countPending(arr){
    let pendingCount = 0;
    arr.forEach((patient)=> {
        if(patient.call_date === "En attente")
            pendingCount++;
    });
    return pendingCount;
}

function patientsVaccinatedPerNon(arr){
    return countVaccinated(arr) * 100 / countNonVaccinated(arr);
}
function countRegistered(arr){
    return parseInt(arr.length);
}
function getNextDayOfTheWeek(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
}
/*
function getNextDayOfTheWeek(dayName, excludeToday = true, time = null, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(time);
    refDate.setDate(refDate.getDate() + +!!excludeToday + 
                    (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}*/


function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("time").innerText = time;
    document.getElementById("time").textContent = time;
    
    setTimeout(showTime, 1000);
} 

module.exports = {
    countVaccinated,
    patientsVaccinatedPerNon,
    countNonVaccinated,
    countAccepted,
    countPending,
    countRegistered,
    getNextDayOfTheWeek,
    showTime,
}
