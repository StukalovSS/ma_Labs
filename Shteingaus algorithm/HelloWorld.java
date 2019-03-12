public class HelloWorld {

    public static void main (String[] args) {
        System.out.println("Hello world");
        // long x = 38421;
        // long y = 14092;
        long x = 11108;
        long y = 35218;
        long m = 41903;
        long q = 10109;
        long w = 100000000;

        System.out.println("Find alpha...");
        long alpha = 1;
        long tmp = modp(pow(q, alpha), m);

        System.out.println(tmp);

        while (modp(tmp, m) != x) {
            tmp = modp(tmp*q, m);
            alpha += 1;
        }
        System.out.println("alpha " + alpha);

        System.out.println("Find beta...");
        long beta = 1;
        tmp = modp(pow(q, beta), m);

        while (modp(tmp, m) != y) {
            tmp = modp(tmp*q, m);
            beta += 1;
        }
        System.out.println("beta " + beta);

        // for (long i = 0; i < w; i++){
        //     if (y == modp(pow(q, i), m)){
        //         System.out.println("betta " + i);
        //         beta = 1;
        //         break;
        //     }
        // }

        System.out.println("SecretKey (alpha): " + modp(pow(y, alpha), m));
        System.out.println("SecretKey (beta): " + modp(pow(x, beta), m));
        System.out.println("Finish");
    }

    public static long modp(long a, long  b) {
        if (a > 0) {
            return a % b;
        } else {
            return Math.abs(-((a/b)) + 1 *(b) + (a));
        }
    }

    public static long pow(long a, long b) {
        long res = a;
        for (long i = 0; i < b-1; i++){
            res*=a;
        }
        return res;
    }
}