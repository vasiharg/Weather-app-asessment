const search = document.getElementById('search'),
    submit = document.getElementById('submit'), 
    random = document.getElementById('random'), 
    daysElem = document.getElementById('days'), 
    resultHeading = document.getElementById('result-heading'),
    singleDayEl = document.getElementById('single-day');

//search meal and fetch results from API
function searchMeal(e) {
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

        //fetch the URL  created above and log the results
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const response = data.cod, 
                dateTime = new Date(data.list[0].dt * 1000),
                date = `${dateTime.getDate()}`,
                weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                day = weekday[dateTime.getDay()], 
                description = data.list[0].weather[0].description,
                tempMin = data.list[0].main.temp_min,
                tempMax = data.list[0].main.temp_max,
                icon = data.list[0].weather[0].icon
                imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            console.log(day);

            resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;

            if(response !== "200"){
                resultHeading.innerHTML = `<p>They are no search results for '${term}'. Please another city!</p>`;
            }else{
                daysElem.innerHTML = data.map(day =>`
                    <div class="days">
                    <p>${day} / ${date}</p>
                    <p>${description}</p>
                    <p>${tempMin} - ${tempMax}</p>
                    <img src="${imgUrl}" alt="weather icon">
                    </div>
                `)
                .join('');
            }
        })
    }else{
        alert("cannot submit empty field!");
    }
    
}


//Event listener
submit.addEventListener('submit', searchMeal);