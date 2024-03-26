import express from 'express';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

class NotionService {
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
  }

  async createPage(name, email, message) {
    const response = await this.notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: 'c4d75e7e6cac43bd87aee6225e134e61',
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Mensagem: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });

    return response;
  }
}

class MessageController {
  constructor() {
    this.router = express.Router();
    this.notionService = new NotionService();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.postMessage.bind(this));
  }

  async postMessage(req, res) {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are mandatory.' });
      }

      await this.notionService.createPage(name, email, message);

      res.status(200).json({ message: 'Sucess' });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'OAn error occurred while processing the request.' });
    }
  }
}

const messageController = new MessageController();
export default messageController.router;
