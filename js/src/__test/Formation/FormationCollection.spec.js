import ava from 'ava';

import FormationCollection from '../../Formation/FormationCollection';

const POINT = [0, 0, 0];

ava('#FormationCollection instantiates without paramaters', t => {
    t.notThrows(() => new FormationCollection());
});

// ava('.buildFormationModelsFromPossibleFormations() sets an array of values for formations', t => {
//     const collection = new FormationCollection();
//     collection.formations = []
//
//     collection.buildFormationModelsFromPossibleFormations();
//     t.truthy(Array.isArray(collection.formations));
// });

// ava('.createNewModelsFromFormations() ', t => {
//     const collection = new FormationCollection();
// });
//
// ava('.addFormationToCollection() ', t => {
//     const collection = new FormationCollection();
// });

ava('.filterFormationsForPoint() returns all formations that contain a point', t => {
    const collection = new FormationCollection();
    const result = collection.filterFormationsForPoint(POINT);

    for (let i = 0; i < result.length; i++) {
        const formation = result[i];

        t.truthy(formation.points[0][0] === POINT[0]);
        t.truthy(formation.points[0][1] === POINT[1]);
        t.truthy(formation.points[0][2] === POINT[2]);
    }
});
