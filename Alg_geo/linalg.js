class LinearAlgebra{

    add(a,b){

        if(typeof(a) == "number"){

            if(!(b instanceof Matrix)) throw "O parametro b teve ser um objeto do tipo matrix."

            var res = new Matrix(b.rows,b.cols)

            for(var i = 1;i <= b.rows; i++){
                for(var j = 1; j <= b.cols;j++){
                    res.set(i , j, a + b.get(i, j))
                }
            }

            return res;

        }else if(typeof(a) == "object"){

        if( !(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"
        if( !(b instanceof Matrix)) throw "paramenro B deve ser um objeto do tipo matrix" 
        
        if( !(a.rows == b.rows && a.cols == b.cols)) throw "As matrizes nao possuem as mesmas dimensoes"

        var res = new Matrix(a.rows, a.cols)

        for(var i = 1; i <= a.rows;i++){
            for(var j = 1;j <= a.cols;j++){
                res.set(i, j, a.get(i, j) + b.get(i, j))
            }
        }

        return res
    
        }else{
            throw "paramenro A deve ser um objeto do tipo matrix"
        }
    }

    sub(a,b){
        if( !(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"
        if( !(b instanceof Matrix)) throw "paramenro B deve ser um objeto do tipo matrix"
        
        if( !(a.rows == b.rows && a.cols == b.cols)) throw "As matrizes nao possuem as mesmas dimensoes"

        var res = new Matrix(a.rows, a.cols)

        for(var i = 1; i <= a.rows;i++){
            for(var j = 1;j <= a.cols;j++){
                res.set(i, j, a.get(i, j) - b.get(i, j))
            }
        }
        return res
    }

    mul(a,b){
        if(typeof(a) == "number"){

            if(!(b instanceof Matrix)) throw "O parametro b teve ser um objeto do tipo matrix."

            var res = new Matrix(b.rows,b.cols)

            for(var i = 1;i <= b.rows; i++){
                for(var j = 1; j <= b.cols;j++){
                    res.set(i, j, a * b.get(i, j))
                }
            }

            return res;

        }else if(typeof(a) == "object"){

        if( !(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"
        if( !(b instanceof Matrix)) throw "paramenro B deve ser um objeto do tipo matrix"
        
        if( !(a.rows == b.rows && a.cols == b.cols)) throw "As matrizes nao possuem as mesmas dimensoes"

        var res = new Matrix(a.rows, a.cols)

        for(var i = 1; i <= a.rows;i++){
            for(var j = 1;j <= a.cols;j++){
                res.set(i, j, a.get(i, j) * b.get(i, j))
            }
        }

        return res
    
        }else{
            throw "paramenro A deve ser um objeto do tipo matrix"
        }
    }

    div(a,b){
        if( !(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"
        if( !(b instanceof Matrix)) throw "paramenro B deve ser um objeto do tipo matrix"
        
        if( !(a.rows == b.rows && a.cols == b.cols)) throw "As matrizes nao possuem as mesmas dimensoes"
        
        for(var k = 1; k <= b.elements.length;k++){
            if(b.elements[k] == 0){
                throw "Os elementos da matrix devem ser diferentes de 0"
            }  
        }

        var res = new Matrix(a.rows, a.cols)

        for(var i = 1; i <= a.rows;i++){
            for(var j = 1;j <= a.cols;j++){
                res.set(i, j, a.get(i, j) / b.get(i, j))  
            }
        }
        return res
    }

    transpose(a){
        if( !(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"

        var res = new Matrix(a.cols, a.rows)
        
        for(var i = 1; i <= a.cols;i++){
            for(var j = 1;j <= a.rows;j++){
                res.set(i, j, a.get(j, i))
            }
        }
        return res
    }

    dot(a,b){
        if( !(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"
        if( !(b instanceof Matrix)) throw "paramenro B deve ser um objeto do tipo matrix"
        
        if(!(a.cols == b.rows)) throw "As matrizes nao possuem as dimensoes necessarias para as operacoes"

        var res = new Matrix(a.rows, b.cols)

        for(var i = 1; i <= a.rows; i++){
            for(var j = 1; j <= b.cols; j++){
                for(var k = 1; k <= a.cols; k++){
                    res.set(i, j, (a.get(i,k)*b.get(k,j)) + res.get(i,j))
                    //Cij = Aik * Bkj + Cij
                }
            }
        }
        return res
    } 

    solve(a){
        
        if(!(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"

        var res = new Matrix(a.rows, a.cols)

        for(var i = 1; i <= a.rows; i++){//Duplicando matrix a
            for(var j = 1; j <= a.cols; j++){
                res.set(i, j, a.get(i, j))
            }
        }

        for(var i = 1; i <= a.rows; i++){//Encontrar o elemento com maior valor
            var maxElemento = Math.abs(res.get(i, i))
            var maxLinha = i
            for(var k = i + 1; k < a.rows + 1; k++){
              if(Math.abs(res.get(k, i)) > maxElemento){//Valor em modulo
                maxElemento = Math.abs(res.get(k, i))
                maxLinha = k               
              }  
            }
             
            for(var k = i; k < a.cols + 1; k++){//Inverter a linha
                var aux = res.get(maxLinha, k)
                res.set(maxLinha, k, res.get(i, k))
                res.set(i, k, aux)
            }
         
         for(k = i + 1; k < a.rows + 1; k++){//Executar o triangulo de zero inferior
                var c = -res.get(k, i)/res.get(i, i)//-(ele mesmo/pivo)

                for(var j = i; j < a.cols + 1; j++){
                    if(i == j){//Da zero
                        res.set(k, j, 0)
                    }else{
                        res.set(k, j, c*res.get(i, j) + res.get(k, j))//Multiplicar elmentos da linha
                    }
                }
            }
        }

        for(var w = a.rows; w > 1; w--){//Executar triangulo de zero superior
            for(var k = w - 1; k > 0; k--){
                var y = -res.get(k, w)/res.get(w, w)

                for(var j = a.cols; j > w - 1; j--){
                    if(w == j){//Da zero
                        res.set(k, j, 0)
                    }else{
                        res.set(k, j, y * res.get(w, j) + res.get(k, j))
                    }
                }
            }
        }
        
        for(var i = a.rows; i > 0; i--){//Tranformar a diagonal em 1
            res.set(i, a.rows + 1, res.get(i, a.rows + 1) / res.get(i, i))
            res.set(i, i, 1)
        }

        for(var i = 1; i <= a.rows; i++){//Respostas do sistema linear
            //console.log(Math.round(res.get(i, a.cols)))
        }
        return res
    }

    eigen(a){

        if(!(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"

        var A = a
        var eigenvalues = new Matrix(a.rows, 1)
        var eigenvectors = new Matrix(a.rows, a.cols + 1)
        
        var Ax = new Matrix(a.rows, 1)
        var x = new Matrix(a.rows, 1)
        x.set(1,1, 1)
        var pri = 0
        var seg = 0
        var ter = 0
        var pri1 = 0
        var seg1 = 0
        var ter1 = 0
        var qua1 = 0
        var B = 0 
        var la = new LinearAlgebra()
        
        for(var j = 1; j <= a.rows; j++){
            var precision = 1
            var lyx = new Matrix(2,1)
            var max = 0

            while(precision > 0.00001){
                
                lyx.set(1,1, lyx.get(2,1))

                Ax = la.dot(A, x) 
                for(var i1 = 1; i1 <= Ax.rows; i1++){
                    for(var j1 = 1; j1 <= Ax.cols; j1++){
                        if(Ax.get(i1, j1) > max){
                            max = Ax.get(i1, j1)
                        }
                    }
                }
                x = la.mul(1/max, Ax) //Autovetor
                Ax = la.dot(A,x)
                pri = la.dot (la.transpose(Ax), x)
                seg = la.dot(la.transpose(x), x)
                ter = pri.get(1,1)/seg.get(1,1) //Autovalor
  
                lyx.set(2,1, ter)
                precision = (lyx.get(2,1) - lyx.get(1,1))/lyx.get(2,1)
            }

            if(j == 1){
                eigenvalues.set(j,1, lyx.get(2,1)) 
                eigenvectors.set(j,1, lyx.get(2,1)) 

                for(var k = 1; k < eigenvectors.cols; k++){
                eigenvectors.set(j, k+1, x.get(k, 1)) 
                }

                pri1 = la.dot(x, la.transpose(x))
                seg1 = la.dot(la.transpose(x), x)
                ter1 = eigenvalues.get(j, 1)/seg1.get(1,1)
                qua1 = la.mul(ter1, pri1)

                B = la.sub(A, qua1)
                A = B
                
            }else if(j > 1){
                eigenvalues.set(j,1, lyx.get(2,1)) 
                eigenvectors.set(j,1, lyx.get(2,1)) 

                for(var k = 1; k < eigenvectors.cols; k++){
                eigenvectors.set(j, k+1, x.get(k, 1)) 
                }
            }
        }
        return [eigenvalues, eigenvectors]
    }

    pagerank(a){
        if(!(a instanceof Matrix)) throw "paramenro A deve ser um objeto do tipo matrix"

        var A = a
        var At = A
        var a0 = new Matrix(a.rows, 1)
        var somaa0 = 0
        var cont = 1
        var sub = 5

        var Aa0
        var h
        var soma1 = 0
        var x 
        var soma2 = 0
        var soma3 = 0
        var res
        var la = new LinearAlgebra

        for(var i = 1; i <= A.rows; i++){
            for(var j = 1; j <= A.cols; j++){
                somaa0 += A.get(j,i)
            }
            a0.set(i,1, somaa0)
            somaa0 = 0
        }

        while(sub > 0.00000001){
            if(soma1 == 0){
                Aa0 = la.dot(A, a0)
                for(var z = 1; z <= A.rows; z++){
                    soma1 += (Aa0.get(z,1) * Aa0.get(z,1))
                }

                soma1 = 1/Math.sqrt(soma1) // ||Aa0||
                h = la.mul(soma1,Aa0)   // h

            }else{
                Aa0 = la.dot(A, res)
                
                for(var i1 = 1; i1 <= A.rows; i1++){
                    soma3 += (Aa0.get(i1,1) * Aa0.get(i1,1))
                }
                soma3 = 1/Math.sqrt(soma3) // ||Aa0||

                h = la.mul(soma3,Aa0)   // h
                cont = res.get(2,1) 
            }

            At = la.transpose(A)
            x = la.dot(At,h) //x == (At*h)
            for(var z = 1; z <= A.rows; z++){
               soma2 += (x.get(z,1) * x.get(z,1))
            }
            soma2 = 1/Math.sqrt(soma2) // soma2 == ||At*h||

            res = la.mul(soma2, x) //a
            sub = cont - res.get(2,1)
        }
        return res
    }
}
