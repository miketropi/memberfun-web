const AboutHeader = () => {
  return (
    <div className="border-b border-zinc-200/90 bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-950 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
            About
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About MemberFun
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
            We build a calmer home for member communities — articles, seminars, points,
            and announcements in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
