export interface Book {
  id: string;
  title: string;
  author: string;
  slug: string;
  image: any;
  ISBN: string;
  review: string;
  grade: number;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The last kingdom",
    author: "Bernard Cornwell",
    slug: "the-last-kingdom",
    image: require("../assets/images/lastKingdom.jpg"),
    ISBN: "978-0060887186", // :contentReference[oaicite:0]{index=0}
    review: "En spännande historisk roman om Uhtreds kamp mellan två världar. Fartfyllt och välskrivet.",
    grade: 5,
  },
  {
    id: "2",
    title: "Förvandlingen",
    author: "Franz Kafka",
    slug: "forvandlingen",
    image: require("../assets/images/forvandlingen_pocket.jpg"),
    ISBN: "978-9177422822", // enligt tidigare nämnd källa
    review: "Klassisk berättelse om alienation och identitet. Kafkas stil är både absurd och fängslande.",
    grade: 5,
  },
  {
    id: "3",
    title: "Hobbiten",
    author: "JRR Tolkien",
    slug: "hobbiten",
    image: require("../assets/images/hobbiten-eller-bort-och-hem-igen_haftad.jpg"),
    ISBN: "978-91-1-308489-3", // svensk utgåva från Norstedts 2021 :contentReference[oaicite:1]{index=1}
    review: "Ett äventyr i sagornas värld som introducerar Tolkiens universum. Varm och humoristisk.",
    grade: 5,
  },
  {
    id: "4",
    title: "Jomsviking",
    author: "Bjørn Andreas Bull-Hansen",
    slug: "jomsviking",
    image: require("../assets/images/jomsviking_pocket.jpg"),
    ISBN: "978-9179033088", // svensk/översättning utgåva enligt Biblio :contentReference[oaicite:2]{index=2}
    review: "Rå och levande skildring av vikingatid. Gripande och välresearchad historisk roman.",
    grade: 5,
  },
  {
    id: "5",
    title: "Kafka på stranden",
    author: "Haruki Murakami",
    slug: "kafka-pa-stranden",
    image: require("../assets/images/kafka-pa-stranden_storpocket.jpg"),
    ISBN: "978-0679776434", // engelska original (kan variera beroende på svensk översättning)
    review: "Magisk realism och surrealism blandas i en unik berättelse. Mystisk och poetisk.",
    grade: 5,
  },
  {
    id: "6",
    title: "Lektioner i Kemi",
    author: "Bonnie Garmus",
    slug: "lektioner-i-kemi",
    image: require("../assets/images/lektionerIKemi.jpg"),
    ISBN: "978-9146237921", // svensk översättning “Lektioner i kemi” :contentReference[oaicite:3]{index=3}
    review: "Charmig och humoristisk roman om en kvinnlig kemist på 60-talet. Inspirerande och smart.",
    grade: 5,
  },
  {
    id: "7",
    title: "Mina drömmars stad",
    author: "Per Anders Fogelström",
    slug: "mina-drommars-stad",
    image: require("../assets/images/minaDrommarsStad.jpg"),
    ISBN: "978-9100123758", // svensk utgåva Bonnier, 2009 :contentReference[oaicite:4]{index=4}
    review: "Fängslande skildring av livet i Stockholm under 1800-talet. Varm och samhällsnära.",
    grade: 5,
  },
  {
    id: "8",
    title: "Ringens brödrarskap",
    author: "JRR Tolkien",
    slug: "ringens-brodrarskap",
    image: require("../assets/images/ringens-brodraskap_haftad.jpg"),
    ISBN: "978-9113084909", // svensk version av The Fellowship of the Ring (Norstedts 2021) :contentReference[oaicite:5]{index=5}
    review: "Första delen i Sagan om ringen. Episk fantasy som bygger vidare på Hobbiten.",
    grade: 5,
  },
  {
    id: "9",
    title: "Skrapenatta",
    author: "Lars Mytting",
    slug: "skrapenatta",
    image: require("../assets/images/skrapenatta_pocket.jpg"),
    ISBN: "978-9146235613", // svensk inbundet, Wahlström & Widstrand :contentReference[oaicite:6]{index=6}
    review: "Mystik och historia vävs samman i denna berättelse från Norge. Stämningsfull och tät.",
    grade: 5,
  },
  {
    id: "10",
    title: "Svärdet och spiran",
    author: "Ken Follett",
    slug: "svardet-och-spiran",
    image: require("../assets/images/svardet-och-spiran_storpocket.jpg"),
    ISBN: "978-9100172657", // svensk storpocket utgåva :contentReference[oaicite:7]{index=7}
    review: "En mäktig medeltidsroman om makt, kärlek och intriger. Levande miljöer och karaktärer.",
    grade: 5,
  },
  {
    id: "11",
    title: "Färskt vatten till blommorna",
    author: "Valérie Perrin",
    slug: "farskt-vatten-till-blommorna",
    image: require("../assets/images/vattenTillBlommorna.jpg"),
    ISBN: "978-9152731130", // svensk version, Éditions J :contentReference[oaicite:8]{index=8}
    review: "En poetisk och berörande berättelse om sorg och livets små mirakel. Vacker och hoppfull.",
    grade: 5,
  },
];
