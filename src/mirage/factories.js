import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";
const ramdomNumber = (quantity) => Math.floor(Math.random() * quantity) + 1;
const photoUrl = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVzc29hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVzc29hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlc3NvYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBlc3NvYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlc3NvYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
];
export default {
  contact: Factory.extend({
    name() {
      return faker.name.fullName();
    },
    email() {
      return faker.internet.email();
    },
    phone() {
      return faker.phone.number("(62)#####-####");
    },
    motherName() {
      return faker.name.fullName();
    },
    photo_url() {
      return photoUrl[ramdomNumber(5)];
    },
    cpf() {
      return faker.helpers.replaceSymbolWithNumber("###########");
    },
    cns() {
      return faker.helpers.replaceSymbolWithNumber("###############");
    },
    adress: {
      cep: 74922330,
      adress: "",
      city: "",
      state: "",
      ville: "",
    },
    birthday: () => faker.date.recent(),
  }),
};
