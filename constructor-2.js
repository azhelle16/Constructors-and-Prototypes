//PACKAGE

var inquirer = require("inquirer")
var uname

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

//SURVIVOR ESCAPE FUNCTION
survivor.prototype.escape = function() {

  return inquirer
    .prompt([
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
      }  

    ]).then(function(inq) {

        if (inq.number == this.lucky_number) {
          return true
        } else {
            return false  
          }

    });

}

//MONSTER CONSTRUCTOR
function monster(n,h,attack) {

	this.attacks = attack
  human.call(this,n,h)

}

//MONSTER - HUMAN CONSTRUCTOR CONNECTION
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
      message: "\nHi There! What is your name?",
      name: "username"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Do you want to start to play?",
      name: "confirm",
      default: true,
    }    
  ]).then(function(inquirerResponse) {
  		
  		if (inquirerResponse.confirm) {

          var s = new survivor(inquirerResponse.username, 75)
          var m  = new monster("serena",100,20)

          playGame(s,m)

  		} else {

  			  console.log("\nThat's alright, "+inquirerResponse.username+". We'll play next time.\n")	

  		  }

  });

function playGame(s,m) {

  s.escape().then(function(esc) {
      if (esc == true) {
        console.log("\nYou won the game!");
      } else {
          var ma = m.attack()

          if (ma == false) {
            console.log("\nYou've dodged the attack!\n")
          } else {
              s.health -= ma
              console.log("\nYou've lost "+ma+" health and now you have a total of this much health: "+s.health+"\n")
            }
        }
  }).then(function(esc) {      

      if (s.health > 0) {   
          inquirer
            .prompt([
            // Here we ask the user to confirm.
            {
              type: "confirm",
              message: "Do you want to continue to play?",
              name: "confirm",
              default: true,
            }
          ])
          .then(function(inqResponse) {
              
              if (inqResponse.confirm) {
                  
                  playGame(s,m)
              
              } else {

                  console.log("\nThat's alright, "+s.name+". We'll play next time.\n") 

                }

          });
      } else {

          console.log("Current Health: "+s.health+". You don't have enough health to play. Monster "+m.name+" got you. Thank you and goodbye.\n")

        }
  })
}