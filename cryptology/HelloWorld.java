public class HelloWorld {

    public static void main (String[] args) {
        //Look for the BigInteger class
        // https://docs.oracle.com/javase/7/docs/api/java/math/BigInteger.html
        
        System.out.println("Diffy-Hellman");
        System.out.println();
        
        // long x = 38421;
        // long y = 14092;
        long x = 11108;
        long y = 35218;
        long m = 41903;
        long q = 10109;

        System.out.print("Find alpha... ");
        long alpha = 1;
        long tmp = modp(pow(q, alpha), m);

        // System.out.println(tmp);

        while (modp(tmp, m) != x) {
            tmp = modp(tmp*q, m);
            alpha += 1;
        }
        System.out.println(alpha);

        System.out.print("Find beta... ");
        long beta = 1;
        tmp = modp(pow(q, beta), m);

        while (modp(tmp, m) != y) {
            tmp = modp(tmp*q, m);
            beta += 1;
        }
        System.out.println(beta);

        System.out.println(pow(y, 2));

        System.out.println("SecretKey (alpha): " + modp(pow(y, alpha), m));
        System.out.println("SecretKey (beta): " + modp(pow(x, beta), m));

        System.out.println("Finish");
    }

    public static long modp(long a, long  b) {
        if (a > 0) {
            return a % b;
        } else if (a == 0) {
            return 0;
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