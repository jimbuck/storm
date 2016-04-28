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
        this.totalGenerations = 0;
        this.totalScore = 0;
        this.min = { score: Number.MAX_VALUE };
        this.max = { score: Number.MIN_VALUE };
    }
    /**
     * The average score across all generations.
     */
    get avg() {
        return this.all.length ? this.totalScore / this.all.length : 0;
    }
    /**
     * Adds a new generation to the result instance.
     */
    add(results) {
        results.forEach(result => {
            this.totalScore += result.score;
            this.all.push(result);
            if (result.score < this.min.score) {
                this.min = result;
            }
            if (result.score > this.max.score) {
                this.max = result;
            }
        });
        this.totalGenerations++;
    }
}
exports.StormResult = StormResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2ljL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZ0RBOztHQUVHO0FBQ0g7SUFrQ0U7O09BRUc7SUFDSDtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQWtCLENBQUM7UUFDdkQsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFrQixDQUFDO0lBQ3pELENBQUM7SUEvQkQ7O09BRUc7SUFDSCxJQUFXLEdBQUc7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQTRCRDs7T0FFRztJQUNJLEdBQUcsQ0FBQyxPQUF1QjtRQUNoQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDcEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNwQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7QUFDSCxDQUFDO0FBL0RZLG1CQUFXLGNBK0R2QixDQUFBIn0=