function binarySearchIterative(arr, target) {
    let left = 0;
    let rigth = arr.length - 1;

    while (low <= rigth) {
        const mid = Math.floor((left + rigth) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            rigth = mid - 1;
        }
    }

    return -1;
}

function binarySearchRecursive(arr, target, left, rigth) {
    if (left > rigth) {
        return -1;
    }

    const mid = Math.floor((left + rigth) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, rigth);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
