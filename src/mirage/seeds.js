export default function seeds(server) {
  server.createList("contact", 5);
  server.create("contact", { name: "ola" });
}
