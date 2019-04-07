public class Auth {

    public static void main (String[] args) {
        System.out.println("Hello world");
        long p = 33107;
        long q = 16553;
        long g = 2902;
        long y = 9107;
        long r = 32607;

        long itr = 1000000;

        System.out.println("Calc K...");

        long k = 1;
        long modpOne = modp(1, p);
        long tempVal = pow(q, k);

        // while (tempVal*y != modpOne) {
        //     tempVal = tempVal*g;
        //     k += 1; 
        // }
        System.out.println("K: " + k);

        for (long i = 0; i < itr; i++) {
            if (pow(q, i)*y == modpOne) {
                System.out.println("K: " + i);
            }
        }
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
        for (long i = 0; i < b; i++){
            res*=a;
        }
        return res;
    }
}