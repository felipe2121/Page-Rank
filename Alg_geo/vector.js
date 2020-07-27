class Vector extends Matrix{

    constructor(length, elements){
        super(length, 1, elements)
    }

    get(i){
        return super.get(i, 1)
    }

    set(i, value){
        super.set(i, 1, value)
    }
}