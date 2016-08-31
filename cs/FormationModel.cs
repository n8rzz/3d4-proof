using System.Collections.Generic;

public class FormationModel
{
	public string formationType;
	public List<FormationPointModel> pointList = new List<FormationPointModel>();

	public FormationModel(string type, List<FormationPointModel> pointsToAdd)
	{
		formationType = type;
		pointList = pointsToAdd;

		addPointsToPointList(pointsToAdd);
	}

	private void addPointsToPointList(List<FormationPointModel> pointsToAdd)
	{
		for (var i = 0; i < pointsToAdd.Count; i++)
		{
			pointList.Add(pointsToAdd[i]);
		}
	}
}
