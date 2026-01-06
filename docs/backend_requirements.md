## Backend Basic Requirements

- Must expose at least seven REST routes (mix of GET, POST, PUT, PATCH, DELETE) backed by controllers, services, and real database operations. Wherever needed, apply Nest pipes for transformation and validation. *(14 marks)*
- Must model at least two relationship types among entities (choose from one-to-one, one-to-many, many-to-many) and build at least three CRUD routes that operate on those related resources. *(8 marks)*
- Must secure protected APIs using JWT authentication plus Nest guards. *(5 marks)*
- Must hash sensitive data with bcrypt and surface failures via `HttpException`. *(3 marks)*
- Bonus: integrate a mailer service for transactional emails. *(+3 marks)*

