import { Clock, Phone } from "lucide-react"
import Quote from "./Quote";
import BusinessFrom from "./BusinessForm";
import Testemonials from '@/components/Testemonials';

interface HeroProps {
  examples: string[];
  context: string;
  title: string;
  subtitle: string;
  description: string;
  quoteTitle: string;
  quoteSubtitle: string;
  quoteDescription: string;
  showQuote?: boolean;
}

const Hero = ({ examples, context, title, subtitle, description, quoteTitle = '', quoteSubtitle = '', quoteDescription = '',showQuote=true }: HeroProps) => (
  <>
    <section className="relative px-4 sm:px-6 pt-20 sm:pt-32 pb-16 sm:pb-24 text-center min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div>
          <section>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-6 leading-[1.1]'>{title}</h1>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-6 leading-[1.1]'>{subtitle}</h1>
            <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-7">Choose your project type:</p>
            <div className="flex gap-2 justify-center flex-col md:flex-row">
              <a 
                onClick={() => {
                  const businessFormCards = document.querySelector('#businessFormCards');
                  if (businessFormCards) {
                    businessFormCards.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
                  }
                  const businessFormSubmit = document.querySelector('#businessFormSubmit');
                  setTimeout(() => {
                    if (businessFormSubmit) {
                      businessFormSubmit.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
                    }
                  }, 2500)
                }} 
                className="bg-black text-white py-[12px] px-[120px] rounded-[99px] hover:bg-[#ffc527] hover:text-black"
              >Your Business</a>
              <a 
                onClick={() => {
                  const yourhome = document.querySelector('#yourhome');
                  if (yourhome) {
                    yourhome.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
                  }
                }} 
                className="bg-black text-white py-[12px] px-[120px] rounded-[99px] hover:bg-[#ffc527] hover:text-black"
              >Your Home</a>
            </div>
          </section>
          <section className="flex justify-between my-[70px]">
            <div className="text-white">
              <h2 className='text-4xl font-bold mb-2'>1,200+</h2>
              <p className="lazyloaded">Projects completed</p>
            </div>
            <div className="text-white">
              <h2 className='text-4xl font-bold  mb-2'>4.9</h2>
              <p>Customer rating</p>
            </div>
            <div className="text-white">
              <h2 className='text-4xl font-bold  mb-2'>24/7</h2>
              <p>Support available</p>
            </div>
          </section>
        </div>
      </div>
    </section>
    <BusinessFrom />

    <Testemonials />
    {/* Quote Section - Fixed for mobile */}
    {showQuote && ( <>
    <div className="w-full max-w-4xl mx-auto text-center px-4 pt-12 pb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-black mb-6 tracking-tight max-w-[90%] sm:max-w-3xl mx-auto break-words flex flex-col w-[510px]">
        {quoteTitle}
      </h1>

      <p className="text-xl sm:text-2xl text-black/80 font-normal tracking-tight mb-6 max-w-[90%] sm:max-w-2xl mx-auto w-[450px]">
        {quoteSubtitle}
      </p>

      <div className="text-base text-black/60 font-normal max-w-xl mx-auto leading-relaxed mb-10">
        {quoteDescription}
      </div>
    </div>

    <Quote examples={examples} context={context} />
    </>)}
  </>
)

export default Hero;