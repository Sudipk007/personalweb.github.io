const weatherform= document.querySelector('.weatherform');
const card = document.querySelector('.card');
const CityInput =document.querySelector('.CityInput');
const apiKey="59267ec9936726e4aff07e0f737a4e1b";

weatherform.addEventListener("submit", async event=>{
   event.preventDefault();
    const  city =CityInput.value;
   if(city){

        try{
            const weatherData=await GetWeather(city);
            displayInfo(weatherData);

        }
        catch(error){
            displayError("coundnot fetch data"+"\n"+"Enter a city name");
            
        }
        

   }
   else{
        displayError("Enter a city")
   }

});

async function GetWeather(city){
     const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

     const response = await fetch(apiurl);
    if(!response.ok){
        throw new error("Couldnot fetch data");

    }
    return await response.json();
    
}

function displayInfo(data){
    console.log(data);
    const{name: city,
         main:{temp,humidity}, 
         weather:[{description,id}]}=data;

     card.textContent="";
     card.style.display="flex";

     const cityDisplay =document.createElement('p');
     const tempDisplay =document.createElement('p');
     const humidityDisplay =document.createElement('p');
     const descDisplay=document.createElement('p');
     const emojiDisplay =document.createElement('p');

     cityDisplay.textContent=city;
     cityDisplay.classList.add('City');
     card.appendChild(cityDisplay);

     const tempF=((temp-273.15)*1.8)+32;
     tempDisplay.textContent=`${tempF.toFixed(2)} °F`;
     tempDisplay.classList.add('temp');
     card.appendChild(tempDisplay);

     humidityDisplay.textContent=`Humidity : ${humidity}%`;
     humidityDisplay.classList.add('Humidity');
     card.appendChild(humidityDisplay);

     descDisplay.textContent=description;
     descDisplay.classList.add('description');
     card.appendChild(descDisplay);

     emojiDisplay.textContent=weatherEmoji(id);
     emojiDisplay.classList.add('weather');
     card.appendChild(emojiDisplay);


    
    
}

function weatherEmoji(weatherId){
    switch(true){
        case(weatherId >=200 && weatherId<300):
            return "🌩️";
        case(weatherId >=300 && weatherId<400):
            return "🌧️";
        case(weatherId >=500 && weatherId<600):
            return "⛈️";
        case(weatherId >=600 && weatherId<700):
            return "❄️";
        case(weatherId >=700 && weatherId<800):
            return "😶‍🌫️";
        case(weatherId ===800):
            return "☀️";
        case(weatherId >=801 && weatherId<810):
        return "☁️";
    }

}

function displayError(message){
    const errorDisplay=document.createElement('p');
    errorDisplay.textContent=message;
    errorDisplay.classList.add("message");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}






