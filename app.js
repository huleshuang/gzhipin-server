
//引入 express
const express =require('express');

//创建app应用
const app = express();

//引入数据库连接
const db = require('./db/db');
//引入路由
const router = require('./routers/router');

(async ()=>{
  await db; //等待数据库连接成功
  app.use(router); //应用路由
})();


//事件监听
app.listen(4000,function (err) {
  if(!err){
    console.log('服务器启动成功')
  }else{
    console.log('服务器启动失败')
  }
})