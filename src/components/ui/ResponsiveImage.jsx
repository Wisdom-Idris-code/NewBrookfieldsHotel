const RESPONSIVE_WIDTHS = [480, 768, 1280, 1920];

function getWebpPath(src, width) {
  return src.replace(/\.[^.]+$/, `-${width}.webp`);
}

function ResponsiveImage({
  src,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props
}) {
  const sourceWidths = [
    ...new Set([
      ...RESPONSIVE_WIDTHS.filter((candidate) => candidate < width),
      Math.min(width, 1920),
    ]),
  ];
  const srcSet = sourceWidths
    .map((candidate) => `${getWebpPath(src, candidate)} ${candidate}w`)
    .join(', ');

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        {...props}
        src={src}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}

export default ResponsiveImage;
