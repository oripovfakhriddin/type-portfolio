export const changeDate = (date: string) => {
  const berilganVaqt = new Date(date);
  const sana = berilganVaqt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return sana;
};
