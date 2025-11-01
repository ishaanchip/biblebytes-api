const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//client account schemas
const clientAccountSchema = new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    create_date:{type:Date, default: Date.now},
})

const clientAccounts = mongoose.model('client_accounts', clientAccountSchema, 'client_accounts');


const mySchemas = {'clientAccounts':clientAccounts}

module.exports = mySchemas;