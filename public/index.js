window.onload=init()
var cvs,ctx,shapes,outerShape,moveball

function init(){
	// b={
	// 	c:0,
	// 	v:()=>{

	// 	}
	// }
	//var a=b.v()=9

	//console.log("abc",a,b)

	outerShape=new Shape([
		{
			p1: {x: 10, y: 198.125},
			p2: {x: 375, y: 24.125}
		},
		{
			p1: {x: 375, y: 24.125},
			p2: {x: 648, y: 113.125}
		},
		{
			p1: {x: 648, y: 113.125},
			p2: {x:648, y: 435.125}
		},
		{
			p1: {x: 648, y: 435.125},
			p2: {x: 166, y: 466.125}
		},
		{
			p1: {x: 166, y: 466.125},
			p2: {x: 84, y: 277.125}
		},
		{
			p1: {x: 84, y: 277.125},
			p2: {x: 10, y: 198.125}
		},
	])
	shapes=[
		new Shape([
			{
				p1: {x: 402, y: 173.125},
				p2: {x: 467, y: 189.125}
			},
			{
				p1: {x: 467, y: 189.125},
				p2: {x: 407, y: 236.125}
			},
			{
				p1: {x: 407, y: 236.125},
				p2: {x: 402, y: 173.125}
			}
		]),
		new Shape([
			{
				p1: {x: 302, y: 173.125},
				p2: {x: 367, y: 189.125}
			},
			{
				p1: {x: 367, y: 189.125},
				p2: {x: 307, y: 236.125}
			},
			{
				p1: {x: 307, y: 236.125},
				p2: {x: 302, y: 173.125}
			}
		])
	]

	cvs=document.getElementById("mycanvas")
	ctx=cvs.getContext("2d");

	initializeWalls()
	initializeBalls()
	
	
	document.body.addEventListener('keydown',function(e){
		e=event||window.event;
		var keyCode=e.charCode || e.keyCode;
		console.log("keydown",keyCode)
		if(keyCode=== 13){
			moveBall()
		}
		if(keyCode=== 32){
			moveball=!moveball
		}
		
	})
	
}
function clacAndDrawLine(p){
	if(count===0){
		x1=p.x;
		y1=p.y;
		count++;
	}
	else{
		x2=p.x;
		y2=p.y;
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
		x1=x2;
		y1=y2;
	}
}
function getMousePos(e){
    var rect=cvs.getBoundingClientRect();
    return{
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    }

}

function changeShape(){
	
}
function lerp(start,end,t){
	return (1-t)*start+(t*end)
}

function clearCanvas(){
	const ctx = cvs.getContext("2d")
	ctx.save()
	ctx.globalCompositeOperation ="copy"
	ctx.strokeStyle="transparent"
	ctx.beginPath()
	ctx.lineTo(0,0)
	ctx.stroke()
	ctx.restore()
}

function initializeWalls(){
	shapes.map(m=>{
		m.drawFromLines()
	})
	outerShape.drawFromLines()
}
function initializeBalls(){
	var topPoint={x:500,y:500}
	outerShape.lines.map(m=>{
		if(m.p1.y<topPoint.y) topPoint={x:m.p1.x,y:m.p1.y}
		if(m.p2.y<topPoint.y) topPoint={x:m.p2.x,y:m.p2.y}
		else topPoint=topPoint
	})
	ball = new Ball(topPoint.x-10,topPoint.y+40,20,20,"pingpong1.jpg")
}
function moveBall(){
	moveball=1
	requestAnimationFrame(gameLoop)
}

function gameLoop() {
	if(moveball){
		clearCanvas()
		initializeWalls()
		ball.update(shapes,outerShape)
		ball.render()
		requestAnimationFrame(gameLoop)
	}	
	

}