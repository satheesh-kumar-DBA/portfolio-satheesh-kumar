import { useEffect, useState } from 'react';

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Reveals terminal lines over time: `cmd` lines are typed character by character,
// output lines appear whole. Returns { shown, typing, done } for rendering.
export function useTypedLines(lines, { charDelay = 28, lineDelay = 260, startDelay = 400 } = {}) {
  const [state, setState] = useState(() => (reduced() ? { line: lines.length, char: 0 } : { line: 0, char: 0 }));

  useEffect(() => {
    if (reduced()) return undefined;
    setState({ line: 0, char: 0 });
    let line = 0;
    let char = 0;
    let timer;

    const step = () => {
      if (line >= lines.length) return;
      const current = lines[line];
      if (current.type === 'cmd' && char < current.text.length) {
        char += 1;
        setState({ line, char });
        timer = setTimeout(step, charDelay);
      } else {
        line += 1;
        char = 0;
        setState({ line, char });
        timer = setTimeout(step, current.type === 'cmd' ? lineDelay * 1.6 : lineDelay / 3);
      }
    };
    timer = setTimeout(step, startDelay);
    return () => clearTimeout(timer);
    // Restart only when the content changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(lines)]);

  const shown = lines.slice(0, state.line);
  const typing = state.line < lines.length ? { ...lines[state.line], text: lines[state.line].text?.slice(0, state.char) ?? '' } : null;
  return { shown, typing, done: state.line >= lines.length };
}
