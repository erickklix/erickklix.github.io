$(document).ready(function(){
    var Geo={};
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);
    } else {
        alert ("Geolocation is not supported");
    }

    function error(){
        alert("We couldn't find you! (or Chrome doesn't like that this page is from an insecure origin)");
    }

    function success(position){
        Geo.lat = position.coords.latitude;
        Geo.lng = position.coords.longitude;
        getWeather();
    }

    function getWeather(){

        var key = "c043d4759e8caed9";
        var state = $("#js__w__data__state");
        var city = $("#js__w__data__city");
        
        if (state.val() && city.val()){
            var Weather = "http://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + state.val() + "/" + city.val() + ".json";
        }else if(Geo.lat && Geo.lng){
            var Weather = "http://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";    
        } else {
            alert ("Please enable your location or select a valid state and city.")
        }

        $.ajax({
            url : Weather,
            dataType : "jsonp",
            success : function(data){
                var location = data['location']['city'];
                var temp = data['current_observation']['temp_f'];
                var img = data['current_observation']['icon_url'];
                var desc = data['current_observation']['weather'];
                var wind = data['current_observation']['wind_string'];

                $('#js__w__data__location').html(location);
                $('#js__w__data__temp').html(temp);
                $('#js__w__data__desc').html(desc);
                $('#js__w__data__wind').html(wind);
            }
        });

    }
    
    $("#js__w__app__btn").click(getWeather);
    
});

