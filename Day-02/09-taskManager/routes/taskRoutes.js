var express = require('express');
var router = express.Router();

var taskStore = [
	{id : 1, name : 'Plan vacation', isCompleted : false},
	{id : 2, name : 'Fix that bug', isCompleted : true},
];

/* GET home page. */
router.get('/', function(req, res, next) {
	var viewData = {
		list : taskStore
	};
  res.render('tasks/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var newTask = {
		id : taskStore.reduce(function(result, task){
			return result > task.id ? result : task.id;
		})+1,
		name : req.body.taskName,
		isCompleted : false
	};
	taskStore.push(newTask);
	res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
	var taskId = parseInt(req.params.id,10),
		task = taskStore.filter(function(task){
			return task.id === taskId;
		})[0];
	if (task){
		task.isCompleted = !task.isCompleted;
	}
	res.redirect('/tasks');
});

module.exports = router;