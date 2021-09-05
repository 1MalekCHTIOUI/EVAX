

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
        if(patient.call_date)
            acceptedCount++;
    });
    return acceptedCount;
}

function countPending(arr){
    let pendingCount = 0;
    arr.forEach((patient)=> {
        if(!patient.call_date)
            pendingCount++;
    });
    return pendingCount;
}

function patientsVaccinatedPerNon(arr){
    return countVaccinated(arr) * 100 / countNonVaccinated(arr) + "%";
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
module.exports = {
    countVaccinated,
    patientsVaccinatedPerNon,
    countNonVaccinated,
    countAccepted,
    countPending,
    countRegistered,
    getNextDayOfTheWeek
}
