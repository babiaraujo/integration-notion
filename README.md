
# Integration with notion

api that sends data in bulk to a database within notion.





## Environment variables

To run this project, you will need to add the following environment variables to your .env.

`API_KEY`

`NOTION_API_KEY` 

`NOTION_DATABASE_ID`


## API documentation

#### Creates the data and sends it to the database in notion

```http
  POST /api/contact
```

| parameter   | type       | description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **required**.|
| `email` | `string` | **required**.|
| `message` | `string` | **required**.|





## Reference

- [**Documentation**](https://developers.notion.com/reference/capabilities) to create the notion integration;
- [**Documentation**](https://developers.notion.com/reference/post-page) for the development of an API focused on inserting data into the database;
