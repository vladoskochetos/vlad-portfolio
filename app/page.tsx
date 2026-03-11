"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Send, X, ChevronLeft, ChevronRight, Briefcase, User, Images } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
} as const;

export default function Page() {
  const fashionImages = [
    "/images/fashion/01.jpeg",
    "/images/fashion/02.jpeg",
    "/images/fashion/03.jpeg",
    "/images/fashion/04.jpeg",
    "/images/fashion/05.jpeg",
    "/images/fashion/06.jpeg",
  ];

  const portraitImages = [
    "/images/individual/01.jpeg",
    "/images/individual/02.jpeg",
    "/images/individual/03.jpeg",
    "/images/individual/04.jpeg",
    "/images/individual/05.jpeg",
    "/images/individual/06.jpeg",
  ];

  const headshotImages = [
    "/images/portraits/01.jpeg",
    "/images/portraits/02.jpeg",
    "/images/portraits/03.jpeg",
    "/images/portraits/04.jpeg",
    "/images/portraits/05.jpeg",
    "/images/portraits/06.jpeg",
  ];

  const boudoirImages = [
    "/images/boudoir/01.jpeg",
    "/images/boudoir/02.jpeg",
    "/images/boudoir/03.jpeg",
    "/images/boudoir/04.jpeg",
    "/images/boudoir/05.jpeg",
    "/images/boudoir/06.jpeg",
  ];

  const allImages = useMemo(
    () => [
      ...fashionImages.map((src) => ({ src, category: "Фэшн" })),
      ...portraitImages.map((src) => ({ src, category: "Индивидуальная" })),
      ...headshotImages.map((src) => ({ src, category: "Портреты" })),
      ...boudoirImages.map((src) => ({ src, category: "Будуар" })),
    ],
    []
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const openLightbox = (src: string) => {
    const index = allImages.findIndex((item) => item.src === src);
    if (index !== -1) setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () => setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  const showNext = () => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  const categories = ["Фэшн", "Индивидуальная", "Портреты", "Будуар"];

  const scrollToCategory = (index: number) => {
    setActiveCategory(index);
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({ left: width * index, behavior: "smooth" });
  };

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    const index = Math.round(sliderRef.current.scrollLeft / width);
    setActiveCategory(index);
  };

  const services = [
    "Индивидуальная фотосессия",
    "Портрет / fashion",
    "Будуарная съёмка",
  ];

  const imageCardClass =
    "group cursor-zoom-in overflow-hidden rounded-[22px] border border-white/10 bg-neutral-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30";

  const buttonPrimaryClass =
    "rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:opacity-90 active:scale-[0.99]";

  const buttonSecondaryClass =
    "rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/[0.07] active:scale-[0.99]";

  return (
    <div className={`min-h-screen bg-black pb-28 text-neutral-100 ${inter.className}`}>
      <div className="mx-auto max-w-md px-5 py-10 sm:px-6">
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col items-center text-center">
            <div className="h-28 w-28 overflow-hidden rounded-full border border-white/10 shadow-lg transition duration-300 hover:scale-[1.03]">
              <img src="/avatar.jpg" alt="Влад Кочетов" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.42em] text-neutral-500">Photographer</p>
            <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${playfair.className}`}>Влад Кочетов</h1>
            <p className="mt-4 max-w-[18rem] text-[15px] leading-7 text-neutral-300">
              Портретная, fashion и будуарная съёмка. Выразительные образы, точная работа со светом и
              продуманная визуальная подача.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3">
              <a href="#portfolio" className={buttonPrimaryClass}>
                Смотреть портфолио
              </a>
              <a href="#contact" className={buttonSecondaryClass}>
                Записаться на съёмку
              </a>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          id="portfolio"
          className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.36em] text-neutral-500">Portfolio</p>
            <h2 className={`mt-2 text-[28px] leading-none font-semibold ${playfair.className}`}>Работы</h2>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                onClick={() => scrollToCategory(index)}
                className={`rounded-full px-4 py-2 text-[12px] font-medium transition duration-300 ${
                  activeCategory === index
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />
            <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[10px] tracking-wider text-white/70">
              ← листай →
            </div>

            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
            >
              <div className="min-w-full snap-start">
                <h3 className={`mb-5 text-[22px] font-semibold ${playfair.className}`}>Фэшн</h3>
                <div className="grid grid-cols-2 gap-4">
                  {fashionImages.map((src, i) => (
                    <div key={i} className={imageCardClass}>
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={src}
                          alt={`fashion-${i}`}
                          onClick={() => openLightbox(src)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-full snap-start">
                <h3 className={`mb-5 text-[22px] font-semibold ${playfair.className}`}>Индивидуальная</h3>
                <div className="grid grid-cols-2 gap-4">
                  {portraitImages.map((src, i) => (
                    <div key={i} className={imageCardClass}>
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={src}
                          alt={`portrait-${i}`}
                          onClick={() => openLightbox(src)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-full snap-start">
                <h3 className={`mb-5 text-[22px] font-semibold ${playfair.className}`}>Портреты</h3>
                <div className="grid grid-cols-2 gap-4">
                  {headshotImages.map((src, i) => (
                    <div key={i} className={imageCardClass}>
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={src}
                          alt={`headshot-${i}`}
                          onClick={() => openLightbox(src)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-full snap-start">
                <h3 className={`mb-5 text-[22px] font-semibold ${playfair.className}`}>Будуар</h3>
                <div className="grid grid-cols-2 gap-4">
                  {boudoirImages.map((src, i) => (
                    <div key={i} className={imageCardClass}>
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={src}
                          alt={`boudoir-${i}`}
                          onClick={() => openLightbox(src)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="about"
          className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <p className="text-[10px] uppercase tracking-[0.36em] text-neutral-500">About</p>
          <h2 className={`mt-2 text-[28px] leading-none font-semibold ${playfair.className}`}>Обо мне</h2>
          <p className="mt-3 text-[15px] leading-7 text-neutral-300">
            Снимаю людей так, чтобы изображение выглядело стильно, дорого и современно. Люблю
            точную композицию, аккуратный свет и визуал без лишнего шума.
          </p>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <p className="text-[10px] uppercase tracking-[0.36em] text-neutral-500">Services</p>
          <h2 className={`mt-2 text-[28px] leading-none font-semibold ${playfair.className}`}>Услуги</h2>
          <div className="mt-5 space-y-4">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-neutral-200 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]"
              >
                {service}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <p className="text-[10px] uppercase tracking-[0.36em] text-neutral-500">Process</p>
          <h2 className={`mt-2 text-[28px] leading-none font-semibold ${playfair.className}`}>Как проходит работа</h2>
          <div className="mt-5 space-y-4 text-sm text-neutral-300">
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
              1. Обсуждаем задачу, стиль и референсы
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
              2. Подбираем локацию, свет и настроение серии
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
              3. Проводим съёмку и отбираем сильные кадры
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
              4. Ретушь, цвет и передача готового материала
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          id="contact"
          className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
          <p className="text-[10px] uppercase tracking-[0.36em] text-neutral-500">Contact</p>
          <h2 className={`mt-2 text-[28px] leading-none font-semibold ${playfair.className}`}>Связь</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <a
              href="https://t.me/jesuslookslikeme"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[22px] bg-white px-4 py-4 text-center text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-90 active:scale-[0.99]"
            >
              <Send size={16} />
              <span>Telegram</span>
            </a>
            <a
              href="https://www.instagram.com/jesus.lookslike.me?igsh=MTRkbHc1d2o2eXVkaw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[22px] border border-white/15 bg-white/[0.03] px-4 py-4 text-center text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/[0.07] active:scale-[0.99]"
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
          </div>
        </motion.section>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
        <div className="flex w-full max-w-md items-center justify-between rounded-full border border-white/10 bg-black/70 px-3 py-2 shadow-2xl backdrop-blur-xl">
          <a
            href="#portfolio"
            className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] text-neutral-300 transition duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            <Images size={16} />
            <span>Портфолио</span>
          </a>
          <a
            href="#about"
            className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] text-neutral-300 transition duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            <User size={16} />
            <span>Обо мне</span>
          </a>
          <a
            href="#contact"
            className="flex flex-1 flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] text-neutral-300 transition duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            <Briefcase size={16} />
            <span>Контакты</span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="absolute -top-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-xl">
                  {lightboxIndex + 1} / {allImages.length}
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/80 backdrop-blur-xl">
                  {allImages[lightboxIndex].category}
                </div>
              </div>

              <motion.img
                key={allImages[lightboxIndex].src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                src={allImages[lightboxIndex].src}
                alt="preview"
                className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
