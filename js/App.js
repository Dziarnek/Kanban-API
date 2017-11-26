function randomColor() {
    var color = '#',
        letters = ['9C6B77','633818','20a0b1','35a707','ff8d00','1d61ae','781111', '4cb3db'];
        color += letters[Math.floor(Math.random() * letters.length)];
    
    return color
};

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
myHeaders = {
	'X-Client-Id': '2595',
	'X-Auth-Token': '2573481f6a6648bdb0dd087cb0684697'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      	setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);

		setupCards(col, column.cards);	
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(card);
	})
}