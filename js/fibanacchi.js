const fibonacci = (n) => {
    const result = [0, 1]

    for (let i = 2; i <= n; i++) {
        const prev1 = result[i - 1]
        const prev2 = result[i - 2]
        result.push(prev1 + prev2)
    }

    return result[n - 1]
}

fibonacci(4)