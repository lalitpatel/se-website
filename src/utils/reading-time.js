const estimateReadingTime = content => {
  const text = String(content || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[{}<>`#*_~[\]().,!?:;"'/-]/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
};

module.exports = estimateReadingTime;
