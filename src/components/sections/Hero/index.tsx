/**
 * @component Hero
 * @description The hero section with kinetic typography and cyber-noir accents.
 * Implements the Neo-Victorian Software Standard's "Distinct Identity" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Semantic structure, accessible call-to-actions.
 */

"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/Button/button";
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
          {/* Status Badge */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center rounded-full bg-cyber-neon/10 border border-cyber-neon/30 px-4 py-1.5 text-sm font-medium text-cyber-neon">
              <span className="mr-2 h-2 w-2 rounded-full bg-cyber-neon animate-pulse" />
              {t("hero:availableForWork")}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mr-6"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-foreground">
              {t("hero:paragraph1_beforeHighlighted")}{" "}
            </span>
            <span className="text-cyber-neon">
              {t("hero:paragraph1_highlighted")}
            </span>{" "}
            <span className="text-foreground">
              {t("hero:paragraph1_afterHighlighted")}{" "}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-[35rem]"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <span>{t("hero:paragraph2")}</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            <Button
              variant="cyber"
              size="lg"
              className="px-7 py-4 w-[10rem] h-auto text-base"
              onClick={() => router.push(locale + "/projects")}
            >
              {t("hero:btn_projects")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-7 w-[10rem] h-auto text-base"
              onClick={() => router.push(locale + "/contact")}
            >
              {t("hero:btn_contact")}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute -z-10 top-0 right-0 w-1/2 h-full opacity-20 blur-3xl bg-gradient-to-br from-cyber-neon/30 to-cyber-pink/20 dark:opacity-10" />
    </section>
  );
}
