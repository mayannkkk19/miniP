const { Schema } = mongoose;

const sampleSchema = new Schema ({
    input: {
        type: String,
        required: [true, "Sample input is required."]
    },
    output: {
        type: String,
        required: [true, "Sample output is required."]
    },
    explaination: {
        type: String,
        default: ''
    }
}, { _id: false });

const problemSchema = new Schema ({
    title : {
        type: String, 
        required: true,
        trim: true
    },
    statement: {
        type: String, 
        required: true,
        trim: true
    },
    constraints: {
        type: [String],
        default: []
    },
    inputFormat: {
        type: String, 
        default: ''
    },
    outputFormat: {
        type: String,
        default: ''
    },
    samples: {
        type: [sampleSchema],
        required: true
    }
}, {
    timestamps: true //tracks createdAt and updatedAt
});

const ProblemModel = mongoose.model('Problem', problemSchema);

module.exports = ProblemModel;