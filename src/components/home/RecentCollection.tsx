import Image from "next/image";
import { RecentCollectionBanner } from "@/assets/images";

export function RecentCollections() {
  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-16 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl mb-1'>
            <span className='font-serif '>Recent</span>{" "}
            <span className='font-sans font-light'>Collections</span>
          </h2>
          <div className='w-65 h-px bg-gray-300 mt-4 mb-3' />
          <p className='text-black-foreground text-sm'>
            {"Have a look on what's trending now!"}
          </p>
          <Image
            src={RecentCollectionBanner}
            alt='Recent Collections Banner'
            width={1200}
            height={400}
            className='mt-6 w-full h-auto rounded-lg object-cover'
          />
        </div>
      </div>
    </section>
  );
}
