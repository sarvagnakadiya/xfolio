import { ReactNode } from 'react';
import { TaggedMention } from '@components/ui/tagged-mention';

interface TextPart {
  type: 'text' | 'mention';
  content: string;
}

export function parseTextWithMentions(text: string): TextPart[] {
  const mentionRegex = /@[a-zA-Z0-9_]+/g;
  const parts: TextPart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(text)) !== null) {
    // Add text before the mention
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    // Add the mention
    parts.push({
      type: 'mention',
      content: match[0]
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last mention
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return parts;
}

export function renderTextWithMentions(text: string): ReactNode[] {
  const parts = parseTextWithMentions(text);

  return parts.map((part, index) => {
    if (part.type === 'mention') {
      return <TaggedMention key={index} mention={part.content} />;
    }
    return part.content;
  });
}
