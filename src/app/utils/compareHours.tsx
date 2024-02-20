export const eventOverlapping = (
  events: any,
  startTime: string,
  endTime: string,
  skipId: Number
) => {
  let overlapped = false;
  if (events && startTime && endTime) {
    events.forEach((event: any, index: number) => {
      if (event.startTime && event.endTime && skipId !== index) {
        if (
          event.startTime === "entireday" ||
          (Number(startTime.replace(":", "")) <
            Number(event.endTime.replace(":", "")) &&
            Number(endTime.replace(":", "")) >
              Number(event.startTime.replace(":", "")))
        ) {
          overlapped = true;
        }
      }
    });
    return overlapped;
  }
};
