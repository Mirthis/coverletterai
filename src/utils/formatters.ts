export function slugify(text: string) {
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function limitStrLength(text: string, max_length: number) {
  if (text.length > max_length - 3) {
    return text.substring(0, max_length).trimEnd() + "...";
  } else {
    return text;
  }
}

export const formatAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const formatNumber = (input: string | number, decimals?: number) => {
  let formattedNumber = input.toLocaleString("en-US");
  if (decimals) {
    formattedNumber = input.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return formattedNumber;
};

export const getSBTLocalURL = (level: number) => {
  return `/images/profileSBT/level${level}.jpg`;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});
