var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:500},
                {type: 'sawblade',x:600,y:375},
                {type: 'sawblade',x:900,y:500},
                {type: 'sawblade',x:725,y:370},
                {type: 'sawblade',x:1050,y:350},
                {type: 'magma',x:1200,y:375}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x,y) {
            
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
        game.addGameItem(myObstacle);    
        var obstacleImage = draw.bitmap('img/sawblade.png');
        myObstacle.addChild(obstacleImage);
        myObstacle.x = x;
        myObstacle.y = y;
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        }
        
        function createMagma (x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            game.addGameItem(myObstacle);
            var obstacleImage = draw.circle(50,'orange');
            myObstacle.x = x;
            myObstacle.y = y;
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        for (var i = 0; i<levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            console.log(gameItem);
            if (gameItem.type === 'sawblade') {
                createSawBlade(gameItem.x,gameItem.y); 
            }
            else if (gameItem.type === 'magma') {
                createMagma(gameItem.x,gameItem.y); 
            }
           }
        
        
        
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'purple');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity=10;
            enemy.onProjectileCollision = function() {
            console.log('Halle has hit an enemy.')
            game.increaseScore(100);
            enemy.fadeOut();
            }
            enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            enemy.fadeOut();
            };
        }
        createEnemy(500,groundY-25);
        createEnemy(1000,groundY-50);
        createEnemy(1600,groundY-50);
        
        function createReward(x,y) {
            var reward = game.createGameItem('reward',25);
            var goldenSquare = draw.circle(25,'yellow');
            goldenSquare.x = -25;
            goldenSquare.y = -25;
            reward.addChild(goldenSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -0.5;
            reward.rotationalVelocity = 2;
            reward.onPlayerCollision = function() {
                console.log('Halle has collected the reward.')
                game.increaseScore(5000);
                reward.fadeout(); 
            }
        }
        createReward(1600,375);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}