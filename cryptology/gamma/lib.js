
function modp(a, b) {
    if (a > 0) {
        return a % b
    } if (a === 0) {
        return 0;
    } else{
        return Math.abs(-Math.trunc(a/b) + 1 * b + a)
    }
}

// ***************** //
// 2-nd lab (to java)
function count () {
    var a = 1;
    var res = 0;
    
    while (res != 38421 && a <= 100) {
        res = modp(Math.pow(10109, a), 41903)
        console.log(res)
        if (res === 38421) {
            alert(a);
        }
        if (!res) {
            alert(a  + ' ' +  Math.pow(10109, a))
            break;
        }
        a++;
    }

}

// count();



// ***************** //

function MH(w, r, q) {
    res = [];
    for (var i = 0; i <= w.length -1; i++) {
        res.push(modp(r*w[i], q))
    }
    console.log('a');
    console.log(res);
    return res;
}

function smth(m) {
    a = MH([2,3,7,15,31], 17, 61);
    res = [];
    for (var i = 0; i < m.length; i++) {
        res.push(a[i] * m[i]);
    }
    console.log('res')
    console.log(res);
    sum = 0;
    res.forEach(item => {
        sum += item;
    })
    console.log('sum')
    console.log(sum)
    console.log('------')
}

// to java
function shnor(e, s) {
    p = 33107;
    q = 16553;
    g = 2902;
    y = 9107;
    r = 32607;

    left = modp(r, p)
    console.log(left)
    right = modp(Math.pow(g, s) * Math.pow(y, e), p);
    console.log(Math.pow(g, s))

    return left === right;

}

// shnor(15776, 9856);

// smth([1,0,0,1,0])
// smth([0,0,1,1,1])
// smth([1,0,1,0,0])
