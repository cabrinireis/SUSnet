export default function routes() {
  this.namespace = "api";

  this.get("/contacts", function (schema, request) {
    const query = request.queryParams.query;
    const data = schema.contacts.all();
    let filter = data.filter((q) => {
      return q.name.toLowerCase().includes(query);
    });

    return query !== undefined ? filter : schema.contacts.all();
  });

  this.post("/contacts/", function (schema, request) {
    const data = JSON.parse(request.requestBody);
    return schema.contacts.create(data);
  });

  this.post(`/contacts/:id`, function (schema, request) {
    const id = request.params.id;
    const contact = schema.contacts.find(id);
    const body = JSON.parse(request.requestBody);
    return contact.update(body);
  });

  this.delete(`/contacts/:id`, function (schema, request) {
    const id = request.params.id;
    const item = schema.contacts.find(id);
    return item.destroy();
  });
}
