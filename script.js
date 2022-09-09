function start() {
	console.log("----------------------------------------");
	console.log("Method invocation pattern");
	
	var person = {
		name:"Calvin",
		age:25,
		greet:function() {
			console.log("My name is",this.name)
		}
	}
	//this ei pysty kutsumaan, koska lokaali this kutsuu toisesta funktiosta mmuuttujan arvoa
	person.greet();
	
	console.log("---------------------------------------------");
	console.log("Function invocation pattern");
	
	person.calculateAge = function(yearsFromNow) {
		function yearsOld() {
			return this.age + yearsFromNow;
		}
		
		console.log("I will be "+yearsOld()+" years old "+yearsFromNow+" years from now");
	}
	console.log(person);
	person.calculateAge(10);
	
	console.log("Let's fix this");
	
	person.calculateAge = function(yearsFromNow) {
		function yearsOld() {
			return this.age + yearsFromNow;
		}
		
		yearsOld = yearsOld.bind(this);
		console.log("I will be "+yearsOld()+" years old "+yearsFromNow+" years from now");
	}
	
	person.calculateAge(10);

    console.log("---------------------------------------------");
    console.log("Consctuctor invocation pattern");

    var person2 = function(name) {
        this.name = name;
    }

    person2.prototype.greet = function() {
        return this.name + " says hello";
    }

    console.log(new person2("John").greet());
    console.log(person2);

    console.log("---------------------------------------------");
    console.log("Apply invocation pattern");

    person2.prototype.waveTo = function(who) {
        return this.name + " waves to " + who.name;
    }

    let calvin = new person2("Calvin");
    let john = new person2("John");
    let temp = Object.create({"name":"Temp object"});

    //bind pysyvä, apply kutsun ajaksi kontekstiin (this)

    console.log(calvin.waveTo.apply(john,[calvin]));
    console.log(calvin.waveTo.apply(temp,[john]));


}