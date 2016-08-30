using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public static class FormationBuilder
{
    static private int MAX_LENGTH = 4;

    public static List<int[][]> buildRows(string variation)
    {
        List<int[][]> allRows = new List<int[][]>();

        switch (variation)
        {
            case "NATURAL":
                for (var level = 0; level < MAX_LENGTH; level++) {
                    for (var row = 0; row < MAX_LENGTH; row++) {
                        int[][] singleRow = new int[MAX_LENGTH][];

                        for (var cell = 0; cell < MAX_LENGTH; cell++) {
                            int[] singleCellInRow = new int[] {level, row, cell};

                            singleRow[row] = singleCellInRow;
                        }

                        allRows.Add(singleRow);
                    }
                }

                break;
            case "ASCENDING":
                for (var row = 0; row < MAX_LENGTH; row++) {
                    int[][] singleRow = new int[MAX_LENGTH][];

                    for (var levelAndCell = 0; levelAndCell < MAX_LENGTH; levelAndCell++) {
                        int[] singleCellInRow = new int[] {levelAndCell, row, levelAndCell};

                        singleRow[row] = singleCellInRow;
                    }

                    allRows.Add(singleRow);
                }

                break;
            case "DESCENDING":
                for (var row = 0; row < MAX_LENGTH; row++) {
                    var decrementor = 3;
                    int[][] singleRow = new int[MAX_LENGTH][];

                    for (var cell = 0; cell < MAX_LENGTH; cell++) {
                        int[] singleCellInRow = new int[] {decrementor, row, cell};

                        singleRow[row] = singleCellInRow;
                        decrementor--;
                    }

                    allRows.Add(singleRow);
                }

                break;
            default:
                break;
        }

        return allRows;
    }

    public static List<int[][]> buildColumns(string variation)
    {
        List<int[][]> allColumns = new List<int[][]>();

        switch (variation)
        {
            case "NATURAL":
                for (var level = 0; level < MAX_LENGTH; level++) {
                    for (var column = 0; column < MAX_LENGTH; column++) {
                        int[][] singleColumn = new int[MAX_LENGTH][];

                        for (var row = 0; row < MAX_LENGTH; row++) {
                            singleColumn[column] = new int[] {level, row, column};
                        }

                        allColumns.Add(singleColumn);
                    }
                }

                break;
            case "ASCENDING":
                for (var column = 0; column < MAX_LENGTH; column++) {
                    int[][] singleColumn = new int[MAX_LENGTH][];

                    for (var levelAndRow = 0; levelAndRow < MAX_LENGTH; levelAndRow++) {
                        singleColumn[column] = new int[] {levelAndRow, levelAndRow, column};
                    }

                    allColumns.Add(singleColumn);
                }

                break;
            case "DESCENDING":
                for (var column = 0; column < MAX_LENGTH; column++) {
                    var decrementor = 3;
                    int[][] singleColumn = new int[MAX_LENGTH][];

                    for (var row = 0; row < MAX_LENGTH; row++) {
                        singleColumn[column] = new int[] {decrementor, column, row};
                        decrementor--;
                    }

                    allColumns.Add(singleColumn);
                }

                break;
            default:
                break;
        }

        return allColumns;
    }

    public static List<int[][]> buildDiagonals(string variation)
    {
        int incrementor = 0;
        int decrementor = 3;
        int[][] topDiagonal = new int[MAX_LENGTH][];
        int[][] bottomDiagonal = new int[MAX_LENGTH][];
        List<int[][]> diagonals = new List<int[][]>();;

        switch (variation) {
            case "NATURAL":
                for (var level = 0; level < MAX_LENGTH; level++) {
                    decrementor = 3;

                    for (var i = 0; i < MAX_LENGTH; i++) {
                        topDiagonal[i] = new int[] {level, i, i};
                        bottomDiagonal[i] = new int[] {level, decrementor, i};

                        decrementor--;
                    }

                    diagonals.Add(topDiagonal);
                    diagonals.Add(bottomDiagonal);
                }

                break;
            case "ASCENDING":
                for (var i = 0; i < MAX_LENGTH; i++) {
                    topDiagonal[i] = new int[] {i, i, i};
                    bottomDiagonal[i] = new int[] {i, decrementor, i};

                    decrementor--;
                }

                diagonals.Add(topDiagonal);
                diagonals.Add(bottomDiagonal);

                break;
            case "DESCENDING":
                for (var i = 3; i >= 0; i--) {
                topDiagonal[i] = new int[] {i, incrementor, incrementor};
                bottomDiagonal[i] = new int[] {i, i, incrementor};

                    incrementor++;
                }

                diagonals.Add(topDiagonal);
                diagonals.Add(bottomDiagonal);

                break;
            default:
                break;
        }

        return diagonals;
    }

    public static List<int[][]> buildStacks()
    {
        List<int[][]> allStacks = new List<int[][]>();

        for (var row = 0; row < MAX_LENGTH; row++) {
            for (var cell = 0; cell < MAX_LENGTH; cell++) {
                int[][] singleStack = new int[MAX_LENGTH][];

                for (var level = 0; level < MAX_LENGTH; level++) {
                    int[] stack = new int[] {level, row, cell};
                    singleStack[cell] = stack;
                }

                allStacks.Add(singleStack);
            }
        }

        return allStacks;
    }
}
