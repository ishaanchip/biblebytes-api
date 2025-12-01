const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//client account schemas
const clientAccountSchema = new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    create_date:{type:Date, default: Date.now},
})

//commentary schema
const commentaryTemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
      type: {
        type: String,
        default: "Series"
      },
      commentaries: {
        type: [Object],
        default: []
      },
      commentary_description:{
        type:String,
      },
      img_url:{
        type:String,
        default:"",
      },
      create_date: {
        type: Date,
        default: Date.now
      }
})

const clientAccounts = mongoose.model('client_accounts', clientAccountSchema, 'client_accounts');

const commentaryTemplate = mongoose.model('commentaries', commentaryTemplateSchema, 'commentaries');


const mySchemas = {'clientAccounts':clientAccounts, 'commentaryTemplate':commentaryTemplate}

module.exports = mySchemas;