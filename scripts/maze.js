/**
 * 
 */
var counter = 0;
var field = [];
var frontier = [];
var xwide = 50;
var yhigh = 25;
htmlns = "http://www.w3.org/1999/xhtml";
var posX = 0;
var posY = 0;
var cursor = ">";
var endX = xwide-1;
var endY = yhigh-1;
var gameover = false;

function generateMaze(){
	gameover = false;
	posX = 0;
	posY = 0;
	cursor = ">";
	endX = xwide-1;
	endY = yhigh-1;
	field = [];
	frontier = [];
	for( var i = 0; i < yhigh; i++ ){
		field[i] = [];
		for( var j = 0; j < xwide; j++ ){
			field[i][j] = '?';
		}
	}
	var xchoice = Math.floor( (Math.random() *xwide));
	var ychoice = Math.floor( (Math.random() *yhigh));
	//console.log(xchoice, ychoice);
	carve( xchoice, ychoice );
	 //step();
	while( step() ){}
	generateStart();
	generateEnd();
	DrawField();
}

function carve(x, y){
	extra = [];
	field[y][x] = ".";
	if( x > 0 ){
		if( field[y][x-1] === "?" ){
			field[y][x-1] = "$";
			extra.push( [x-1,y] );
		}
	}
	if( x < xwide-1 ){
		if( field[y][x+1] === "?" ){
			field[y][x+1] = "$";
			extra.push( [x+1,y] );
		}
	}
	if( y > 0 ){
		if( field[y-1][x] === "?" ){
			field[y-1][x] = "$";
			extra.push( [x,y-1] );
		}
	}
	if( y < yhigh-1 ){
		if( field[y+1][x] === "?" ){
			field[y+1][x] = "$";
			extra.push( [x,y+1] );
		}
	}
	for( var i = 0 ; i < extra.length; i++ ){
		//console.log("pushing", extra[i], frontier.length);
		frontier.push( extra[i] );
	}
}

function harden( x, y ){
	field[y][x] = "#";
}

function check(x, y){
    edgestate = 0
    if( x > 0){
        if( field[y][x-1] === "."){
            edgestate ++;
        }
    }
    if( x < xwide-1){
        if( field[y][x+1] === "."){
            edgestate ++;
        }
    }
    if( y > 0){
        if( field[y-1][x] === "."){
            edgestate ++;
        }
    }
    if( y < yhigh-1){
        if( field[y+1][x] === "."){
            edgestate ++;
        }
    }
    if( edgestate <= 1 ){
    	return true;
    }
    return false;
}

function checkDiagonals(x, y){
    edgestate = 0
    if( x > 0){
        if( field[y][x-1] === "."){
            edgestate ++;
        }
    }
    if( x < xwide-1){
        if( field[y][x+1] === "."){
            edgestate +=2;
        }
    }
    if( y > 0){
        if( field[y-1][x] === "."){
            edgestate +=4;
        }
    }
    if( y < yhigh-1){
        if( field[y+1][x] === "."){
            edgestate +=8;
        }
    }
    if( edgestate === 1 ){
		if( x < xwide -1 ){
			if( y > 0 ){
				if( field[y-1][x+1] === "." ){
					return false;
				}
			}
			if( y < yhigh -1 ){
				if( field[y+1][x+1] === "." ){
					return false;
				}
			}
		}
		return true;
    }
    else if( edgestate === 2 ){
		if( x > 0 ){
			if( y > 0 ){
				if( field[y-1][x-1] === "." ){
					return false;
				}
			}
			if( y < yhigh -1 ){
				if( field[y+1][x-1] === "." ){
					return false;
				}
			}
		}
		return true;
	}
    else if( edgestate === 4 ){
    	if( y < yhigh -1 ){
    		if( x > 0 ){
    			if( field[y+1][x-1] === "." ){
    				return false;
    			}
    		}
    		if( x < xwide -1 ){
    			if( field[y+1][x+1] === "." ){
    				return false;
    			}
    		}
    	}
    	return true;
    }
    else if( edgestate === 8 ){
    	if( y > 0 ){
    		if( x > 0 ){
    			if( field[y-1][x-1] === "." ){
    				return false;
    			}
    		}
    		if( x < xwide -1 ){
    			if( field[y-1][x+1] === "." ){
    				return false;
    			}
    		}
    	}
    	return true;
    }
	return false;
}

