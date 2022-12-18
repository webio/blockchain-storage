const MerkleTree = require('./index');

class App{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    getName(){
        return this.name;
    }

    getAge(){
        return this.age;
    }

    print(){
        console.log(this.getName(), this.getAge());
    }
}

let app = new App('stan', 20);
app.getName();
app.print();