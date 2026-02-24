import {username} from "./username.js"


test("username is ashu",()=>{
    expect(username("ashu")).toBe("hello ashu");
})

test("username is guest",()=>{
    expect(username()).toBe("hello guest");
});