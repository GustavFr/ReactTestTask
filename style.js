let styles = {
	'@global': {
		'body': {
			'background': '#edeef0'
		}
	},
	head:{
		'width': 400,
		'margin': '0px auto',
		'box-shadow': '5px 5px 5px rgba(0,0,0,.3)',
		'position': 'relative',
		'text-align': 'center',
		'padding': 10,
		'font-family': 'Tahoma',
		'border-radius': 2,
		'margin-bottom': 20,
		'background': '#FFF',
		'& *':{
			'width' : '100%',
			'margin-bottom': 10,
			'box-sizing': 'border-box'			
		}
	},
	area:{
		'height': 100,
		'resize': 'none',
		'box-sizing': 'border-box',
		'font-size': 15,
	},
	slct:{
		'font-size': 16,
		'text-align': 'center',
	},
	priority:{
		'font-size': 16,
		'padding-left': 3,
	},
	btn:{
		'border':'1px solid rgba(0,0,0,.1)',
		'background': 'rgba(240,240,240)',
		'padding': 5,
		'font-size': 16,
		'text-align': 'center',
		'width':'100%',
		'border-radius': 2,
		'outline': 'none',
		'margin-bottom': 0,
		'&:active':{
			'outline': 'none',
			'border': '1px solid rgba(0,0,0,0)',
			'background': 'rgba(210,210,210)'
		},
		'&:hover': {
			'cursor': 'pointer',
			'background': 'rgba(225,225,225)'
		}
	},
	task:{
		'width': 400,
		'margin': '0px auto',
		'box-shadow': '5px 5px 5px rgba(0,0,0,.3)',
		'position': 'relative',
		'padding': '3px 10px',
		'font-family': 'Tahoma',
		'border-radius': 2,
		'margin-bottom': 13,
		'background': '#FFF',
		'border': '1px solid rgba(0,0,0,.1)',
		'& *':{
			'margin-bottom': 10,
			'box-sizing': 'border-box'			
		}

	},
	ctrlBtn:{
		'border': '1px solid rgba(0,0,0,.1)',
		'background': 'rgba(240,240,240)',
		'padding': 5,
		'font-size': 14,
		'text-align': 'center',
		'border-radius': 2,
		'float': 'right',
		'margin-left': 5,
		'outline': 'none',
		'&:active':{
			'outline': 'none',
			'border': '1px solid rgba(0,0,0,0)',
			'background': 'rgba(210,210,210)'
		},
		'&:hover': {
			'cursor': 'pointer',
			'background': 'rgba(225,225,225)'
		}

	},
	controls: {
		'height': 30,
		'margin-bottom': 0
	},
	dsc: {
		'word-wrap': 'break-word'
	}
};

export default styles;


