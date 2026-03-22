import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * StatBlock component
 * 
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the stat block
 * @param {React.ReactNode} props.icon - The icon to display in the stat block
 * @param {string} props.description - The description of the stat block
 */

/**
 * StatBlock component displays a statistic with an optional animated counter
 * 
 * @component
 * @example
 * // Basic usage
 * <StatBlock title="Member Points" number={1250} />
 * 
 * // With icon and description
 * <StatBlock 
 *   title="Total Sales" 
 *   number={42500} 
 *   icon={DollarSign} 
 *   description="15% increase from last month" 
 * />
 * 
 * // With custom animation duration
 * <StatBlock 
 *   title="Active Users" 
 *   number={8745} 
 *   duration={1500} 
 * />
 * 
 * // With custom styling
 * <StatBlock 
 *   title="Conversion Rate" 
 *   number={24} 
 *   className="bg-blue-50 border-blue-200" 
 * />
 */



const StatBlock = ({ 
  title, 
  icon: Icon, 
  description, 
  number, 
  duration = 2000, // Animation duration in ms
  className = '' 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * number));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [number, duration]);

  return (
    <div
      className={`rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        {Icon && <Icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />}
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          {count.toLocaleString()}
        </p>
        {description && <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>}
      </div>
    </div>
  );
};

StatBlock.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  description: PropTypes.string,
  number: PropTypes.number.isRequired,
  duration: PropTypes.number,
  className: PropTypes.string
};

export default StatBlock;
