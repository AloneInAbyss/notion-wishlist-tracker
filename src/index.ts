import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: "32e1c4ed63868001a221f898434a162f",
  });

  // logger.info(response);

  const pagesIds = response.results.map((entry) => entry.id);

  if (!pagesIds.length) {
    throw new Error("Empty Database!");
  }

  // logger.info(pagesIds);

  const pagesInfo = await Promise.all(
    pagesIds.map(async (pageId) => {
      return await retrievePageInfo(pageId, notion);
    })
  );

  // logger.info(pagesInfo);

  const pagesSimpleInfo = pagesInfo.map((pageInfo) => {
    return {
      property: pageInfo.properties['Nome'],
      name: pageInfo.properties['Nome'].title
  });
}

async function retrievePageInfo(pageId: string, notion: Client) {
  return await notion.pages.retrieve({
    page_id: pageId
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
