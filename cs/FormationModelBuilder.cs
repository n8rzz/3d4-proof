using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public static class FormationBuilder
{
    static private int MAX_LENGTH = 4;
    private Dictonary<string, List<FormationModel>> possibleFormations = new Dictonary<string, List<FormationModel>>


    public FormationBuilder()
    {
        possibleFormations.Add("ROW_NATURAL", buildRows("NATURAL"));
        possibleFormations.Add("ROW_ASCENDING", buildRows("ASCENDING"));
        possibleFormations.Add("ROW_DESCENDING", buildRows("DESCENDING"));
        possibleFormations.Add("COLUMN_NATURAL", buildColumns("NATURAL"));
        possibleFormations.Add("COLUMN_ASCENDING", buildColumns("ASCENDING"));
        possibleFormations.Add("COLUMN_DESCENDING", buildColumns("DESCENDING"));
        // possibleFormations.Add("DIAGONAL_NATURAL", buildDiagonals("NATURAL"));
        // possibleFormations.Add("DIAGONAL_ASCENDING", buildDiagonals("ASCENDING"));
        // possibleFormations.Add("DIAGONAL_DESCENDING", buildDiagonals("DESCENDING"));
        // possibleFormations.Add("STACK_NATURAL", buildStacks());
    }

    public static List<FormationModel> buildFormationModelsFromPossibleFormations()
    {
        List<FormationModel> formationModelList = new List<FormationModel>();

        for (var formation in POSSIBLE_FORMATIONS) {
            formationModelList.AddRange(
                createNewModelsFromFormationList(formation, POSSIBLE_FORMATIONS[formation])
            );
        }

        return formationModelList;
    };

    private static createNewModelsFromFormationList(formationName, formationList)
    {
        List<FormationModel> formationModels = new List<FormationModel>();

        for (var i = 0; i < formationList.length; i++) {
            FormationModel formationModel = new FormationModel(formationName, formationList[i]);

            formationModels.Add(formationModel);
        }

        return formationModels;
    };



    private static List<FormationModel> buildRows(string variation)
    {
        List<FormationModel> allRows = new List<FormationModel>();

        switch (variation)
        {
            case "NATURAL":
                for (var level = 0; level < MAX_LENGTH; level++) {
                    for (var row = 0; row < MAX_LENGTH; row++) {
                        List<FormationPointModel> singleRow = new List<FormationPointModel>();

                        for (var cell = 0; cell < MAX_LENGTH; cell++) {
                            FormationPointModel singleCellInRow = new FormationPointModel(level, row, cell);

                            singleRow.Add(singleCellInRow);
                        }

                        FormationModel formationModelForRow = new FormationModel(singleRow);
                        allRows.Add(formationModelForRow);
                    }
                }

                break;
            case "ASCENDING":
                for (var row = 0; row < MAX_LENGTH; row++) {
                    List<FormationPointModel> singleRow = new List<FormationPointModel>();

                    for (var levelAndCell = 0; levelAndCell < MAX_LENGTH; levelAndCell++) {
                        FormationPointModel singleCellInRow = new FormationPointModel(levelAndCell, row, levelAndCell);

                        singleRow.Add(singleCellInRow);
                    }

                    FormationModel formationModelForRow = new FormationModel(singleRow);
                    allRows.Add(formationModelForRow);
                }

                break;
            case "DESCENDING":
                for (var row = 0; row < MAX_LENGTH; row++) {
                    var decrementor = 3;
                    List<FormationModel> singleRow = new List<FormationModel>();

                    for (var cell = 0; cell < MAX_LENGTH; cell++) {
                        FormationPointModel singleCellInRow = new FormationPointModel(decrementor, row, cell);

                        singleRow.Add(singleCellInRow);
                        decrementor--;
                    }

                    FormationModel formationModelForRow = new FormationModel(singleRow);
                    allRows.Add(formationModelForRow);
                }

                break;
            default:
                break;
        }

        return allRows;
    }

    private static List<FormationModel> buildColumns(string variation)
    {
        List<FormationModel> allColumns = new List<FormationModel>();

        switch (variation)
        {
            case "NATURAL":
                for (var level = 0; level < MAX_LENGTH; level++) {
                    for (var column = 0; column < MAX_LENGTH; column++) {
                        List<FormationPointModel> singleColumn = new List<FormationPointModel>();

                        for (var row = 0; row < MAX_LENGTH; row++) {
                            singleColumn.Add(new FormationPointModel(level, row, column));
                        }

                        FormationModel formationModelForColumn = new FormationModel(singleColumn);
                        allColumns.Add(singleColumn);
                    }
                }

                break;
            case "ASCENDING":
                for (var column = 0; column < MAX_LENGTH; column++) {
                    List<FormationPointModel> singleColumn = new List<FormationPointModel>();

                    for (var levelAndRow = 0; levelAndRow < MAX_LENGTH; levelAndRow++) {
                        singleColumn.Add(new FormationPointModel(levelAndRow, levelAndRow, column));
                    }

                    FormationModel formationModelForColumn = new FormationModel(singleColumn);
                    allColumns.Add(singleColumn);
                }

                break;
            case "DESCENDING":
                for (var column = 0; column < MAX_LENGTH; column++) {
                    var decrementor = 3;
                    List<FormationPointModel> singleColumn = new List<FormationPointModel>();

                    for (var row = 0; row < MAX_LENGTH; row++) {
                        singleColumn.Add(new FormationPointModel(decrementor, column, row));
                        decrementor--;
                    }

                    FormationModel formationModelForColumn = new FormationModel(singleColumn);
                    allColumns.Add(singleColumn);
                }

                break;
            default:
                break;
        }

        return allColumns;
    }

    // private static List<int[][]> buildDiagonals(string variation)
    // {
    //     int incrementor = 0;
    //     int decrementor = 3;
    //     int[][] topDiagonal = new int[MAX_LENGTH][];
    //     int[][] bottomDiagonal = new int[MAX_LENGTH][];
    //     List<int[][]> diagonals = new List<int[][]>();;

    //     switch (variation) {
    //         case "NATURAL":
    //             for (var level = 0; level < MAX_LENGTH; level++) {
    //                 decrementor = 3;

    //                 for (var i = 0; i < MAX_LENGTH; i++) {
    //                     topDiagonal[i] = new int[] {level, i, i};
    //                     bottomDiagonal[i] = new int[] {level, decrementor, i};

    //                     decrementor--;
    //                 }

    //                 diagonals.Add(topDiagonal);
    //                 diagonals.Add(bottomDiagonal);
    //             }

    //             break;
    //         case "ASCENDING":
    //             for (var i = 0; i < MAX_LENGTH; i++) {
    //                 topDiagonal[i] = new int[] {i, i, i};
    //                 bottomDiagonal[i] = new int[] {i, decrementor, i};

    //                 decrementor--;
    //             }

    //             diagonals.Add(topDiagonal);
    //             diagonals.Add(bottomDiagonal);

    //             break;
    //         case "DESCENDING":
    //             for (var i = 3; i >= 0; i--) {
    //             topDiagonal[i] = new int[] {i, incrementor, incrementor};
    //             bottomDiagonal[i] = new int[] {i, i, incrementor};

    //                 incrementor++;
    //             }

    //             diagonals.Add(topDiagonal);
    //             diagonals.Add(bottomDiagonal);

    //             break;
    //         default:
    //             break;
    //     }

    //     return diagonals;
    // }

    // private static List<int[][]> buildStacks()
    // {
    //     List<int[][]> allStacks = new List<int[][]>();

    //     for (var row = 0; row < MAX_LENGTH; row++) {
    //         for (var cell = 0; cell < MAX_LENGTH; cell++) {
    //             int[][] singleStack = new int[MAX_LENGTH][];

    //             for (var level = 0; level < MAX_LENGTH; level++) {
    //                 int[] stack = new int[] {level, row, cell};
    //                 singleStack[cell] = stack;
    //             }

    //             allStacks.Add(singleStack);
    //         }
    //     }

    //     return allStacks;
    // }
}
