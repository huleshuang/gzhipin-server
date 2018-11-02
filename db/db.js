
//引入mongoose
const mongoose = require('mongoose');

module.exports = new Promise((resolve,reject)=>{
//链接数据库
  mongoose.connect('mongodb://localhost:27017/gzhipin',{useNewUrlParser:true});

  mongoose.connection.once('open',err=>{
    if(!err){
      console.log('数据库连接成功');
      resolve();
    }else{
      console.log('数据库连接失败'+err);
      reject();
    }
  })
})