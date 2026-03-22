import PropTypes from 'prop-types';

const MapSection = ({
  title = 'Our location',
  subtitle = 'Visit our office',
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0952890513616!2d-122.40058068440696!3d37.78778791908435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ded297e89%3A0xcfd1b2f12b1b2ba6!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1647887631211!5m2!1sen!2sus',
  mapHeight = 'min-h-[20rem] h-96',
  mapTitle = 'Office location',
  className = '',
}) => {
  return (
    <div className={`border-b border-zinc-200/90 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-center">
          {title ? (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
              {title}
            </p>
          ) : null}
          {subtitle ? (
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
              {subtitle}
            </h2>
          ) : null}
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/90 shadow-lg dark:border-zinc-800">
          <iframe
            className={`w-full ${mapHeight}`}
            src={mapUrl}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title={mapTitle}
          />
        </div>
      </div>
    </div>
  );
};

MapSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mapUrl: PropTypes.string,
  mapHeight: PropTypes.string,
  mapTitle: PropTypes.string,
  className: PropTypes.string,
};

export default MapSection;
