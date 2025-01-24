function jumpSearch(arr, target) {
    const length = arr.length;
    const step = Math.floor(Math.sqrt(length));
    let prev = 0;
    let curr = step;

    while (curr < length && arr[curr] < target) {
        prev = curr;
        curr += step;
    }

    for (let i = prev; i < Math.min(curr, length); i++) {
        if (arr[i] === target) {
            return i;
        }
    }

    return -1;
}
