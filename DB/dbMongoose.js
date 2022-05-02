const mongoose=require('mongoose');

class mongoosedb{

   constructor(){     
   }

   async connect(){
       const url= 'mongodb://srv1:27017/324103183-sulamitCohen&tamarOstry';
       await mongoose.connect(url);
       console.log(`connected seccesfuly with mongose`);
   };
}

module.exports=new mongoosedb();