const mongoose = require('mongoose');
const { Schema }  = mongoose;

const interpretedConstraintsSchema = new Schema ({
    variable: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    max: {
        type: String, 
    }, 
    min: {
        type: String, 
    }
});

const expectedComplexitySchema = new Schema({
    time: {
        type: String, 
        required: true
    },

    space: {
        type: String, 
        required: true
    }
})

const analysisSchema = new Schema ({
    problemId: {
        type: String, 
        required: true
    },

    problemType: {
        type: String, 
        required: true,
        trim: true
    },
    coreConcept: {
        type: String, 
        required: true,
        trim: true
    },

    interpretedConstraints: {
        type: [interpretedConstraintsSchema],
        required: true
    },

    expectedComplexity: {
        type: expectedComplexitySchema,
        required: true
    },

    importantEdgeCases: {
        type: [String],
        required: true
    },

    inputCharacteristics: {
        type: [String],
        required: true
    },

    testGenerationStrategy: {
        type: [String],
        required: true
    }, 

    guarantees: {
        type: [String],
        required: true
    }, 

    solutionAssumptions: {
        type: [String],
        required: true
    },

    ambiguities: {
        type: [String],
        required: true
    }
});

const AnalysisModel = mongoose.model('Analysis', analysisSchema);

module.exports = AnalysisModel;