export const getDurationText = (key) => {
    const durationMap = {
      oneMonth: "شهر واحد",
      twoMonths: "شهرين",
      threeMonths: "ثلاثة أشهر",
      fourMonths: "أربعة أشهر",
      fiveMonths: "خمسة أشهر",
      sixMonths: "ستة أشهر",
    };
    return durationMap[key] || `${key.replace("Months", "")} أشهر`;
  };
  