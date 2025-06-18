export class Shape{
    constructor(){

    }
}
export class Circle extends Shape{
    constructor(radius){
        super();
        this.radius=radius;
    }    
    area(){
        return Math.PI*this.radius*this.radius;
    }
}
export class Rectangle extends Shape{
    constructor(width,height){
        super();
        this.width=width;
        this.height=height;
    }
    area(){
        return this.width*this.height;
    }
}

