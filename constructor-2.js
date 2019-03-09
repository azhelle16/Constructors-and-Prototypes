//PACKAGE

var inquirer = require("inquirer")

//HUMAN CONSTRUCTOR
function human(name,health) {

	this.name = name;
	this.health = health;

}

//SURVIVOR CONSTRUCTOR
function survivor(n,h) {

	this.lucky_number = Math.floor((Math.random() * 30) + 1)
	human.call(this,n,h)

}

//HUMAN - SURVIVOR CONSTRUCTOR CONNECTION
survivor.prototype = Object.create(human.prototype)

survivor.prototype.escape = function(ln) {

	if (ln == this.luckyNum) {
		return true
	} else {
		return false	
	  }

}

//MONSTER CONSTRUCTOR
function monster(attack) {

	this.attacks = attack

}

//MONSTER - SURVIVOR CONSTRUCTOR CONNECTION
monster.prototype = Object.create(human.prototype)

monster.prototype.attack = function() {

	var rand = Math.floor((Math.random() * 5) + 1)

	if (rand == 3) {
		return false
	} else {
		  return this.attacks
	  }

}

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Hi There! What is your name?",
      name: "username"
    },
    //Lucky Number
    {
      type: "input",
      message: "Guess a number from 1 to 30:",
      name: "number",
      validate: function(number) {

        if (number >= 1 && number <= 30) {
          return true
        }

      }
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Do you want to proceed?",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
  		
  		if (inquirerResponse.confirm) {

          var s = new survivor(inquirerResponse.username, 75)
          var esc = s.escape(inquirerResponse.number)
          var m  = new monster(20)

          if (esc == true) {
            console.log("\nYou won the game!")
          } else {
              var ma = m.attack()

              if (ma == false) {
                console.log("\nYou've dodged the attack!\n")
              } else {
                  s.health -= ma
                  console.log("\nYou've lost "+ma+" health and now you have a total of this much health: "+s.health+"\n")
                }
            }

  		} else {

  			  console.log("\nThat's alright, "+inquirerResponse.username+". We'll play next time.\n")	

  		  }

  });