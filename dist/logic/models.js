"use strict";
/**
 * An unabridged collection of records with aggregated data used at the end of each generation.
 */
class StormResult {
    /**
     * Creates a new StormResult to house the generation and lifetime data.
     */
    constructor() {
        this.totalCount = 0;
        this.totalScore = 0;
        this.totalGenerations = 0;
        this.generations = [];
        this.min = { score: Number.MAX_VALUE };
        this.max = { score: Number.MIN_VALUE };
    }
    /**
     * The average score across all generations.
     */
    get avg() {
        return this.totalCount ? this.totalScore / this.totalCount : 0;
    }
    /**
     * Adds a new generation to the result instance.
     */
    add(results) {
        let genMax = results[0];
        let generationTotal = 0;
        results.forEach(result => {
            if (result.score < this.min.score) {
                this.min = result;
            }
            if (result.score > this.max.score) {
                this.max = result;
            }
            if (result.score > genMax.score) {
                genMax = result;
            }
            generationTotal += result.score;
            this.totalScore += result.score;
        });
        this.generations.push({
            id: this.generations.length,
            max: genMax,
            avg: generationTotal / results.length
        });
        this.totalCount += results.length;
        this.totalGenerations++;
        //console.log(`Gen ${this.totalGenerations} => Best: ${genMax.score} | Avg: ${generationTotal / results.length}`);
    }
}
exports.StormResult = StormResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2ljL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBbURBOztHQUVHO0FBQ0g7SUF1Q0U7O09BRUc7SUFDSDtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFrQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBa0IsQ0FBQztJQUN6RCxDQUFDO0lBaENEOztPQUVHO0lBQ0gsSUFBVyxHQUFHO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBNkJEOztPQUVHO0lBQ0ksR0FBRyxDQUFDLE9BQXVCO1FBQ2hDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFFeEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNwQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFFRCxlQUFlLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQzNCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsR0FBRyxFQUFFLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTTtTQUN0QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsa0hBQWtIO0lBQ3BILENBQUM7QUFDSCxDQUFDO0FBdkZZLG1CQUFXLGNBdUZ2QixDQUFBIn0=