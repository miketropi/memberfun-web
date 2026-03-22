import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const FAQSection = ({
  title = 'Frequently asked questions',
  faqs = [
    {
      question: 'How do I get started with MemberFun?',
      answer:
        'Create an account from the sign-up page. You will be guided through basics; use Contact if you need a hand migrating members or schedules.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'We often run trials for new organizations. Ask via the contact form and we will confirm what applies to your group.',
    },
    {
      question: 'Can we import existing members?',
      answer:
        'Yes — we support structured imports so you do not re-type profiles. Tell us your current format and we will advise the best path.',
    },
    {
      question: 'How do seminars and articles work together?',
      answer:
        'Articles hold long-lived knowledge; seminars anchor dates and attendance. Both live in the same hub so members see the full picture.',
    },
    {
      question: 'Is our data secure?',
      answer:
        'We follow standard web security practices and encryption in transit. For specific compliance questions, contact us with your requirements.',
    },
    {
      question: 'How do we get support?',
      answer:
        'Email us through this page or use your admin channels once onboarded. We aim for clear, timely responses during business hours.',
    },
  ],
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h2>
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900/85"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-base font-bold text-zinc-950 transition hover:bg-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-800/50 sm:px-6 sm:py-5 sm:text-lg"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-zinc-500 transition dark:text-zinc-400 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="border-t border-zinc-200/90 px-5 pb-5 pt-4 text-base leading-relaxed text-zinc-700 dark:border-zinc-700 dark:text-zinc-300 sm:px-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FAQSection.propTypes = {
  title: PropTypes.string,
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
  ),
  className: PropTypes.string,
};

export default FAQSection;
