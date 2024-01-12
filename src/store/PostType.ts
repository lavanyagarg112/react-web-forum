export type TagType = {
    id: number,
    name: string;
  };
  
  export type PostData = {
    id: number;
    title: string;
    author_name: string;
    description: string;
    tags: TagType[];
  };
  