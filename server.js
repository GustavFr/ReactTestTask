var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var data = {
	executor: ['Ярушин А.М.', 'Масленникова М.О', 'Пинаев И.А'],
	task: []
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', function (req, res) {
	app.use(express.static(__dirname));
	res.sendFile(__dirname + '/index.html');
});

app.post('/load', function(req, res, next) {
	res.send(data);
});


//Получение списка задач
app.post('/getTaskList', function(req, res, next) {
	res.send(data.task);
});


//Добавление новой задачи
app.post('/addTask', function(req, res, next) {
	let task = data.task;
	let id = (task.length > 0) ? task[task.length-1].id+1 : 0;
	task.push({id:id,description:req.body.data[0],executor:req.body.data[1],priority:req.body.data[2]});
	sort(data.task);
	res.send('');
});

//Удаление задачи
app.post('/deleteTask', function(req, res, next) {
	data.task.splice(req.body.id,1);
	sort(data.task);
	res.send('');
});

//Изменение приоритета
app.post('/changePriority', function(req, res, next) {
	let prt = data.task[parseInt(req.body.data.id)];
	prt.priority = (req.body.data.char == '+') ?  parseInt(prt.priority) + 1 : (prt.priority > 1) ? parseInt(prt.priority) - 1 : prt.priority;
	sort(data.task);
	res.send('');
});


app.listen(8000, function () {
	console.log('The server has started successfully. Listen 8000 port');
});

//Сортировка блоков задач
function sort(obj){
	for(var i = 0; i < obj.length; ++i){
		for(var j = 0; j < obj.length-1; ++j){
			if(parseInt(obj[j].priority) < parseInt(obj[j+1].priority)){
				var t = obj[j];
				obj[j] = obj[j+1];
				obj[j+1] = t;
			}
		}
	}
	for(var i = 0; i < obj.length; ++i){
		obj[i].id = i;
	}
}
