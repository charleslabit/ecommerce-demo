export const FormattedNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value.toFixed(2)));

// ✅ Fallback if null or a Blob URL
export const getImageSrc = (imageUrl: string | null | undefined) => {
  if (!imageUrl || imageUrl.startsWith("blob:"))
    return "/default/user-default.png";
  return imageUrl; // ✅ Use existing image URL if valid
};
