import React, { useState, useEffect, useRef } from 'react';

import customData from '../sequences/login.json';
import singleBOMData from '../sequences/singlebom.json';
// Path2D for a Heart SVG
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);

// Scaling Constants for Canvas
const SCALE = 1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * .9;
export const canvasHeight = window.innerHeight * .95;

export function draw(ctx, location){
  console.log("attempting to draw")
  ctx.fillStyle = 'red';
  ctx.shadowColor = 'blue';
  ctx.shadowBlur = 15;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.rotate(225 * Math.PI / 180);
  ctx.fill(SVG_PATH);
  // .restore(): Canvas 2D API restores the most recently saved canvas state
  ctx.restore();  
};


export function readSequenceFile()
{

  let student = customData;
  console.log(student);
}
export function drawObjectInst(ctx,startX,startY,ObjectName){
  ctx.rect(startX,startY, 150, 80);
  ctx.fillStyle = "#000000";
  ctx.font = "18px Arial";
  ctx.fillText(ObjectName, startX+50, startY+50);
  ctx.moveTo(startX+70, 90);
  ctx.lineTo(startX+70, 700);
  ctx.stroke();
}

export function drawMessageToObject(ctx, startX, startY, endX, Messagedetail){
  drawLineWithArrows(ctx, startX+70,startY+100,endX+70,startY+100,10,10,false,true)
  ctx.fillStyle = "#000000";
  ctx.font = "15px Arial";
  ctx.fillText(Messagedetail, (startX+90), startY+95);
}

export function drawReturnMessageToObject(ctx, startX, startY, endX, Messagedetail){
  drawLineWithArrows(ctx, startX+70,startY+100,endX+70,startY+100,10,10,true,false)
  ctx.fillStyle = "#000000";
  ctx.font = "15px Arial";
  ctx.fillText(Messagedetail, (startX+90), startY+95);
}

export function drawMessageToSelf(ctx, startX, startY,  Messagedetail){
  drawLineWithArrows(ctx, startX+70,startY+100,startX+170,startY+100,10,10,false,false)
  drawLineWithArrows(ctx, startX+70,startY+120,startX+170,startY+120,10,10,true,false)
  ctx.fillStyle = "#000000";
  ctx.font = "15px Arial";
  ctx.fillText(Messagedetail, startX+120, startY+100);
  ctx.moveTo(startX+170, startY+100);
  ctx.lineTo(startX+170, startY+120);
  ctx.stroke();
}
export function drawLoginInteraction(ctx){
  //readSequenceFile()
  console.log("attempting to draw")
  ctx.fillStyle = 'white';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  drawObjectInst(ctx,10,10,"User")
  drawObjectInst(ctx,300,10,"Login")
  drawObjectInst(ctx,600,10,"API")
  drawObjectInst(ctx,900,10,"DB")
  drawMessageToObject(ctx, 10,10,300,"Login")
  drawMessageToObject(ctx, 300,20,600,"POST /auth/login {email,password}")
  drawMessageToObject(ctx, 600,30,900,"SELECT User,Company")
  drawReturnMessageToObject(ctx, 600,60,900,"{tuples}")
  drawReturnMessageToObject(ctx, 300,70,600,"{data:accessToken,userInfo}")
  //drawReturnMessageToObject(ctx, 10,90,300,"{data}")
  drawMessageToSelf(ctx,300,90,"Redirect to BOM IQ")
  drawReturnMessageToObject(ctx, 10,130,300,"BOM IQ")
};

