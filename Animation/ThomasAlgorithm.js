/*
 * a - diagonal
 * b - subdiagonal
 * c - superdiagonal
 * d - right-hand vector
 * f - solution vector
*/
function solve(a, b, c, d, f) {
    var N = d.length;
    var c_star = new Array(N).fill(0.0);
    var d_star = new Array(N).fill(0.0);
    c_star[0] = c[0] / b[0];
    d_star[0] = d[0] / b[0];
    for (var i = 1; i < N; i++) {
        var m = 1.0 / (b[i] - a[i] * c_star[i - 1]);
        c_star[i] = c[i] * m;
        d_star[i] = (d[i] - a[i] * d_star[i - 1]) * m;
    }
    for (var i = N - 1; i-- > 0;) {
        f[i] = d_star[i] - c_star[i] * d[i + 1];
    }
}
function thomas(diagonal, superdiagonal, subdiagonal, rhs, solution) {
    var N = diagonal.length;
    for (var i = 1; i < N; ++i) {
        var m = subdiagonal[i - 1] / diagonal[i - 1];
        diagonal[i] -= m * superdiagonal[i - 1];
        rhs[i] -= m * rhs[i - 1];
    }
    solution[N - 1] = rhs[N - 1] / diagonal[N - 1];
    for (var i = N - 2; i >= 0; --i) {
        solution[i] = (rhs[i] - superdiagonal[i] * solution[i + 1]) / diagonal[i];
    }
}
//# sourceMappingURL=ThomasAlgorithm.js.map