const mongoose=require ('mongoose');

const url="mongodb+srv://priyabharti:PriyaB@cluster0.180vb.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0"

//asynchronous function - returns promise object
mongoose.connect(url)
.then((result) => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
});

module.exports=mongoose;
