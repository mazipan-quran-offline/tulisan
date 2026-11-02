import React, { useState } from 'react';

import { FacebookIcon, XIcon, WhatsAppIcon, GitHubIcon, LinkIcon, SparklesIcon } from './icons';

const copyText = async text => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(area);
      return ok;
    } catch (err) {
      return false;
    }
  }
};

const CopyButton = ({ getText, label, doneLabel, ariaLabel, icon }) => {
  const [status, setStatus] = useState('idle');

  const handleClick = async () => {
    const ok = await copyText(getText());
    setStatus(ok ? 'done' : 'error');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="post-actions__btn post-actions__btn--copy"
      aria-label={ariaLabel}
    >
      {icon}
      <span aria-live="polite">
        {status === 'done' ? doneLabel : status === 'error' ? 'Gagal menyalin' : label}
      </span>
    </button>
  );
};

// Share links and copy actions. `compact` renders only the four quick
// actions (used in the wide-screen side rail); the full set sits under the article.
const ShareButtons = ({ pageUrl, title, description, aiText, editUrl, compact = false, labelledBy }) => {
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || '');

  return (
    <div className="post-actions__share" role="group" aria-labelledby={labelledBy}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&title=${encodedTitle}&description=${encodedDesc}`}
        target="_blank"
        rel="noopener noreferrer"
        className="post-actions__btn post-actions__btn--facebook"
        aria-label="Bagikan ke Facebook"
      >
        <FacebookIcon />
        Facebook
      </a>
      <a
        href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="post-actions__btn post-actions__btn--x"
        aria-label="Bagikan ke X"
      >
        <XIcon />X
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="post-actions__btn post-actions__btn--whatsapp"
        aria-label="Bagikan ke WhatsApp"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <CopyButton
        getText={() => pageUrl}
        label="Salin Tautan"
        doneLabel="Tautan disalin"
        ariaLabel="Salin tautan artikel"
        icon={<LinkIcon />}
      />
      {!compact && (
        <>
          <CopyButton
            getText={() => aiText}
            label="Salin untuk AI"
            doneLabel="Teks disalin"
            ariaLabel="Salin seluruh isi artikel dalam format teks untuk AI"
            icon={<SparklesIcon />}
          />
          <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="post-actions__btn post-actions__btn--github"
            aria-label="Perbaiki artikel ini di GitHub"
          >
            <GitHubIcon />
            Perbaiki di GitHub
          </a>
        </>
      )}
    </div>
  );
};

export default ShareButtons;
