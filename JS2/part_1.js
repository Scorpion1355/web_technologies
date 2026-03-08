export function max(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return NaN;
    }

    let maxValue = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }

    return maxValue;
}

export function maxPair(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return NaN;
    }

    let bestPair = [arr[0], arr[1] ?? 0];
    let bestSum = bestPair[0] + bestPair[1];

    for (let i = 1; i < arr.length; i++) {
        const currentPair = [arr[i], arr[i + 1] ?? 0];
        const currentSum = currentPair[0] + currentPair[1];

        if (currentSum > bestSum) {
            bestPair = currentPair;
            bestSum = currentSum;
        }
    }

    return bestPair;
}

export function recordProgress(obj, tuple) {
    if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
        throw new Error("Invalid object");
    }

    const copy = { ...obj };

    if (!Array.isArray(tuple) || tuple.length === 0) {
        return copy;
    }

    const ageChange = tuple[0] ?? 0;
    const weightChange = tuple[1] ?? 0;

    return {
        ...copy,
        age: (copy.age ?? 0) + ageChange,
        weight: (copy.weight ?? 0) + weightChange,
    };
}