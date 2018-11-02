
//引入mongoose
const mongoose = require('mongoose');

//创建模式对象
const Schema = mongoose.Schema;

//创建约束对象
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }

})

//创建模型对象
const Users = mongoose.model('Users',userSchema);
//暴露出去
module.exports=Users;