class Ball{
	constructor(x,y,w,h,imageTitle){
		this.x=x
		this.y=y
		this.height=h
		this.width=w
		this.x_dif=1
		this.y_dif=1
		
		const img=new Image
		img.src="images/"+imageTitle
		console.log("img",img)
		img.onload =()=>{
			ctx.drawImage(img,x,y,w,h)
		}
		this.img = img;
		
	}
	lerp(start,end,amt){
		return (1-amt)*start+amt*end
	}
	drawImageBoundry(){
		ctx.beginPath()
		ctx.rect(this.x,this.y,this.width,this.height)
		ctx.strokeStyle='black'
		ctx.stroke()
		ctx.closePath()
	}
	render(){
		
		ctx.beginPath()
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
		ctx.closePath()
	}
	update(shapes,outerShape){
		this.advancePosition(shapes,outerShape)
	}
	
}

Ball.prototype.advancePosition = function(shapes,outerShape){

	//console.log("{x:this.x,y:this.y}",shapes[0])
	//console.log(outerShape.touchedShape({x:this.x,y:this.y}) )
	var a=outerShape.touchedShape({x:this.x,y:this.y})
	
	// console.log("this.x_dif",this.x_dif)
//	console.log("this.y_dif",this.y_dif)
	if(a.state  )
	{
		console.log(a)
		if(this.x_dif===1){
			this.x_dif=-1
		}
		else if(this.x_dif===-1){
			this.y_dif=-1
		}
		else if(this.x_dif===-1 && this.y_dif===-1 && a.val===-1){
			this.x_dif=1
		}
		this.x =this.lerp(this.x,this.x+this.x_dif,1);
		this.y =this.lerp(this.y,this.y+this.y_dif,1);
	}
	else{
		this.x =this.lerp(this.x,this.x+this.x_dif,1);
		this.y =this.lerp(this.y,this.y+this.y_dif,1);
	}
	
	
}