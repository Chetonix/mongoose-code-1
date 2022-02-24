const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

mongoose.connect("mongodb+srv://chetonix:mongodb!123@cluster0.h7ynw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    }
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
 
    rating: 9
})

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number, 
    favFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37
    
});

// person.save();

const jack = new Person({
    name: "Jack",
    age: 31
});

const anderson = new Person({
    name: "Anderson",
    age: 42
});

// Person.insertMany([jack, anderson], function(err){
//     if(err){console.log(err)}else console.log("Success");
// });

// Fruit.find(function (err, fruits) {
//     if(err) {console.log(err)} else {
//         // console.log(fruits)
//         fruits.forEach(function(fruit) {
//             console.log(fruit.name);
//         })
//         // mongoose.connection.close();
//     };
// });

// Fruit.deleteMany({
//     _id :{$ne: "62161452cbf4d7e601ab199e"}
// }, function(err) {if(err) {console.log(err)} else {console.log("Success")}});

Fruit.findOne({name: "American Apple"}, function(err, fruit) {
    if(err) {
        console.log("Error finding Fruit.");
    }
    else {
        Person.updateOne({name: "Anderson"}, {favFruit: fruit }, function(err) {
            if (err) {
                console.log(err);
            } else {
                mongoose.connection.close();
                console.log("Successfully updated document.");
            }
        });
    }
});
