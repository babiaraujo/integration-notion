import express, { Router, Request, Response } from 'express';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { NotionPageResponse } from './notionTypes'; 

dotenv.config();

class NotionService {
  private notion: Client;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
  }

  async createPage(name: string, email: string, message: string): Promise<NotionPageResponse> {
    const response = await this.notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: process.env.NOTION_DATABASE_ID as string,
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

    return response as NotionPageResponse;
  }
}

class MessageController {
  public router: Router;
  private notionService: NotionService;

  constructor() {
    this.router = express.Router();
    this.notionService = new NotionService();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post('/', this.postMessage.bind(this));
  }

  async postMessage(req: Request, res: Response): Promise<Response | void> {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are mandatory.' });
      }

      const notionResponse = await this.notionService.createPage(name, email, message);

      return res.status(200).json({ message: 'Success', data: notionResponse });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  }
}

const messageController = new MessageController();
export default messageController.router;
