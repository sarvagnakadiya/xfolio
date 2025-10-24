import cn from 'clsx';

interface TaggedMentionProps {
  mention: string;
  className?: string;
}

export function TaggedMention({
  mention,
  className
}: TaggedMentionProps): JSX.Element {
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    // Remove @ symbol and redirect to X profile
    const username = mention.replace('@', '');
    const xProfileUrl = `https://x.com/${username}`;

    // Open in new tab
    window.open(xProfileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'cursor-pointer font-bold text-blue-500 transition-colors hover:text-blue-600 hover:underline',
        'rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1',
        className
      )}
      type='button'
    >
      {mention}
    </button>
  );
}
