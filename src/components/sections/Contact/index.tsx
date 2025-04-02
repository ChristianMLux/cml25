"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useDialog } from "@/lib/store/dialogStore";

interface ContactFormProps {
  locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const { t, i18n } = useTranslation("contact");
  const dialog = useDialog();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const formSchema = z.object({
    name: z
      .string()
      .min(
        2,
        t("validation.nameMin", "Name muss mindestens 2 Zeichen lang sein")
      ),
    email: z
      .string()
      .email(
        t("validation.emailInvalid", "Gültige E-Mail-Adresse erforderlich")
      ),
    subject: z
      .string()
      .min(
        3,
        t(
          "validation.subjectMin",
          "Betreff muss mindestens 3 Zeichen lang sein"
        )
      ),
    message: z
      .string()
      .min(
        10,
        t(
          "validation.messageMin",
          "Nachricht muss mindestens 10 Zeichen lang sein"
        )
      )
      .max(
        500,
        t(
          "validation.messageMax",
          "Nachricht darf maximal 500 Zeichen lang sein"
        )
      ),
  });

  type FormData = z.infer<typeof formSchema>;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...data,
        createdAt: serverTimestamp(),
        locale: i18n.language,
      });

      dialog.alert(
        t("success.title", "Nachricht gesendet"),
        <p className="py-4">
          {t(
            "success.message",
            "Danke für deine Nachricht! Ich werde mich so schnell wie möglich bei dir melden."
          )}
        </p>,
        {
          size: "md",
          confirmText: t("success.button", "OK"),
        }
      );

      reset();
    } catch (err) {
      console.error("Kontaktformular-Fehler:", err);

      dialog.alert(
        t("error.title", "Fehler"),
        <div className="py-4">
          <p>
            {t(
              "error.message",
              "Leider konnte deine Nachricht nicht gesendet werden. Bitte versuche es später noch einmal."
            )}
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            {err instanceof Error
              ? err.message
              : t("error.unknownError", "Unbekannter Fehler")}
          </p>
        </div>,
        {
          size: "md",
          confirmText: t("error.button", "Verstanden"),
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-[1.5rem]">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            {t("fields.name", "Name")}
          </label>
          <input
            id="name"
            type="text"
            className={`w-full p-3 bg-white dark:bg-gray-800 border ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t("placeholders.name", "Dein Name")}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t("fields.email", "E-Mail")}
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-3 bg-white dark:bg-gray-800 border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t("placeholders.email", "deine@email.com")}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            {t("fields.subject", "Betreff")}
          </label>
          <input
            id="subject"
            type="text"
            className={`w-full p-3 bg-white dark:bg-gray-800 border ${
              errors.subject
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t("placeholders.subject", "Projektanfrage")}
            {...register("subject")}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            {t("fields.message", "Nachricht")}
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full p-3 bg-white dark:bg-gray-800 border ${
              errors.message
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={t(
              "placeholders.message",
              "Beschreibe dein Projekt..."
            )}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? t("buttons.sending", "Wird gesendet...")
            : t("buttons.send", "Nachricht senden")}
        </button>
      </motion.form>
    </section>
  );
}
