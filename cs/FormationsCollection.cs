using System.Unity;
using System.Generics.Collection;

class FormationCollection
{
    private Dictionary<string, List<int[]>> possibleFormations = {
        { "ROW_NATURAL": buildRows(FORMATION_DIRECTIONS.NATURAL) },
        { "ROW_ASC": buildRows(FORMATION_DIRECTIONS.ASC) },
        { "ROW_DESC": buildRows(FORMATION_DIRECTIONS.DESC) },
        { "COLUMN_NATURAL": buildColumns(FORMATION_DIRECTIONS.NATURAL) },
        { "COLUMN_ASC": buildColumns(FORMATION_DIRECTIONS.ASC) },
        { "COLUMN_DESC": buildColumns(FORMATION_DIRECTIONS.DESC) },
        { "DIAGONAL_NATURAL": buildDiagonals(FORMATION_DIRECTIONS.NATURAL) },
        { "DIAGONAL_ASC": buildDiagonals(FORMATION_DIRECTIONS.ASC) },
        { "DIAGONAL_DESC": buildDiagonals(FORMATION_DIRECTIONS.DESC) },
        { "STACK_NATURAL": buildStacks(FORMATION_DIRECTIONS.NATURAL) }
    };


    public FormationsCollection()
    {
        // TODO: change to list
        int[] formations = new int[];
        buildFormationModels();
    }

    void buildFormationModels()
    {
        for (var formation in possibleFormations)
        {
            createNewModelsFromFormations(formation.Value, formation.Key);
        }
    }

    void createNewModelsFromFormations(string formationName, int[] formationList)
    {
        for (var i = 0; i < formationList.GetLength(0); i++)
        {
            const formationModel = new FormationModel(formationName, formationList[i]);

            addFormationToCollection(formationModel);
        }
    }

    void addFormationToCollection(int[] formationToAdd)
    {
        if (formationToAdd instanceof FormationModel)
        {
            formations.push(formationToAdd);
        }
    }
}
