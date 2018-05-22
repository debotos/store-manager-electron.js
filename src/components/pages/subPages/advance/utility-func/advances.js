import moment from "moment";

// Getting visible advances [Main Logic]

export default (advances, { text, sortBy, startDate, endDate }) => {
  return advances
    .filter(advance => {
      const createdAtMoment = moment(advance.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch = advance.note.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    }) //eslint-disable-next-line
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};
