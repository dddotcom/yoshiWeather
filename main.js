var geoButton = document.querySelector('.geolocation-button');
geoButton.addEventListener('click', geoFindMe);

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude.toString().split(".")[0];
    var longitude = position.coords.longitude.toString().split(".")[0];
    output.innerHTML = 'Woof!';
    var myUrl = "http://104.198.245.168:3000/weather?lat=" + latitude + "&lon=" + longitude;
    getWeather(myUrl);
  }

  function error() {
    output.innerHTML = "Error getting location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}


$( document ).ready(function() {
  $('.location-button').click(function(event) {
    event.preventDefault();
    var zipCode = $('.zipcode-input').val();
    var myUrl = "http://104.198.245.168:3000/weather?zip=" + zipCode + ",us";
    getWeather(myUrl);
  });

  $('.fav-location').click(function(event) {
    event.preventDefault();
    var cityId = $( this ).attr( "data-city-id" );
    var myUrl = "http://104.198.245.168:3000/weather?id=" + cityId;
    getWeather(myUrl);
  });

  //enable w/ https
  //geoFindMe();

  //use w/ http, default to Hawaii!
  getWeather("http://104.198.245.168:3000/weather?id=5850871");

});

function getWeather(myUrl) {
  $.ajax({
    method: "GET",
    url: myUrl,
  })
    .done(function( weatherData ) {
      // console.log( JSON.stringify(weatherData, null, 2) );
      $('.name').text(weatherData.name);
      $('.description').text(weatherData.weather[0].description);
      $('.wind').text(weatherData.wind.speed);
      $('.temp').text(weatherData.main.temp);
      $('.humidity').text(weatherData.main.humidity);

      //update images
      var iconId = weatherData.weather[0].icon;

      $('.yoshi-image').attr("src", 'images/yoshi/' + iconId + '.png');
      $('body').css('background-image', 'url(images/bg/' + iconId + '.jpg)');

      if(iconId === '13d' || iconId === '13n'){
        $('.yoshi-image').addClass('snow');
      } else {
        $('.yoshi-image').removeClass('snow');
      }
    });
}
