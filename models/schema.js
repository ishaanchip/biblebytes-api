const { Int32 } = require('mongodb');
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
      img_attributions:{
        type:String,
        default:"",
      },
      create_date: {
        type: Date,
        default: Date.now
      }
})

const chapterOverviewsSchema = new Schema({
  version: {
    type:String,
    required:true,
  },
  books:{
    type:Object,
    default: {}
  },
  total_fetched_chapters: {
    type:Int32,
    default:0
  }

})

const connectionSchema = new Schema({
  content:{
    type:Object,
    required:true
  },
  name:{
    type:String,
    default:"CONNECTION #X"
  },
  plays:{
    type:Int32,
    default:0
  },
  current_connection:{
    type:Boolean,
    default:false
  }
})

const clientAccounts = mongoose.model('client_accounts', clientAccountSchema, 'client_accounts');

const commentaryTemplate = mongoose.model('commentaries', commentaryTemplateSchema, 'commentaries');

const chapterOverviewTemplate = mongoose.model('chapter_overviews', chapterOverviewsSchema, 'chapter_overviews')

const connectionTemplate = mongoose.model('connections', connectionSchema, 'connections')


const mySchemas = {
  'clientAccounts':clientAccounts,
  'commentaryTemplate':commentaryTemplate,
  'chapterOverviewTemplate':chapterOverviewTemplate,
  'connectionTemplate':connectionTemplate
}

module.exports = mySchemas;