export default function convertMarkdownToHTML(markdown: string): string {
    if (!markdown) return '';
    
    const html = markdown
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/_([^_]+)_/g, '<em>$1</em>')
        .replace(/^\s*\n\*/gm, '<ul>\n*')
        .replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2')
        .replace(/^\*(.+)/gm, '<li>$1</li>')
        .replace(/^\d+\.\s(.+)/gm, '<li>$1</li>')
        .replace(/^\s*\n\d+\./gm, '<ol>\n')
        .replace(/^(\d+\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2')
        .replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>')
        .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\n\s*\n/g, '\n<p></p>\n')
        .replace(/  \n/g, '<br />');

    return `<div class="quote-content">${html}</div>`;
}