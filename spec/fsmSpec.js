
describe("Does an FSM instantiate", function(){
  var fsm;
  
  it("Create new FSM", function(){
      fsm = new FiniteStateMachine();
      expect(fsm).toBeDefined();
  });
});


describe("Gives the fsm a new state", function(){
  var fsm;
  var as;
  
  it("Create new ActorState", function(){
      as = new ActorState();
      expect(as).toBeDefined();
  });
  
  it("Call the changeState method of fsm", function(){
      fsm = new FiniteStateMachine();
      spyOn(fsm, "changeState");
      fsm.changeState(as);
      expect(fsm.changeState).toHaveBeenCalled();
  });
  
  it("Check the new actorState", function(){
      fsm = new FiniteStateMachine();
      fsm.changeState(as);
      expect(fsm.currentState).toBe(as);
  });
});