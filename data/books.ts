export interface Book {
  id: string;
  title: string;
  author: string;
  slug: string;
  imagePath: any;
  ISBN: string;
  readDate: Date;
  dateAdded: Date;
  review: string;
  grade: number | undefined;
}

export const mockbooks: Book[] = [
  {
    id: "1",
    title: "The last kingdom",
    author: "Bernard Cornwell",
    slug: "the-last-kingdom",
    imagePath: require("../assets/images/lastKingdom.jpg"),
    ISBN: "978-0060887186",
    review:
      "En spännande historisk roman om Uhtreds kamp mellan två världar. Fartfyllt och välskrivet.",
    grade: 5,
    readDate: new Date("2024-01-15"),
    dateAdded: new Date("2024-01-10"),
  },
  {
    id: "2",
    title: "Förvandlingen",
    author: "Franz Kafka",
    slug: "forvandlingen",
    imagePath: require("../assets/images/forvandlingen_pocket.jpg"),
    ISBN: "978-9177422822",
    review:
      "Klassisk berättelse om alienation och identitet. Kafkas stil är både absurd och fängslande.",
    grade: 5,
    readDate: new Date("2024-02-03"),
    dateAdded: new Date("2024-01-28"),
  },
  {
    id: "3",
    title: "Hobbiten",
    author: "JRR Tolkien",
    slug: "hobbiten",
    imagePath: require("../assets/images/hobbiten-eller-bort-och-hem-igen_haftad.jpg"),
    ISBN: "978-91-1-308489-3",
    review:
      "Ett äventyr i sagornas värld som introducerar Tolkiens universum. Varm och humoristisk.",
    grade: 5,
    readDate: new Date("2024-02-20"),
    dateAdded: new Date("2024-02-15"),
  },
  {
    id: "4",
    title: "Jomsviking",
    author: "Bjørn Andreas Bull-Hansen",
    slug: "jomsviking",
    imagePath: require("../assets/images/jomsviking_pocket.jpg"),
    ISBN: "978-9179033088",
    review:
      "Rå och levande skildring av vikingatid. Gripande och välresearchad historisk roman.",
    grade: 5,
    readDate: new Date("2024-03-01"),
    dateAdded: new Date("2024-02-25"),
  },
  {
    id: "5",
    title: "Kafka på stranden",
    author: "Haruki Murakami",
    slug: "kafka-pa-stranden",
    imagePath: require("../assets/images/kafka-pa-stranden_storpocket.jpg"),
    ISBN: "978-0679776434",
    review:
      "Magisk realism och surrealism blandas i en unik berättelse. Mystisk och poetisk.",
    grade: 5,
    readDate: new Date("2024-03-15"),
    dateAdded: new Date("2024-03-10"),
  },
  {
    id: "6",
    title: "Lektioner i Kemi",
    author: "Bonnie Garmus",
    slug: "lektioner-i-kemi",
    imagePath: require("../assets/images/lektionerIKemi.jpg"),
    ISBN: "978-9146237921",
    review:
      "Charmig och humoristisk roman om en kvinnlig kemist på 60-talet. Inspirerande och smart.",
    grade: 5,
    readDate: new Date("2024-04-05"),
    dateAdded: new Date("2024-04-01"),
  },
  {
    id: "7",
    title: "Mina drömmars stad",
    author: "Per Anders Fogelström",
    slug: "mina-drommars-stad",
    imagePath: require("../assets/images/minaDrommarsStad.jpg"),
    ISBN: "978-9100123758",
    review:
      "Fängslande skildring av livet i Stockholm under 1800-talet. Varm och samhällsnära.",
    grade: 5,
    readDate: new Date("2024-04-20"),
    dateAdded: new Date("2024-04-15"),
  },
  {
    id: "8",
    title: "Ringens brödrarskap",
    author: "JRR Tolkien",
    slug: "ringens-brodrarskap",
    imagePath: require("../assets/images/ringens-brodraskap_haftad.jpg"),
    ISBN: "978-9113084909",
    review:
      "Första delen i Sagan om ringen. Episk fantasy som bygger vidare på Hobbiten.",
    grade: 5,
    readDate: new Date("2024-05-10"),
    dateAdded: new Date("2024-05-01"),
  },
  {
    id: "9",
    title: "Skrapenatta",
    author: "Lars Mytting",
    slug: "skrapenatta",
    imagePath: require("../assets/images/skrapenatta_pocket.jpg"),
    ISBN: "978-9146235613",
    review:
      "Mystik och historia vävs samman i denna berättelse från Norge. Stämningsfull och tät.",
    grade: 5,
    readDate: new Date("2024-05-25"),
    dateAdded: new Date("2024-05-20"),
  },
  {
    id: "10",
    title: "Svärdet och spiran",
    author: "Ken Follett",
    slug: "svardet-och-spiran",
    imagePath: require("../assets/images/svardet-och-spiran_storpocket.jpg"),
    ISBN: "978-9100172657",
    review:
      "En mäktig medeltidsroman om makt, kärlek och intriger. Levande miljöer och karaktärer.",
    grade: 5,
    readDate: new Date("2024-06-10"),
    dateAdded: new Date("2024-06-05"),
  },
  {
    id: "11",
    title: "Färskt vatten till blommorna",
    author: "Valérie Perrin",
    slug: "farskt-vatten-till-blommorna",
    imagePath: require("../assets/images/vattenTillBlommorna.jpg"),
    ISBN: "978-9152731130",
    review:
      "En poetisk och berörande berättelse om sorg och livets små mirakel. Vacker och hoppfull.",
    grade: 5,
    readDate: new Date("2024-06-25"),
    dateAdded: new Date("2024-06-20"),
  },
];
