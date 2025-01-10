import { connectDB } from '../utils/db.ts';
import { DojoContainer } from '../components/DojoContainer.tsx';
import { DojoWithImage } from '../types/egame.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import { NavBar } from '../islands/NavBar.tsx';

export const handler: Handlers = {
  async GET(_req, ctx) {
    const db = await connectDB();
    const collection = db.collection<DojoWithImage>('dojos');
    const dojos = await collection.find({}, { sort: { _id: -1 } }).toArray();
    return ctx.render({ dojos });
  },
};

export default function Home(props: PageProps) {
  return (
    <div class='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <NavBar />
      <main class='py-4 px-2 sm:px-4 lg:px-6'>
        <DojoContainer dojos={props.data.dojos} />
      </main>
    </div>
  );
}
