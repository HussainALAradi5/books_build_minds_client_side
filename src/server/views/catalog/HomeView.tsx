import HomeContent from "@/Components/catalog/HomeContent";
import CatalogUnavailable from "@/Components/catalog/CatalogUnavailable";
import { bookQueryService } from "@/server/services/bookQueryService";
import { connection } from "next/server";

const HomeView = async () => {
  await connection();
  const page = await bookQueryService.catalogOrUnavailable();
  return page ? <HomeContent page={page} /> : <CatalogUnavailable />;
};

export default HomeView;