//draw BOMIQ
export function drawBOMIQInteraction(ctx){
  //readSequenceFile()
  console.log("attempting to draw")
  ctx.fillStyle = 'white';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  drawObjectInst(ctx,10,10,"User")
  drawObjectInst(ctx,300,10,"BOM IQ")
  drawObjectInst(ctx,600,10,"API")
  drawObjectInst(ctx,900,10,"DB")
  drawMessageToObject(ctx, 10,10,300,"BOM IQ")
  drawMessageToObject(ctx, 300,20,600,"POST /download/logoAndAvatar")
  drawReturnMessageToObject(ctx, 300,50,600,"{success,data:base64}")
  drawMessageToObject(ctx, 300,80,600,"GET /masters/headers/bom_iq")
  drawMessageToObject(ctx, 600,90,900,"db.Tableheaders.find")
  drawReturnMessageToObject(ctx, 600,120,900,"{tuples}")
  drawReturnMessageToObject(ctx, 300,140,600,"{data:headers}")

  //second set of interactions - dynamicFilters
  drawMessageToObject(ctx, 300,170,600,"GET /dynamicFilters?company_id,bom_type")
  drawMessageToObject(ctx, 600,190,900,"db.BOM.findAll")
  drawReturnMessageToObject(ctx, 600,220,900,"{tuples}")
  drawReturnMessageToObject(ctx, 300,230,600,"{data:years,quarter}")

  drawMessageToObject(ctx, 300,260,600,"GET /boms?company_id,limit,offset,bom_type")
  drawMessageToObject(ctx, 600,280,900,"db.BOM.findAll")
  drawReturnMessageToObject(ctx, 600,310,900,"{filtered BOM tuples}")
  drawReturnMessageToObject(ctx, 300,330,600,"{data: name, bom_name, productname, bom_cost}")

  drawReturnMessageToObject(ctx, 10,340,300,"BOM IQ with details")

  
};

//draw single BOM Interaction
export function drawSingleBOMInteraction(ctx){
  //readSequenceFile()
  console.log("attempting to draw")
  ctx.fillStyle = 'white';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  drawObjectInst(ctx,10,10,"User")
  drawObjectInst(ctx,300,10,"BOM IQ")
  drawObjectInst(ctx,600,10,"API")
  drawObjectInst(ctx,900,10,"DB")
  drawMessageToObject(ctx, 10,10,300,"Select Single BOM")
  drawMessageToObject(ctx, 300,20,600,"POST /download/logoAndAvatar")
  drawReturnMessageToObject(ctx, 300,50,600,"{success,data:base64}")
  drawMessageToObject(ctx, 300,80,600,"GET /masters/headers/bom_iq")
  drawMessageToObject(ctx, 600,90,900,"db.Tableheaders.find")
  drawReturnMessageToObject(ctx, 600,120,900,"{tuples}")
  drawReturnMessageToObject(ctx, 300,140,600,"{data:headers}")

  //second set of interactions - dynamicFilters
  drawMessageToObject(ctx, 300,170,600,"GET /dynamicFilters?company_id,bom_type")
  drawMessageToObject(ctx, 600,190,900,"db.BOM.findAll")
  drawReturnMessageToObject(ctx, 600,220,900,"{tuples}")
  drawReturnMessageToObject(ctx, 300,230,600,"{data:years,quarter}")

  drawMessageToObject(ctx, 300,260,600,"GET /boms?company_id,limit,offset,bom_type")
  drawMessageToObject(ctx, 600,280,900,"db.BOM.findAll")
  drawReturnMessageToObject(ctx, 600,310,900,"{filtered BOM tuples}")
  drawReturnMessageToObject(ctx, 300,330,600,"{data: name, bom_name, productname, bom_cost}")

  drawReturnMessageToObject(ctx, 10,340,300,"BOM IQ with details")

  
};

export function drawInteractionFromSampleFile(ctx){
  //readSequenceFile()
  console.log("attempting to draw")
  ctx.fillStyle = 'white';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  let loginInteraction=customData
  let objects=customData.objects
  let objectsList=[]
  let messages=customData.messages
  let initX=10
  let initY=10
  //draw object instances
  objects.forEach(Object => {
    drawObjectInst(ctx,initX,initY,Object)
    objectsList.push(new ObjectInst(Object,initX,initY))
    initX = initX + 290

  });
  console.log(objectsList)
  //draw messages
  let yPos=0
  let iCount=0
  let prevYPos=0
  let currentYPos=0
  let prevMsgType=1
  messages.forEach(message=> {
    //find the source and desitination objects and their positions
    const source = objectsList.find(object => object.name == message.source);
    //console.log(source)
    //console.log(message.destination)
    const desitination = objectsList.find(object => object.name == message.destination);
    console.log(desitination)
    //increment the YPos
    if (iCount==0)
    {
      prevYPos=source.yPos
    }
    if (prevMsgType!=3)
    {
      currentYPos = prevYPos+20
    } else
    {
      currentYPos = prevYPos+40
    }
    if (message.type==1)
    {
      drawMessageToObject(ctx, source.xPos,currentYPos,desitination.xPos,message.message)  
    } else if (message.type==2)
    {
      drawReturnMessageToObject(ctx, source.xPos,currentYPos,desitination.xPos,message.message)
    }
    else if( message.type==3) //self message
    {
      drawMessageToSelf(ctx,source.xPos,currentYPos,message.message)
      prevMsgType=3
    }
    prevYPos = currentYPos
    iCount++
  });

  
  
  
};

