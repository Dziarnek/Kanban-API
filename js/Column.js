function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'New column';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>'),
			columnTitle = $('<h2 class="column-title">' + self.name + '</h2>'),
			columnCardList = $('<ul class="card-list"></ul>'),
			columnDelete = $('<button class="btn-delete">x</button>'),
			columnAddCard = $('<button class="column-add-card">+</button>'),
			columnChangeName = $('<button class="change-name"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>');

		columnCardList.attr('data-column-id', self.id);

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.on("click", function() {
			self.deleteColumn();
		});	
		columnAddCard.on("click", function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
				name: cardName,
				bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});
		columnChangeName.on("click", function() {	
			self.newColumnName();
		})

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList)
			.append(columnChangeName);

		return column;
	}
}

Column.prototype = {
	createCard: function(card) {
	  	this.element.children('ul').append(card.element);
	},
	newColumnName: function() {
		var self = this,
			newName = prompt('Enter new column name') || "New column";
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				name: newName
			},
			success: function(response){
				self.element.children('.column-title').text(newName);
				self.name = newName;
			}
		});	
	},
	deleteColumn: function() {
		var self = this;
		$.ajax({
		  	url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
		  	success: function(response){
				self.element.remove();
		  	}
		});
	}
};