export const eventOverlapping = (
  events: any,
  startTime: string,
  endTime: string
) => {
  let overllaped = false;
  if (events) {
    events.forEach((event: any) => {
      if (
        event.startTime &&
        event.endTime &&
        startTime &&
        endTime &&
        Number(startTime.replace(":", "")) <
          Number(event.endTime.replace(":", "")) &&
        Number(endTime.replace(":", "")) >
          Number(event.startTime.replace(":", ""))
      ) {
        overllaped = true;
      }
    });
    return overllaped;
  }
};
