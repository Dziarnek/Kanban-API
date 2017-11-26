function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'New card';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>').css("background-color", randomColor()),
			cardDeleteBtn = $('<button class="btn-delete">x</button>'),
			cardDescription = $('<p class="card-description"></p>').text(self.name),
			cardChangeName = $('<button class="change-name"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>');
		
		cardDeleteBtn.on("click", function(){
			self.removeCard();
		});
		cardChangeName.on("click", function() {	
			self.newCardName();
		});
		
		card.append(cardDeleteBtn)
			.append(cardDescription)
			.append(cardChangeName);

		return card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
		  	url: baseUrl + '/card/' + self.id,
		  	method: 'DELETE',
		  	success: function(){
				self.element.remove();
		  }
		});
	},
	newCardName: function() {
		var self = this,
			newName = prompt('Enter new card name');
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				name: newName
			},
			success: function(response){
				self.element.children('.card-description').text(newName);
				self.name = newName;
			}
		});	
	}
}