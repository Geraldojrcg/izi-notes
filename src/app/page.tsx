import Link from "next/link";
import { getServerSideUser } from "../utils/auth/getServerSideUser";

async function checkUserLogged(): Promise<boolean> {
  const user = await getServerSideUser();
  return !!user?.id;
}

const Home = async () => {
  const hasUserLogged = await checkUserLogged();
  return (
    <div className="flex flex-col - items-center justify-center">
      <h1 className="text-3xl font-extrabold leading-normal text-white ">
        Welcome to iziNotes
      </h1>
      <h5 className="text-2xl text-white text-center py-2">
        Easy way to write, save and share simple notes 📝📝📝
      </h5>
      {hasUserLogged ? (
        <Link href="note-editor" className="btn-primary mt-4">
          Create more notes
        </Link>
      ) : (
        <Link href="/api/auth/signin" className="btn-primary mt-4">
          Create your first note
        </Link>
      )}
    </div>
  );
};

export default Home;