export function drawInteractionFromFile(ctx){
  //readSequenceFile()
  console.log("attempting to draw")
  ctx.fillStyle = 'white';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  let objects=singleBOMData.objects
  let objectsList=[]
  let messages=singleBOMData.messages
  let initX=10
  let initY=10
  //draw object instances
  objects.forEach(Object => {
    drawObjectInst(ctx,initX,initY,Object)
    objectsList.push(new ObjectInst(Object,initX,initY))
    initX = initX + 290

  });
  console.log(objectsList)
  //draw messages
  let yPos=0
  let iCount=0
  let prevYPos=0
  let currentYPos=0
  let prevMsgType=1
  messages.forEach(message=> {
    //find the source and desitination objects and their positions
    const source = objectsList.find(object => object.name == message.source);
    //console.log(source)
    //console.log(message.destination)
    const desitination = objectsList.find(object => object.name == message.destination);
    console.log(desitination)
    //increment the YPos
    if (iCount==0)
    {
      prevYPos=source.yPos
    }
    if (prevMsgType!=3)
    {
      currentYPos = prevYPos+20
    } else
    {
      currentYPos = prevYPos+40
    }
    if (message.type==1)
    {
      drawMessageToObject(ctx, source.xPos,currentYPos,desitination.xPos,message.message)  
    } else if (message.type==2)
    {
      drawReturnMessageToObject(ctx, source.xPos,currentYPos,desitination.xPos,message.message)
    }
    else if( message.type==3) //self message
    {
      drawMessageToSelf(ctx,source.xPos,currentYPos,message.message)
      prevMsgType=3
    }
    prevYPos = currentYPos
    iCount++
  });

  
  
  
};


// Usage: 
//drawLineWithArrows(50,50,150,50,5,8,true,true);

// x0,y0: the line's starting point
// x1,y1: the line's ending point
// width: the distance the arrowhead perpendicularly extends away from the line
// height: the distance the arrowhead extends backward from the endpoint
// arrowStart: true/false directing to draw arrowhead at the line's starting point
// arrowEnd: true/false directing to draw arrowhead at the line's ending point

export function drawLineWithArrows(ctx, x0,y0,x1,y1,aWidth,aLength,arrowStart,arrowEnd){
    var dx=x1-x0;
    var dy=y1-y0;
    var angle=Math.atan2(dy,dx);
    var length=Math.sqrt(dx*dx+dy*dy);
    //
    ctx.translate(x0,y0);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(length,0);
    if(arrowStart){
        ctx.moveTo(aLength,-aWidth);
        ctx.lineTo(0,0);
        ctx.lineTo(aLength,aWidth);
    }
    if(arrowEnd){
        ctx.moveTo(length-aLength,-aWidth);
        ctx.lineTo(length,0);
        ctx.lineTo(length-aLength,aWidth);
    }
    //
    ctx.stroke();
    ctx.setTransform(1,0,0,1,0,0);
}
export function initCanvas(context,width,height)
{

    context.clearRect(0, 0, width,height);
  
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(0,0,width,height);

}
export function useCanvas(){
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        initCanvas(ctx,canvasWidth,canvasHeight)
        // clear the canvas area before rendering the coordinates held in state
        ctx.clearRect( 0,0, canvasWidth, canvasHeight );
//        ctx.rect(10,50,50,50)
        // draw all coordinates held in state
        //drawLoginInteraction(ctx)
        //drawBOMIQInteraction(ctx)
        //drawSingleBOMInteraction(ctx)
       // drawInteractionFromSampleFile(ctx)
       drawInteractionFromFile(ctx)
        //coordinates.forEach((coordinate)=>{drawNew(ctx, coordinate)});
    });

    return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ];
}

class ObjectInst {
  
 
  constructor(name, xPos, yPos) {
    this._name = name;
    this._xPos = xPos;
    this._yPos= yPos;
  }
  get name() {
    return this._name;
  }
 
  get xPos() {
    return this._xPos;
  }
 
  get yPos() {
    return this._yPos;
  }
 

}