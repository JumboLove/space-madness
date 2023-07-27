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


// Tasks to do
// - retype recourceContent from resourceContent => resource

// Tasks done
// - export production data as a backup
// - update resource to include parent resource
// - update resourcecontent to include parent resource
// - remap field from resource => parent resource

// Run this script from within your project folder in your terminal with: `sanity exec --with-user-token migrations/renameField.js`
//
// This example shows how you may write a migration script that renames a field (name => fullname)
// on a specific document type (author).
// This will migrate documents in batches of 100 and continue patching until no more documents are
// returned from the query.
//
// This script can safely be run, even if documents are being concurrently modified by others.
// If a document gets modified in the time between fetch => submit patch, this script will fail,
// but can safely be re-run multiple times until it eventually runs out of documents to migrate.

// A few things to note:
// - This script will exit if any of the mutations fail due to a revision mismatch (which means the
//   document was edited between fetch => update)
// - The query must eventually return an empty set, or else this script will continue indefinitely

// Fetching documents that matches the precondition for the migration.
// NOTE: This query should eventually return an empty set of documents to mark the migration
// as complete
const deleteDuplicateResources = async (documents) => {
  // Extract slugs from the documents array
  const resourcesToDelete = documents.map((doc) => doc._id);

  console.log(`deleting ${resourcesToDelete.length} resources`)

  // Define the delay in milliseconds (20ms to ensure it respects the rate limit)
  const delay = 20;

  // // Delete each duplicate document by ID with a delay between each deletion
  const responses = [];
  for (const id of resourcesToDelete) {
    console.log(`deleting: ${id}`);
    await client.delete(id);
    console.log(`deleted`);
    responses.push(`Deleted document with ID: ${id}`);
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
  await deleteDuplicateResources(documents);
  // only need to run this once
  // return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
