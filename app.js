const search = document.getElementById('search'),
    submit = document.getElementById('submit'), 
    random = document.getElementById('random'), 
    daysElem = document.getElementById('days'), 
    resultHeading = document.getElementById('result-heading'),
    singleDayEl = document.getElementById('single-day');

//search and fetch results from API
function weatherForecast(e) {
    e.preventDefault();

    //clear single Day
    singleDayEl.innerHTML = '';

    //get search term
    const term = search.value;

    // check for empty field
    if(term.trim()){
        const apiKey = "4d8fb5b93d4af21d66a2948710284366";
        const unit = "metric";
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${term}&appid=${apiKey}&units=${unit}`;
        
        //fetch the URL
        fetch(url)//fetch returns an object as Promise 
        .then(res => res.json()) //.json() will just return the body as promise with json content.
        .then(data => { // call this function when the above chained Promise resolves
            const response = data.cod; 
                
            resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;

            const newDataArray = data.list;

            if(response !== "200"){
                resultHeading.innerHTML = `<p>They are no search results for '${term}'. Please another city!</p>`;
            } 

            function filterItems(arr, query){
                let result =  arr.filter(function(el){
                    if(el.dt_txt && el.dt_txt.includes(query)){
                        return el;
                    }
                })
                return result;
              };
                let fiveDays = filterItems(newDataArray, '15:00:00')
              
                let fiveDaysData = '';
                fiveDays.map((day) => {
                    let dateTime = new Date(day.dt * 1000),
                    date = `${dateTime.getDate()}`,
                    weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    wday = weekday[dateTime.getDay()], 
                    description = day.weather[0].description,
                    tempMin = Math.floor(day.main.temp_min),
                    tempMax = Math.ceil(day.main.temp_max),
                    icon = day.weather[0].icon,
                    imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    fiveDaysData += `<div class="days"><p>${wday} ${date}</p>
                    <p>${description}</p>
                    <p>Temperature between ${tempMin} and ${tempMax} &#8451</p>
                    <img src="${imgUrl}" alt="weather icon"><hr>`
                });
                
                daysElem.innerHTML = fiveDaysData;
            
            })
    } else {
        alert("cannot submit empty field!");
    }
    
}
//Event listener
submit.addEventListener('submit', weatherForecast);