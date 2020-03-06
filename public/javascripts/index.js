// This is the frontend JS. We place it inside a document.ready event handler
// because we want to make sure our JS runs when the browser has finished 
// building the document from the HTML and CSS -- that is, when the document
// is "ready", rather than at the ear
$(document).ready(function (){
	console.log('ready!');

	function updatePage(pokemon) {
		var ul = $("#pokemons");
		ul.append(`<li> Name: ${pokemon.name}</li>`);
		ul.append(`<li> Height: ${pokemon.heigth}</li>`);
		ul.append(`<li> Weight: ${pokemon.weight}</li>`);
		ul.append(`<li> Url: ${pokemon.url}</li>`);
	}

	function readData() {
		$.get('api/pokemons').done(
			function(data) {
				console.log(data);
				var ul = $("#pokemons");
				for (var pokemon of data) {
					updatePage(pokemon)
				} 
			}
		)
	}
	readData()

	var button = $("input[type='button']");
	button.on('click', writeData)
	
	function writeData() {
		var nameField = $("input[name='Name']");
		var heightField = $("input[name='Height']");
		var weightField = $("input[name='Weight']");
		var urlField = $("input[name='Url']");
		var data = {
			name: nameField.val(), 
			height: heightField.val(), 
			weight: weightField.val(),
			url: urlField.val(), 
		}
		$.post('api/pokemons', data).done(
			function (data, status, req) {
			console.log('yayaaayyy! we have added Pokemon!');
			updatePage(data);
			nameField.val('');
			heigthField.val('');
			weightField.val('');
			urlField.val('');			
		}
		).fail(function (req, status, err) {
			alert('Failed?');
		})		
	}

})