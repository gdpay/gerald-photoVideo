'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMetaPixel } from '@/hooks/use-meta-pixel';
import { ArrowLeft, ArrowRight, Check, Camera, Film, Heart, Calendar, Users, Mail, Phone, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  serviceType: z.enum(['photography', 'videography', 'both']),
  eventType: z.enum(['wedding', 'quinceanera', 'engagement', 'portrait', 'other']),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().optional(),
  venue: z.string().optional(),
  name: z.string().min(2, 'Name is required'),
  partnerName: z.string().optional(),
  email: z.string().email('Valid email address is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  hearAbout: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Service', icon: Camera },
  { id: 2, title: 'Event Details', icon: Calendar },
  { id: 3, title: 'Contact', icon: Mail },
  { id: 4, title: 'Confirm', icon: Check },
];

const serviceOptions = [
  { value: 'photography', label: 'Photography', icon: Camera, desc: 'Stunning still images' },
  { value: 'videography', label: 'Videography', icon: Film, desc: 'Cinematic films' },
  { value: 'both', label: 'Both', icon: Heart, desc: 'Photo & video together' },
];

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'quinceanera', label: 'Quinceañera' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'other', label: 'Other Event' },
];

export function MultiStepInquiryForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { trackLead } = useMetaPixel();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: undefined,
      eventType: undefined,
      eventDate: '',
      guestCount: '',
      venue: '',
      name: '',
      partnerName: '',
      email: '',
      phone: '',
      hearAbout: '',
      message: '',
      honeypot: '',
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  const serviceType = watch('serviceType');
  const eventType = watch('eventType');

  const nextStep = async () => {
    let fields: (keyof FormData)[] = [];
    if (step === 1) fields = ['serviceType'];
    if (step === 2) fields = ['eventType', 'eventDate'];
    if (step === 3) fields = ['name', 'email', 'phone'];

    const isValid = await form.trigger(fields);
    if (isValid) setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
        trackLead({
          content_name: `${data.serviceType} - ${data.eventType}`,
          content_category: data.eventType,
        });
      } else {
        const err = await res.json();
        alert(err.error || 'Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-[#C8A23D]/10 border border-[#C8A23D]/20">
          <Check className="h-8 w-8 text-[#C8A23D]" />
        </div>
        <h3 className="font-heading text-2xl text-[#0A1F44] mb-2">Thank You!</h3>
        <p className="text-[#736D63] mb-6 max-w-sm mx-auto">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
        <a
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[#C8A23D] hover:text-[#A8842E] transition-colors font-body text-sm uppercase tracking-wider"
        >
          Browse Our Portfolio →
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={cn(
              'flex items-center gap-2',
              s.id <= step ? 'text-[#C8A23D]' : 'text-[#D4CEC4]'
            )}>
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border text-xs font-body transition-all duration-300',
                s.id < step ? 'bg-[#C8A23D] border-[#C8A23D] text-[#FAF7F2]' :
                s.id === step ? 'border-[#C8A23D] text-[#C8A23D]' :
                'border-[#D4CEC4] text-[#D4CEC4]'
              )}>
                {s.id < step ? <Check className="h-4 w-4" /> : s.id}
              </div>
              <span className="hidden sm:block text-xs font-body uppercase tracking-wider">{s.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                'w-8 sm:w-12 h-px mx-2 transition-colors duration-300',
                s.id < step ? 'bg-[#C8A23D]/50' : 'bg-[#E5E0D8]'
              )} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div>
                <h3 className="font-heading text-2xl text-[#0A1F44] mb-2">What service are you looking for?</h3>
                <p className="text-[#736D63] text-sm mb-6">Choose one or select both.</p>
                <div className="grid grid-cols-3 gap-3">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue('serviceType', opt.value as 'photography' | 'videography' | 'both')}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 border transition-all duration-300',
                        serviceType === opt.value
                          ? 'border-[#C8A23D] bg-[#C8A23D]/5 text-[#C8A23D]'
                          : 'border-[#E5E0D8] text-[#A39D93] hover:border-[#D4CEC4]'
                      )}
                    >
                      <opt.icon className="h-6 w-6" />
                      <span className="text-xs font-body uppercase tracking-wider">{opt.label}</span>
                      <span className="text-[10px] text-center opacity-60">{opt.desc}</span>
                    </button>
                  ))}
                </div>
                {errors.serviceType && (
                  <p className="text-[#8A1C3E] text-sm mt-2">Please select a service type.</p>
                )}
              </div>
            )}

            {/* Step 2: Event Details */}
            {step === 2 && (
              <div>
                <h3 className="font-heading text-2xl text-[#0A1F44] mb-2">Tell us about your event</h3>
                <p className="text-[#736D63] text-sm mb-6">Help us understand your needs.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#736D63] mb-2">Event Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {eventTypes.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setValue('eventType', opt.value as 'wedding' | 'quinceanera' | 'engagement' | 'portrait' | 'other')}
                          className={cn(
                            'py-3 px-4 border text-sm transition-all duration-300',
                            eventType === opt.value
                              ? 'border-[#C8A23D] bg-[#C8A23D]/5 text-[#C8A23D]'
                              : 'border-[#E5E0D8] text-[#A39D93] hover:border-[#D4CEC4]'
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {errors.eventType && <p className="text-[#8A1C3E] text-sm mt-1">Please select event type.</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-[#736D63] mb-2">Event Date</label>
                    <input
                      type="date"
                      {...register('eventDate')}
                      className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                    />
                    {errors.eventDate && <p className="text-[#8A1C3E] text-sm mt-1">{errors.eventDate.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#736D63] mb-2">Expected Guests</label>
                      <input
                        type="number"
                        placeholder="e.g. 150"
                        {...register('guestCount')}
                        className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#736D63] mb-2">Venue (optional)</label>
                      <input
                        type="text"
                        placeholder="Venue name"
                        {...register('venue')}
                        className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <div>
                <h3 className="font-heading text-2xl text-[#0A1F44] mb-2">Your Contact Information</h3>
                <p className="text-[#736D63] text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#736D63] mb-2">Your Name *</label>
                      <input
                        type="text"
                        placeholder="John"
                        {...register('name')}
                        className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                      />
                      {errors.name && <p className="text-[#8A1C3E] text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-[#736D63] mb-2">Partner Name</label>
                      <input
                        type="text"
                        placeholder="Jane"
                        {...register('partnerName')}
                        className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#736D63] mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      {...register('email')}
                      className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                    />
                    {errors.email && <p className="text-[#8A1C3E] text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-[#736D63] mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="(402) 555-0123"
                      {...register('phone')}
                      className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-[#8A1C3E] text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-[#736D63] mb-2">How did you hear about us?</label>
                    <select
                      {...register('hearAbout')}
                      className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors"
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="theknot">The Knot</option>
                      <option value="weddingwire">WeddingWire</option>
                      <option value="friend">Friend/Family Referral</option>
                      <option value="venue">Venue Recommendation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#736D63] mb-2">Message (optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Share any details about your vision..."
                      {...register('message')}
                      className="w-full bg-transparent border border-[#E5E0D8] px-4 py-3 text-[#0A1F44] text-sm focus:border-[#C8A23D] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    {...register('honeypot')}
                    className="absolute -left-[9999px]"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div>
                <h3 className="font-heading text-2xl text-[#0A1F44] mb-2">Almost Done!</h3>
                <p className="text-[#736D63] text-sm mb-6">Please review your information before submitting.</p>
                <div className="space-y-3 p-6 border border-[#E5E0D8] bg-[#FAF7F2]">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#A39D93]">Service:</span>
                      <p className="text-[#0A1F44] capitalize">{watch('serviceType')}</p>
                    </div>
                    <div>
                      <span className="text-[#A39D93]">Event Type:</span>
                      <p className="text-[#0A1F44] capitalize">{watch('eventType')}</p>
                    </div>
                    <div>
                      <span className="text-[#A39D93]">Event Date:</span>
                      <p className="text-[#0A1F44]">{watch('eventDate')}</p>
                    </div>
                    <div>
                      <span className="text-[#A39D93]">Name:</span>
                      <p className="text-[#0A1F44]">{watch('name')}</p>
                    </div>
                    <div>
                      <span className="text-[#A39D93]">Email:</span>
                      <p className="text-[#0A1F44]">{watch('email')}</p>
                    </div>
                    <div>
                      <span className="text-[#A39D93]">Phone:</span>
                      <p className="text-[#0A1F44]">{watch('phone')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 text-sm text-[#A39D93] hover:text-[#C8A23D] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-[#0A1F44] text-[#FAF7F2] text-sm font-body uppercase tracking-wider hover:bg-[#122D5A] transition-colors"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
            >
              Send Inquiry
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
