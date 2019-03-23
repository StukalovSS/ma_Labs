import java.util.ArrayList;

public class MerclyHellman {

    public static void main (String[] args) {
        System.out.println("| Mercly-Hellman |");
        System.out.println();

        long[] w = {1, 3, 6, 13, 29, 59};
        long[] x = {328, 116, 212, 119, 258, 162, 365};
        long q = 190;
        long r = 31;
        
        ArrayList<Long> a = new ArrayList<Long>();

        for (int i = 0; i < w.length; i++) {
            a.add(modp(r*w[i], q));
        }
        
        System.out.print("Count a: { ");
        for (long i : a){
            System.out.print(i + " ");
        }
        System.out.println("}");

        // long rRev = 69;
        long rRev = 0;
        while (modp(r*rRev, q) != 1){
            rRev += 1;
        }
        System.out.println("Find -r : " + rRev);

        //получаем S`
        ArrayList<Long> sMark = new ArrayList<Long>();
        for (int i = 0; i < x.length; i++){
            sMark.add(modp(x[i]*rRev, q));
        }

        System.out.print("Calc S`: { ");
        for (long i : sMark){
            System.out.print(i + " ");
        }
        System.out.println("}");

        ArrayList<ArrayList<Long>> m = new ArrayList<ArrayList<Long>>();
        
        for (long iKey : sMark) {
            ArrayList<Long> elem = new ArrayList<Long>();
            long tmpS = iKey;
            for (int i = 0; i < w.length; i++) {
                long mi = w[((w.length - 1) - i)] > tmpS ? 0 : 1;
                elem.add(0, mi);
                tmpS = tmpS - w[((w.length - 1) - i)]*mi;
            }
            m.add(elem);
        }

        System.out.println(">--------------Result-----------------<");
        for (ArrayList<Long> list : m){
            System.out.print("> ");
            for (long val : list) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
        System.out.println(">-------------------------------------<");
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