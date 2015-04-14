function FiniteStateMachine(){
	this.currentState = undefined;
	this.previousState = undefined;
	this.nextState = undefined;
}

FiniteStateMachine.prototype.setNextState = function (newState){
	this.nextState = newState;
}

FiniteStateMachine.prototype.update = function(){
	if(this.currentState){
		this.currentState.update();
	}
}

FiniteStateMachine.prototype.changeState = function (newState){
	if(this.currentState){
		this.currentState.onExit();
		this.previousState = this.currentState;
	}
	this.currentState = newState;
	this.currentState.onEnter();
}