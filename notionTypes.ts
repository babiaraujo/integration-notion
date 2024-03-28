export interface NotionTextObject {
    content: string;
    link?: {
      url: string;
    };
  }
  
  export interface NotionRichTextItem {
    type: 'text';
    text: NotionTextObject;
    annotations?: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: string;
  }
  
  export interface NotionTitleProperty {
    title: NotionRichTextItem[];
  }
  
  export interface NotionRichTextProperty {
    rich_text: NotionRichTextItem[];
  }
  
  export interface NotionPageProperties {
    Name: NotionTitleProperty;
    Email: NotionRichTextProperty;
    Mensagem: NotionRichTextProperty;
  }
  
  export type NotionParentType = 'database_id' | 'page_id' | 'block_id' | 'workspace';
  
  export interface NotionParent {
    type: NotionParentType;
    database_id?: string;
    page_id?: string;
    block_id?: string;
    workspace?: boolean;
  }
  
  export interface NotionPageResponse {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    parent: NotionParent;
    archived: boolean;
    properties: NotionPageProperties;
    url: string;
  }
  