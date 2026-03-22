import PropTypes from 'prop-types';

const ContactHeader = ({
  title = 'Contact us',
  subtitle = 'Questions about MemberFun? We read every message.',
  className = '',
}) => {
  return (
    <div
      className={`border-b border-zinc-200/90 bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-950 dark:border-zinc-800 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ContactHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default ContactHeader;
