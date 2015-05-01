/**
 * 
 */
var counter = 0;
var field = [];
var frontier = [];
var xwide = 50;
var yhigh = 25;
htmlns = "http://www.w3.org/1999/xhtml";

function generateMaze(){
	field = [];
	frontier = [];
	var step = 50;
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
	while( lol() ){}
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
	lol();
}

function lol(){
//	console.log("lol");
//}
//function step(){
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