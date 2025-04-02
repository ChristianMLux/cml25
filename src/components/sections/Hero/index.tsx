"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button/button";
import { useTranslation } from "react-i18next";
import { useRouter } from "@/lib/i18n-navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

interface Props {
  locale: string;
}

export default function Hero({ locale }: Props) {
  const { t } = useTranslation(["common", "hero"]);
  const router = useRouter();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t("hero:availableForWork")}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mr-6"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span>{t("hero:paragraph1_beforeHighlighted")} </span>
            <span className="text-primary">
              {t("hero:paragraph1_highlighted")}
            </span>{" "}
            <span>{t("hero:paragraph1_afterHighlighted")} </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-[35rem]"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <span>{t("hero:paragraph2")}</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="px-7 py-4 w-[10rem] h-auto text-base font-medium shadow-md"
              onClick={() => router.push(locale + "/projects")}
            >
              {t("hero:btn_projects")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="px-7 w-[10rem] h-auto text-base font-medium border-gray-400 text-gray-800 hover:bg-gray-100/80 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800/50"
              onClick={() => router.push(locale + "/contact")}
            >
              {t("hero:btn_contact")}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute -z-10 top-0 right-0 w-1/2 h-full opacity-10 blur-3xl bg-gradient-to-br from-primary/30 to-secondary/30 dark:opacity-5"></div>
    </section>
  );
}
