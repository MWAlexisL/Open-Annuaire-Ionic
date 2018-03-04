export class Filters {
  depet: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  libnj: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  codpos: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  siret: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  apet700: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  categorie: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  tca: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  address: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  dcren: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  tefet: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
  libreg_new: {
    filter?: Filter[],
    visible?: boolean
  } = { visible: false};
}

export class Filter {
  data?: string;
  nhits?: number;
  dateBefore?: boolean;
}

export class Constants {
  public revenues = [
    'Moins de 0.5 million d\'euros',
    'De 0.5 à 1 million d\'euros',
    'De 1 à 2 millions d\'euros',
    'De 2 à 5 millions d\'euros',
    'De 5 à 10 millions d\'euros',
    'De 10 à 20 millions d\'euros',
    'De 20 à 50 millions d\'euros',
    'De 50 à 100 millions d\'euros',
    'De 100 à 200 millions d\'euros',
    '200 millions d\'euros ou plus',
  ];

  effectifs = [
    {
      value: '00',
      libelle: '0 salarié'
    }, {
      value: '01',
      libelle: '1 ou 2 salariés'
    }, {
      value: '02',
      libelle: '3 à 5 salariés'
    }, {
      value: '11',
      libelle: '10 à 19 salariés'
    }, {
      value: '12',
      libelle: '20 à 49 salariés'
    }, {
      value: '21',
      libelle: '50 à 99 salariés'
    }, {
      value: '22',
      libelle: '100 à 199 salariés'
    }, {
      value: '31',
      libelle: '200 à 249 salariés'
    }, {
      value: '32',
      libelle: '250 à 499 salariés'
    }, {
      value: '41',
      libelle: '500 à 999 salariés'
    }, {
      value: '42',
      libelle: '1 000 à 1 999 salariés'
    }, {
      value: '51',
      libelle: '2 000 à 4 999 salariés'
    }, {
      value: '52',
      libelle: '5 000 à 9 999 salariés'
    }, {
      value: '53',
      libelle: '10 000 salariés et plus'
    },
  ];

  categories = [
    {
      value: 'PME',
      libelle: 'Petite ou Moyenne Entreprise'
    }, {
      value: 'ETI',
      libelle: 'Entreprise de Taille Intermédiaire'
    }, {
      value: 'GE',
      libelle: 'Grande Entreprise'
    },
  ];
}



