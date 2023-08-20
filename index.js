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
            this.x = Math.random() * this.effect.width *5
            this.y = Math.random() * this.effect.height
            this.originX = Math.floor(x)
            this.originY =Math.floor(y)
            this.size = 2
            this.vx = 0
            this.vy =  0
            this.color = color
            this.ease = 0.04;
            this.dx = 0
            this.dy = 0
            this.distance =0
            this.force = 0
            this.angle = 0
            this.friction = 0.45
        }

        draw(context){
            context.fillStyle=this.color
            context.fillRect(this.x,this.y,this.size,this.size)
        }
        update(){
            this.dx = this.effect.mouse.x - this.x
            this.dy = this.effect.mouse.y - this.y
            this.distance = this.dx * this.dx + this.dy *this.dy
            this.force = -this.effect.mouse.radius / this.distance

            if(this.distance <this.effect.mouse.radius ){
                this.angle = Math.atan2(this.dy,this.dx)
                this.vx += this.force * Math.cos(this.angle)
                this.vy += this.force * Math.sin(this.angle)
            }

            this.x += (this.vx *=this.friction)  +(this.originX - this.x) * this.ease
            this.y +=  (this.vy*=this.friction ) +(this.originY - this.y)* this.ease
        }
        warp(){
            this.x = Math.random() * this.effect.width 
            this.y = Math.random() * this.effect.height
            this.ease = 0.07
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
            this.gap = 3;
            this.mouse = {
                radius:3000,
                x:undefined,
                y:undefined
            }
            window.addEventListener('mousemove',(e)=>{
                this.mouse.x = e.x;
                this.mouse.y = e.y

            })

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
        warp(){
            this.particles.forEach(particle=>particle.warp());
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

    btn.addEventListener('click',function(){
        effect.warp()

    })

    



 })
 
