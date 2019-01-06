$(document).ready(function () {
    //sounds
    //add background sound star wars theme song
    //add lightsaber noise whenever an attack is made
    //add dying sound whenever someone dies
    var backgroundMusic = new Audio("https://ia801703.us.archive.org/15/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3");
    backgroundMusic.loop = true;

    var saberSound = new Audio("./assets/audio/lightsaber1.mp3");
    var playerDie = new Audio("./assets/audio/pain.mp3");
    var enemyDie = new Audio("./assets/audio/scream.mp3")
    
/////////////////////////////  Characters  ///////////////////////////////////////////
    var characters = [{
        id: "obi",
        name: "Obi-Wan Kanobi",
        hp: 120,
        imgsrc: "https://lumiere-a.akamaihd.net/v1/images/Obi-Wan-Kenobi_6d775533.jpeg?region=0%2C0%2C1536%2C864&width=960",
        atkpwr: 5,
        ctrpwr: 10,
        defeated: false
    },
    {
        id: "luke",
        name: "Luke Skywalker",
        hp: 100,
        imgsrc: "https://i.redd.it/2qmnb44sbt7z.jpg",
        atkpwr: 7,
        ctrpwr: 20,
        defeated: false
    },
    {
        id: "sidious",
        name: "Darth Sidious",
        hp: 150,
        imgsrc: "https://i.pinimg.com/originals/1c/5d/55/1c5d552ab51f54a2f179019433a32158.jpg",
        atkpwr: 4,
        ctrpwr: 10,
        defeated: false
    },
    {
        id: "maul",
        name: "Darth Maul",
        hp: 130,
        imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LxobFcCiD3xm9733SctBoEI5TEpdvVNaW9m7DRdNgl66jI0FNA",
        atkpwr: 8,
        ctrpwr: 12,
        defeated: false
    }];

    

/////////////////////////// Variables   //////////////////////////////////////////////
    var myCharacter;
    var myCharacterId;
    var myCharacterHp;
    var myCharacterAtk;
    var myCharacterAtkInc;
    
    var defender;
    var defenderId;
    var defenderHp;
    var defenderCtr;
    var defenderName;
    
    var isCharacterChosen = false;
    var isDefenderChosen = false;

    var commentary;
    var gameOver = false;
/******************************************************************************* */
//dynamically assign character objects icons and output to html document
for(var i = 0; i < characters.length; i++){
    var character = $("<div>").addClass("character");

    var name = $("<div>");
    name.addClass("name");
    name.text(characters[i].name);

    var image = $("<img>");
    image.addClass("image");
    image.attr("src",characters[i].imgsrc);

    var health = $("<div>");
    health.addClass("health");
    var healthId = characters[i].id + "health";
    health.attr("id", healthId);
    health.text(characters[i].hp);


    
    character.append(name);
    character.append(image);
    character.append(health);
    character.attr("id", characters[i].id);
    character.attr("data-name", characters[i].name);
    character.attr("data-atkpwr", characters[i].atkpwr);
    character.attr("data-atkinc", characters[i].atkpwr);
    character.attr("data-ctr", characters[i].ctrpwr);
    character.attr("data-hp", characters[i].hp);
    $("#characters").append(character);
}

/////////////////////// Event Listeners //////////////////////////////////////
$(".character").on("click", function(){
    console.log("working");
    if(isCharacterChosen == false){
        backgroundMusic.play();
        myCharacter = $(this);
        myCharacterId = myCharacter.attr("id");
        myCharacterHp = $(this).data("hp");
        myCharacterAtk = $(this).data("atkpwr");
        myCharacterAtkInc = $(this).data("atkinc");
        
        
        
        $("#my-character").append(myCharacter);
        isCharacterChosen = true;
        for(var i = 0; i < characters.length; i++){
            
            if(characters[i].id !== this.id){
                var e = $('#' + characters[i].id);
                $("#enemies").append(e);
            }
        }
    }
    if(isDefenderChosen == false){
        if(this.id == myCharacterId){
            return 0;
        }
        defender = $(this);
        defenderId = this.id;
        defenderName = defender.data("name");
        defenderCtr= defender.data("ctr");
        defenderHp = defender.data("hp");
        $("#defender").append(defender);
        isDefenderChosen = true;
        
    }
    

});

$("#reset").on("click", function(){
    console.log("working");
    $("div").remove(".character");
    $("#reset").css("visibility","hidden");
    resetGame();
});

$("#attack-button").on("click",function () {
    if(myCharacterHp == 0){
        commentary = "You died :(  Click the RESET button to try again";
        $("#commentary").text(commentary);
        return 0;
    }
    if(defenderId == null){
        return 0;
    }

    defenderHp -= myCharacterAtk;
    commentary = "You attacked " + defenderName + " for " + myCharacterAtk + " damage!";
    $("#commentary").text(commentary);
    saberSound.play();
    var defTemp = defenderId + "health";
    var myTemp = myCharacterId + "health";

    
    $('#' + defTemp).text(defenderHp);
    if(defenderHp <= 0){
        defenderHp = 0;
        enemyDie.play();
        isDefenderChosen = false;
        defenderId = null;
        defenderCtr = null;
        defenderHp = null;
        defenderName = null;
        defender.remove();

    }
    myCharacterAtk += myCharacterAtkInc;
    myCharacterHp -= defenderCtr;
    if(defenderCtr){
        commentary += " <br> " + defenderName + " attacked you back for " + defenderCtr + " damage!";
        $("#commentary").html(commentary);
    }

    if(myCharacterHp <= 0){
        playerDie.play();
        alert("You lost all your health.  Click reset to play again.");
        myCharacterHp = 0;
            myCharacterAtk = 0;
            myCharacterAtkInc = 0;

        $("#reset").css("visibility", "visible");
    }
    $('#' + myTemp).text(myCharacterHp);


    

});




/*****************************************************************************/
//////////////////////////  Functions   ///////////////////////////////////////////

function setupPage () {         //setup page
}

function updatePage () {        //update page

}

function selectCharacter () {     //run this when character is selected

}

function attack () {


}

function counterAttack () {

}

function resetGame () {
    isCharacterChosen = false;
    isDefenderChosen = false;

    gameOver = false;

    myCharacter = null;
    myCharacterId = null;
    myCharacterHp = null;
    myCharacterAtk = null;
    myCharacterAtkInc = null;
    
    defender = null;
    defenderId = null;
    defenderHp = null;
    defenderCtr = null;
    defenderName = null;

    commentary = null;
    
    for(var i = 0; i < characters.length; i++){
        var character = $("<div>").addClass("character");
    
        var name = $("<div>");
        name.addClass("name");
        name.text(characters[i].name);
    
        var image = $("<img>");
        image.addClass("image");
        image.attr("src",characters[i].imgsrc);
    
        var health = $("<div>");
        health.addClass("health");
        var healthId = characters[i].id + "health";
        health.attr("id", healthId);
        health.text(characters[i].hp);
    
    
        
        character.append(name);
        character.append(image);
        character.append(health);
        character.attr("id", characters[i].id);
        character.attr("data-name", characters[i].name);
        character.attr("data-atkpwr", characters[i].atkpwr);
        character.attr("data-atkinc", characters[i].atkpwr);
        character.attr("data-ctr", characters[i].ctrpwr);
        character.attr("data-hp", characters[i].hp);
        $("#characters").append(character);
    }
    
    /////////////////////// Event Listeners //////////////////////////////////////
   /* $(".character").on("click", function(){
        if(isCharacterChosen == false){
            backgroundMusic.play();
            myCharacter = $(this);
            myCharacterId = myCharacter.attr("id");
            myCharacterHp = $(this).data("hp");
            myCharacterAtk = $(this).data("atkpwr");
            myCharacterAtkInc = $(this).data("atkinc");
            
            
            
            $("#my-character").append(myCharacter);
            isCharacterChosen = true;
            for(var i = 0; i < characters.length; i++){
                
                if(characters[i].id !== this.id){
                    var e = $('#' + characters[i].id);
                    $("#enemies").append(e);
                }
            }
        }
        if(isDefenderChosen == false){
            if(this.id == myCharacterId){
                return 0;
            }
            defender = $(this);
            defenderId = this.id;
            defenderName = defender.data("name");
            defenderCtr= defender.data("ctr");
            defenderHp = defender.data("hp");
            $("#defender").append(defender);
            isDefenderChosen = true;
            
        }
        
    
    });
    
    $("#reset").on("click", function(){
        console.log("working");
        $("div").remove(".character");
        $("#reset").css("visibility","hidden");
        resetGame();
    });
    
    $("#attack-button").on("click",function () {
        if(myCharacterHp == 0){
            commentary = "You died :(  Click the RESET button to try again";
            $("#commentary").text(commentary);
            return 0;
        }
        if(defenderId == null){
            return 0;
        }
    
        defenderHp -= myCharacterAtk;
        commentary = "You attacked " + defenderName + " for " + myCharacterAtk + " damage!";
        $("#commentary").text(commentary);
        saberSound.play();
        var defTemp = defenderId + "health";
        var myTemp = myCharacterId + "health";
    
        
        $('#' + defTemp).text(defenderHp);
        if(defenderHp <= 0){
            defenderHp = 0;
            enemyDie.play();
            isDefenderChosen = false;
            defenderId = null;
            defenderCtr = null;
            defenderHp = null;
            defender.remove();
    
        }
        myCharacterAtk += myCharacterAtkInc;
        myCharacterHp -= defenderCtr;
        if(defenderCtr){
            commentary += " <br> " + defenderName + " attacked you back for " + defenderCtr + " damage!";
            $("#commentary").html(commentary);
        }
    
        if(myCharacterHp <= 0){
            playerDie.play();
            alert("You lost all your health.  Click reset to play again.");
            myCharacterHp = 0;
            myCharacterAtk = 0;
            myCharacterAtkInc = 0;
    
            $("#reset").css("visibility", "visible");
        }
        $('#' + myTemp).text(myCharacterHp);
    
    
        
    
    });
    */

}


/******************************************************************************* */











});