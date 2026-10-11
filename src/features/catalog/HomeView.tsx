import HomeContent from "@/Components/catalog/HomeContent";
import { getBooks } from "@/lib/server-api";

const HomeView = async () => {
  const page = await getBooks();
  return <HomeContent page={page} />;
};

export default HomeView;
