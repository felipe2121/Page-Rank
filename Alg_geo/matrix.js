class Matrix{
    constructor(rows, cols, elements){
        this.rows = rows
        this.cols = cols
        
        if(elements == undefined){
            this.elements = new Array(this.rows * this.cols)
            for(var i = 0;i < this.rows*this.cols;i++){
                this.elements[i] = 0
            }
        }else{
            if(rows * cols == elements.length){
                this.elements = elements 
            }else{
                throw "A quantidade de elementos nao e compativel com a quantidade de linhas e colunas"
            }
        }
    }

    get(i,j){
        if(i <= 0 || i > this.rows) throw "O indice da linha nao é compativel com as dimensoes da matriz"
        if(j <= 0 || j > this.cols) throw "O indice da coluna nao é compativel com as dimensoes da matriz"
        return this.elements[(j-1) + (i-1) * this.cols];
    }

    set(i,j, value){
        if(i <= 0 || i > this.rows) throw "O indice da linha nao é compativel com as dimensoes da matriz"
        if(j <= 0 || j > this.cols) throw "O indice da coluna nao é compativel com as dimensoes da matriz"
        this.elements[(j-1) + (i-1) * this.cols] = value;
    }
}