public class HelloWorld {

    public static void main (String[] args) {
        System.out.println("Hello world");
        long x = 11108;
        long y = 35218;
        long m = 41903;
        long q = 10109;
        long w = 100000000;

        System.out.println("Find alpha...");
        for (long i = 0; i < w; i++) {
            if (x == modp(pow(q, i), m)){
                System.out.println("alpha " + i);
                break;
            }
        }

        System.out.println("Find beta...");
        for (long i = 0; i < w; i++){
            if (y == modp(pow(q, i), m)){
                System.out.println("betta " + i);
                break;
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