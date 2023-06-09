const mongoose = require('mongoose');
const Answer = require('../Schemas/AnswerSchema');
module.exports = {
    CreateAnswer: async function (Data){
        const newRecord = new Answer(Data);
        newRecord.save().catch((err) => {
            console.log(err);
        });
    },
    EditAnswer: async function (AnswerId,Data){
        await Answer.findOneAndUpdate(
            {AnswerId},
            Data
        ).catch((err) => {
            console.log(err);
        });
    },
    DeleteAnswer: async function (AnswerId){
        await Answer.deleteOne(
            {AnswerId}
        ).catch((err) => {
            console.log(err);
        });
    },
    FindOneAnswerRecord: async function (Data, Selection=""){
        const query = await Answer.find(Data).select(Selection);
        return query;
    }
};