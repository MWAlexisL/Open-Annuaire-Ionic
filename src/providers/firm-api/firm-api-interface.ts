export interface FirmApiCompaniesInterface {
  nhits: number;
  parameters: {};
  records: CompanyInterface[];
}

export interface CompanyInterface {
  fields: {
    siret: string;
    apet700: string;
    categorie: string;
    depet: string; // Departement
    libcom: string;
    codpos: string;
    libnj: string; // Statut juridique
    dcren: Date; // Date de création
    libtefet: string; // Effects
    libtca: string; // CA
    libreg_new: string;
    coordonnees: [number];
    l4_normalisee: string; // Adresse
    l1_declaree: string; // Nom
  };
}
