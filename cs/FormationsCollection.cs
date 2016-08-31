using System.Collections.Generic;

public class FormationsCollection
{

    public List<FormationModel> formations = new List<FormationModel>();

    public FormationsCollection()
    {
        List<FormationModel> possibleFormations = new List<FormationModel>();
        possibleFormations.AddRange(FormationModelBuilder.buildFormationModelsFromPossibleFormations());

        addFormationListToCollection(possibleFormations);
    }

    void addFormationListToCollection(List<FormationModel> formationList)
    {
        for (var i = 0; i < formationList.Count; i++)
        {
            addFormationToCollection(formationList[i]);
        }
    }

    void addFormationToCollection(FormationModel formationToAdd)
    {
//        Debug.Log(formationToAdd.formationType);

        formations.Add(formationToAdd);
    }
}
