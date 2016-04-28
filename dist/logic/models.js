"use strict";
/**
 * An unabridged collection of records with aggregated data used at the end of each generation.
 */
class StormResult {
    /**
     * Creates a new StormResult to house the generation and lifetime data.
     */
    constructor() {
        this.all = [];
        this.gen = [];
        this.totalGenerations = 0;
        this.totalScore = 0;
        this.avgGen = 0;
        this.min = { score: Number.MAX_VALUE };
        this.max = { score: Number.MIN_VALUE };
        this.minGen = { score: Number.MAX_VALUE };
        this.maxGen = { score: Number.MIN_VALUE };
    }
    /**
     * The average score across all generations.
     */
    get avg() {
        return this.totalScore / this.all.length;
    }
    /**
     * Adds a new generation to the result instance.
     */
    add(results) {
        this.gen = [];
        let genTotalScore = 0;
        results.forEach(result => {
            genTotalScore += result.score;
            if (result.score < this.min.score) {
                this.min = result;
            }
            if (result.score > this.max.score) {
                this.max = result;
            }
            if (result.score < this.minGen.score) {
                this.minGen = result;
            }
            if (result.score > this.maxGen.score) {
                this.maxGen = result;
            }
            this.gen.push(result);
            this.all.push(result);
        });
        this.totalGenerations++;
        this.totalScore += genTotalScore;
        this.avgGen = genTotalScore / results.length;
    }
}
exports.StormResult = StormResult;
//# sourceMappingURL=models.js.map