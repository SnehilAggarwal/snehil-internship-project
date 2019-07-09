$(document).ready(function(){
	$(".ui.dropdown").dropdown();

	$("button").click(function(){
			var city = $(".text").text()
			console.log(city)

			var mapurl = {
				"Navi Mumbai" : "https://www.google.com/maps/d/viewer?mid=18zvTSJJfkNqfE-szAo3kPYlpyATvC7q4&ll=19.064594769062953%2C73.03241229038667&z=13",
				Mumbai : "https://www.google.com/maps/d/viewer?mid=1ZdVy2DWblS_c2qLIS2UFd0il53u6X9Dg&ll=19.104715516318194%2C72.86879179659036&z=13",
				Delhi : "https://www.google.com/maps/d/viewer?mid=11A2Zz1abR_f1vihblNR5RJ7nF-ydJJH1&ll=28.622484089520352%2C77.1960699213414&z=12",
				Pune : "https://www.google.com/maps/d/viewer?mid=19pr3IBwtZbdC-38v0oA3CYPMnzDrXWVJ&ll=18.511083657603294%2C73.85052654228843&z=13",
				Banglore : "https://www.google.com/maps/d/viewer?mid=14EwugpGhHhBsjwrKdAgYX172hWxF2OhD&ll=12.94994538166157%2C77.57822350392473&z=13",
				Hyderabad : "https://www.google.com/maps/d/viewer?mid=13pQsZZh5sp4_6ZLylI6R5X3CQa4mAGRj&ll=17.414195705590593%2C78.4563894823093&z=12",
				Kolkata : "https://www.google.com/maps/d/viewer?mid=1xxocRyzno76gbmT0r5vUGWpc2F4KX9xx&ll=22.57298674229869%2C88.43813193210576&z=12",
				Noida : "https://www.google.com/maps/d/viewer?mid=1ZdvbaHIkEzBfmYnuWMO8OxNnYz-ppqTP&ll=28.57588894328385%2C77.38020755645994&z=13",
				Gurgaon : "https://www.google.com/maps/d/viewer?mid=1k1gSHIy04-5r8bWzlsmZ4e1iV4NnUojv&ll=28.466788968573688%2C77.06832209449453&z=13",
				Chennai : "https://www.google.com/maps/d/viewer?mid=1AJWM1rm3ote4WryvB6gJbKgK0-R-x8Kd&ll=12.97548201822228%2C80.21382908972589&z=12"
			}

			var url = mapurl[city]
			console.log(url)
			window.open(url)
	});



});