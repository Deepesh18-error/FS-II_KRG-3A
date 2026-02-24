

export function username(name){
    if(name == undefined){
        return "hello guest"
    }
    return `hello ${name}`;
}