import PropTypes from 'prop-types';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const cardWrap = 'rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/85 lg:p-10';

const ContactFormSection = ({ contactInfoProps = {}, contactFormProps = {}, className = '' }) => {
  return (
    <div
      className={`border-b border-zinc-200/90 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className={cardWrap}>
            <ContactInfo
              bgColor="bg-transparent"
              textColor="text-zinc-700 dark:text-zinc-300"
              headingColor="text-zinc-950 dark:text-zinc-50"
              linkColor="text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
              iconColor="text-zinc-500 dark:text-zinc-400"
              className="py-0 px-0 sm:px-0 lg:px-0 xl:pr-0"
              {...contactInfoProps}
            />
          </div>
          <div className={cardWrap}>
            <ContactForm
              bgColor="bg-transparent"
              labelColor="text-zinc-800 dark:text-zinc-200"
              className="py-0 px-0 sm:px-0 lg:px-0 lg:py-0"
              {...contactFormProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ContactFormSection.propTypes = {
  contactInfoProps: PropTypes.object,
  contactFormProps: PropTypes.object,
  className: PropTypes.string,
};

export default ContactFormSection;
