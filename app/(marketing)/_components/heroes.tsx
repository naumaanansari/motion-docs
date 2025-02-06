import Image from "next/image"

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex items-center">
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                <Image src="/laptop-black.png" fill className="object-contain dark:hidden" alt="Manage Files"/>
                <Image src="/laptop-white.png" fill className="object-contain hidden dark:block" alt="Manage Files"/>
            </div>
            <div className="relative h-[400px] w-[400px] hidden md:block">
                <Image src="/analysis-black.svg" fill className="object-contain dark:hidden" alt="Analyzing"/>
                <Image src="/analysis-white.svg" fill className="object-contain hidden dark:block" alt="Analyzing"/>
            </div>
        </div>
    </div>
  )
}
