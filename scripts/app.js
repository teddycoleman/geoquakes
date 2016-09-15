// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.78, lng: -122.44},
	  zoom: 6
	});
}
// setTimeout(function (){},500);

$(document).on("ready", function() {
  initMap();
  // CODE IN HERE!
  var earthQuakes;

  $.ajax({
	  type: 'GET',
	  url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson',
	  dataType: 'json',
	  success: function(data) {
	    //celebrate
	    earthQuakes = data.features;

	    var source = $('#earthquake-template').html();
		// compile the handlebars template
		var template = Handlebars.compile(source);
		// use the template function from handlebars to create an html string
		var developerHtml = template({ earthquake: earthQuakes });
		// append html to the view
		$( "#info" ).append(developerHtml);

	    earthQuakes.forEach(function (element, index){
		  var myLatLng = {lat: element.geometry.coordinates[1], lng: element.geometry.coordinates[0]};
		  var marker = new google.maps.Marker({
		      position: myLatLng,
		      map: map,
		      title: element.properties.title
          });
		});
	  }
	});
});
