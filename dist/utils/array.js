"use strict";
/**
 * Returns a random element from the array.
 */
function random(source) {
    return source[Math.floor(Math.random() * source.length)];
}
exports.random = random;
/**
 * Shuffles an array in place.
 * @param {Array} source items The array containing the items.
 */
function shuffle(source) {
    let result = new Array(source.length);
    let randomIndex, temp, end;
    for (end = source.length; end; end -= 1) {
        randomIndex = Math.floor(Math.random() * end);
        temp = source[end - 1];
        source[end - 1] = source[randomIndex];
        source[randomIndex] = temp;
    }
    return source;
}
exports.shuffle = shuffle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOztHQUVHO0FBQ0gsZ0JBQTBCLE1BQVc7SUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRmUsY0FBTSxTQUVyQixDQUFBO0FBRUQ7OztHQUdHO0FBQ0gsaUJBQTJCLE1BQVc7SUFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLElBQUksV0FBbUIsRUFBRSxJQUFPLEVBQUUsR0FBVyxDQUFDO0lBQzlDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDeEMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVhlLGVBQU8sVUFXdEIsQ0FBQSJ9