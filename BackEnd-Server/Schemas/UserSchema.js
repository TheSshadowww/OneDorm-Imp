const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    UserId: {type:String, unique: true, index: true},
    Fname:{type:String, default:null},
    Lname:{type:String, default:null},
    Password:{type:String, default:null},
    Username: {type:String, unique:true , index: true , sparse: true},
    Email: {type:String, unique: true},
    Phonenumber:{type:String, default:null},
    VerificationState:{type:String , default:'inactive'},
    Image: {
    }, 
    DateOfBirth:{type:Date, default:null},
    TotalVotes:{type:Number, default:0},
    UserDetails:{type:Object , default:{
        University:'',
        Major:'',
        Address:'',
        City:'',
        Country:''
    }},
    UserVotes:{type:Object , default:{'test':'-1'}},
    NotificationList:[
    ],
    PostList:[],
    AnswersList:[],
    BlogList:[],
    ChatList:[],
    CategoriesList:[],
    CreatedAt:{
        type: Date,
        default: Date.now()
    },

});

const User = mongoose.model('User', UserSchema);
module.exports = User;