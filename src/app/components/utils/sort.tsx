export const sortEvents = (events: any): any => {
  var objST = 0;
  var obj2ST = 0;
  if (JSON.stringify(events) !== JSON.stringify([{}])) {
    events.sort((a: any, b: any) => {
      if (a.startTime && b.startTime) {
        objST = Number(a.startTime.replace(":", ""));
        obj2ST = Number(b.startTime.replace(":", ""));
      }
      return objST - obj2ST;
    });
  }
  return events;
};
