 window.addEventListener('load',function(){
    const canvas  = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    const btn = document.getElementById('btn')

    const image = document.getElementById('image')
   

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Particle{
        constructor(effect){
            this.effect = effect
            this.x = Math.random() * this.effect.width ;
            this.y = Math.random() * this.effect.height;
            this.size = Math.random() * 50;
            this.vx = Math.random() * 5 - 2.5;
            this.vy = Math.random() * 5 - 2.5;
        }

        draw(context){
            context.fillRect(this.x,this.y,this.size,this.size)
        }
        update(){
            this.x += this.vx;
            this.y += this.vy
        }

    }



    class Effect{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.amount = 100
            this.particles = [];
            this.image = document.getElementById('image');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5
            this.y = this.centerY - this.image.height * 0.5

        }
        init(ctx){
            // for(let i =0; i<this.amount; i++){
            //     this.particles.push(new Particle(this))
            // }
            ctx.drawImage(this.image, this.x, this.y)
        }
        draw(ctx){
            this.particles.forEach(particle=>particle.draw(ctx));
            const pixels = ctx.getImageData(0,0,this.width,this.height)
            console.log(pixels)
            
        }
        update(){
         
            this.particles.forEach(particle=>particle.update());
        }

    }
    const effect = new Effect(canvas.width,canvas.height)
    effect.init(ctx)
    effect.draw(ctx);
    effect.update()
    
   

    // function animate(){
    //     ctx.clearRect(0,0,canvas.width,canvas.height)
    //     effect.draw(ctx);
    //     effect.update()
    //     requestAnimationFrame(animate)
    // }
    // animate()

    



 })
 
