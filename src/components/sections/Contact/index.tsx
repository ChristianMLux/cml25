/**
 * @component ContactForm
 * @description A glassmorphic contact form with cyber-noir styling.
 * Implements the Neo-Victorian Software Standard's "Digital Hospitality" principle.
 * @author Christian M. Lux
 * @maintenance-pledge Accessible, helpful validation messages, semantic structure.
 */

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

import { Button } from '@/components/ui/Button/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card/Card';
import { db } from '@/lib/firebase/firebase';
import { useDialog } from '@/lib/store/dialogStore';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const { t, i18n } = useTranslation('contact');
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
        t('validation.nameMin', 'Name muss mindestens 2 Zeichen lang sein'),
      ),
    email: z
      .string()
      .email(
        t('validation.emailInvalid', 'Gültige E-Mail-Adresse erforderlich'),
      ),
    subject: z
      .string()
      .min(
        3,
        t(
          'validation.subjectMin',
          'Betreff muss mindestens 3 Zeichen lang sein',
        ),
      ),
    message: z
      .string()
      .min(
        10,
        t(
          'validation.messageMin',
          'Nachricht muss mindestens 10 Zeichen lang sein',
        ),
      )
      .max(
        500,
        t(
          'validation.messageMax',
          'Nachricht darf maximal 500 Zeichen lang sein',
        ),
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
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: serverTimestamp(),
        locale: i18n.language,
      });

      dialog.alert(
        t('success.title', 'Nachricht gesendet'),
        <p className="py-4 text-muted-foreground">
          {t(
            'success.message',
            'Danke für deine Nachricht! Ich werde mich so schnell wie möglich bei dir melden.',
          )}
        </p>,
        {
          size: 'md',
          confirmText: t('success.button', 'OK'),
        },
      );

      reset();
    } catch (err) {
      console.error('Kontaktformular-Fehler:', err);

      dialog.alert(
        t('error.title', 'Fehler'),
        <div className="py-4">
          <p className="text-muted-foreground">
            {t(
              'error.message',
              'Leider konnte deine Nachricht nicht gesendet werden. Bitte versuche es später noch einmal.',
            )}
          </p>
          <p className="text-sm text-cyber-pink mt-2">
            {err instanceof Error
              ? err.message
              : t('error.unknownError', 'Unbekannter Fehler')}
          </p>
        </div>,
        {
          size: 'md',
          confirmText: t('error.button', 'Verstanden'),
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Base input classes for glassmorphic styling
  const inputBaseClasses = cn(
    // Glassmorphism
    'w-full p-3 bg-glass-low backdrop-blur-md border border-glass-border rounded-md',
    // Text and transitions
    'text-foreground placeholder:text-muted-foreground transition-all duration-200 ease-spring',
    // Focus: Cyber-cyan glow
    'focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]',
  );

  const inputErrorClasses =
    'border-cyber-pink focus:border-cyber-pink focus:ring-cyber-pink focus:shadow-[0_0_15px_rgba(255,0,255,0.3)]';

  return (
    <section className="py-16 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card as="div" className="p-2 sm:p-4">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl sm:text-3xl">
              {t('title', 'Kontakt aufnehmen')}
            </CardTitle>
            <CardDescription className="text-base">
              {t('subtitle', 'Ich freue mich auf deine Nachricht')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('fields.name', 'Name')}
                </label>
                <input
                  id="name"
                  type="text"
                  className={cn(
                    inputBaseClasses,
                    errors.name && inputErrorClasses,
                  )}
                  placeholder={t('placeholders.name', 'Dein Name')}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-cyber-pink">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('fields.email', 'E-Mail')}
                </label>
                <input
                  id="email"
                  type="email"
                  className={cn(
                    inputBaseClasses,
                    errors.email && inputErrorClasses,
                  )}
                  placeholder={t('placeholders.email', 'deine@email.com')}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-cyber-pink">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('fields.subject', 'Betreff')}
                </label>
                <input
                  id="subject"
                  type="text"
                  className={cn(
                    inputBaseClasses,
                    errors.subject && inputErrorClasses,
                  )}
                  placeholder={t('placeholders.subject', 'Projektanfrage')}
                  {...register('subject')}
                />
                {errors.subject && (
                  <p className="mt-2 text-sm text-cyber-pink">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t('fields.message', 'Nachricht')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={cn(
                    inputBaseClasses,
                    'resize-none',
                    errors.message && inputErrorClasses,
                  )}
                  placeholder={t(
                    'placeholders.message',
                    'Beschreibe dein Projekt...',
                  )}
                  {...register('message')}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-cyber-pink">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="cyber"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting
                  ? t('buttons.sending', 'Wird gesendet...')
                  : t('buttons.send', 'Nachricht senden')}
                {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
              </Button>
            </motion.form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
