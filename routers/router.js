//引入express
const express = require('express');

const Router = express.Router;

const router = new Router();

//引入模型对象（数据库表名）
const Users = require('../models/users');

const MD5 = require('blueimp-md5');

//解析body页面的请求参数
router.use(express.urlencoded({extended:true}));

/**
 * 登录逻辑开始
 */
router.post('/login',async (req,res)=>{
  const {username,password} = req.body;
  if(!username || !password){
    res.json({
      "code":2,
      "msg":"用户名输入不合法"
    })
    return;
  }

 try {
   const data =await Users.findOne({username,password:MD5(password)});
   if(data){ //如果查询到了数据 那么就登陆成功
     res.json({
       "code":0,
       data:{
         _id:data.id,
         username:data.username,
         type:data.type
       }
     })
   }else{
     res.json({
       "code":1,
       "msg":"用户名或密码错误"
     })
   }
 }catch (e) {
    //如果整个方法执行出错了
   res.json({
     "code":3,
     "msg":"网络不稳定 请刷新重试"
   })
 }


})


/**
 * 注册逻辑开始
 */
router.post('/register',async (req,res)=>{

  //获取body里的请求参数:
  const {username,password,type} = req.body;

  console.log(username,password,type);

  if(!username || !password || !type){
    res.json({
      "code":2,
      "msg":"用户输入不合法"
    })

    return;
  }

  try {
    //调用查询的方法
    const data = await Users.findOne({username});

    //如果有数据
    if(data){
      //那么说明用户名已经存在,返回提示
      res.json({
        "code":1,
        "msg":"该用户名已存在"
      })

    }else{ //如果没有数据，那么就直接创建,返回成功的数据
      const data = await Users.create({username,password:MD5(password),type});
      res.json({
        "code":0,
        data:{
          _id:data.id,
          username:data.username,
          type:data.type
        }
      })

    }

  }catch (e) {
    // 方法出错了
    res.json({
      "code":3,
      "msg":"网络不稳定，请刷新重试"
    })
  }


})

//暴露路由器
module.exports = router;
