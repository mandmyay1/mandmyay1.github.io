var alphabet = [];
var wholeAlphabet = "";
var states = [];
var initialState;
var acceptingState;
var tape = [];
var transitionRules = [];
var positionOfMiddle = 0;
var readHead = positionOfMiddle;
var underscore = "_";
var result = document.querySelector("p[id=result]");
var pointer = document.querySelector("p[id=pointer]");
var state = document.querySelector("p[id=state]");
var alphabetOK = false;
var statesOK = false;
var startStateOK = false;
var acceptStateOK = false;
var initialTapeOK = false;
var transitionRulesOK = false;

function resetVariables(){
	var alphabetOK = false;
	var statesOK = false;
	var startStateOK = false;
	var acceptStateOK = false;
	var initialTapeOK = false;
	var transitionRulesOK = false;
	result.innerHTML = "";
}

function removeDuplicates(array){
	var unique = [];
	for( var i = 0; i < array.length; i++ ){
		var one = array[i];
		var found = false;
		for( var j = 0; j < unique.length; j++ ){
			if( one === unique[j] ){
				found = true;
				break;
			}
		}
		if( !found ){
			unique.push(one);
		}
	}
	return unique;
}

function isInArray(check, array){
	for( var i = 0; i < array.length; i++ ){
		if( check === array[i] ){
			return true;
		}
	}
	return false;
}

function displayResults(){
	result.innerHTML = "";
	if( !alphabetOK ){
		result.innerHTML += "Alphabet not correct\n";
	}
	if( !statesOK ){
		result.innerHTML += "States not correct\n";
	}
	if( !startStateOK ){
		result.innerHTML += "Start State not correct\n";
	}
	if( !acceptStateOK ){
		result.innerHTML += "Accepting State not correct\n";
	}
	if( !initialTapeOK ){
		result.innerHTML += "Initial Tape not correct\n";
	}
	if( !transitionRulesOK ){
		result.innerHTML += "Transition Rules not correct\n";
	}
}

function validateAlphabet(){
	resetVariables();
	alphabet = [];
	var localAlphabet = document.querySelector("input[name=alphabet]").value;
	for( var c in localAlphabet ){
		alphabet.push(localAlphabet[c]);
	}
	alphabet.push(underscore);
	alphabet = removeDuplicates(alphabet);
	if( alphabet.length > 1 ){
		alphabetOK = true;
		wholeAlphabet = alphabet.toString().replace(/,/g, "");
		//console.log(wholeAlphabet);
	}
}

function validateStates(){
	resetVariables();
	states = [];
	var localStates = document.querySelector("input[name=possibleStates]").value.split(" ");
	for( var c in localStates ){
		states.push(localStates[c]);
	}
	states = removeDuplicates(states);
	if(states.length > 0){
		statesOK = true;
	}
	//console.log(states);
}

function validateStartState(){
	resetVariables();
	initialState = document.querySelector("input[name=startState]").value;
	if( isInArray(initialState, states) ){
		startStateOK = true;
	}
	else{
		result.innerHTML += initialState + " is an invalid state";
	}
}

function validateAcceptingState(){
	resetVariables();
	acceptingState = document.querySelector("input[name=acceptingState]").value;
	if( isInArray(acceptingState, states) ){
		acceptStateOK = true;
	}
	else{
		result.innerHTML = acceptingState + " is an invalid state";
	}
}

function validateInitialTape(){
	resetVariables();
	tape = [];
	var initialTape = document.querySelector("input[name=initialTape]").value;
	initialTapeOK = true;
	for( var i in initialTape ){
		var tapeCharacter = initialTape[i];
		if( !isInArray(tapeCharacter, alphabet) ){
			initialTapeOK = false;
		}
		else{
			tape.push( tapeCharacter );
		}
	}
	//console.log(tape);
	displayResults();
}

