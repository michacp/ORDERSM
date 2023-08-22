const sequordersdModels = {};
const counters=require("../modelsdb/counters")
sequordersdModels.getNextSequenceValue = async (sequenceName) => {
    try {
        var sequenceDocument = await counters.findOneAndUpdate({schemaname: sequenceName},{$inc:{sequence_value:1}})
        return sequenceDocument.sequence_value;
    } catch (error) {
        
    }

    


}

module.exports = sequordersdModels;