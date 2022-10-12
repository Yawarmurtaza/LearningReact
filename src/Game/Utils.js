 // Math science

export function GenerateRandom(min, max){
    return min + Math.floor(Math.random() * (max - min + 1));
}

export function CreateArray(min, max){
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

export function SumArray(arr){
    return arr.reduce((acc, curr) => acc + curr, 0);
}

export function  RandomSumIn (arr, max)  {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
            const candidateSet = sets[j].concat(arr[i]);
            const candidateSum = SumArray(candidateSet);
            if (candidateSum <= max) {
                sets.push(candidateSet);
                sums.push(candidateSum);
            }
        }
    }
    return sums[GenerateRandom(0, sums.length - 1)];
}