function validateOneTransitionRule( rule ){
	resetVariables();
	retObj = new Object();
	var expression = "^(\\w+)\\s*(["+wholeAlphabet+"]+)\\s*=\\s*(\\w+)\\s*(["+wholeAlphabet+"]+)\\s*(>|<)$";
	expression = expression.replace(/\//g, "\/");
	//console.log(expression);
	var matches = rule.match(new RegExp(expression));
	if( matches ){
		result.innerHTML = "";
		retObj["StateBefore"] = matches[1];
		if( !isInArray(retObj["StateBefore"], states) ){
			result.innerHTML = retObj["StateBefore"] + " not a valid state";
			return null;
		}
		retObj["SymbolBefore"] = matches[2];
		if( !isInArray(retObj["SymbolBefore"], alphabet) ){
			result.innerHTML = retObj["SymbolBefore"] + " not a valid alphabet character";
			return null;
		}
		retObj["StateAfter"] = matches[3];
		if( !isInArray(retObj["StateAfter"], states) ){
			result.innerHTML = retObj["StateAfter"] + " not a valid state";
			return null;
		}
		retObj["SymbolAfter"] = matches[4];
		if( !isInArray(retObj["SymbolAfter"], alphabet) ){
			result.innerHTML = retObj["SymbolAfter"] + " not a valid alphabet character";
			return null;
		}
		retObj["DirectionToMove"] = matches[5];
		//console.log(retObj);
	}
	else{
		//console.log(rule);
		result.innerHTML = "Error on rule " + rule;
		result.innerHTML = expression;
		return null;
	}
	return retObj;
}

function validateTransitionRules(){
	resetVariables();
	transitionRules = [];
	var localTransitionRules = document.querySelector("textarea[name=transitionRules]").value.split("\n");
	for( var i in localTransitionRules ){
		rule = validateOneTransitionRule(localTransitionRules[i]);
		if(!rule ){
			break;
		}
		transitionRules.push(rule);
	}
	//console.log(localTransitionRules);
}

function validateAll(){
	validateAlphabet();
	validateStates();
	validateStartState();
	validateAcceptingState();
	validateInitialTape();
	validateTransitionRules();
}

function displayUpdatedMachine(){
	result.innerHTML = tape.toString().replace(/,/g, "");
	var spaces = "";
	var equal, smaller, larger;
	if( readHead === positionOfMiddle ){
		smaller = "|";
	}
	else if( readHead < positionOfMiddle ){
		smaller = "^";
		larger = "|";
	}
	else{
		smaller = "|";
		larger = "^";
	}
	var min = Math.min(readHead, positionOfMiddle);
	var max = Math.max(readHead, positionOfMiddle);
	//console.log(min, max);
	for( var i = 0; i < min; i++ ){ spaces += "&nbsp;"; }
	spaces += smaller;
	for( i = min+1; i < max + 0; i++ ){ spaces += "&nbsp;"; }
	if( larger ){
		spaces += larger;
	}
	pointer.innerHTML = spaces;
	state.innerHTML = initialState;
	if( initialState === acceptingState ){
		state.innerHTML += " - Completed";
	}
}

function step(){
	var currentValueAtReadHead = tape[readHead];
	var priorState = initialState;
	for( var i in transitionRules ){
		var oneRule = transitionRules[i];
		if( oneRule["StateBefore"] === initialState && oneRule["SymbolBefore"] === currentValueAtReadHead){
			tape[readHead] = oneRule["SymbolAfter"];
			initialState = oneRule["StateAfter"];
			if( oneRule["DirectionToMove"] === "<" ){
				readHead -= 1;
				//console.log("subtract", readHead);
				if( readHead < 0 ){
					readHead = 0;
					positionOfMiddle += 1;
					tape.unshift(underscore);
				}
			}
			else{
				readHead += 1;
				if( readHead >= tape.length ){
					tape.push(underscore);
				}
			}
			break;
		}
	}
	//console.log(priorState, currentValueAtReadHead, "=>", initialState, tape[readHead], readHead, positionOfMiddle );
	displayUpdatedMachine();
}
function step2(){
	var currentValueAtReadHead = tape[readHead + positionOfMiddle];
	var priorState = initialState;
	for( var i in transitionRules ){
		var oneRule = transitionRules[i];
		if( oneRule["StateBefore"] === initialState && oneRule["SymbolBefore"] === currentValueAtReadHead){
			tape[readHead + positionOfMiddle] = oneRule["SymbolAfter"];
			initialState = oneRule["StateAfter"];
			if( oneRule["DirectionToMove"] === "<" ){
				readHead -= 1;
				if( readHead < globalMinumumReadHead ){
					globalMinumumReadHead = readHead;
				}
				//console.log("subtract", readHead);
				if( readHead + positionOfMiddle < 0 ){
					//readHead = 0;
					positionOfMiddle += 1;
					tape.unshift(underscore);
				}
			}
			else{
				readHead += 1;
				if( readHead + positionOfMiddle >= tape.length ){
					tape.push(underscore);
				}
			}
			break;
		}
	}
	//console.log(priorState, currentValueAtReadHead, "=>", initialState, tape[readHead + positionOfMiddle], readHead, positionOfMiddle );
	displayUpdatedMachine();
}

validateAll();
displayUpdatedMachine();