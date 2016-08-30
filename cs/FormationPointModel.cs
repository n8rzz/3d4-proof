using System;
using Sytem.Collections;

public class FormationPointModel
{
    public int level;
    public int row;
    public int column;

    public FormationPointModel(int level, int row, int column)
    {
        level = level;
        row = row;
        column = column;
    }

    public boolean isEqualToComparePoint(FormationpointModel comparePoint)
    {
        return comparePoint.level === level &&
            comparePoint.row === row &&
            comparePoint.column === column;
    }

    public int[] toArray()
    {
        const arr = new int[] {level, row, column};

        return arr;
    }
}
