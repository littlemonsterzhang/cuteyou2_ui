import ButtonAccount from "@/components/ButtonAccount";
import PhotoUploadBox from './photo-upload-box';

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Private Page</h1>
        <div className="flex items-center justify-center bg-gray-200 p-8 rounded-lg">
          <PhotoUploadBox />
        </div>
      </section>
    </main>
  );
}