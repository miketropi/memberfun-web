import { SeminarList, SeminarDetails, SeminarRegistrationForm } from '../index';

export default function SeminarContent({
  showRegistrationForm,
  selectedSeminar,
  seminars,
  filters,
  isRegistered,
  onSeminarClick,
  onRegister,
  onCancelRegistration,
  onExportCalendar,
  registrationLoading,
  onRegistrationComplete,
  onCloseDetails
}) {
  if (showRegistrationForm && selectedSeminar) {
    return (
      <SeminarRegistrationForm
        seminarId={selectedSeminar.id}
        onRegistrationComplete={onRegistrationComplete}
        initialData={{
          name: '',
          email: '',
          phone: '',
          company: '',
          dietary_requirements: '',
          special_requests: ''
        }}
      />
    );
  }

  if (selectedSeminar) {
    return (
      <SeminarDetails
        seminar={selectedSeminar}
        onClose={onCloseDetails}
        isRegistered={isRegistered(selectedSeminar.id)}
        onRegister={onRegister}
        onCancelRegistration={onCancelRegistration}
        onExportCalendar={onExportCalendar}
        registrationLoading={registrationLoading}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {filters.status === 'all'
            ? 'All seminars'
            : filters.status === 'upcoming'
              ? 'Upcoming seminars'
              : 'Past seminars'}
        </h2>
      </div>
      <SeminarList
        seminars={seminars}
        onSeminarClick={onSeminarClick}
        isPast={filters.status === 'past'}
        emptyMessage="No seminars available."
      />
    </div>
  );
} 