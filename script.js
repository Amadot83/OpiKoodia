function Universe() {
    var instance;
    Universe = function Universe () {
        return instance;
    }
    Universe.prototype = this;
    instance = new Universe();
    instance.size = 0;
    instance.bang = "Big";
    return instance;
}

function start() {

    let helloWorld = function() {
        this.name = "World";
        this.message = "Hello";
    }
    let helloInstance = new helloWorld();

    helloWorld.prototype.name = "Jaska";
    helloWorld.prototype.message2 = "Byes!";

    console.log(helloInstance.name);
    console.log(helloInstance.message);
    console.log(helloInstance.message2);
    console.log(helloInstance);

    let functionTest = {
        myvar:10,
        myFunction: function() {
            return this.myvar+10;
        }
    }
    console.log(functionTest);

    let object1 = Object.create(functionTest);
    let object2 = Object.create(functionTest);
    object1.myvar = 15;
    object2.myvar = 100;
    console.log(object1.myFunction());
    console.log(object2.myFunction());
    console.log(object1);
    console.log(object2);
    functionTest.myvar = 50;
    console.log("Function Test");
    console.log(object1);
    console.log(object2);

    Universe.prototype.nothing = true;
    let uni = new Universe();
    console.log(uni.nothing);
    Universe.prototype.everything = false;
    console.log(uni.everything);
    let uni2 = new Universe();
    console.log(uni2.nothing);
    console.log(uni2.everything);
    console.log(uni);
    console.log(uni2);
}