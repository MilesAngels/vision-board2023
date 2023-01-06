window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')
    canvas.width = 450;
    canvas.height = 450;
    
    let lastTime = 0;

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;

            this.width = 128;
            this.height = 128;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('player');

            this.frameX = 0
            this.frameY = 3
            this.maxFrame = 3;

            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;

        }

        draw(context) {
            context.fillStyle = "transparent";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.width, this.width, this.height, this.x, this.y, this.width, this.height);
        }

        update(deltaTime) {
            //this.x++;
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
                
            }

            else {
                this.frameTimer += deltaTime;
    
            }
            
        }
    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0
            this.width = 800;
            this.height = 450; 
            this.speed = 2;
        }

        draw(context) {
           context.drawImage(this.image, this.x, this.y, this.width, this.height);
           context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); 
        }

        update() {
            this.x -= this.speed;
            if(this.x < 0 - this.width) this.x = 0;
        }

    }

    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height)
    

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        background.draw(ctx);
        background.update();
        

        player.draw(ctx);
        player.update(deltaTime);

        requestAnimationFrame(animate);
    }

    animate(0);
}) ;