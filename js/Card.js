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
		
		card.attr('data-card-id', self.id);

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
			newName = prompt('Enter new card name') || "New card";
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				id: self.id,
				name: newName,
				bootcamp_kanban_column_id: $(self.element).parent().data("column-id")
			},
			success: function(response){
				self.element.children('.card-description').text(newName);
				self.name = newName;
			}
		});	
	}
}
