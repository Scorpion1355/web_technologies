export function max(arr) {
    if (arr == 0) return NaN;
    let max = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];

        if (current > max) {
            max = current;
        }
    }

    return max;
}

export function maxPair(arr) {
    if (arr == 0) return NaN;

    let max = [];

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        let next;

        if (arr[i + 1] === undefined || arr[i + 1] === null) {
            next = 0;
        } else {
            next = arr[i + 1];
        }

        if (max == 0) {
            max = [current, next];
        } else {
            if (current + next > max[0] + max[1]) {
                max = [current, next];
            }
        }
    }

    return max;
}

export function recordProgress(object, tuple) {
    if (tuple == 0) return object;

    const age = object.age;
    const weight = object.weight;

    const ageChange = tuple[0];
    const weightChange = tuple[1];

    const result = {
        age: (age || 0) + ageChange,
        weight: (weight || 0) + weightChange,
    };

    return Object.assign({}, object, result);
}
