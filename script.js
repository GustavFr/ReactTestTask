import React from 'react'
import ReactDOM from 'react-dom'
import injectSheet from 'react-jss'
import styles from './style.js'

class TODO_App extends React.Component {

	task(state = [], action){
		if(action.type == 'UPDATE_TASK_LIST'){
			state = action.data;
		}
		return state;
	}

	//Входная функция
	constructor(props){
		super(props);
		this.state = {};
		
		this.state.executor = props.data.executor;
		this.state.task = props.data.task;

		this.store = Redux.createStore(this.task);
		this.store.subscribe(() => {
			this.setState({task:this.store.getState()});
		});
		
	}

	//Отправка данных серверу
	post(url, data){
		return	$.ajax({ type: "post",   
			url: url,   
			async: false,
			data: data
		}).responseText;
	}

	//Получение списка задач
	getTaskList(){
		let response = JSON.parse(this.post('/getTaskList',{}));
		this.store.dispatch({type: 'UPDATE_TASK_LIST',data:response});
	}

	//Добавление задачи, удаление задачи, изменение приоритета
	api(url,data){
		this.post(url,{data:data});
		this.getTaskList();
	}

	//Проверка полей на валидность
	protect(){
		let m = [$('#area'),$('#slct'),$('#prt')];

		for(var i = 0; i < m.length; ++i){
			if(m[i].val() == '') return;
		}
		if(m[2].val() < 1) return;
		this.api('/addTask',m.map(function(o){
			return o.val();
		}));
	}


	//Шаблон блока задачи
	showTask(props){
		const task = ({classes}) => (<div className = {classes.task} id = {props.id} key = {Math.random()}>
			<div className = {classes.dsc}>{props.description}</div>
			<div>{props.executor}</div>
			<div>{props.priority}</div>
			<div className = {classes.controls}>
			<input className = {classes.ctrlBtn} type="button" name="" value="Удалить" onClick = {this.api.bind(this,'deleteTask',props.id)}></input>
			{props.id > 0 ? this.changePriorityButton({data:props,type:'add',class:classes.ctrlBtn}) : this.changePriorityButton(0)}
			{props.id < this.state.task.length-1 ? this.changePriorityButton({data:props,type:'sub',class:classes.ctrlBtn}) : this.changePriorityButton(0)}
			</div>
			</div>)

		const Task = injectSheet(styles)(task)
		return ( <Task></Task> )
	}


	//Шаблон главного блока
	showHead(){
		const head = ({classes}) => ( 
			<div className = {classes.head}>
			<form action>
			<textarea className =  {classes.area} id = 'area' placeholder = 'Описание' required/>
			<select className = {classes.slct} id = 'slct' required>
			<option selected disabled value=''>Не выбрано</option>
			{this.state.executor.map(exc => {
				return (<option key = {Math.random()}>{exc}</option>);
			})}
			</select>
			<input className = {classes.priority} type = 'number' min = {1} placeholder = 'Приоритет' id = 'prt' required></input>
			<input className = {classes.btn} type = 'submit' value = 'Добавить Задачу' onClick = {this.protect.bind(this)}></input>
			</form>
			</div>
			)

		const Header = injectSheet(styles)(head)
		return ( <Header></Header> )
	}

	//Шаблон для кнопок изменения приоритета
	changePriorityButton(props){
		switch(props.type){
			case 'add': return (
				<input className = {props.class} type="button" name="" value="Повысить приоритет" onClick = {this.api.bind(this,'/changePriority',{id:props.data.id,char:'+'})}></input>
				)
			case 'sub': return (
				<input className = {props.class} type="button" name="" value="Понизить приоритет" onClick = {this.api.bind(this,'/changePriority',{id:props.data.id,char:'-'})}></input>
				)
		}
		
	}

	render(){
		return(
			<div className = 'app'>
			{this.showHead()}
			{this.state.task.map(tsk => {
				return this.showTask(tsk);
			})}
			</div>
			)
	}

}



$.ajax({
	url:'/load',
	type: 'post',
	success: function(data) {
		ReactDOM.render(<TODO_App data = {data} />, document.getElementById('root'))
	}
});



