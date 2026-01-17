import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModelWearingCollection, WomanInYellowDress } from "@/assets/images";

export function HeroSection() {
  return (
    <section className='w-full px-4 py-8 md:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {/* Left Card - Main Promotional Content */}
          <div className='relative col-span-1 overflow-hidden rounded-[2rem] bg-[#c5dde4] p-8 lg:col-span-2 lg:p-12'>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              {/* Text Content */}
              <div className='z-10 max-w-sm'>
                <h1 className='text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl text-balance'>
                  Discover New Collection
                </h1>
                <div className='mt-4 flex items-start gap-3'>
                  <div className='mt-2 h-px w-8 bg-foreground/60' />
                  <p className='text-sm text-foreground/70 leading-relaxed'>
                    Fashion is part of the daily air
                    <br />
                    and it changes all the time,
                    <br />
                    with all the events.
                  </p>
                </div>
                <button className='mt-6 rounded-full bg-[#f5c842] px-8 py-3 font-semibold text-foreground transition-transform hover:scale-105 active:scale-95'>
                  Shop Now
                </button>

                {/* Reviews and Discount Section */}
                <div className='mt-8 flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <div className='flex -space-x-2'>
                      <Avatar className='h-8 w-8 border-2 border-[#c5dde4]'>
                        {/* <AvatarImage src='/woman-face-portrait-1.png' /> */}
                        <AvatarFallback>U1</AvatarFallback>
                      </Avatar>
                      <Avatar className='h-8 w-8 border-2 border-[#c5dde4]'>
                        {/* <AvatarImage src='/man-face-portrait-1.png' /> */}
                        <AvatarFallback>U2</AvatarFallback>
                      </Avatar>
                      <Avatar className='h-8 w-8 border-2 border-[#c5dde4]'>
                        {/* <AvatarImage src='/woman-face-portrait-2.png' /> */}
                        <AvatarFallback>U3</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='text-xs'>
                      <p className='font-semibold text-foreground'>15K Well</p>
                      <p className='text-foreground/70'>Reviews</p>
                    </div>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-foreground'>25%</p>
                    <p className='text-xs text-foreground/70'>
                      Off New Arrivals
                    </p>
                  </div>
                </div>
              </div>

              {/* Model Image with Circle Background */}
              <div className='relative flex items-center justify-center'>
                {/* White Circle Background */}
                <div className='absolute h-64 w-64 rounded-full bg-white/80 md:h-80 md:w-80' />
                {/* Model Image */}
                <div className='relative z-10 h-72 w-64 md:h-96 md:w-80'>
                  <Image
                    src={ModelWearingCollection}
                    alt='Model wearing new collection'
                    fill
                    className='object-contain object-bottom'
                    priority
                  />
                </div>
                {/* Curved Arrow */}
                <svg
                  className='absolute -bottom-4 left-0 h-16 w-16 text-foreground/80 md:bottom-8 md:left-4'
                  viewBox='0 0 64 64'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M8 48 C 16 16, 48 16, 56 32' strokeLinecap='round' />
                  <path
                    d='M4 40 L 8 48 L 16 44'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Card - Secondary Image */}
          <div className='relative col-span-1 min-h-[400px] overflow-hidden rounded-[2rem] lg:min-h-0'>
            <Image
              src={WomanInYellowDress}
              alt='Model in yellow dress'
              fill
              className='object-cover'
            />
            {/* Get Offer Button */}
            <button className='absolute right-4 top-4 rounded-full border-2 border-foreground/20 bg-white/90 px-6 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-transform hover:scale-105 active:scale-95'>
              Get Offer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
