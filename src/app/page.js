import Container from "@/components/common/container";
import Icons from "../../public/assets/icon";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* Hero section */}
      <div className="relative h-[555px] w-full flex items-center justify-start px- lg:px-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/assets/images/hero_Background_image.svg"})`, // Replace with the actual path to your background image
          }}
        ></div>
        <Container className={"flex flex-col items-start justify-center"}>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Text Content */}
          <div className="relative z-10 max-w-lg text-white">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-2">Welcome to Lawying</h3>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Your Legal <br /> Discussion Hub
            </h1>
            <p className="text-lg leading-relaxed mb-6">
              Connect with lawyers and legal experts, ask questions, and share knowledge on various branches of law, all
              on an easy-to-use platform.
            </p>
            <button className="flex gap-3 items-center bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
              <span>Get Started</span>
              <span>
                <Image src={Icons.heroButtonIcon} className="h-5 w-5" height="1000" width="1000" quality={100} />
              </span>
            </button>
          </div>
        </Container>
      </div>

      {/* Category section */}
    </div>
  );
}
