/*
 * Práctica 1: Resolución de una ecuación de segundo grado en C++
 * Principios de Programación - Escola Universitària Gimbernat
 *
 * Enunciado: el programa pide los coeficientes enteros a, b y c de la
 * ecuación a·x² + b·x + c = 0 y muestra sus soluciones indicando su tipo:
 *   - a = 0  -> no es de segundo grado, no se resuelve.
 *   - Δ > 0  -> dos soluciones reales distintas.
 *   - Δ = 0  -> una solución real doble.
 *   - Δ < 0  -> dos soluciones complejas conjugadas (x = p ± q·i).
 */

#include <stdio.h>
#include <math.h>
#include <locale.h>   // setlocale
#include <stdlib.h>   // system("pause")

int main() {
    // Activar los acentos de la consola
    setlocale(LC_ALL, "spanish");

    int a, b, c;                          // Coeficientes de la ecuación
    double x1, x2, discriminante;         // Soluciones reales y discriminante
    double parteReal, parteImaginaria;    // Partes de las soluciones complejas

    printf("=== Resolucion de Ecuacion de Segundo Grado ($ax^2 + bx + c = 0$) ===\n");
    // Lectura de los coeficientes
    printf("Ingrese el valor de a: ");
    scanf("%d",&a);
    printf("Ingrese el valor de b: ");
    scanf("%d",&b);
     printf("Ingrese el valor de c: ");
    scanf("%d",&c);

    // Verificar si es una ecuación de segundo grado
    if (a == 0) {
        printf("\nEl coeficiente a es 0: no es una ecuación de segundo grado y no se puede resolver con este programa.\n");
    } else {
        // Calcular el discriminante: b^2 - 4ac
        discriminante = (b * b) - (4 * a * c);

        if (discriminante > 0) {
            // Dos soluciones reales distintas
            x1 = (-b + sqrt(discriminante)) / (2 * a);
            x2 = (-b - sqrt(discriminante)) / (2 * a);
            if (x1 == 0) x1 = 0;   // Evitar el "cero negativo"
            if (x2 == 0) x2 = 0;
            printf( "\nLa ecuacion tiene dos soluciones reales distintas:\n" );
            printf ("x1 = %.4f\n", x1);
            printf ("x2 = %.4f\n", x2);
        } else if (discriminante == 0) {
            // Una única solución real (raíz doble)
            x1 = -b / (double) (2 * a);
            if (x1 == 0) x1 = 0;   // Evitar el "cero negativo"
            printf("\nLa ecuacion tiene una unica solucion real:\n");
            printf("x1 = x2 = %.4f\n",x1);
        } else {
            // Soluciones con números complejos / imaginarios
            printf("\nEl discriminante es negativo. La ecuacion no tiene soluciones reales.\n");
            // Parte real p = -b/(2a) y parte imaginaria q = sqrt(-Δ)/|2a|
            parteReal = -b / (2.0 * a);
            parteImaginaria = sqrt(-discriminante) / fabs(2.0 * a);
            if (parteReal == 0) parteReal = 0;   // Evitar el "cero negativo"
            printf("Dos soluciones complejas conjugadas:\n");
            printf("x1 = %.4f + %.4fi\n", parteReal, parteImaginaria);
            printf("x2 = %.4f - %.4fi\n", parteReal, parteImaginaria);
        }
    }

    // Pausa para que el usuario pueda leer el resultado
    system("pause");
    return 0;
}
