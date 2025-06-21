import Cards from "@/components/Cards";

const anime = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-5">
      <h3 className="text-3xl font-bold">Soy animes</h3>
      <div className=" grid items-center justify-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
};

export default anime;
