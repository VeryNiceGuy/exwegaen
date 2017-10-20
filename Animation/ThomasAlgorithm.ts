
/*
 * a - diagonal
 * b - subdiagonal
 * c - superdiagonal
 * d - right-hand vector
 * f - solution vector
*/

function solve(a: number[], b: number[], c: number[], d: number[], f: number[]) {
    let N: number = d.length;

    let c_star: Array<number> = new Array<number>(N).fill(0.0);
    let d_star: Array<number> = new Array<number>(N).fill(0.0);
                                                                                                                                                      
    c_star[0] = c[0] / b[0];
    d_star[0] = d[0] / b[0];

    for (let i: number = 1; i < N; i++) {
        let m: number = 1.0 / (b[i] - a[i] * c_star[i - 1]);

        c_star[i] = c[i] * m;
        d_star[i] = (d[i] - a[i] * d_star[i - 1]) * m;
    }

    for (let i: number = N - 1; i-- > 0;) {
        f[i] = d_star[i] - c_star[i] * d[i + 1];
    }
}


function thomas(diagonal: number[], superdiagonal: number[], subdiagonal: number[], rhs: number[], solution: number[]) {
    let N: number = diagonal.length;

    for (let i: number = 1; i < N; ++i) {
        let m: number = subdiagonal[i - 1] / diagonal[i - 1];
        diagonal[i] -= m * superdiagonal[i - 1];
        rhs[i] -= m * rhs[i - 1];
    }

    solution[N - 1] = rhs[N - 1] / diagonal[N - 1];

    for (let i: number = N - 2; i >= 0; --i) {
        solution[i] = (rhs[i] - superdiagonal[i] * solution[i + 1]) / diagonal[i];
    }
}