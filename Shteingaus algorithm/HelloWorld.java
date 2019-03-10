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
            System.out.println(modp(Math.pow(q, i), m));
            if (x == modp(Math.pow(q, i), m)){
                System.out.println("alpha " + i);
                break;
            }
        }

        System.out.println("Find beta...");
        for (long i = 0; i < w; i++){
            System.out.println(modp(Math.pow(q, i), m));
            if (y == modp(Math.pow(q, i), m)){
                System.out.println("betta " + i);
                break;
            }
        }
        System.out.println("Finish");
    }

    public static long modp(double a, double  b) {
        if (a > 0) {
            return (long) a % (long) b;
        } else {
            return Math.abs(-((long)(a/b)) + 1 *((long)b) + ((long)a));
        }
    }
  
}