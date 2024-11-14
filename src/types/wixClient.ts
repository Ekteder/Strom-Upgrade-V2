export type WixClientWithCollections = {
  collections: {
    getCollectionBySlug: (slug: string) => Promise<any>; // Adjust the return type as needed
  };
}; 