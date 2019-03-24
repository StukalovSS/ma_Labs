import java.util.ArrayList;

public class MerclyHellmanCrypt {

    public static void main (String[] args) {
        System.out.println("| Mercly-Hellman |");
        System.out.println();

        long[] w = {2, 3, 7, 14, 32, 66};
        long q = 201;
        long r = 34;
        
        //СКВАЖИНА
        long[][] m = {{0,1,0,0,1,0}, 
                      {0,0,1,0,1,1}, 
                      {0,0,0,0,1,1}, 
                      {0,0,0,0,0,1}, 
                      {0,0,0,1,1,0}, 
                      {0,0,1,0,0,1}, 
                      {0,0,1,1,1,0}, 
                      {0,0,0,0,0,1}};
        
        ArrayList<Long> a = new ArrayList<Long>();

        for (int i = 0; i < w.length; i++) {
            a.add(modp(r*w[i], q));
        }
        
        System.out.print("Count a: { ");
        for (long i : a){
            System.out.print(i + " ");
        }
        System.out.println("}");

       ArrayList<Long> result = new ArrayList<>();

       for (int i = 0; i < m.length; i++){
           long tempS = 0;
           for (int j = 0; j < m[i].length; j++){
               tempS += a.get(j)*m[i][j];
               System.out.println("Cur. i: " + i + ", cur. j: " + j + " cur. m[i][j]: " + m[i][j]);
           }
           result.add(tempS);
       }

        System.out.println(">--------------Result-----------------<");
        for (long elem : result){
            System.out.print(elem + " ");
        }
        System.out.println();
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