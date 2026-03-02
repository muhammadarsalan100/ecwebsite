import Image from "next/image";
import { RecentCollectionBanner } from "@/assets/images";

import { SectionHeader } from "@/components/common/SectionHeader";

export function RecentCollections() {
  return (
    <section className='w-full px-4 py-12 md:px-8 lg:px-16 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <SectionHeader
          titleBold="Recent"
          titleLight="Collections"
          subtitle="Have a look on what's trending now!"
        />
        <Image
          src={RecentCollectionBanner}
          alt='Recent Collections Banner'
          width={1200}
          height={400}
          className='mt-6 w-full h-auto rounded-lg object-cover'
        />
      </div>
    </section>
  );
}
