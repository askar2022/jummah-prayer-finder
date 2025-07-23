// src/utils/hijriUtils.ts
export function getHijriDate(): string {
    const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
  
    return hijriDate;
  }
  