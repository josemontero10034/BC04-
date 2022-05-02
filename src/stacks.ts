class stack{
    data: any[];
    constructor(){
        this.data = [];
    };
    push(x: any){
        this.data.push(x);
    
    };
    pop(){
       return this.data.pop();
    };
    isempty(){
       return this.data.length===0;
    }
};