function step(){
	if( frontier.length > 0 ){
		var number = Math.floor( (Math.random() *frontier.length));
		choice = frontier[number];
		//console.log(number, choice);
		if( /*check(choice[0], choice[1]) &&*/ checkDiagonals(choice[0], choice[1])){
			carve( choice[0], choice[1] );
		}
		else{
			harden(choice[0], choice[1]);
		}
		frontier.splice(number, 1);
		return true;
	}
	else{
		for( var i = 0; i < yhigh; i++ ){
			for( var j = 0; j < xwide; j++ ){
				if( field[i][j] === "?" ){
					field[i][j] = "#";
				}
			}
		}
	}
	//DrawField();
	return false;
};

function DrawField(){
	mazeTag = document.querySelector("p[id=maze]");
	//while( mazeTag.firstChild ){
	//	mazeTag.removeChild( mazeTag.firstChild );
	//}
	mazeTag.innerHTML = "";
	for( var i = 0; i < field.length; i++ ){
		mazeTag.innerHTML += field[i].toString().replace(/,/g, "");
		if( i+1 < field.length ){ mazeTag.innerHTML += "<br>"; }
		//var div = document.createElementNS(htmlns, "div");
		//div.innerHTML = field[i].toString().replace(/,/g, "");
		//mazeTag.appendChild(div);
	}
	
}

function generateStart(){
	while( field[posY][posX] !== '.' ){
		posY++;
	}
	//console.log(posX, posY);
	field[posY][posX] = "<font color='red'>" + cursor + "</font>";
}
function generateEnd(){
	while( field[endY][endX] !== '.' ){
		endY--;
	}
	//console.log(posX, posY);
	field[endY][endX] = "<font color='blue'>X</font>";
}

window.onkeyup = function(e) {
	if( gameover === true ){ return; }
   var key = e.keyCode ? e.keyCode : e.which;

   var nextX = posX;
   var nextY = posY;
   
   if (key == 87) { // W key
	   cursor = "^";
	   if( posY > 0 ){
		   nextY --;
	   }
   }else if (key == 83) { // S key
	   cursor = "v";
	   if( posY < yhigh -1 ){
		   nextY ++;
	   }
   }
   else if( key == 65 ){ // A key
	   cursor = "<";
	   if( posX > 0 ){
		   nextX --;
	   }
   }
   else if( key == 68 ){ // D key
	   cursor = ">";
	   if( posX < xwide -1 ){
		   nextX ++;
	   }
   }

   //console.log(nextX, nextY, field[nextY][nextX]);
   if( field[nextY][nextX] === '.' || field[nextY][nextX] === "<font color='red'>.</font>" ){
	   field[nextY][nextX] = "<font color='red'>" + cursor + "</font>";
	   field[posY][posX] = "<font color='red'>.</font>";
	   posY = nextY;
	   posX = nextX;
   }
   else if( field[nextY][nextX] === "<font color='blue'>X</font>" ){
	   field[nextY][nextX] = "<font color='red'>" + cursor + "</font>";
	   field[posY][posX] = "<font color='red'>.</font>";
	   posY = nextY;
	   posX = nextX;
	   window.alert("You won!");
	   gameover = true;
   }
   else{
	   field[posY][posX] = "<font color='red'>" + cursor + "</font>";
   }
   DrawField();
}

function DrawLine(x1, y1, x2, y2){

    if(y1 < y2){
        var pom = y1;
        y1 = y2;
        y2 = pom;
        pom = x1;
        x1 = x2;
        x2 = pom;
    }

    var a = Math.abs(x1-x2);
    var b = Math.abs(y1-y2);
    var c;
    var sx = (x1+x2)/2 ;
    var sy = (y1+y2)/2 ;
    var width = Math.sqrt(a*a + b*b ) ;
    var x = sx - width/2;
    var y = sy;

    a = width / 2;

    c = Math.abs(sx-x);

    b = Math.sqrt(Math.abs(x1-x)*Math.abs(x1-x)+Math.abs(y1-y)*Math.abs(y1-y) );

    var cosb = (b*b - a*a - c*c) / (2*a*c);
    var rad = Math.acos(cosb);
    var deg = (rad*180)/Math.PI

    htmlns = "http://www.w3.org/1999/xhtml";
    div = document.createElementNS(htmlns, "div");
    div.setAttribute('style','border:1px solid black;width:'+width+'px;height:0px;-moz-transform:rotate('+deg+'deg);-webkit-transform:rotate('+deg+'deg);position:absolute;top:'+y+'px;left:'+x+'px;');   

    document.getElementById("maze").appendChild(div);

}