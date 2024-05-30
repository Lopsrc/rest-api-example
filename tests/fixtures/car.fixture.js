var randomLetter = require('random-letter');
const randomNumberRange = require('random-number-range');

const randRegNum = function(){
    const rng = {
        min: 100,
        max: 999,
    }
    // Format "P777PP777"
    return randomLetter().toUpperCase()+randomNumberRange(rng)+(randomLetter()+randomLetter()).toUpperCase()+randomNumberRange(rng);
}
const createCar = {
    brand: 'testbrand',
    model: 'testmodel',
    color: 'black',
    regNum: randRegNum(),
    id: 1
}


const updateCar = {
    brand: 'testbrand2',
    model: 'testmodel2',
    color: 'yellow',
    regNum: randRegNum(),
}



module.exports = {
    createCar,
    updateCar,
}