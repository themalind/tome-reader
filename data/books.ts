export interface Book {
  id: string;
  title: string;
  author: string;
  slug: string;
  image: string;
  review: string;
  grade: number;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The last kingdom",
    author: "Bernard Cornwell",
    slug: "the-last-kingdom",
    image: "../assets/images/lastKingdome.jpg",
    review: "En spännande historisk roman om Uhtreds kamp mellan två världar. Fartfyllt och välskrivet.",
    grade: 5,
  },
  {
    id: "2",
    title: "Förvandlingen",
    author: "Franz Kafka",
    slug: "forvandlingen",
    image: "../assets/images/forvandlingen_pocket.jpg",
    review: "Klassisk berättelse om alienation och identitet. Kafkas stil är både absurd och fängslande.",
    grade: 5,
  },
  {
    id: "3",
    title: "Hobbiten",
    author: "JRR Tolkien",
    slug: "hobbiten",
    image: "../assets/images/hobbiten-eller-bort-och-hem-igen_haftad.jpg",
    review: "Ett äventyr i sagornas värld som introducerar Tolkiens universum. Varm och humoristisk.",
    grade: 5,
  },
  {
    id: "4",
    title: "Jomsviking",
    author: "Bjørn Andreas Bull-Hansen",
    slug: "jomsviking",
    image: "jomsviking-pocket.jpg",
    review: "Rå och levande skildring av vikingatid. Gripande och välresearchad historisk roman.",
    grade: 5,
  },
  {
    id: "5",
    title: "Kafka på stranden",
    author: "Haruki Murakami",
    slug: "kafka-pa-stranden",
    image: "kafka-pa-stranden_storpocket.jpg",
    review: "Magisk realism och surrealism blandas i en unik berättelse. Mystisk och poetisk.",
    grade: 5,
  },
  {
    id: "6",
    title: "Lektioner i Kemi",
    author: "Bonnie Garmus",
    slug: "lektioner-i-kemi",
    image: "lektionerIKemi.jpg",
    review: "Charmig och humoristisk roman om en kvinnlig kemist på 60-talet. Inspirerande och smart.",
    grade: 5,
  },
  {
    id: "7",
    title: "Mina drömmars stad",
    author: "Per Anders Fogelström",
    slug: "mina-drommars-stad",
    image: "minaDrommarsStad.jpg",
    review: "Fängslande skildring av livet i Stockholm under 1800-talet. Varm och samhällsnära.",
    grade: 5,
  },
  {
    id: "8",
    title: "Ringens brödrarskap",
    author: "JRR Tolkien",
    slug: "ringens-brodrarskap",
    image: "ringens-brodraskap_haftad.jpg",
    review: "Första delen i Sagan om ringen. Episk fantasy som bygger vidare på Hobbiten.",
    grade: 5,
  },
  {
    id: "9",
    title: "Skrapenatta",
    author: "Lars Mytting",
    slug: "skrapenatta",
    image: "skrapenatta_pocket.jpg",
    review: "Mystik och historia vävs samman i denna berättelse från Norge. Stämningsfull och tät.",
    grade: 5,
  },
  {
    id: "10",
    title: "Svärdet och spiran",
    author: "Ken Follett",
    slug: "svardet-och-spiran",
    image: "svardet-och-spiran_storpocket.jpg",
    review: "En mäktig medeltidsroman om makt, kärlek och intriger. Levande miljöer och karaktärer.",
    grade: 5,
  },
  {
    id: "11",
    title: "Färskt vatten till blommorna",
    author: "Valerie Perrin",
    slug: "farskt-vatten-till-blommorna",
    image: "vattenTillBlommorna.jpg",
    review: "En poetisk och berörande berättelse om sorg och livets små mirakel. Vacker och hoppfull.",
    grade: 5,
  },
];
