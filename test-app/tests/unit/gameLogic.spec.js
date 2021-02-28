import gameLogic from "@/logic/gameLogic.js";

test("test", ()=> {

    
    const result = gameLogic({});

    expect(result.length).toBe(0);
})