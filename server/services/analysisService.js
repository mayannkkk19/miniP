const AnalysisModel = require('../models/analysisSchema');

class AnalysisService {
    async saveAnalysis (analysisObject) {
        try {
            const newAnalysis = new AnalysisModel(analysisObject);
            return await newAnalysis.save();
        } catch (error) {
            throw new Error (`Failed to save analysis :${error.message}`);
        }
    }
}

module.exports = AnalysisService;