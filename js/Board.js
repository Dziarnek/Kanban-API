var board = {
	name: 'Kanban board',
	createColumn: function(column) {
	  	this.element.append(column.element);
	  	initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column').on("click", function() {
	var columnName = prompt('Enter a column name');
	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {
			name: columnName
		},
		success: function(response){
			var column = new Column(response.id, columnName);
			board.createColumn(column);
		  }
	});
});
	
function initSortable() {
	$('.card-list').sortable({
		connectWith: '.card-list',
		placeholder: 'card-placeholder',
		opacity: 0.95,
		receive: function(event, ui,) {
			var movedCard = ui.item[0];
			$.ajax({
				url: baseUrl + '/card/' + $(movedCard).data("card-id"),
				type: 'PUT',
				data: {
					bootcamp_kanban_column_id: $(movedCard).parent().data("column-id"),
					name: $(movedCard).find(".card-description").text()
				}
			});
        }
	}).disableSelection();
};