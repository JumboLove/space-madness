import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET
const apiVersion = '2023-03-01'

const client = createClient({
  apiVersion,
  projectId,
  dataset,
  token,
})

// Run this script from within your project folder in your terminal with: `sanity exec --with-user-token migrations/remapResourceContentToResource.js`
// This script will currently only run once, if you'd like to iterate over large datasets, you will need to delete
// resourceContent within the loop, or use a local Map() to track which values you have created so you don't infinitely create.
const createNewResources = async (documents) => {
  const newResources = documents.map((doc) => {
    const { _rev, _id, _createdAt, _updatedAt, ...rest } = doc;
    return {
      ...rest,
      _type: "resource", // Change the _type to "resource"
    };
  });

  console.log(`creating: ${newResources.length}`)

  // Define the delay in milliseconds (20ms to ensure it respects the rate limit)
  const delay = 20;

  // Delete each duplicate document by ID with a delay between each deletion
  const responses = [];
  for (const resource of newResources) {
    console.log(`creating: ${resource.slug.current}`);
    await client.create(resource);
    console.log(`created`);
    responses.push(`Created document`);
    // Add a delay between deletions
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return responses;
};

const fetchDocuments = () =>
  client.fetch(`*[_type == 'resourceContent'][0...100]`);

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  if (documents.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(`Migrating batch:\n ${documents.map((doc) => doc._id).join("\n")}`);
  await createNewResources(documents);
  // only need to run this once, otherwise, you'll need to delete 
  // resourceContent documents before running the whole loop again
  // return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
