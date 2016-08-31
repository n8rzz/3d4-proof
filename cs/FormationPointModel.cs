public class FormationPointModel
{
    int level;
    int row;
    int column;

    public FormationPointModel(int level, int row, int column)
    {
        this.level = level;
        this.row = row;
        this.column = column;
    }

    // FIXME: Move method to static utility class
    // public bool isEqualToComparePoint(FormationPointModel comparePoint)
    // {
    //     return comparePoint.level == this.level &&
    //         comparePoint.row == this.row &&
    //         comparePoint.column == this.column;
    // }

    // public int[] toArray()
    // {
    //     int[] arr = new int[] {level, row, column};

    //     return arr;
    // }
}
