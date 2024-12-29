export interface BlogAuthor {
  name: string;
  url: string;
  image: string;
}

export const blogAuthors: { [authorName: string]: BlogAuthor } = {
  fabrizio_duroni: {
    name: "Fabrizio Duroni",
    url: "https://www.linkedin.com/in/fabrizio-duroni/",
    image: "fabrizio-duroni-small.jpg",
  },
  francesco_bonfadelli: {
    name: "Francesco Bonfadelli",
    url: "https://www.linkedin.com/in/fbonfadelli/",
    image: "francesco-bonfadelli.jpg",
  },
  alessandro_romano: {
    name: "Alessandro Romano",
    url: "https://www.linkedin.com/in/alessandroromano92/",
    image: "alessandro-romano.jpg",
  },
  emanuele_ianni: {
    name: "Emanuele Ianni",
    url: "https://www.linkedin.com/in/emanueleianni/",
    image: "emanuele-ianni.jpg",
  },
  tommaso_resti: {
    name: "Tommaso Resti",
    url: "https://www.linkedin.com/in/tommaso-resti-0ab5285a/",
    image: "tommaso-resti.jpg",
  },
  mariano_patafio: {
    name: "Mariano Patafio",
    url: "https://www.linkedin.com/in/mariano-patafio-4a8b7426/",
    image: "mariano-patafio.jpg",
  },
  angelo_sciarra: {
    name: "Angelo Sciarra",
    url: "https://www.linkedin.com/in/angelosciarra/",
    image: "angelo-sciarra.jpg",
  },
  giordano_tamburrelli: {
    name: "Giordano Tamburrelli",
    url: "https://www.linkedin.com/in/giordano-tamburrelli-b532334/",
    image: "giordano-tamburrelli.jpg",
  },
  felice_giovinazzo: {
    name: "Felice Giovinazzo",
    url: "https://www.linkedin.com/in/felice-giovinazzo-17277b55/",
    image: "felice-giovinazzo.jpg",
  },
  marco_de_lucchi: {
    name: "Marco De Lucchi",
    url: "https://www.linkedin.com/in/marcodelucchi/",
    image: "marco-de-lucchi.jpg",
  },
  stefano_varesi: {
    name: "Stefano Varesi",
    url: "https://www.linkedin.com/in/stefanovaresi/",
    image: "stefano-varesi.jpg",
  },
  alex_stabile: {
    name: "Alex Stabile",
    url: "https://www.linkedin.com/in/alex-stabile-a9316b94/",
    image: "alex-stabile.jpg",
  },
  sam_campisi: {
    name: "Sam Campisi",
    url: "https://www.linkedin.com/in/samantha-campisi-9a70b5a1/",
    image: "sam-campisi.jpg",
  },
};

export const authorName = (author: string) => author!.split("_").join("-");
