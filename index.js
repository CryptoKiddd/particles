 window.addEventListener('load',function(){
    const canvas  = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    const btn = document.getElementById('btn')

    const image = document.getElementById('image')
   

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Particle{
        constructor(effect,x,y,color){
            this.effect = effect
            this.x = Math.random() * this.effect.width
            this.y = Math.random() * this.effect.height
            this.originX = Math.floor(x)
            this.originY =Math.floor(y)
            this.size = 4
            this.vx = 0
            this.vy =  0
            this.color = color
            this.ease = 0.02
        }

        draw(context){
            context.fillStyle=this.color
            context.fillRect(this.x,this.y,this.size,this.size)
        }
        update(){
            this.x += (this.originX - this.x) * this.ease
            this.y += (this.originY - this.y)* this.ease
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
            this.y = this.centerY - this.image.height * 0.5;
            this.gap = 4

        }
        init(ctx){
          ctx.drawImage(this.image, this.x, this.y)
            const pixels = ctx.getImageData(0,0,this.width,this.height).data
            for(let y = 0; y < this.height; y +=this.gap){
                for(let x = 0; x < this.width; x +=this.gap){
                   const index = (y * this.width + x) * 4;
                   const red = pixels[index] 
                   const green = pixels[index + 1] 
                   const blue = pixels[index + 2] 
                   const alpha = pixels[index + 3] 
                   const color = `rgb(${red},${green},${blue})`

                   if(alpha > 0){
                    this.particles.push(new Particle(this,x,y,color))
                   }
                }
            }
            
        }
        draw(ctx){
            this.particles.forEach(particle=>particle.draw(ctx));
            
            
        }
        update(){
         
            this.particles.forEach(particle=>particle.update());
        }

    }
    const effect = new Effect(canvas.width,canvas.height);
    console.log(effect)
    effect.init(ctx)
    effect.draw(ctx);
    effect.update()
    
   

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        effect.draw(ctx);
        effect.update()
        requestAnimationFrame(animate)
    }
    animate()

    



 })
 
