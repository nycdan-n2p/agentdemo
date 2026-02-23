"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import Image from "next/image";
import { useRef } from "react";

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <main className="w-full bg-background">
      <section
        className="relative h-full container text-foreground mx-auto rounded-[20px] py-14 bg-background"
        ref={testimonialRef}
      >
        <article className="max-w-screen-md mx-auto text-center space-y-2">
          <TimelineContent
            as="h1"
            className="text-[36px] font-bold leading-[1.2] text-[#111111] whitespace-nowrap"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            What teams are saying about Flex
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-lg font-normal leading-[1.5] text-[#6B6B6B]"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Let&apos;s hear how Flex clients feel about our service
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3 gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-gradient-to-br from-[#8B4A2A] to-[#5A3568] overflow-hidden rounded-[20px] border-0 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto text-white">
                <p>
                  &quot;Flex has been a game-changer for us. Their service is
                  top-notch and their team is incredibly responsive.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-sm">
                      Sarah M.
                    </h2>
                    <p className="">Head of Operations</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                    alt="Sarah M."
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-gradient-to-br from-[#A0583A] to-[#7050A0] text-white overflow-hidden rounded-[20px] border-0 p-5"
            >
              <article className="mt-auto">
                <p>
                  &quot;We&apos;ve seen incredible results with Flex. Their
                  expertise and dedication.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl">Marcus T.</h2>
                    <p className="">VP of Sales</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                    alt="Marcus T."
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#EDECEC] text-foreground overflow-hidden rounded-[20px] border-0 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &quot;Their team is highly professional, and their innovative
                  solutions have truly transformed the way we operate.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">
                      David K.
                    </h2>
                    <p className="lg:text-base text-sm">Director of Customer Success</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop"
                    alt="Reacher"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#EDECEC] text-foreground overflow-hidden rounded-[20px] border-0 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &quot;We&apos;re extremely satisfied with Flex. Their expertise
                  and dedication have exceeded our expectations.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">Jennifer L.</h2>
                    <p className="lg:text-base text-sm">Head of Support</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop"
                    alt="Jennifer L."
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-[#EDECEC] text-foreground overflow-hidden rounded-[20px] border-0 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">
                  &quot;Their customer support is absolutely exceptional. They are
                  always available, incredibly helpful.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg">
                      Alex R.
                    </h2>
                    <p className="lg:text-base text-sm">Operations Manager</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop"
                    alt="Steven Sunny"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-gradient-to-br from-[#7050A0] to-[#A0583A] text-white overflow-hidden rounded-[20px] border-0 p-5"
            >
              <article className="mt-auto">
                <p>
                  &quot;Flex has been a key partner in our growth journey.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl">Michael P.</h2>
                    <p className="">CTO</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                    alt="Michael P."
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-gradient-to-br from-[#5A3568] to-[#8B4A2A] overflow-hidden rounded-[20px] border-0 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto text-white">
                <p>
                  &quot;Flex has been a true game-changer for us. Their
                  exceptional service, combined with their deep expertise and
                  commitment to excellence, has made a significant impact on our
                  business.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl">Rachel N.</h2>
                    <p className="">VP of Product</p>
                  </div>
                  <Image
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                    alt="Rachel N."
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
