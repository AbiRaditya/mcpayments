// 1. each input would have exactly one solution
// 2. not using an element twice == not adding the same element to reach the target
// 3. can return the anwer in any order

function twoSums(nums,target) {
    let lookUp = {} // a lookup table for a desired number as key and index as value
    for (var i = 0; i < nums.length; i++) {
        let desiredNumber = target - nums[i]; // example if the target is 13 and the nums[i] is 2 then my desired number is 11
        if (typeof lookUp[desiredNumber] == 'number' ) { // check the desired number of 13 - 11 which is two at the lookup table
            return [lookUp[desiredNumber], i]; // i want to return the value from the lookUp which is the index of number 2 (0) and the current index
        }
        lookUp[nums[i]] = i; //make a new property in the lookup table (the current number) with the index as the value
        
    }
}
const nums = [2,7,11,15]
const nums2 = [3,2,4]
const nums3 =  [3,3]
console.log(twoSums(nums , 13));    //[ 0, 2 ]
console.log(twoSums(nums2 , 6));    //[ 1, 2 ]
console.log(twoSums(nums3 , 6));     //[ 0, 2 ]